# 🌐 EqualVoice

> **EqualVoice** is an AI-powered text analysis platform designed to combat gender bias in communication. It acts like **Grammarly for DEI** — providing real-time feedback on how inclusive and gender-fair your language is.
> Whether you're a **journalist**, **product designer**, **activist**, or **educator**, EqualVoice helps you write responsibly with **fairness, awareness, and inclusivity**.

---

## ✨ Why EqualVoice?

| Stakeholder                    | How EqualVoice Helps                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **Writers & Bloggers**         | Instantly flag gendered terms, receive bias scores, and get rewrite suggestions. |
| **Students & Educators**       | Learn gender-aware writing and track inclusivity improvements over time.         |
| **NGOs / Activists**           | Analyze speeches, news, or policy docs for systemic bias.                        |
| **Product & UX Teams**         | Audit app content and marketing copy before shipping.                            |
| **Journalists & Media Houses** | Quantitatively measure gender representation in reporting.                       |

---


## 🛠 Tech Stack

### 🎨 Frontend

<div align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/TailwindCSS-38BDF8?style=flat&logo=tailwindcss&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/Framer Motion-EF5DA8?style=flat&logo=framer&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/Lucide React-000000?style=flat&logo=lucide&logoColor=white&labelColor=f4f4f4" />
</div>

---

### 🧠 Backend / ML Microservice

<div align="left">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/spaCy-00A4EF?style=flat&logo=spacy&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/NLTK-008000?style=flat&logo=python&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/VADER Sentiment-FFB703?style=flat&logo=python&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/gender--guesser-9B59B6?style=flat&logo=python&logoColor=white&labelColor=f4f4f4" />
</div>

---

### 🚀 Deployment 

<div align="left">
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/Render-46E6B1?style=flat&logo=render&logoColor=white&labelColor=f4f4f4" />
  <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat&logo=githubactions&logoColor=white&labelColor=f4f4f4" />
</div>

---


## 🔍 Core Features

### 1. Real-Time Text Analysis

Paste or upload any text → receive **Bias Score**, **Feminist Theme Score**, and **highlighted phrases** instantly.

### 2. Rewrite Suggestions

Get smart replacements for stereotyped phrases like:

* “bossy” → “confident leader”
* “emotional” → “expressive”

### 3. Visual Sentiment Insights *(coming soon)*

Sentiment by gender group, radar charts for bias metrics, and inclusivity tracking.

### 4. Developer-Friendly API

POST text to `/analyze` and get JSON with metrics, suggestions, and highlights.

---

## 🧠 How It Works

1. **Tokenization** with spaCy
2. **Gender Entity Matching** using keyword lists + `gender-guesser`
3. **Sentiment Analysis** via VADER on gendered sentences
4. **Bias Score Calculation** based on gender balance + sentiment
5. **Feminist Theme Detection** using `PhraseMatcher`
6. **Rule-Based Rewrite Suggestions** (e.g. “nagging” → “persistent”)

---

## 📂 Folder Structure

```
equalvoice/
├── frontend/          # Vite + React + Tailwind
├── ml-service/        # FastAPI + NLP logic (spaCy, VADER, gender-guesser)
```

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/SanyaShresta25/equalvoice.git
cd equalvoice
```

### 2. Run the ML Backend (FastAPI)

```bash
cd ml-service
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload
# → http://localhost:8000/docs
```

### 3. Run the Frontend (React)

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000" > .env
npm run dev
# → http://localhost:5173
```

---

## 📤 Example API Call

```http
POST /analyze
Content-Type: application/json

{
  "text": "She is a confident leader, but some say she is bossy."
}
```

**Response:**

```json
{
  "biasScore": 76.5,
  "feministThemeScore": 40.0,
  "genderMentions": { "male": 2, "female": 6, "neutral": 53 },
  "highlightedPhrases": [
    { "phrase": "bossy", "type": "stereotype", "startIndex": 47, "endIndex": 52 }
  ],
  "suggestions": [
    { "original": "bossy", "suggestion": "confident leader" }
  ]
}
```

---

## 🤝 Contributing

* Fork the repo
* Create your branch: `git checkout -b feat/feature-name`
* Commit your changes
* Open a PR describing **what** you did and **why**

---

## 📜 License

**MIT License**
© 2025 EqualVoice — crafted by **Sanya Shresta**

---

<p align="center"><em>“Inclusive language is not a privilege, it’s a practice.”</em></p>

---
