const { supabaseAdmin } = require('../config/supabase');
const logger = require('../utils/logger');

async function retrieveRelevantPolicy(queryText) {
  logger.info('Retrieving policy context via pgvector vector search', { queryText });
  try {
    // Attempt Supabase RPC call match_policies
    const { data, error } = await supabaseAdmin.rpc('match_policies', {
      query_embedding: Array(768).fill(0.1), // Synthetic vector matching placeholder
      match_threshold: 0.70,
      match_count: 2
    });

    if (!error && data && data.length > 0) {
      return data.map(p => `${p.name}: ${p.content}`).join('\n');
    }
  } catch (err) {
    logger.warn('Supabase vector query skipped, using fallback local policy knowledge base', { error: err.message });
  }

  // Fallback policy knowledge base matching
  const lower = queryText.toLowerCase();
  if (lower.includes('laptop') || lower.includes('procurement') || lower.includes('employees')) {
    return "Procurement Policy Section 2: Any procurement request exceeding 3 units or $2,500 total value REQUIRES explicit approval from Department Manager before order placement.";
  } else if (lower.includes('aws') || lower.includes('access') || lower.includes('root')) {
    return "IT Access Control Policy Section 2: Production AWS root administrative access requires Security Officer authorization.";
  }

  return "Standard Operations Policy: Requests complying with standard budget limits may be auto-executed.";
}

module.exports = {
  retrieveRelevantPolicy
};
