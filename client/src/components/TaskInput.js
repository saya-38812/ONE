import React, { useState } from "react";

function TaskInput({ onSubmit, disabled }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    onSubmit(inputText.trim());
    setInputText("");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="今日の目標を入力"
        style={{ padding: "10px", borderRadius: "10px", width: "80%" }}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#a8d8ff",
          color: "#ffffff",
          border: "none",
          borderRadius: "15px",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          transition: "all 0.2s",
        }}
      >
        {disabled ? "生成中..." : "今日のタスクを生成"}
      </button>
    </div>
  );
}

export default TaskInput;
