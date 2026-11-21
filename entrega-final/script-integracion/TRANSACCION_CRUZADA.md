# Transacción cruzada entre motores

Responsable: Julián Aguilera

Archivo: `transaccion_cruzada.py`. Usa la conexión de `conexiones.py` y los errores de `casos_uso.py`.

## Evento de negocio: devolución de una venta por queja

Cuando un espectador se queja y el cine le devuelve el dinero, la misma operación cambia los dos motores:

| Motor | Qué cambia | Cómo |
|---|---|---|
| PostgreSQL (Neon) | La venta pasa a `ANULADA` | Procedimiento `sp_anular_venta` del Avance 1, que también devuelve el valor a reembolsar |
| MongoDB (Atlas) | Se crea la queja en `reportes_incidentes` | Documento `QUEJA_SERVICIO` con `compensacion: { tipo: "REEMBOLSO", valor }` y su `seguimiento` |

Los dos registros quedan conectados por los identificadores compartidos: `id_venta`, `id_espectador`, `id_funcion`, `id_sala` e `id_staff`.

## Cómo se garantiza que no quede a medias

No existe una transacción ACID que abarque los dos motores, así que se usa una **transacción con compensación**:

1. **PostgreSQL:** se abre la transacción, se bloquea la venta con `SELECT ... FOR UPDATE`, se validan las reglas y se anula la venta **sin hacer COMMIT**.
2. **MongoDB:** se inserta la queja. Si falla, se hace **ROLLBACK** en PostgreSQL y no cambia nada.
3. **PostgreSQL:** se hace **COMMIT**. Si falla, se **borra en MongoDB** la queja que se acababa de insertar (compensación) y no cambia nada.

Resultado: o cambian los dos motores o no cambia ninguno.

Se escribe primero en PostgreSQL y se confirma al final porque PostgreSQL sí puede deshacer con ROLLBACK. Así el tiempo en que los dos motores pueden estar distintos es solo el del COMMIT.

Otros detalles:

- **Dos devoluciones al mismo tiempo:** el `FOR UPDATE` hace esperar a la segunda; cuando sigue, ve la venta `ANULADA` y se rechaza. No se devuelve el dinero dos veces.
- **Failover de Atlas:** si MongoDB está cambiando de nodo primario (10 a 30 segundos), el insert se reintenta hasta 3 veces con espera de 2 s y 4 s.
- **Código del incidente:** se calcula el siguiente (`INC-2026-031`, ...). Si otro proceso lo toma antes, el índice único de `codigo` lo rechaza y se pide el siguiente.
- **$jsonSchema:** el documento cumple el esquema de `reportes_incidentes` del Avance 2 (variante `QUEJA_SERVICIO` del `oneOf`).

## Reglas que se validan

| Situación | Respuesta | Código HTTP sugerido |
|---|---|---|
| `id_venta` o `id_staff` no es un entero positivo, o el motivo tiene menos de 5 caracteres | `ParametroInvalido` | 400 |
| La venta o el staff no existen | `NoEncontrado` | 404 |
| La venta ya está anulada, el staff está inactivo o no es taquillero ni administrador | `ReglaNegocio` | 409 |
| Un motor falló y se deshizo la operación en los dos | `FalloTransaccion` | 503 |
| Un motor falló y la compensación también falló | `Inconsistencia` | 500 |

## Ejecución

```
python transaccion_cruzada.py 31 3 "La función empezó 20 minutos tarde"
python transaccion_cruzada.py 31 3 "La función empezó 20 minutos tarde" --simular-fallo-mongo
python transaccion_cruzada.py 31 3 "La función empezó 20 minutos tarde" --simular-fallo-postgres
```

Parámetros: `id_venta`, `id_staff` que atiende la queja y el motivo.

Para la demo, primero se ejecutan las dos simulaciones y después la devolución normal:

- `--simular-fallo-mongo` manda a MongoDB un reembolso con el valor en texto. El `$jsonSchema` de Atlas lo rechaza y se ve el ROLLBACK: la venta sigue `PAGADA`.
- `--simular-fallo-postgres` provoca una falla justo antes del COMMIT. Se ve la compensación: la queja se borra de MongoDB y la venta sigue `PAGADA`.

La devolución normal sí cambia los datos: la venta queda `ANULADA` y no se puede devolver otra vez. Para otra demostración se usa otra venta pagada sin queja, por ejemplo la 32 o la 33.

## Uso desde la API

`devolver_venta(id_venta, id_staff, motivo)` devuelve un diccionario listo para JSON:

```json
{
  "transaccion": "Devolución de una venta por queja",
  "postgresql": { "id_venta": 31, "estado": "ANULADA", "valor_devuelto": 24000 },
  "mongodb": { "coleccion": "reportes_incidentes", "codigo": "INC-2026-031",
               "tipo_incidente": "QUEJA_SERVICIO", "compensacion": { "tipo": "REEMBOLSO", "valor": 24000 } },
  "fecha": "2026-11-20T23:00:00-05:00"
}
```

Sugerencia para el endpoint: `POST /ventas/{id_venta}/devolucion` con `{ "id_staff": 3, "motivo": "..." }`.
