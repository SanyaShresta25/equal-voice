import re
import spacy
from nltk.tokenize import sent_tokenize
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from spacy.matcher import PhraseMatcher
import gender_guesser.detector as gender_detector
from utils import calculate_bias_score  # Import your bias score util

# Load spaCy English model once
nlp = spacy.load("en_core_web_sm")

# Initialize gender detector
detector = gender_detector.Detector(case_sensitive=False)

# Keywords and terms
MALE_KEYWORDS = {
    "he", "him", "his", "man", "male", "boy", "father", "brother", "son",
    "gentleman", "husband", "mr", "sir", "dad"
}
FEMALE_KEYWORDS = {
    "she", "her", "hers", "woman", "female", "girl", "mother", "sister", "daughter",
    "lady", "wife", "mrs", "ms", "mom"
}
FEMINIST_KEYWORDS = [
    "equality", "rights", "empowerment", "feminism", "agency", "justice",
    "liberation", "equity", "gender equality", "equal pay", "glass ceiling",
    "intersectionality", "patriarchy"
]

BIASED_TERMS = {
    "bossy": "confident leader",
    "hysterical": "emotionally expressive",
    "nagging": "persistent",
    "emotional": "expressive",
    "shrill": "strong",
    "too aggressive": "assertive",
    "cold": "professional",
    "passive": "calm",
    "childish": "youthful",
    "overbearing": "strong-willed",
}

sentiment_analyzer = SentimentIntensityAnalyzer()

# Phrase matcher for feminist keywords
fem_matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
fem_patterns = [nlp.make_doc(text) for text in FEMINIST_KEYWORDS]
fem_matcher.add("FEMINIST", fem_patterns)

def analyze_text(text: str):
    text_lower = text.lower()
    doc = nlp(text_lower)

    male_set = set(MALE_KEYWORDS)
    female_set = set(FEMALE_KEYWORDS)

    # Gender mentions with token uniqueness
    male_mentions = 0
    female_mentions = 0
    male_mentioned_tokens = set()
    female_mentioned_tokens = set()

    for token in doc:
        if token.text in male_set and token.i not in male_mentioned_tokens:
            male_mentions += 1
            male_mentioned_tokens.add(token.i)
        elif token.text in female_set and token.i not in female_mentioned_tokens:
            female_mentions += 1
            female_mentioned_tokens.add(token.i)

    # Named entity gender detection using gender_guesser
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            first_name = ent.text.split()[0]
            gender = detector.get_gender(first_name)
            if gender in ('male', 'mostly_male'):
                male_mentions += 1
            elif gender in ('female', 'mostly_female'):
                female_mentions += 1

    neutral_mentions = len(doc) - male_mentions - female_mentions

    # Sentence sentiment split by gender mentions
    sentences = sent_tokenize(text)
    male_sents = []
    female_sents = []
    neutral_sents = []

    for sent in sentences:
        sent_lower = sent.lower()
        sent_doc = nlp(sent_lower)

        sent_male = any(tok.text in male_set for tok in sent_doc)
        sent_female = any(tok.text in female_set for tok in sent_doc)

        score = sentiment_analyzer.polarity_scores(sent_lower)['compound']

        if sent_male and not sent_female:
            male_sents.append(score)
        elif sent_female and not sent_male:
            female_sents.append(score)
        else:
            neutral_sents.append(score)

    def avg(lst):
        return sum(lst) / len(lst) if lst else 0.0

    sentiment_scores = {
        "male": round(avg(male_sents), 4),
        "female": round(avg(female_sents), 4),
        "overall": round(sentiment_analyzer.polarity_scores(text_lower)['compound'], 4)
    }

    # Use your utils.py function for bias score
    bias_score = calculate_bias_score(female_mentions, male_mentions, sentiment_scores['overall'])

    # Feminist theme score using PhraseMatcher
    feminist_matches = fem_matcher(doc)
    feminist_hits = len(feminist_matches)
    feminist_theme_score = min(feminist_hits * 10, 100)

    # Highlight biased phrases & suggestions with overlap avoidance
    highlighted_phrases = []
    suggestions = []
    occupied_indices = set()

    for term, suggestion in BIASED_TERMS.items():
        for match in re.finditer(r'\b' + re.escape(term) + r'\b', text_lower):
            start, end = match.start(), match.end()
            if any(i in occupied_indices for i in range(start, end)):
                continue
            highlighted_phrases.append({
                "phrase": text[start:end],
                "type": "stereotype",
                "startIndex": start,
                "endIndex": end
            })
            suggestions.append({
                "original": term,
                "suggestion": suggestion
            })
            for i in range(start, end):
                occupied_indices.add(i)

    return {
        "genderMentions": {"male": male_mentions, "female": female_mentions, "neutral": neutral_mentions},
        "sentimentScores": sentiment_scores,
        "biasScore": round(bias_score, 2),
        "feministThemeScore": round(feminist_theme_score, 2),
        "highlightedPhrases": highlighted_phrases,
        "suggestions": suggestions
    }

