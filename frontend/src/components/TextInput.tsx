import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, Upload, X } from 'lucide-react';

interface Props {
  onAnalyze: (text: string) => void;
  isAnalyzing: boolean;
  error?: string;
}

const TextInput: React.FC<Props> = ({ onAnalyze, isAnalyzing, error }) => {
  const [text, setText] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text.trim());
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setText(content);
        };
        reader.readAsText(file);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setText(content);
        };
        reader.readAsText(file);
      }
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-pink-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-pink-600" />
          <h2 className="text-xl font-semibold text-gray-900">Enter Your Text</h2>
        </div>
        {text && (
          <button
            onClick={clearText}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`relative ${dragActive ? 'border-pink-500 bg-pink-50' : 'border-pink-200'} border-2 border-dashed rounded-lg transition-colors`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here to analyze, or drag and drop a text file..."
            className="w-full h-64 p-4 border-none resize-none focus:outline-none bg-transparent"
            disabled={isAnalyzing}
          />
          
          {dragActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-50 bg-opacity-90 rounded-lg">
              <div className="text-center">
                <Upload className="w-12 h-12 text-pink-500 mx-auto mb-2" />
                <p className="text-pink-600 font-medium">Drop your text file here</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {text.length} characters • {text.trim().split(/\s+/).filter(w => w.length > 0).length} words
            </span>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                Upload file
              </span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isAnalyzing || !text.trim()}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Analyze Text</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TextInput;