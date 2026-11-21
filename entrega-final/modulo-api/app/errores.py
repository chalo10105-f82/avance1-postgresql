"""Manejo de errores: toda falla sale con el mismo formato JSON y un código HTTP correcto.

    {"error": {"codigo": "FUNCION_NO_ENCONTRADA", "mensaje": "...", "detalle": ...}}
"""
import logging

import psycopg2
from psycopg2 import errors as pgerr
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pymongo import errors as mongoerr
from starlette.exceptions import HTTPException as StarletteHTTPException

from .integracion import casos_uso, transaccion_cruzada

log = logging.getLogger("bosque_api")


def _respuesta(status: int, codigo: str, mensaje: str, detalle=None) -> JSONResponse:
    return JSONResponse(status_code=status, content={"error": {"codigo": codigo, "mensaje": mensaje, "detalle": detalle}})


_MENSAJES_VALIDACION = {
    "missing": "es obligatorio",
    "int_parsing": "debe ser un número entero",
    "int_type": "debe ser un número entero",
    "string_type": "debe ser texto",
    "bool_parsing": "debe ser verdadero o falso",
    "greater_than_equal": "debe ser mayor o igual a {ge}",
    "less_than_equal": "debe ser menor o igual a {le}",
    "string_too_short": "es muy corto (mínimo {min_length} caracteres)",
    "string_too_long": "es muy largo (máximo {max_length} caracteres)",
    "literal_error": "valor no permitido; opciones válidas: {expected}",
    "extra_forbidden": "campo no permitido",
    "json_invalid": "el cuerpo de la petición no es un JSON válido",
    "model_attributes_type": "el cuerpo debe ser un objeto JSON",
}


def _texto_validacion(err: dict) -> str:
    plantilla = _MENSAJES_VALIDACION.get(err.get("type"))
    if not plantilla:
        return err.get("msg", "valor inválido")
    try:
        return plantilla.format(**(err.get("ctx") or {}))
    except (KeyError, IndexError):
        return plantilla


def registrar_manejadores(app: FastAPI) -> None:
    # ---------- Errores propios del código de integración ----------
    @app.exception_handler(casos_uso.ParametroInvalido)
    async def _param(_: Request, exc):
        return _respuesta(400, "PARAMETRO_INVALIDO", str(exc))

    @app.exception_handler(casos_uso.NoEncontrado)
    async def _noenc(_: Request, exc):
        return _respuesta(404, "NO_ENCONTRADO", str(exc))

    @app.exception_handler(transaccion_cruzada.ReglaNegocio)
    async def _regla(_: Request, exc):
        return _respuesta(409, "REGLA_DE_NEGOCIO", str(exc))

    @app.exception_handler(transaccion_cruzada.FalloTransaccion)
    async def _fallo(_: Request, exc):
        return _respuesta(503, "TRANSACCION_REVERTIDA",
                          "La operación falló y se deshizo en ambos motores; no quedó nada a medias.", str(exc))

    @app.exception_handler(transaccion_cruzada.Inconsistencia)
    async def _incons(_: Request, exc):
        log.error("INCONSISTENCIA entre motores: %s", exc)
        return _respuesta(500, "INCONSISTENCIA_ENTRE_MOTORES",
                          "Los dos motores pueden haber quedado distintos; hay que revisarlo a mano.", str(exc))

    @app.exception_handler(RuntimeError)
    async def _config(_: Request, exc):
        log.error("Error de configuración: %s", exc)
        return _respuesta(500, "CONFIGURACION_FALTANTE", str(exc))

    @app.exception_handler(RequestValidationError)
    async def _validacion(_: Request, exc: RequestValidationError):
        detalle = [{"campo": ".".join(str(p) for p in e["loc"] if p != "body") or "cuerpo",
                    "problema": _texto_validacion(e)} for e in exc.errors()]
        return _respuesta(422, "DATOS_INVALIDOS", "La petición tiene datos inválidos.", detalle)

    @app.exception_handler(StarletteHTTPException)
    async def _http(_: Request, exc: StarletteHTTPException):
        codigos = {404: "RUTA_NO_ENCONTRADA", 405: "METODO_NO_PERMITIDO"}
        mensajes = {404: "Esa ruta no existe. Revisa /docs para ver los endpoints.",
                    405: "Ese método HTTP no está permitido en esta ruta."}
        return _respuesta(exc.status_code, codigos.get(exc.status_code, "ERROR_HTTP"),
                          mensajes.get(exc.status_code, str(exc.detail)))

    # ---------- PostgreSQL ----------
    @app.exception_handler(psycopg2.OperationalError)
    async def _pg_caido(_: Request, exc):
        log.error("PostgreSQL no disponible: %s", exc)
        return _respuesta(503, "POSTGRES_NO_DISPONIBLE", "No se pudo conectar con PostgreSQL. Intenta de nuevo en unos segundos.")

    @app.exception_handler(pgerr.RaiseException)       # lo que lanzan los triggers (RAISE EXCEPTION)
    async def _pg_trigger(_: Request, exc):
        return _respuesta(409, "REGLA_DE_NEGOCIO", exc.diag.message_primary or "Una regla de la base de datos rechazó la operación.")

    @app.exception_handler(pgerr.UniqueViolation)
    async def _pg_unico(_: Request, exc):
        return _respuesta(409, "DATO_DUPLICADO", "Ya existe un registro con ese valor.", exc.diag.constraint_name)

    @app.exception_handler(pgerr.ForeignKeyViolation)
    async def _pg_fk(_: Request, exc):
        return _respuesta(409, "REFERENCIA_INVALIDA", "La operación referencia o afecta registros relacionados.", exc.diag.constraint_name)

    @app.exception_handler(pgerr.CheckViolation)
    async def _pg_check(_: Request, exc):
        return _respuesta(422, "DATOS_INVALIDOS", "Un valor no cumple las restricciones de la base de datos.", exc.diag.constraint_name)

    @app.exception_handler(psycopg2.Error)
    async def _pg_otro(_: Request, exc):
        log.exception("Error de PostgreSQL")
        return _respuesta(500, "ERROR_POSTGRES", "Ocurrió un error inesperado en PostgreSQL.")

    # ---------- MongoDB ----------
    @app.exception_handler(mongoerr.ServerSelectionTimeoutError)
    @app.exception_handler(mongoerr.ConnectionFailure)
    async def _mongo_caido(_: Request, exc):
        log.error("MongoDB no disponible: %s", exc)
        return _respuesta(503, "MONGO_NO_DISPONIBLE", "No se pudo conectar con MongoDB. Intenta de nuevo en unos segundos.")

    @app.exception_handler(mongoerr.WriteError)
    async def _mongo_validacion(_: Request, exc):
        log.error("MongoDB rechazó el documento: %s", exc)
        return _respuesta(422, "DOCUMENTO_RECHAZADO", "MongoDB rechazó el documento porque no cumple su validación ($jsonSchema).")

    @app.exception_handler(mongoerr.PyMongoError)
    async def _mongo_otro(_: Request, exc):
        log.exception("Error de MongoDB")
        return _respuesta(503, "ERROR_MONGO", "MongoDB devolvió un error; intenta de nuevo.")

    # ---------- Cualquier otra cosa ----------
    @app.exception_handler(Exception)
    async def _inesperado(_: Request, exc):
        log.exception("Error no controlado")
        return _respuesta(500, "ERROR_INTERNO", "Ocurrió un error inesperado. Revisa la consola del servidor.")
