from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_connection
from models import create_table

app = Flask(__name__)
CORS(app)

create_table()

@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, title FROM tasks ORDER BY id ASC")
    rows = cur.fetchall()
    conn.close()
    return jsonify([{"id": r[0], "title": r[1]} for r in rows])

@app.route("/tasks", methods=["POST"])
def add_tasks():
    data = request.get_json()
    title = data.get("title", "")
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO tasks (title) VALUES (%s)", (title,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Tarefa adicional!"})

@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Tarefa removida!"})

if __name__ == "__main__":
    app.run(debug=True)

    