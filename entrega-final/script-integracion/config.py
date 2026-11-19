import os
from dotenv import load_dotenv

load_dotenv()

POSTGRES_URL = os.getenv("POSTGRES_URL")
MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB", "bosque_cinema")


def validar_config():
    """Verifica que el archivo .env tenga las cadenas de conexión."""
    faltantes = [
        nombre
        for nombre, valor in (("POSTGRES_URL", POSTGRES_URL), ("MONGO_URL", MONGO_URL))
        if not valor
    ]
    if faltantes:
        raise RuntimeError("Faltan variables en el archivo .env: " + ", ".join(faltantes))
