-- AURA Seed Data SQL Script

-- Insert Users
INSERT INTO users (id, name, email, role) VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Alice Admin', 'admin@aura.org', 'admin'),
  ('e2222222-2222-2222-2222-222222222222', 'Evan Employee', 'evan@aura.org', 'employee'),
  ('m3333333-3333-3333-3333-333333333333', 'Morgan Manager', 'morgan@aura.org', 'approver')
ON CONFLICT (email) DO NOTHING;

-- Insert Company Policies
INSERT INTO policies (id, name, category, content) VALUES
  ('p1111111-1111-1111-1111-111111111111', 'Procurement Policy', 'procurement', 
   '1. Overview: Standard laptop allocation for new hires includes high-performance hardware. 2. Approval Rules: Any procurement request exceeding 3 units or $2,500 total value REQUIRES explicit approval from the Department Manager before order placement. 3. Fulfillment: IT asset team processes approved orders within 48 hours.'),
  ('p2222222-2222-2222-2222-222222222222', 'IT Access Control Policy', 'it_access', 
   '1. Standard Access: Role-based access to GitHub, Slack, and Email is auto-provisioned upon onboarding verification. 2. Privileged Access: Production AWS / Database administrative access requires Security Officer authorization.'),
  ('p3333333-3333-3333-3333-333333333333', 'Expense Reimbursement Policy', 'expense', 
   '1. Submissions: Expenses under $100 for office supplies are auto-approved. 2. Travel & High Value: Expenses over $100 require receipt upload and manager sign-off.')
ON CONFLICT (id) DO NOTHING;

-- Insert Hackathon Core Demo Request
INSERT INTO requests (
  id, title, description, category, priority, deadline, status, ai_decision, ai_confidence, ai_reason, created_by
) VALUES (
  'r1042000-0000-0000-0000-000000001042',
  'Procurement for New Onboarding Cohort',
  'We have 5 new employees joining Monday. They need laptops according to company policy.',
  'procurement',
  'high',
  '2026-10-05',
  'PENDING_APPROVAL',
  'NEEDS_APPROVAL',
  0.9400,
  'Request complies with company procurement guidelines, but quantity (5 laptops) exceeds auto-execution limit of 3 units. Manager approval is mandated by Procurement Policy Section 2.',
  'e2222222-2222-2222-2222-222222222222'
) ON CONFLICT (id) DO NOTHING;

-- Insert Approval Record for Demo Request
INSERT INTO approvals (
  id, request_id, approver_id, status, comment
) VALUES (
  'ap104200-0000-0000-0000-000000001042',
  'r1042000-0000-0000-0000-000000001042',
  'm3333333-3333-3333-3333-333333333333',
  'PENDING',
  'Awaiting review by Morgan Manager'
) ON CONFLICT (id) DO NOTHING;

-- Insert Audit Logs for Demo Request
INSERT INTO audit_logs (request_id, event, actor, details, timestamp) VALUES
  ('r1042000-0000-0000-0000-000000001042', 'REQUEST_RECEIVED', 'Employee Evan', '{"source": "Web Dashboard", "title": "Procurement for New Onboarding Cohort"}'::jsonb, NOW() - INTERVAL '15 minutes'),
  ('r1042000-0000-0000-0000-000000001042', 'AI_ANALYSIS_COMPLETED', 'Gemini AI Engine', '{"category": "procurement", "priority": "high", "entities": {"quantity": 5, "deadline": "Monday"}}'::jsonb, NOW() - INTERVAL '14 minutes'),
  ('r1042000-0000-0000-0000-000000001042', 'POLICY_RETRIEVED', 'pgvector RAG', '{"matched_policy": "Procurement Policy", "similarity": 0.92}'::jsonb, NOW() - INTERVAL '14 minutes'),
  ('r1042000-0000-0000-0000-000000001042', 'DECISION_GENERATED', 'AURA Decision Engine', '{"decision": "NEEDS_APPROVAL", "confidence": 0.94, "reason": "Quantity (5) > 3 units threshold"}'::jsonb, NOW() - INTERVAL '13 minutes'),
  ('r1042000-0000-0000-0000-000000001042', 'APPROVAL_REQUESTED', 'n8n Workflow Engine', '{"notified_approver": "morgan@aura.org", "channel": "Email / Web Dashboard"}'::jsonb, NOW() - INTERVAL '12 minutes');
