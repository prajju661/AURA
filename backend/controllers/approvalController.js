const { processApprovalDecision } = require('../services/approvalService');

async function handleApproval(req, res) {
  try {
    const { requestId, approvalId, status, comment } = req.body;
    if (!requestId || !status) {
      return res.status(400).json({ error: 'requestId and status (APPROVED/REJECTED) are required.' });
    }
    const result = await processApprovalDecision({ requestId, approvalId, status, comment });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error processing approval.', details: err.message });
  }
}

module.exports = {
  handleApproval
};
