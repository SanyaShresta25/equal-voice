from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schema import TextRequest, AnalysisResponse
from predict import analyze_text
import nltk
nltk.download('punkt')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze", response_model=AnalysisResponse)
def analyze(request: TextRequest):
    result = analyze_text(request.text)
    result["inputText"] = request.text
    return result
