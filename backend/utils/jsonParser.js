function parseStructuredJson(rawText) {
  if (!rawText) return null;
  try {
    // Strip markdown JSON code block fences if present
    let cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('Failed to parse JSON string from AI model output:', rawText);
    return null;
  }
}

module.exports = {
  parseStructuredJson
};
