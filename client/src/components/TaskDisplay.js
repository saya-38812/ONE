import React from "react";

function TaskDisplay({ task, onComplete, currentIndex, total }) {
  return (
    <div style={{
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#2a6ebb", marginBottom: "1rem" }}>
        今日のタスク ({currentIndex + 1}/{total})
      </h2>
      <p style={{ fontSize: "18px", marginBottom: "1.5rem" }}>{task}</p>
      <button
        onClick={onComplete}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "#a8d8ff",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        完了！
      </button>
    </div>
  );

  
}

export default TaskDisplay;
