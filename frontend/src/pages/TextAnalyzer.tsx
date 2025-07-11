
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  FileText,
  AlertCircle,
  Eye,
  Target,
  Users,
  Brain,
} from "lucide-react";
import { analyzeText } from "../services/api";

// src/components/TextAnalyzer.tsx (or AnalysisResults.tsx)

interface Highlight {
  phrase: string;
  type: string;
  startIndex: number;
  endIndex: number;
}

interface Suggestion {
  original: string;
  suggestion: string;
}

interface AnalysisResult {
  inputText: string;
  genderMentions: {
    male: number;
    female: number;
    neutral: number;
  };
  sentimentScores: {
    male: number;
    female: number;
    overall: number;
  };
  biasScore: number;
  feministThemeScore: number;
  highlightedPhrases: Highlight[];
  suggestions: Suggestion[];
}

/* ─────────────────────────────── */

const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  /* ---------- helpers ---------- */
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const highlightText = (
    raw = "",
    highlights: Highlight[] = []
  ): React.ReactNode[] => {
    if (!highlights.length) return [<span key="plain">{raw}</span>];

    const sorted = [...highlights].sort((a, b) => a.startIndex - b.startIndex);
    const parts: React.ReactNode[] = [];
    let cursor = 0;

    sorted.forEach((h, i) => {
      if (cursor < h.startIndex)
        parts.push(
          <span key={`plain-${i}`}>{raw.slice(cursor, h.startIndex)}</span>
        );

      parts.push(
        <mark
          key={`mark-${i}`}
          className="bg-yellow-200 font-medium px-0.5 rounded"
        >
          {raw.slice(h.startIndex, h.endIndex)}
        </mark>
      );
      cursor = h.endIndex;
    });

    if (cursor < raw.length)
      parts.push(<span key="tail">{raw.slice(cursor)}</span>);

    return parts;
  };

  /* ---------- analyze ---------- */
  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const data: AnalysisResult = await analyzeText(text);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze text. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  /* ---------- render ---------- */
  return (
    <div className="pt-16 min-h-screen pink-gradient">
      {/* decorative blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="liquid-particle" />
        <div className="liquid-particle" />
        <div className="liquid-particle" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">
            <span className="gradient-text">Gender Bias</span> Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Paste any text to uncover gender mentions, sentiment differences and
            inclusivity gaps—instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* input */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-pink-100 hover-lift">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 pink-gradient-strong rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Enter Your Text
                </h2>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your article, speech, or any text here..."
                className="w-full h-80 p-6 border-2 border-pink-200 rounded-2xl resize-none focus:ring-2 focus:ring-pink-500 text-gray-700 leading-relaxed"
              />

              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                <span>{text.length} characters</span>
                <span>•</span>
                <span>
                  {text
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length}{" "}
                  words
                </span>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !text.trim()}
                  className="ml-auto inline-flex items-center space-x-3 pink-gradient-strong text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Analyzing…</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-3 border-2 border-red-200"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* results */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {result ? (
              <>
                {/* highlighted text */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-pink-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-pink-600" />
                    <span>Highlights</span>
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {highlightText(
                      result.inputText ?? text,
                      result.highlightedPhrases ?? []
                    )}
                  </p>
                </div>

              {/* Mentions + Sentiment */}
<div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-pink-100">
  <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
    <Users className="w-5 h-5 text-pink-600" />
    <span>Gender Mentions & Sentiment</span>
  </h3>

  <div className="grid grid-cols-3 gap-4 text-center">
    {(["male","female","neutral"] as const).map((g) => {
      const count = result.genderMentions[g];
      // pick the right raw score (0.0–1.0)
      const rawScore =
        g === "neutral"
          ? result.sentimentScores.overall
          : result.sentimentScores[g];
      const pct = Math.round(rawScore * 100); // convert to 0–100 scale

      return (
        <div
          key={g}
          className="p-4 rounded-xl bg-pink-50 border border-pink-100"
        >
          <p className="text-xs uppercase tracking-wide text-gray-600">
            {g}
          </p>
          <p className="text-2xl font-bold text-pink-600">{count}</p>
          <p className={`text-sm font-medium ${getScoreColor(pct)}`}>
            {pct}/100
          </p>
        </div>
      );
    })}
  </div>
</div>


                {/* bias & feminist scores */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 flex flex-col items-center">
                    <Eye className="w-6 h-6 text-pink-600 mb-1" />
                    <p className="text-sm text-gray-500 mb-1">Bias Score</p>
                    <p
                      className={`text-3xl font-bold ${getScoreColor(
                        100 - result.biasScore
                      )}`}
                    >
                      {Math.round(result.biasScore)}/100
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 flex flex-col items-center">
                    <Target className="w-6 h-6 text-pink-600 mb-1" />
                    <p className="text-sm text-gray-500 mb-1">
                      Feminist Theme Score
                    </p>
                    <p
                      className={`text-3xl font-bold ${getScoreColor(
                        result.feministThemeScore
                      )}`}
                    >
                      {Math.round(result.feministThemeScore)}/100
                    </p>
                  </div>
                </div>

                {/* suggestions */}
                {(result.suggestions ?? []).length > 0 && (
                  <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-pink-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-pink-600" />
                      <span>Suggestions</span>
                    </h3>
                    <ul className="space-y-2">
                      {result.suggestions!.map((s, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.08 }}
                          className="text-sm text-gray-700 flex items-start space-x-2"
                        >
                          <span className="w-2 h-2 bg-pink-500 rounded-full mt-[.35rem]" />
                          <span>
                            <span className="font-medium">{s.original}</span>{" "}
                            → {s.suggestion}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-3xl shadow-xl p-12 border-2 border-pink-100 text-center hover-lift">
                <div className="w-20 h-20 pink-gradient-strong rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Ready to Analyze
                </h3>
                <p className="text-gray-600">
                  Paste your content on the left and hit “Analyze” to see bias
                  scores, sentiment breakdowns and tailored suggestions.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TextAnalyzer;
