/* src/components/AnalysisResults.tsx */
import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  TrendingUp,
  Users,
  Brain,
  AlertCircle,
} from "lucide-react";

/* ───────────── Types ───────────── */
export interface Suggestion {
  original: string;
  suggestion: string;
}

export interface AnalysisResult {
  sentiment?: string;             // e.g. "positive"
  confidence?: number;            // 0–1
  wordCount?: number;
  readabilityScore?: number;      // 0–100
  suggestions?: Suggestion[];     // now an array of objects
  emotions?: Record<string, number>; // emotion → 0–1
}

interface Props {
  result: AnalysisResult;
}

/* ───────────── Helpers ───────────── */
const getSentimentColor = (sentiment?: string) => {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "text-green-600 bg-green-50 border-green-200";
    case "negative":
      return "text-red-600 bg-red-50 border-red-200";
    case "neutral":
      return "text-gray-600 bg-gray-50 border-gray-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const getReadabilityLevel = (score = 0) => {
  if (score >= 80) return { level: "Very Easy", color: "text-green-600" };
  if (score >= 60) return { level: "Easy", color: "text-blue-600" };
  if (score >= 40) return { level: "Moderate", color: "text-yellow-600" };
  if (score >= 20) return { level: "Difficult", color: "text-orange-600" };
  return { level: "Very Difficult", color: "text-red-600" };
};

/* ───────────── Component ───────────── */
const AnalysisResults: React.FC<Props> = ({ result }) => {
  const {
    sentiment = "Unknown",
    confidence = 0,
    wordCount = 0,
    readabilityScore = 0,
    suggestions = [],
    emotions = {},
  } = result;

  const readabilityInfo = getReadabilityLevel(readabilityScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100"
    >
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Analysis Results</h2>
      </div>

      <div className="space-y-6">
        {/* Sentiment */}
        <div className="p-4 rounded-lg border border-pink-100">
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-5 h-5 text-pink-600" />
            <h3 className="font-semibold text-gray-900">Sentiment Analysis</h3>
          </div>

          {sentiment === "Unknown" ? (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <AlertCircle className="w-4 h-4" />
              <span>No sentiment returned</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${getSentimentColor(
                  sentiment
                )}`}
              >
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(confidence * 100)}% confidence
              </span>
            </div>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-pink-50 border border-pink-100">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-pink-600" />
              <h3 className="font-semibold text-gray-900">Word Count</h3>
            </div>
            <p className="text-2xl font-bold text-pink-600">{wordCount}</p>
          </div>

          <div className="p-4 rounded-lg bg-pink-50 border border-pink-100">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-pink-600" />
              <h3 className="font-semibold text-gray-900">Readability</h3>
            </div>
            <p className="text-2xl font-bold text-pink-600">
              {readabilityScore}/100
            </p>
            <p className={`text-sm ${readabilityInfo.color}`}>
              {readabilityInfo.level}
            </p>
          </div>
        </div>

        {/* Emotional Analysis */}
        {Object.keys(emotions).length > 0 && (
          <div className="p-4 rounded-lg border border-pink-100">
            <h3 className="font-semibold text-gray-900 mb-3">
              Emotional Analysis
            </h3>
            <div className="space-y-3">
              {Object.entries(emotions)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 4)
                .map(([emotion, score]) => {
                  const pct = Math.min(Math.max(score, 0), 1) * 100;
                  return (
                    <div
                      key={emotion}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600 capitalize">
                        {emotion}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        <span className="text-sm text-gray-500 w-10">
                          {Math.round(pct)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Suggestions for Improvement */}
        {suggestions.length > 0 && (
          <div className="p-4 rounded-lg border border-pink-100">
            <h3 className="font-semibold text-gray-900 mb-3">
              Suggestions for Improvement
            </h3>
            <ul className="space-y-2">
              {suggestions.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="text-sm text-gray-600 flex items-start space-x-2"
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mt-[.35rem] flex-shrink-0" />
                  <span>
                    <strong>{s.original}</strong> → {s.suggestion}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalysisResults;
