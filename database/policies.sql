-- AURA Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. USERS POLICIES
CREATE POLICY "Public users viewable by authenticated" ON users
  FOR SELECT USING (auth.role() = 'authenticated');

-- 2. REQUESTS POLICIES
CREATE POLICY "Employees view own requests" ON requests
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Approvers and Admins view all requests" ON requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'approver')
    )
  );

CREATE POLICY "Authenticated users insert requests" ON requests
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "System / Admins update requests" ON requests
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'approver')
    )
  );

-- 3. POLICIES TABLE RLS
CREATE POLICY "All authenticated users view company policies" ON policies
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage policies" ON policies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. APPROVALS POLICIES
CREATE POLICY "Approvers view and update assigned approvals" ON approvals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'approver')
    )
  );

-- 5. ACTIONS & AUDIT LOGS POLICIES
CREATE POLICY "Authenticated users view audit logs" ON audit_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "System role full access" ON audit_logs
  FOR ALL USING (auth.role() = 'service_role');
