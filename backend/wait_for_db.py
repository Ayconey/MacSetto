import time
import psycopg2
from psycopg2 import OperationalError

def wait_for_db():
    while True:
        try:
            conn = psycopg2.connect(
                dbname="mcSet",
                user="mcSet",
                password="mysecretpassword",
                host="db",
                port=5432,
            )
            # automatically load the MC data
            # table_name = 'menu_product'
            # csv_file_path = '/code/backend/data/menu.csv'
            # with open(csv_file_path, 'r') as f:
            #     next(f)  # Pomiń nagłówki CSV
            #     conn.cursor().copy_expert(f"COPY {table_name} FROM STDIN WITH CSV HEADER", f)
            # conn.commit()

            conn.close()
            print("Database is ready!")
            break
        except OperationalError:
            print("Waiting for database...")
            time.sleep(1)

if __name__ == "__main__":
    wait_for_db()
