import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/generate-tasks", async (req, res) => {
  const { goal } = req.body;
  if (!goal) return res.status(400).json({ error: "goal is required" });

  try {
    const prompt = `
あなたは優しいアシスタントです。
ユーザーの今日の目標に対して、簡単に取り組める小さなタスクを3つ提案してください。
出力は必ずJSONのみで返してください。
形式: {"tasks":["タスク1","タスク2","タスク3"]}
目標: "${goal}"
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message.content ?? "";

    let parsed;
    try {
      const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parse failed:", raw);
      parsed = { tasks: [] };
    }

    const tasks = (parsed.tasks ?? [])
      .map(t => String(t).trim())
      .filter(Boolean)
      .slice(0, 3);

    while (tasks.length < 3) {
      tasks.push(`${goal} をやる小タスク`);
    }

    return res.json({ tasks });

  } catch (err) {
    console.error(err);
    return res.json({
      tasks: [
        `${goal} をやる小タスク1`,
        `${goal} をやる小タスク2`,
        `${goal} をやる小タスク3`
      ]
    });
  }
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
