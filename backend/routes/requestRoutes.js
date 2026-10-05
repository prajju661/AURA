const express = require('express');
const { handleCreateRequest } = require('../controllers/requestController');

const router = express.Router();

router.post('/', handleCreateRequest);

module.exports = router;
