import { useState } from "react";
import "./App.css";

function TodoItem({ task, onToggle, onRemove }) {
  return (
    <li style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", padding: "5px", borderBottom: "1px solid #eee" }}>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
          cursor: "pointer",
          color: task.done ? "gray" : "black",
          flexGrow: 1,
          textAlign: "left"
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onRemove(task.id)} style={{ marginLeft: "10px", cursor: "pointer" }}>❌</button>
    </li>
  );
}


export default function App() {

  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");


  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };


  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  return (
    <div style={{ maxWidth: "450px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", fontFamily: "sans-serif" }}>
      <h1>Практична No9: ToDo List</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Що потрібно зробити?"
          style={{ padding: "8px", width: "70%" }}
        />
        <button onClick={addTask} style={{ padding: "8px 15px", marginLeft: "5px", backgroundColor: "#646cff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Додати
        </button>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>Всі</button>
        <button onClick={() => setFilter("active")} disabled={filter === "active"} style={{ margin: "0 5px" }}>Активні</button>
        <button onClick={() => setFilter("done")} disabled={filter === "done"}>Виконані</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
      
        {filteredTasks.map((task) => (
          <TodoItem 
            key={task.id} 
            task={task} 
            onToggle={toggleTask} 
            onRemove={removeTask} 
          />
        ))}
      </ul>

      {tasks.length === 0 && <p style={{ color: "gray" }}>Список задач порожній...</p>}
      
      <div style={{ marginTop: "20px", fontSize: "0.8em", color: "#888" }}>
        Усього задач: {tasks.length} | Виконано: {tasks.filter(t => t.done).length}
      </div>
    </div>
  );
}