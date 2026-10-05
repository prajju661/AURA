require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  supabaseUrl: process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key',
  geminiApiKey: process.env.GEMINI_API_KEY || 'placeholder-gemini-key',
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/aura-request',
  n8nApprovalWebhookUrl: process.env.N8N_APPROVAL_WEBHOOK_URL || 'http://localhost:5678/webhook/aura-approval',
};
