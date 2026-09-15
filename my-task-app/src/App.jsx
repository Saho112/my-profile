import { useState } from "react";

function App() {
  // ★ ここで tasks を定義する！
  const [tasks, setTasks] = useState([
    { id: 1, name: "最初のタスク", done: false },
  ]);

  const [filter, setFilter] = useState("all");

  const [inputName, setInputName] = useState("");

  // ここで tasks を使っているので、上記で定義されていればエラーが消えます
  const visibleTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "undone") return !task.done;
    return true;
  });

  const addTask = () => {
    // 空白のまま追加されないようにガード
    if (inputName.trim() === "") return;

    const newTask = {
      id: Date.now(), // 現在時刻をユニークなID代わりにする
      name: inputName,
      done: false,    // 最初は未完了
    };

    setTasks([...tasks, newTask]); // 古いタスクに新しいタスクを追加
    setInputName("");              // 入力欄を空に戻す
  };

  return (
    <div>
      <h1>タスク管理</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input 
          type="text" 
          placeholder="新しいタスクを入力…" 
          value={inputName} // ← ここを追加！
          onChange={(e) => setInputName(e.target.value)} // ← ここを追加！
        />
        <button onClick={addTask}>追加</button> {/* ←ここを addTask に変更！ */}
      </div>
      <div>
        <button onClick={() => setFilter("all")}>すべて</button>
        {/* 2. ボタンのラベルとセッターの組み合わせを修正 */}
        <button onClick={() => setFilter("undone")}>未完了</button>
        <button onClick={() => setFilter("done")}>完了済み</button>
      </div>
      <ul>
        {visibleTasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.done ? "完了" : "未完了"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;