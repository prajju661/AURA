const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const logger = require('./utils/logger');
const requestRoutes = require('./routes/requestRoutes');
const approvalRoutes = require('./routes/approvalRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    system: 'AURA Backend Service Engine',
    timestamp: new Date().toISOString()
  });
});

// Route Handlers
app.use('/api/v1/requests', requestRoutes);
app.use('/api/v1/approvals', approvalRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled server error:', { error: err.message });
  res.status(500).json({ error: 'Internal server error.' });
});

// Bind server strictly to 127.0.0.1 for local testing security
const PORT = env.port;
app.listen(PORT, '127.0.0.1', () => {
  logger.info(`AURA Backend Server listening securely at http://127.0.0.1:${PORT}`);
});
