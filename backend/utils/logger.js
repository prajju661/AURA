function info(message, meta = {}) {
  console.log(`[INFO] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
}

function warn(message, meta = {}) {
  console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
}

function error(message, meta = {}) {
  console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, Object.keys(meta).length ? JSON.stringify(meta) : '');
}

module.exports = {
  info,
  warn,
  error
};
