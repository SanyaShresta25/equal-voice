def calculate_bias_score(female_mentions, male_mentions, overall_sentiment):
    if female_mentions + male_mentions == 0:
        return 50.0  # Neutral baseline
    bias_ratio = abs(female_mentions - male_mentions) / (female_mentions + male_mentions)
    sentiment_weight = 1 - abs(overall_sentiment)
    return min(100.0, round(bias_ratio * sentiment_weight * 100, 2))
