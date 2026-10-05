const { analyzeRequestWithGemini } = require('./aiService');
const { retrieveRelevantPolicy } = require('./policyService');
const logger = require('../utils/logger');

async function evaluateOperationalRequest(requestPayload) {
  logger.info('Starting Autonomous Operations Decision Pipeline', { requestPayload });

  // 1. Retrieve Policy Context (RAG)
  const policyContext = await retrieveRelevantPolicy(requestPayload.description || requestPayload.title);

  // 2. Gemini AI Reasoning & Intent Extraction
  const aiResult = await analyzeRequestWithGemini(requestPayload.description, policyContext);

  // 3. Enforce Confidence & Policy Safety Threshold Routing
  let finalDecision = aiResult.decision;
  
  if (aiResult.confidence < 0.70 && finalDecision === 'AUTO_EXECUTE') {
    finalDecision = 'NEEDS_APPROVAL';
    aiResult.reason += ' (Downgraded to NEEDS_APPROVAL due to confidence score below 90% threshold)';
  }

  return {
    category: aiResult.category || requestPayload.category || 'general',
    priority: aiResult.priority || requestPayload.priority || 'medium',
    ai_confidence: aiResult.confidence,
    ai_decision: finalDecision,
    ai_reason: aiResult.reason,
    policy_context: policyContext,
    required_action: aiResult.required_action,
    deadline: aiResult.deadline || requestPayload.deadline
  };
}

module.exports = {
  evaluateOperationalRequest
};
