const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const downloadBtn = document.getElementById('downloadBtn');
const gptDiagramBtn = document.getElementById('gptDiagramBtn');
const summarizeBtn = document.getElementById('summarizeBtn');
const transcriptEl = document.getElementById('transcript');
const notepadEl = document.getElementById('notepad');
const diagramEl = document.getElementById('diagram');
const statusMessage = document.getElementById('statusMessage');

startBtn.onclick = () => {
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
  transcriptEl.textContent = '認識中...';
};

stopBtn.onclick = () => {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

function appendToNotepad(text) {
  notepadEl.value += text + '\n';
  notepadEl.scrollTop = notepadEl.scrollHeight;
}

recognition.onresult = (event) => {
  let text = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    text += event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      appendToNotepad(text);
      downloadBtn.disabled = false;
    }
  }
  transcriptEl.textContent = text;
};

downloadBtn.onclick = () => {
  const blob = new Blob([notepadEl.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'voice_memo.txt';
  a.click();
  URL.revokeObjectURL(url);
};

async function callChatGPT(prompt) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: prompt })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API呼び出し失敗 (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

// ChatGPTで図にする
gptDiagramBtn.onclick = async () => {
  const text = notepadEl.value.trim();
  if (!text) {
    statusMessage.textContent = '⚠ メモ内容が空です。';
    return;
  }

  statusMessage.textContent = '🕐 ChatGPTに送信中...';
  diagramEl.innerHTML = '';

  const prompt = `
以下の日本語の会話文から、人や物の関係性を抽出し、Mermaid.js形式（graph TD）で図式化してください。
出力は \`\`\`mermaid ～ \`\`\` で囲んでください：

${text}
`;

  try {
    const reply = await callChatGPT(prompt);
    const match = reply.match(/```mermaid\s+([\s\S]+?)```/);
    const diagram = match ? match[1].trim() : null;

    if (!diagram) {
      statusMessage.textContent = '⚠ 図が生成されませんでした。';
      return;
    }

    const result = await mermaid.render('theDiagram', diagram);
    diagramEl.innerHTML = result.svg;
    statusMessage.textContent = '✅ 図が表示されました！';
  } catch (err) {
    console.error(err);
    statusMessage.textContent = `⚠ エラー: ${err.message}`;
  }
};

// ChatGPTで要約
summarizeBtn.onclick = async () => {
  const text = notepadEl.value.trim();
  if (!text) {
    statusMessage.textContent = '⚠ メモが空です。';
    return;
  }

  statusMessage.textContent = '🕐 要約中...';

  const prompt = `
以下の日本語の会話内容を、簡潔に3～5行で要約してください：

${text}
`;

  try {
    const summary = await callChatGPT(prompt);
    alert('📝 要約結果：\n\n' + summary);
    statusMessage.textContent = '✅ 要約完了';
  } catch (err) {
    console.error(err);
    statusMessage.textContent = `⚠ 要約エラー: ${err.message}`;
  }
};
