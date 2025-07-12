print("🔥 FastAPI backend is LIVE and using latest CORS settings")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import TextRequest, AnalysisResponse
from predict import analyze_text
import nltk

nltk.download('punkt')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://equal-voice-sanya.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Root route to keep Render warm
@app.get("/")
def root():
    return {"status": "EqualVoice API is live"}

# ✅ Analysis route
@app.post("/analyze", response_model=AnalysisResponse)
def analyze(request: TextRequest):
    result = analyze_text(request.text)
    result["inputText"] = request.text
    return result
