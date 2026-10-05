const { supabaseAdmin } = require('../config/supabase');
const { logAuditEvent } = require('./auditService');
const { triggerN8nWebhook } = require('./notificationService');
const env = require('../config/env');
const logger = require('../utils/logger');

async function processApprovalDecision({ requestId, approvalId, status, comment, approverName = 'Manager Morgan' }) {
  logger.info('Processing human-in-the-loop approval decision', { requestId, status, comment });

  const finalStatus = status === 'APPROVED' ? 'APPROVED' : 'REJECTED';

  // 1. Update Supabase approval and request state
  try {
    if (approvalId) {
      await supabaseAdmin.from('approvals').update({ status: finalStatus, comment }).eq('id', approvalId);
    }
    await supabaseAdmin.from('requests').update({ status: finalStatus }).eq('id', requestId);
  } catch (err) {
    logger.warn('Supabase approval update bypassed', { error: err.message });
  }

  // 2. Audit Trail Logging
  await logAuditEvent({
    requestId,
    event: `HUMAN_APPROVAL_${status}`,
    actor: approverName,
    details: { status, comment }
  });

  // 3. Trigger n8n approval continuation webhook
  await triggerN8nWebhook(
    { request_id: requestId, approval_id: approvalId, status, comment },
    env.n8nApprovalWebhookUrl
  );

  return { success: true, requestId, status: finalStatus };
}

module.exports = {
  processApprovalDecision
};
