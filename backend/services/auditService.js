const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

async function logAuditEvent({ requestId, event, actor, details = {} }) {
  logger.info(`[AUDIT EVENT] ${event} by ${actor}`, { requestId, details });
  try {
    await supabaseAdmin.from('audit_logs').insert([{
      request_id: requestId,
      event,
      actor,
      details,
      timestamp: new Date().toISOString()
    }]);
  } catch (err) {
    logger.warn('Audit log write to Supabase bypassed', { error: err.message });
  }
}

module.exports = {
  logAuditEvent
};
