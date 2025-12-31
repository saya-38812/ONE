import React, { useState } from "react";
import TaskInput from "./components/TaskInput.js";
import TaskDisplay from "./components/TaskDisplay.js";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const startTasks = async (goal) => {
    if (!goal?.trim()) return;

    setLoading(true);
    setError(null);
    setTasks([]);
    setCurrentTaskIndex(0);

    try {
      const response = await axios.post("https://one-nefw.onrender.com/generate-tasks", {
        goal: goal.trim(),
      });

      let tasksArray = response?.data?.tasks;

      // 通常はサーバが配列で返す想定だが、念のためstringならJSON.parseだけ試す
      if (typeof tasksArray === "string") {
        tasksArray = JSON.parse(tasksArray);
      }

      // 最終検証
      if (!Array.isArray(tasksArray)) {
        throw new Error("tasks is not an array");
      }

      const cleaned = tasksArray
        .map((t) => (typeof t === "string" ? t.trim() : ""))
        .filter(Boolean);

      if (cleaned.length === 0) {
        setError("タスクが生成されませんでした。");
        return;
      }

      setTasks(cleaned);
      setCurrentTaskIndex(0);
    } catch (err) {
      console.error(err);
      setError("サーバーに接続できませんでした。再度試してください。");
    } finally {
      setLoading(false);
    }
  };

  const completeTask = () => {
    setCurrentTaskIndex((idx) => {
      if (idx + 1 < tasks.length) return idx + 1;

      alert("🎉 今日のタスクはすべて完了しました！おつかれさま 🎉");
      setTasks([]);
      return 0;
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px", padding: "2rem" }}>
        {error && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "10px 15px",
              backgroundColor: "#ffdddd",
              color: "#a33",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <TaskInput onSubmit={startTasks} disabled={loading} />
        ) : (
          <TaskDisplay
            task={tasks[currentTaskIndex]}   // ← ここで必ず文字列1個になる
            onComplete={completeTask}
            currentIndex={currentTaskIndex}
            total={tasks.length}
          />
        )}
      </div>
    </div>
  );
}

export default App;
