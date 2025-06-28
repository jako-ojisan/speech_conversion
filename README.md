# 🎙️ Voice Memo → ChatGPT Diagram Generator

This is a web-based application that allows users to convert **spoken content into structured visual diagrams and summaries using ChatGPT**.

Built with:
- 🧠 OpenAI's ChatGPT
- 🎤 Web Speech API (for speech recognition)
- 📊 Mermaid.js (for diagram generation)
- 💻 Node.js + Express backend

---

## 🚀 Features

- 🎙️ **Speech Recognition**: Start and stop speech input in Japanese using your microphone.
- 📝 **Memo Editor**: Automatically transcribe and edit your spoken words.
- 🧠 **ChatGPT Integration**:
  - Generate **mindmap-style diagrams** based on your memo.
  - Produce **bullet-point summaries** of your notes in Japanese.
- 💾 **Download**:
  - Save the text memo as `.txt`
  - Save the generated diagram as `.svg`
  - Save the summary as `.txt`

---

## 🖥️ How to Use

1. Click “Start Speech” and speak into the microphone.
2. Stop when finished — your speech will be transcribed into the memo area.
3. Click “Generate Diagram” to create a visual Mermaid mindmap via ChatGPT.
4. Click “Summarize” to get a brief Japanese bullet-point summary.
5. Use the download buttons to save your content.

---

## 🛠️ Local Setup

```bash
git clone https://github.com/your-username/voice-gpt-diagram-app.git
cd voice-gpt-diagram-app
npm install
npm start

# 🎙️ 音声メモ → ChatGPT図生成アプリ

このアプリは、**話した内容を自動でメモに変換し、ChatGPT を使って図解や要約を生成できる** Web アプリです。

使用技術：
- 🧠 ChatGPT（OpenAI API）
- 🎤 Web Speech API（音声認識）
- 📊 Mermaid.js（図生成）
- 💻 Node.js + Express（バックエンド）

---

## 🚀 主な機能

- 🎙️ **音声認識**：日本語で話すだけでリアルタイムにメモを作成
- 📝 **メモ編集**：自動入力されたメモをその場で編集可能
- 🧠 **ChatGPT連携**：
  - メモ内容から **Mermaid.js の mindmap 図**を生成
  - メモ内容を **3～5行の日本語箇条書きで要約**
- 💾 **ダウンロード機能**：
  - メモを `.txt` 形式で保存
  - 図を `.svg` 形式で保存
  - 要約を `.txt` 形式で保存

---

## 🖥️ 使い方

1. 「音声スタート」を押して話し始めてください。
2. 話し終えたら「ストップ」を押します。内容が自動でメモ欄に入力されます。
3. 「ChatGPTで図にする」で mindmap を生成。
4. 「ChatGPTで要約」で箇条書き要約を表示。
5. 各種保存ボタンで `.txt` や `.svg` をダウンロード可能。

---

## 🛠️ セットアップ方法（ローカル実行）

```bash
git clone https://github.com/your-username/voice-gpt-diagram-app.git
cd voice-gpt-diagram-app
npm install
npm start

