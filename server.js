import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = 3000;

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // publicフォルダに index.html と script.js がある前提

// APIエンドポイント：/api/chat にPOSTされたらOpenAIへ送信
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.4
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.json(data);
  } catch (error) {
    console.error('❌ OpenAI APIエラー:', error);
    res.status(500).json({ error: 'サーバーエラーが発生しました。' });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ サーバー起動中: http://localhost:${PORT}`);
});
