import { useState } from "react";

function Header({ title }) {
  return <h1>{title}</h1>;
}

export default function App() {
  const [count, setCount] = useState(0); 
  const [text, setText] = useState(""); 
  const [tasks, setTasks] = useState([]); 

  const addTask = () => {
    if (text !== "") {
      setTasks([...tasks, { id: Date.now(), text: text, done: false }]);
      setText(""); 
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleDone = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  return (
    <div>
      <Header title="Практична робота 9" />

      <h2>Лічильник: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Скинути</button>

      <hr /> 

      <h2>Список завдань</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addTask}>Додати</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => toggleDone(task.id)} 
            />
            {task.done ? <s>{task.text}</s> : <span>{task.text}</span>}
            <button onClick={() => deleteTask(task.id)}>Х</button>
          </li>
        ))}
      </ul>
      
      {tasks.length === 0 && <p>Завдань немає</p>}
    </div>
  );
}