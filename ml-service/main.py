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

@app.post("/analyze", response_model=AnalysisResponse)
def analyze(request: TextRequest):
    print("🔍 Received text:", request.text)
    try:
        result = analyze_text(request.text)
        result["inputText"] = request.text
        print("✅ Analysis result:", result)
        return result
    except Exception as e:
        print("❌ ERROR in analysis:", str(e))
        return {"error": str(e)}
