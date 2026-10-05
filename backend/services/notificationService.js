const env = require('../config/env');
const logger = require('../utils/logger');

async function triggerN8nWebhook(payload, webhookUrl = env.n8nWebhookUrl) {
  logger.info('Dispatching webhook trigger to n8n workflow engine', { webhookUrl, payload });
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch (err) {
    logger.warn('n8n webhook dispatch skipped or unconfigured', { error: err.message });
    return false;
  }
}

module.exports = {
  triggerN8nWebhook
};
