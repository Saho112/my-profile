import { useState } from "react";

function Task() {
  const [inputName, setInputName] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (inputName.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), name: inputName, done: false }]);
    setInputName("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>タスク管理アプリ</h1>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          type="text" 
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="タスクを入力してください"
          style={{ padding: "8px", fontSize: "16px", flex: 1 }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              addTask();
            }
          }}
        />
        <button onClick={addTask} style={{ padding: "8px 16px" }}>追加</button>
      </div>
      
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "12px", display: "flex", alignItems: "center" }}>
            <input 
              type="checkbox" 
              checked={task.done} 
              onChange={() => toggleTask(task.id)} 
              style={{ transform: "scale(1.2)", marginRight: "10px" }}
            />

            <span 
              style={{ 
                textDecoration: task.done ? "line-through" : "none",
                color: task.done ? "gray" : "black",
                flex: 1,
                fontSize: "16px"
              }}
            >
              {task.name}
            </span>

            <button onClick={() => deleteTask(task.id)} style={{ padding: "4px 8px" }}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Task;