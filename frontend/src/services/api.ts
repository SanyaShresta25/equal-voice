const BASE_URL ="https://equal-voice-sanya.onrender.com";
export const analyzeText = async (text: string) => {
  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) throw new Error("API Error");
  return response.json();
};
