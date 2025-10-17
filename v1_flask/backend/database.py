import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        dbname="todo_db",
        user="postgres",
        password="123456"
    )

    return conn 