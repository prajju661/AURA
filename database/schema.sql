-- AURA — Autonomous Operations & Response Agent
-- Database Schema for Supabase PostgreSQL + pgvector

-- Enable vector extension for policy embeddings
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'employee', 'approver')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. REQUESTS TABLE
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  deadline TEXT,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PENDING_APPROVAL', 'APPROVED', 'AUTO_EXECUTED', 'ESCALATED', 'REJECTED', 'COMPLETED')),
  ai_decision TEXT CHECK (ai_decision IN ('AUTO_EXECUTE', 'NEEDS_APPROVAL', 'ESCALATE', 'REJECT')),
  ai_confidence NUMERIC(5, 4),
  ai_reason TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. POLICIES TABLE (pgvector RAG)
CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding vector(768), -- Vector embeddings from Gemini text-embedding-004 (768 dimensions)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. APPROVALS TABLE
CREATE TABLE IF NOT EXISTS approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  approver_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ACTIONS TABLE
CREATE TABLE IF NOT EXISTS actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES requests(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
  result JSONB DEFAULT '{}'::jsonb,
  executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  actor TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_category ON requests(category);
CREATE INDEX IF NOT EXISTS idx_approvals_request ON approvals(request_id);
CREATE INDEX IF NOT EXISTS idx_actions_request ON actions(request_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_request ON audit_logs(request_id);

-- VECTOR MATCH FUNCTION FOR POLICY RAG
CREATE OR REPLACE FUNCTION match_policies (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  name text,
  category text,
  content text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    policies.id,
    policies.name,
    policies.category,
    policies.content,
    1 - (policies.embedding <=> query_embedding) AS similarity
  FROM policies
  WHERE 1 - (policies.embedding <=> query_embedding) > match_threshold
  ORDER BY policies.embedding <=> query_embedding
  LIMIT match_count;
$$;
