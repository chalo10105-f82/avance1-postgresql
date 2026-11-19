import psycopg2
from pymongo import MongoClient

from config import POSTGRES_URL, MONGO_URL, MONGO_DB, validar_config


def conectar_postgres():
    """Abre una conexión a PostgreSQL (Neon)."""
    validar_config()
    return psycopg2.connect(POSTGRES_URL, connect_timeout=15)


def conectar_mongo():
    """Abre una conexión a MongoDB (Atlas). Devuelve el cliente y la base."""
    validar_config()
    cliente = MongoClient(MONGO_URL, serverSelectionTimeoutMS=15000)
    return cliente, cliente[MONGO_DB]
