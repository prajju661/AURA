const { processInboundRequest } = require('../services/requestService');

async function handleCreateRequest(req, res) {
  try {
    const payload = req.body;
    if (!payload || !payload.title || !payload.description) {
      return res.status(400).json({ error: 'Request title and description are required.' });
    }
    const result = await processInboundRequest(payload);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error processing request.', details: err.message });
  }
}

module.exports = {
  handleCreateRequest
};
