import { useState, useEffect } from "react";
import { api } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    api.get("/tasks/").then(res => setTasks(res.data));
  }, []);

  const handleAdd = async () => {
    await api.post("/tasks/", { title, description: desc });
    const res = await api.get("/tasks/");
    setTasks(res.data); 
  };
  
  return (
    <div>
      <h1>To-Do com FastAPI</h1>
      <input placeholder="Título" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Descrição" onChange={e => setDesc(e.target.value)} />
      <button onClick={handleAdd}>Adicionar</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title} - {t.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
