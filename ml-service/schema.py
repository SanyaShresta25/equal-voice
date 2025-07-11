from typing import List, Dict
from pydantic import BaseModel

class Highlight(BaseModel):
    phrase: str
    type: str
    startIndex: int
    endIndex: int

class Suggestion(BaseModel):
    original: str
    suggestion: str

class TextRequest(BaseModel):
    text: str

class AnalysisResponse(BaseModel):
    inputText: str
    genderMentions: Dict[str, int]
    sentimentScores: Dict[str, float]
    biasScore: float
    feministThemeScore: float
    highlightedPhrases: List[Highlight]
    suggestions: List[Suggestion]
