export const calculateReadabilityScore = (text: string): number => {
  const words = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const syllables = countSyllables(text);
  
  // Flesch Reading Ease Score
  const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
  return Math.max(0, Math.min(100, Math.round(score)));
};

export const countSyllables = (text: string): number => {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  return words.reduce((total, word) => total + countSyllablesInWord(word), 0);
};

const countSyllablesInWord = (word: string): number => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

export const getWordCount = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const getCharacterCount = (text: string): number => {
  return text.length;
};

export const getSentenceCount = (text: string): number => {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
};