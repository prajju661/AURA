const { createClient } = require('@supabase/supabase-js');
const env = require('./env');

const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey);

module.exports = {
  supabaseAdmin
};
