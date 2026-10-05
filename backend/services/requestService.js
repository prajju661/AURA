const { evaluateOperationalRequest } = require('./decisionEngine');
const { logAuditEvent } = require('./auditService');
const { triggerN8nWebhook } = require('./notificationService');
const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

async function processInboundRequest(requestPayload) {
  logger.info('Received new inbound request payload', { title: requestPayload.title });

  // 1. Audit Log: Request Received
  const requestId = requestPayload.id || `r${Date.now()}`;
  await logAuditEvent({
    requestId,
    event: 'REQUEST_RECEIVED',
    actor: requestPayload.created_by_name || 'Employee',
    details: { title: requestPayload.title }
  });

  // 2. Decision Engine (AI + Policy RAG)
  const decision = await evaluateOperationalRequest(requestPayload);

  // 3. Determine Request Status
  let status = 'PENDING';
  if (decision.ai_decision === 'AUTO_EXECUTE') status = 'AUTO_EXECUTED';
  else if (decision.ai_decision === 'NEEDS_APPROVAL') status = 'PENDING_APPROVAL';
  else if (decision.ai_decision === 'ESCALATE') status = 'ESCALATED';
  else if (decision.ai_decision === 'REJECT') status = 'REJECTED';

  // 4. Log AI Decision Audit Event
  await logAuditEvent({
    requestId,
    event: 'DECISION_GENERATED',
    actor: 'AURA AI Engine',
    details: { decision: decision.ai_decision, confidence: decision.ai_confidence, reason: decision.ai_reason }
  });

  // 5. Trigger n8n Workflow
  await triggerN8nWebhook({
    request_id: requestId,
    title: requestPayload.title,
    description: requestPayload.description,
    decision: decision.ai_decision,
    confidence: decision.ai_confidence
  });

  return {
    id: requestId,
    title: requestPayload.title,
    description: requestPayload.description,
    category: decision.category,
    priority: decision.priority,
    status,
    ai_decision: decision.ai_decision,
    ai_confidence: decision.ai_confidence,
    ai_reason: decision.ai_reason,
    created_at: new Date().toISOString()
  };
}

module.exports = {
  processInboundRequest
};
