# 🌐 EqualVoice

> **EqualVoice** is a full-stack, ML-powered platform that detects gender bias, sentiment disparity, and alignment with feminist values in any piece of text— from articles and speeches to product copy.
> Think of it as **Grammarly +  DEI analyst** for inclusive language.

---

## ✨ Why EqualVoice?

| Stakeholder                    | How EqualVoice Helps                                                             |
| ------------------------------ | -------------------------------------------------------------------------------- |
| **Writers & Bloggers**         | Instantly flag gendered terms, receive bias scores, and get rewrite suggestions. |
| **Students & Educators**       | Learn gender-aware writing and track inclusivity improvements over time.         |
| **NGOs / Activists**           | Batch-analyze speeches, news, or policy documents to surface systemic bias.      |
| **Product & UX Teams**         | Audit app copy for inclusivity before shipping.                                  |
| **Journalists & Media Houses** | Quantitatively measure representation in reporting.                              |

---

## 🛠 Tech Stack

| Layer               | Tooling                                                             |
| ------------------- | ------------------------------------------------------------------- |
| **Frontend**        | React 18 (Vite) · TypeScript · Tailwind CSS · Recharts              |
| **Backend API**     | Node.js · Express · MongoDB (Mongoose)                              |
| **ML Microservice** | Python · Flask · spaCy · NLTK · VADER · gender-guesser              |
| **Dev & Ops**       | Vercel (frontend) · Render (Node + Flask) · Docker · GitHub Actions |

---

## 🔍 Core Features

### 1. Real-Time Text Analysis

* Paste or upload text → receive **Bias Score**, **Feminist Theme Score**, and **highlighted phrases** within seconds.

### 2. Rewrite Suggestions

* Intelligent substitutions for biased terms (e.g., “bossy” ➜ “confident leader”).

### 3. Visual Dashboards

* Pie-charts for gender mentions, radar charts for sentiment by gender, and trend lines for bias over time.

### 4. History & Exports *(opt-in)*

* Authenticated users can save analyses, download CSV / JSON reports, or call the `/analyze` API.

---

## 🧠 How It Works

1. **Pre-processing**

   * spaCy tokenization + stop-word removal
2. **Gender Detection**

   * Keyword match **&** person-entity gender via `gender-guesser`
3. **Sentiment Analysis**

   * VADER scores per sentence & gender bucket
4. **Bias Scoring**

   * Balanced-mention metric **80 %** + normalized sentiment **20 %**
5. **Feminist Theme Matching**

   * PhraseMatcher against curated feminist keyword list
6. **Suggestion Engine**

   * Rule-based replacements for stereotyped phrases (stretch: GPT-4 fine-tune)

---

## 📂 Key Project Structure

```
equalvoice/
├── frontend/          # Vite + React + Tailwind
│   └── ...
├── backend/           # Node.js + Express
│   └── ...
├── ml-service/        # Flask + NLP models
│   └── ...
├── datasets/          # Raw & processed data
└── docs/              # PRD, wireframes, README
```

---

## 🚀 Getting Started Locally

```bash
# 1. Clone repo & install root tooling
git clone https://github.com/SanyaShresta25/equalvoice.git
cd equalvoice

# 2. Frontend
cd frontend && npm install && npm run dev   # http://localhost:3000

# 3. Backend API
cd ../backend && npm install
cp .env.example .env                        # add MONGO_URI & ML_SERVICE_URL
npm run start                               # http://localhost:3001

# 4. ML Microservice
cd ../ml-service
pip install -r requirements.txt
python app.py                               # http://localhost:5000
```

---

## 📑 Example API Call

```http
POST /api/analyze
Content-Type: application/json

{
  "text": "She is a confident leader, but some say she is bossy..."
}
```

Response →

```json
{
  "biasScore": 76.5,
  "feministThemeScore": 40.0,
  "genderMentions": { "male": 2, "female": 6, "neutral": 53 },
  "highlightedPhrases": [
    { "phrase": "bossy", "type": "stereotype", "startIndex": 47, "endIndex": 52 }
  ],
  ...
}
```

---

## 🤝 Contributing

1. Fork & clone the repo
2. Create a feature branch `git checkout -b feat/awesome-thing`
3. Commit changes with conventional commits
4. Open a PR describing **why** + **what**

---

## 📝 License

Distributed under the **MIT License**.
© 2025 EqualVoice – Sanya Shresta.

---

<p align="center"><em>“Inclusive language is not a privilege, it’s a practice.”</em></p>
