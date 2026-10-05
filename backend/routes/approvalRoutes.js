const express = require('express');
const { handleApproval } = require('../controllers/approvalController');

const router = express.Router();

router.post('/', handleApproval);

module.exports = router;
