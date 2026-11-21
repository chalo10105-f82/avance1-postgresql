"""Módulo de exposición de Bosque Cinema: API REST sobre el código de integración del equipo.

Ejecutar (desde la carpeta modulo-api):  uvicorn app.main:app --reload     (docs en /docs)
"""
from typing import Literal, Optional

from fastapi import FastAPI, Path as RutaParam, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, Field

from .errores import registrar_manejadores
from .integracion import RAIZ, casos_uso, transaccion_cruzada

app = FastAPI(
    title="Bosque Cinema · API de integración PostgreSQL + MongoDB",
    version="2.0.0",
    description=(
        "Expone el script de integración del equipo. **PostgreSQL (Neon)** guarda lo transaccional y "
        "**MongoDB (Atlas)** lo documental; se unen en Python por ids compartidos.\n\n"
        "Casos de uso: `GET /funciones/{id}`, `GET /peliculas/{id}`, `GET /salas/incidentes`, "
        "`GET /espectadores/{id}/historial`. Transacción cruzada: `POST /ventas/{id}/devolucion`.\n\n"
        "Todos los errores salen como `{\"error\": {\"codigo\", \"mensaje\", \"detalle\"}}`."),
)
registrar_manejadores(app)
app.mount("/static", StaticFiles(directory=RAIZ / "static"), name="static")

# Los ids llegan como texto a propósito: así `validar_id` del script devuelve 400 con su propio mensaje.
ID = lambda desc: RutaParam(..., description=desc, examples=["5"])  # noqa: E731
E400 = {400: {"description": "Parámetro inválido (id no numérico, vacío, etc.)"}}
E404 = {404: {"description": "No existe en la base de datos"}}
E503 = {503: {"description": "PostgreSQL o MongoDB no disponibles"}}


class Devolucion(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id_staff: int = Field(..., description="Staff que autoriza (TAQUILLERO o ADMINISTRADOR activo)", examples=[3])
    motivo: str = Field(..., description="Motivo de la devolución (mínimo 5 caracteres)", examples=["Pantalla sin imagen durante la función"])


@app.get("/", include_in_schema=False)
def inicio():
    return FileResponse(RAIZ / "static" / "index.html")


@app.get("/salud", tags=["Estado"], summary="¿Responden PostgreSQL y MongoDB?")
def salud():
    """Prueba las dos conexiones. Si alguna falla, el error 503/500 explica cuál."""
    conn = cliente = None
    try:
        conn = casos_uso.conectar_postgres()
        with conn.cursor() as cur:
            cur.execute("SELECT 1")
        cliente, db = casos_uso.conectar_mongo()
        db.command("ping")
        return {"estado": "ok", "postgresql": "ok", "mongodb": "ok"}
    finally:
        if conn is not None:
            conn.close()
        if cliente is not None:
            cliente.close()


@app.get("/funciones/{id_funcion}", tags=["Casos de uso"], summary="Caso 1 · Función completa",
         responses={**E400, **E404, **E503})
def funcion(id_funcion: str = ID("Id de la función (PostgreSQL)")):
    """PostgreSQL (función, sala, película, ventas) + MongoDB (requisitos, reseñas, incidentes de esa función)."""
    return casos_uso.ejecutar("funcion", id_funcion)


@app.get("/peliculas/{id_pelicula}", tags=["Casos de uso"], summary="Caso 2 · Película con funciones y requisitos",
         responses={**E400, **E404, **E503})
def pelicula(id_pelicula: str = ID("Id de la película (PostgreSQL)")):
    return casos_uso.ejecutar("pelicula", id_pelicula)


@app.get("/salas/incidentes", tags=["Casos de uso"], summary="Caso 3 · Ventas vs incidentes por sala",
         responses={**E400, **E404, **E503})
def salas(id_sala: Optional[str] = Query(None, description="Si se omite, devuelve todas las salas")):
    return casos_uso.ejecutar("salas", id_sala) if id_sala is not None else casos_uso.ejecutar("salas")


@app.get("/espectadores/{id_espectador}/historial", tags=["Casos de uso"], summary="Caso 4 · Historial del espectador",
         responses={**E400, **E404, **E503})
def espectador(id_espectador: str = ID("Id del espectador (PostgreSQL)")):
    return casos_uso.ejecutar("espectador", id_espectador)


@app.post("/ventas/{id_venta}/devolucion", tags=["Transacción cruzada"], status_code=201,
          summary="Devolver una venta por queja (PostgreSQL + MongoDB)",
          responses={**E400, **E404, 409: {"description": "Regla de negocio (venta ya anulada, staff no autorizado...)"},
                     500: {"description": "Inconsistencia entre motores"},
                     503: {"description": "Falló un motor y se deshizo todo (ROLLBACK / compensación)"}})
def devolucion(cuerpo: Devolucion, id_venta: str = ID("Id de la venta a devolver"),
               simular: Optional[Literal["mongo", "postgres"]] = Query(
                   None, description="SOLO PARA LA DEMO: fuerza una falla en ese motor para mostrar el ROLLBACK o la compensación")):
    """Anula la venta en PostgreSQL (`sp_anular_venta`) y registra la queja en MongoDB en una sola operación lógica.
    Si un motor falla, el otro se deshace."""
    return transaccion_cruzada.devolver_venta(id_venta, cuerpo.id_staff, cuerpo.motivo, simular)
