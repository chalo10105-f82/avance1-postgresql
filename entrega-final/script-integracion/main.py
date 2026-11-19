from conexiones import conectar_postgres, conectar_mongo


def main():
    conn = None
    cliente = None
    try:
        print("Abriendo conexión a PostgreSQL (Neon)...")
        conn = conectar_postgres()
        print("Abriendo conexión a MongoDB (Atlas)...")
        cliente, db = conectar_mongo()
        cliente.admin.command("ping")

        print("\n--- PostgreSQL ---")
        with conn.cursor() as cur:
            cur.execute("SELECT current_database();")
            print("Base de datos:", cur.fetchone()[0])
            cur.execute(
                "SELECT COUNT(*) FROM information_schema.tables "
                "WHERE table_schema = 'public';"
            )
            print("Tablas en el esquema public:", cur.fetchone()[0])

        print("\n--- MongoDB ---")
        print("Base de datos:", db.name)
        for nombre in sorted(db.list_collection_names()):
            print(f"  {nombre}: {db[nombre].count_documents({})} documentos")

        print("\nAmbas conexiones están activas al mismo tiempo.")
    except Exception as error:
        print("Error de conexión:", error)
        raise SystemExit(1)
    finally:
        if conn is not None:
            conn.close()
        if cliente is not None:
            cliente.close()


if __name__ == "__main__":
    main()
