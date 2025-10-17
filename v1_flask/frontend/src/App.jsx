import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [ title, setTitle] = useState("");

  // Carrega as tarefas assim que o app inicia
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  // Adiciona uma nova tarefa
  const addTask = async () => {
    if (!title.trim()) return; 
    await axios.post("http://127.0.0.1:5000/tasks", { title }); 
    setTitle(""); 
    const res = await axios.get("http://127.0.0.1:5000/tasks"); 
    setTasks(res.data);
  }; 

  // Exclui uma tarefa
  const deleteTask = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id)); 
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Lista de Tarefas</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nova Tarefa"
      />
      <button onClick={addTask}>Adicionar</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}{" "}
            <button onClick={() => deleteTask(t.id)}>X</button>
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;