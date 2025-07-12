export const analyzeText = async (text: string) => {
  const response = await fetch("https://equal-voice-sanya.onrender.com/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return response.json();
};
