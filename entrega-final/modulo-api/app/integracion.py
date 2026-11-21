"""Puente hacia el código de integración del equipo (carpeta hermana `script-integracion`).

La API NO repite lógica: solo llama a `casos_uso.py` y `transaccion_cruzada.py`,
que ya se conectan a PostgreSQL (Neon) y MongoDB (Atlas) con el `.env` de esa carpeta.

Estructura esperada:
    entrega-final/
      script-integracion/   <- casos_uso.py, transaccion_cruzada.py, .env
      modulo-api/           <- esta API
Si la carpeta está en otro lugar, define la variable de entorno SCRIPT_INTEGRACION.
"""
import os
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
RUTA_SCRIPT = Path(os.getenv("SCRIPT_INTEGRACION", RAIZ.parent / "script-integracion")).resolve()

if not (RUTA_SCRIPT / "casos_uso.py").exists():
    raise RuntimeError(
        f"No encuentro 'casos_uso.py' en {RUTA_SCRIPT}. Deja 'modulo-api' junto a 'script-integracion' "
        "o define la variable de entorno SCRIPT_INTEGRACION con la ruta correcta.")

if str(RUTA_SCRIPT) not in sys.path:
    sys.path.insert(0, str(RUTA_SCRIPT))

import casos_uso            # noqa: E402  (caso 1 a 4)
import transaccion_cruzada  # noqa: E402  (devolución de venta con compensación)
