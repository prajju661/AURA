# AURA — Antigravity Master Build Prompts

---

## 0. Global Rules
```text
Role & Execution Guidelines:
1. Always maintain strict separation of concerns across the directory layout:
   - Frontend: /frontend (Next.js App Router, pure JavaScript, Tailwind CSS, Lucide icons)
   - Backend: /backend (Services, Controllers, Routes, Utils, Config - pure JS)
   - Database: /database (schema.sql, seed.sql, policies.sql)
   - n8n Workflows: /n8n (workflows/ JSON definitions)
   - Master Prompts: /prompts/ANTIGRAVITY_PROMPTS.md
   - Documentation: /docs (architecture.md, api.md, setup.md)
2. Do NOT use TypeScript. Write pure JavaScript (.js, .jsx).
3. Do NOT use MongoDB or Firebase. Use Supabase PostgreSQL + pgvector for memory and knowledge retrieval.
4. Security First:
   - Server-side keys (GEMINI_API_KEY, SUPABASE_SERVICE_ROLE_KEY) MUST NEVER be exposed to the client.
   - Use Next.js Route Handlers / Server Actions or Backend Services as a BFF (Backend-For-Frontend).
   - Enforce Row Level Security (RLS) and validate all external inputs.
5. Autonomous AI Workflow Loop:
   Request -> Understand -> Retrieve Context -> Check Policy -> Reason -> Decide -> Act / Ask / Escalate -> Verify -> Follow Up -> Close.
6. Decision Enum: AUTO_EXECUTE | NEEDS_APPROVAL | ESCALATE | REJECT. Never allow unstructured AI text to drive execution logic directly.
```

---

## 1. Project Initialization Prompt
```text
Objective:
Initialize the top-level repository structure for AURA.

What to inspect first:
Check the root directory to ensure no conflicting files exist.

Files/folders to create or modify:
- /frontend
- /backend
- /n8n
- /database
- /prompts
- /docs
- README.md
- .gitignore

Exact implementation requirements:
Create the root directories and placeholders. Create a comprehensive .gitignore ignoring node_modules, .env, .env.local, .next, and build artifacts. Create a top-level README.md summarizing project goals and architecture.

What NOT to change:
Do not put any code in the root directory outside the defined folders.

Dependencies:
None for root.

Environment variables:
None.

Expected output:
Clean directory tree with frontend, backend, n8n, database, prompts, docs, README.md, and .gitignore.

Verification steps:
Run `ls` or directory listing to verify the exact structure matches the blueprint.
```

---

## 2. Folder Structure Prompt
```text
Objective:
Verify and lock down the strict modular folder structure for frontend, backend, database, n8n, and docs.

What to inspect first:
Inspect the existing root directory.

Files/folders to create or modify:
- /frontend/app, /frontend/components, /frontend/lib, /frontend/public
- /backend/services, /backend/controllers, /backend/routes, /backend/utils, /backend/config
- /n8n/workflows
- /database
- /docs

Exact implementation requirements:
Ensure all target subdirectories are created and ready for module insertion. Add index or placeholder files where appropriate to maintain git directory structure.

What NOT to change:
Do not place backend files in frontend or vice-versa.

Dependencies:
None.

Environment variables:
None.

Expected output:
All nested folders established according to the project blueprint.

Verification steps:
Check directory tree to confirm all nested subfolders exist without extra files in root.
```

---

# FRONTEND PROMPTS

## 3. Frontend Foundation Prompt
```text
Objective:
Initialize the Next.js frontend application inside /frontend using pure JavaScript and Tailwind CSS.

What to inspect first:
Check /frontend package.json and structure.

Files/folders to create or modify:
- /frontend/package.json
- /frontend/next.config.js
- /frontend/tailwind.config.js
- /frontend/postcss.config.js
- /frontend/app/layout.js
- /frontend/app/page.js
- /frontend/app/globals.css

Exact implementation requirements:
Create a modern Next.js 14 App Router project setup configured with Tailwind CSS. Use Inter font, custom dark/light theme CSS variables, and glassmorphism styling primitives. Render a base landing/redirect to /dashboard in page.js.

What NOT to change:
Do not create TypeScript files (.ts, .tsx). Use .js and .jsx.

Dependencies:
next, react, react-dom, tailwindcss, postcss, autoprefixer, lucide-react, clsx, tailwind-merge.

Environment variables:
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.

Expected output:
A functional Next.js application foundation compiling cleanly without errors.

Verification steps:
Run `npm run build` inside /frontend to verify clean compilation.
```

---

## 4. Frontend Layout Prompt
```text
Objective:
Build the persistent layout shell with sidebar navigation, header, status indicators, and role switcher.

What to inspect first:
Inspect /frontend/app/layout.js and /frontend/app/globals.css.

Files/folders to create or modify:
- /frontend/components/Sidebar.jsx
- /frontend/components/Header.jsx
- /frontend/components/StatusPill.jsx
- /frontend/app/layout.js

Exact implementation requirements:
Implement an enterprise AI dark-theme navigation sidebar with active link highlighting, logo with gradient styling, quick action button ("+ New Request"), user profile badge with role indicator (Admin / Employee / Approver), and real-time backend/n8n connectivity indicator status dot.

What NOT to change:
Do not remove page container constraints.

Dependencies:
lucide-react, next/navigation, next/link.

Environment variables:
None.

Expected output:
Responsive layout wrapper frame around all sub-routes.

Verification steps:
Navigate across route stubs and verify sidebar updates active state seamlessly.
```

---

## 5. Dashboard Prompt
```text
Objective:
Implement the primary Operational Command Center dashboard route at /frontend/app/dashboard/page.js.

What to inspect first:
Check /frontend/components/Header.jsx and layout structure.

Files/folders to create or modify:
- /frontend/app/dashboard/page.js
- /frontend/components/MetricCard.jsx
- /frontend/components/RecentRequestsTable.jsx
- /frontend/components/DecisionBreakdownChart.jsx

Exact implementation requirements:
Create high-impact metrics display showing:
1. Total Operational Requests
2. Automated Decisions (% rate)
3. Pending Approvals count
4. Escalated Requests count
5. Estimated Time Saved (hours)

Add recent requests table with status badges (AUTO_EXECUTE, NEEDS_APPROVAL, ESCALATE, REJECT), priority indicators, confidence percentages, and quick navigation link to request details.

What NOT to change:
Do not hardcode backend APIs directly in JSX; extract logic into service wrappers.

Dependencies:
lucide-react, framer-motion (or CSS transitions).

Environment variables:
None.

Expected output:
Visually compelling enterprise operations dashboard matching PRD specifications.

Verification steps:
Inspect /dashboard page in browser to verify layout balance, metrics formatting, and data tables.
```

---

## 6. Request Management Prompt
```text
Objective:
Build the Request Submission form and Requests Listing views.

What to inspect first:
Check dashboard table structures for styling consistency.

Files/folders to create or modify:
- /frontend/app/requests/page.js
- /frontend/app/requests/new/page.js
- /frontend/components/RequestForm.jsx
- /frontend/components/RequestFilters.jsx

Exact implementation requirements:
Create /requests listing with status filters (All, Pending Approval, Auto-Executed, Escalated, Rejected), category filters (Procurement, IT Access, HR, Expense), search input, and table pagination.
Create /requests/new form with fields: Title, Description, Category, Priority, Deadline, and Attachment upload placeholder. Add instant client-side validation and submit to n8n/backend webhook.

What NOT to change:
Do not expose server credentials in form handling.

Dependencies:
lucide-react.

Environment variables:
NEXT_PUBLIC_N8N_WEBHOOK_URL.

Expected output:
Functional request submission form and searchable requests directory.

Verification steps:
Submit a test request via /requests/new and confirm redirection to /requests or details view.
```

---

## 7. Request Details Prompt
```text
Objective:
Build the detailed Request Inspection page at /frontend/app/requests/[id]/page.js.

What to inspect first:
Check database schema for requests, approvals, actions, and audit_logs tables.

Files/folders to create or modify:
- /frontend/app/requests/[id]/page.js
- /frontend/components/AIAnalysisCard.jsx
- /frontend/components/RetrievedPolicyCard.jsx
- /frontend/components/AuditTimeline.jsx
- /frontend/components/ActionExecutionLog.jsx

Exact implementation requirements:
Display complete end-to-end request lifecycle:
1. Original Request Details (Title, Description, Submitted By, Timestamp)
2. AI Request Understanding Breakdown (Extracted Category, Priority, Entities, Confidence Score gauge)
3. Retrieved Policy Context (Policy Name, Matched Chunks, Relevance Score)
4. AI Decision Box (Decision badge: AUTO_EXECUTE / NEEDS_APPROVAL / ESCALATE / REJECT with explainability reason string)
5. Approval Status & Quick Manager Actions (Approve / Reject buttons if pending)
6. Automated Action Execution Log (Email sent, Calendar event created, etc.)
7. Full Chronological Audit Timeline with actor and timestamp.

What NOT to change:
Do not omit confidence or policy context from the view.

Dependencies:
lucide-react.

Environment variables:
None.

Expected output:
Comprehensive 360-degree inspection view for any request.

Verification steps:
Load /requests/[id] with demo data and verify all 7 panels render correctly.
```

---

## 8. Approval UI Prompt
```text
Objective:
Build the Manager Approval Portal route at /frontend/app/approvals/page.js.

What to inspect first:
Check approval record schema in /database/schema.sql.

Files/folders to create or modify:
- /frontend/app/approvals/page.js
- /frontend/components/ApprovalCard.jsx
- /frontend/components/ApprovalModal.jsx

Exact implementation requirements:
Provide dedicated interface for managers to review pending approval requests.
Display:
- Request title & requester context
- AI reasoning & confidence level
- Matched policy rule triggering human-in-the-loop
- Interactive "Approve with Comment" and "Reject with Reason" modal triggers
- Submit decision to backend API / n8n workflow trigger to resume automated processing.

What NOT to change:
Do not allow approvals without updating backend state and audit logs.

Dependencies:
lucide-react.

Environment variables:
None.

Expected output:
Seamless human-in-the-loop approval management interface.

Verification steps:
Approve a sample request and confirm state update to APPROVED and workflow continuation.
```

---

## 9. Policy Management UI Prompt
```text
Objective:
Build the Policy Knowledge Base management page at /frontend/app/policies/page.js.

What to inspect first:
Check database policies table structure.

Files/folders to create or modify:
- /frontend/app/policies/page.js
- /frontend/components/PolicyCard.jsx
- /frontend/components/UploadPolicyModal.jsx

Exact implementation requirements:
Allow admins to view, add, and manage company policies (Procurement Policy, IT Access Policy, Expense Policy, HR Policy).
Features:
- Policy document list with category tags and chunk count
- Document viewer modal for policy text
- "Upload Policy" form allowing file or raw text input
- Triggers backend vectorization pipeline (chunking + embedding generation -> pgvector).

What NOT to change:
Do not allow plain text searching to bypass vector embedding metadata.

Dependencies:
lucide-react.

Environment variables:
None.

Expected output:
Full administrative control over company operational policies.

Verification steps:
Add a test policy and check table listing updating in real time.
```

---

## 10. Audit Trail UI Prompt
```text
Objective:
Build the System Audit Log Explorer page at /frontend/app/audit/page.js.

What to inspect first:
Check audit_logs table schema.

Files/folders to create or modify:
- /frontend/app/audit/page.js
- /frontend/components/AuditTable.jsx
- /frontend/components/AuditFilterBar.jsx

Exact implementation requirements:
Provide complete compliance and traceability logging grid:
- Filter by Request ID, Actor (AI Agent, Manager, System, Employee), Event Type (REQUEST_RECEIVED, AI_ANALYSIS_COMPLETE, POLICY_RETRIEVED, APPROVAL_REQUESTED, APPROVED, ACTION_EXECUTED, FOLLOWUP_SENT)
- Timeline view and downloadable JSON/CSV log exporter option
- Detail popup showing JSON payload for every event.

What NOT to change:
Do not overwrite or purge audit log records.

Dependencies:
lucide-react.

Environment variables:
None.

Expected output:
100% traceable audit trail log page.

Verification steps:
Filter audit logs by event type and verify instant reactive filtering.
```

---

## 11. Frontend API Integration Prompt
```text
Objective:
Connect frontend views to backend services and Supabase client SDK.

What to inspect first:
Check /frontend/lib/supabaseClient.js and backend API routing patterns.

Files/folders to create or modify:
- /frontend/lib/supabaseClient.js
- /frontend/lib/api.js

Exact implementation requirements:
Create modular API client wrappers for:
- `fetchRequests()`, `fetchRequestById(id)`
- `submitRequest(payload)`
- `fetchApprovals()`, `submitApprovalDecision(id, decision, comment)`
- `fetchPolicies()`, `uploadPolicy(payload)`
- `fetchAuditLogs(filters)`
Include graceful error handling, fallback mock data for offline development, and toast notifications.

What NOT to change:
Do not store secret keys in frontend lib files.

Dependencies:
@supabase/supabase-js.

Environment variables:
NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.

Expected output:
Robust, type-safe API communication layer.

Verification steps:
Test API call fallbacks and verify seamless database / mock switching.
```

---

## 12. Frontend Polish Prompt
```text
Objective:
Refine UI visual aesthetics, micro-interactions, responsive behavior, and accessibility.

What to inspect first:
Check all pages in /frontend/app.

Files/folders to create or modify:
- /frontend/app/globals.css
- /frontend/components/*

Exact implementation requirements:
Apply visual polish:
- Subtle glassmorphism overlays and gradient borders
- Smooth entry animations for cards and modals
- Loading skeletons for dashboard metrics and data tables
- Dark enterprise aesthetic (slate/zinc palette with cyan/violet accents)
- Comprehensive mobile and tablet responsiveness.

What NOT to change:
Do not alter structural page routing or data contracts.

Dependencies:
lucide-react.

Environment variables:
None.

Expected output:
Production-ready, visually stunning enterprise AI web application.

Verification steps:
Test design responsiveness across mobile, tablet, and desktop viewports.
```

---

# BACKEND PROMPTS

## 13. Backend Foundation Prompt
```text
Objective:
Initialize the modular backend service layer inside /backend.

What to inspect first:
Check root backend configuration.

Files/folders to create or modify:
- /backend/package.json
- /backend/server.js (or index.js entry point)
- /backend/config/env.js
- /backend/utils/logger.js

Exact implementation requirements:
Set up a clean Node.js backend environment using pure JavaScript.
Configure environment variable loading, structured logger utility, standard error handling middleware, and route registry.

What NOT to change:
Do not mix backend logic into frontend code.

Dependencies:
dotenv, cors.

Environment variables:
PORT, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GEMINI_API_KEY.

Expected output:
Solid backend server baseline supporting service calls and routes.

Verification steps:
Start backend server and confirm clean initialization log.
```

---

## 14. Supabase Connection Prompt
```text
Objective:
Configure Supabase Client and Service Role connections in /backend/config/supabase.js.

What to inspect first:
Check /backend/config/env.js.

Files/folders to create or modify:
- /backend/config/supabase.js
- /backend/utils/dbHelpers.js

Exact implementation requirements:
Initialize Supabase client with service role key for privileged backend operations (vector queries, RLS bypass for system actions, audit trail writes). Provide helper functions for database error wrapping and payload normalization.

What NOT to change:
Never expose service role keys to client requests.

Dependencies:
@supabase/supabase-js.

Environment variables:
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

Expected output:
Authenticated, reusable Supabase database connection singleton.

Verification steps:
Execute connection test check against Supabase instance.
```

---

## 15. Request Service Prompt
```text
Objective:
Build the core Request Management service inside /backend/services/requestService.js.

What to inspect first:
Check requests table schema.

Files/folders to create or modify:
- /backend/services/requestService.js
- /backend/controllers/requestController.js
- /backend/routes/requestRoutes.js

Exact implementation requirements:
Implement service functions:
- `createRequest(requestData)`
- `getRequestById(id)`
- `listRequests(filters)`
- `updateRequestStatus(id, status, decisionDetails)`
Enforce payload validation, automatically assign initial status `PENDING`, and trigger n8n processing webhook.

What NOT to change:
Do not allow raw SQL string concatenation; use Supabase SDK queries.

Dependencies:
@supabase/supabase-js.

Environment variables:
N8N_WEBHOOK_URL.

Expected output:
Complete CRUD service for operational requests.

Verification steps:
Test creating and fetching requests via service unit calls.
```

---

## 16. AI Service Prompt
```text
Objective:
Build Google Gemini AI integration service inside /backend/services/aiService.js.

What to inspect first:
Check Gemini prompt contract requirements in PRD.

Files/folders to create or modify:
- /backend/services/aiService.js
- /backend/utils/jsonParser.js

Exact implementation requirements:
Implement Gemini API client to process operational requests.
Inputs: Request Title, Description, Retrieved Policy Context.
Output: Strict JSON matching schema:
{
  "category": string,
  "priority": "low" | "medium" | "high" | "urgent",
  "confidence": number (0.0 to 1.0),
  "decision": "AUTO_EXECUTE" | "NEEDS_APPROVAL" | "ESCALATE" | "REJECT",
  "reason": string,
  "required_action": string,
  "deadline": string | null,
  "missing_information": string[]
}
Enforce strict JSON schema validation and fallback parsing handling.

What NOT to change:
Do not allow unformatted text or unstructured model responses to escape.

Dependencies:
@google/genai (or @google/generative-ai).

Environment variables:
GEMINI_API_KEY.

Expected output:
Reliable, structured AI analysis & decision engine integration.

Verification steps:
Pass sample procurement prompt to aiService and assert valid JSON response structure.
```

---

## 17. Policy Retrieval Service Prompt
```text
Objective:
Build pgvector vector-search policy retrieval service in /backend/services/policyService.js.

What to inspect first:
Check policies database table and pgvector extension config.

Files/folders to create or modify:
- /backend/services/policyService.js
- /backend/services/embeddingService.js

Exact implementation requirements:
Implement:
1. `generateEmbedding(text)` using Gemini text-embedding model.
2. `addPolicy(name, content, category)` (chunks text, embeds, stores in DB).
3. `retrieveRelevantPolicy(queryText, matchThreshold, matchCount)` using Supabase RPC vector match function (`match_policies`).

What NOT to change:
Do not return entire policy documents when semantic search chunks match.

Dependencies:
@google/genai, @supabase/supabase-js.

Environment variables:
GEMINI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

Expected output:
Contextually accurate semantic policy retrieval pipeline for RAG.

Verification steps:
Query vector search with procurement query and verify relevant policy chunk matching.
```

---

## 18. Decision Engine Prompt
```text
Objective:
Build the Autonomous Operations Decision Engine in /backend/services/decisionEngine.js.

What to inspect first:
Check /backend/services/aiService.js and /backend/services/policyService.js.

Files/folders to create or modify:
- /backend/services/decisionEngine.js

Exact implementation requirements:
Combine Context Retrieval + Policy Matching + Gemini AI Reasoning into a unified pipeline:
1. Accept raw request payload.
2. Retrieve semantically matching policy rules via `policyService`.
3. Invoke `aiService.analyzeRequest(request, policyContext)`.
4. Apply confidence threshold safety check:
   - Confidence > 0.90 & Policy Allows -> AUTO_EXECUTE
   - Confidence 0.70-0.90 OR Policy Requires Authorization -> NEEDS_APPROVAL
   - Confidence < 0.70 OR Escalation condition -> ESCALATE
   - Policy Violation -> REJECT
5. Return complete decision payload with explainability metrics.

What NOT to change:
Never bypass human approval when policies explicitly require it.

Dependencies:
None additional.

Environment variables:
None.

Expected output:
Deterministic, policy-aware autonomous decision engine.

Verification steps:
Run test cases for low, medium, and high confidence scenarios to verify route assignment.
```

---

## 19. Approval Service Prompt
```text
Objective:
Build Human-in-the-Loop approval management service in /backend/services/approvalService.js.

What to inspect first:
Check approvals table schema.

Files/folders to create or modify:
- /backend/services/approvalService.js
- /backend/controllers/approvalController.js

Exact implementation requirements:
Implement:
1. `createApprovalRecord(requestId, approverRole)` -> status `PENDING`.
2. `processApproval(approvalId, approverId, status, comment)`:
   - Update approval record (`APPROVED` or `REJECTED`).
   - Update request status (`IN_PROGRESS` or `REJECTED`).
   - Trigger n8n workflow continuation webhook.
   - Record entry in audit_logs.

What NOT to change:
Do not allow unauthorized approval status overrides.

Dependencies:
@supabase/supabase-js.

Environment variables:
N8N_APPROVAL_WEBHOOK_URL.

Expected output:
Robust human approval orchestration service.

Verification steps:
Simulate approval submission and verify request status transition.
```

---

## 20. Notification Service Prompt
```text
Objective:
Build email and notification service in /backend/services/notificationService.js.

What to inspect first:
Check n8n action routing and SMTP configurations.

Files/folders to create or modify:
- /backend/services/notificationService.js

Exact implementation requirements:
Implement notification triggers:
- `sendApprovalNotification(approverEmail, requestDetails)`
- `sendExecutionConfirmation(requesterEmail, actionDetails)`
- `sendEscalationAlert(managerEmail, reason)`
Support direct SMTP / Nodemailer fallback as well as n8n Webhook notifications.

What NOT to change:
Do not leak recipient email headers or credentials.

Dependencies:
nodemailer (optional fallback).

Environment variables:
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.

Expected output:
Reliable multi-channel notification dispatcher.

Verification steps:
Dispatch test email payload and verify log output / delivery.
```

---

## 21. Audit Service Prompt
```text
Objective:
Build system-wide audit logging service in /backend/services/auditService.js.

What to inspect first:
Check audit_logs table schema.

Files/folders to create or modify:
- /backend/services/auditService.js

Exact implementation requirements:
Implement helper: `logAuditEvent({ requestId, event, actor, details })`.
Events:
- `REQUEST_SUBMITTED`
- `AI_ANALYSIS_COMPLETED`
- `POLICY_RETRIEVED`
- `DECISION_GENERATED`
- `APPROVAL_REQUESTED`
- `APPROVAL_SUBMITTED`
- `ACTION_EXECUTED`
- `FOLLOWUP_TRIGGERED`
Ensure timestamp and JSON metadata are immutably persisted in Supabase audit_logs table.

What NOT to change:
Audit records must be append-only. Never overwrite existing audit entries.

Dependencies:
@supabase/supabase-js.

Environment variables:
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

Expected output:
Immutable, comprehensive operational audit trail service.

Verification steps:
Log sample audit event and check entry in database.
```

---

# DATABASE PROMPTS

## 22. Database Schema Prompt
```text
Objective:
Create the complete PostgreSQL database schema file in /database/schema.sql.

What to inspect first:
Check PRD section 23 Database Design requirements.

Files/folders to create or modify:
- /database/schema.sql

Exact implementation requirements:
Write DDL script creating tables:
1. `users` (id UUID PRIMARY KEY, name TEXT, email TEXT UNIQUE, role TEXT, created_at TIMESTAMPTZ)
2. `requests` (id UUID PRIMARY KEY, title TEXT, description TEXT, category TEXT, priority TEXT, deadline TEXT, status TEXT, ai_decision TEXT, ai_confidence NUMERIC, ai_reason TEXT, created_by UUID, created_at TIMESTAMPTZ)
3. `policies` (id UUID PRIMARY KEY, name TEXT, content TEXT, embedding vector(768), category TEXT, created_at TIMESTAMPTZ)
4. `approvals` (id UUID PRIMARY KEY, request_id UUID, approver_id UUID, status TEXT, comment TEXT, created_at TIMESTAMPTZ)
5. `actions` (id UUID PRIMARY KEY, request_id UUID, action_type TEXT, status TEXT, result JSONB, executed_at TIMESTAMPTZ)
6. `audit_logs` (id UUID PRIMARY KEY, request_id UUID, event TEXT, actor TEXT, details JSONB, timestamp TIMESTAMPTZ)

Include pgvector extension initialization (`CREATE EXTENSION IF NOT EXISTS vector;`).

What NOT to change:
Do not omit foreign keys or indices on request_id.

Dependencies:
PostgreSQL 15+, pgvector extension.

Environment variables:
None.

Expected output:
Production-grade SQL schema script ready for Supabase execution.

Verification steps:
Execute script in Supabase SQL Editor and confirm all 6 tables created successfully.
```

---

## 23. RLS/Security Prompt
```text
Objective:
Configure Row Level Security (RLS) policies in /database/policies.sql.

What to inspect first:
Check /database/schema.sql.

Files/folders to create or modify:
- /database/policies.sql

Exact implementation requirements:
Write security policies enabling:
- Authenticated users can view their own submitted requests
- Approvers/Admins can view all requests and approvals
- Admins can manage policy documents
- System service role has full read/write access across all tables for workflow operations.

What NOT to change:
Do not disable RLS on public tables without restricting policies.

Dependencies:
Supabase Auth.

Environment variables:
None.

Expected output:
Bulletproof RLS configuration script.

Verification steps:
Test standard user role vs admin role access permissions in Supabase.
```

---

## 24. Seed Data Prompt
```text
Objective:
Create initial seed data script in /database/seed.sql.

What to inspect first:
Check database schema for users, policies, requests, approvals, actions, audit_logs.

Files/folders to create or modify:
- /database/seed.sql

Exact implementation requirements:
Provide seed dataset including:
- Sample users: Admin, Employee, Manager/Approver
- Real-world company policy documents (Procurement Policy, IT Access Policy, Expense Policy)
- Hackathon demo request ("We have 5 new employees joining Monday. They need laptops according to company policy.")
- Associated AI analysis, approval record, action, and audit trail entries.

What NOT to change:
Ensure UUID references remain consistent across seed relations.

Dependencies:
None.

Environment variables:
None.

Expected output:
Turnkey seed dataset for instant demo readiness.

Verification steps:
Run seed script and query requests table to confirm demo scenario populated.
```

---

## 25. pgvector Knowledge Base Prompt
```text
Objective:
Create vector match stored function and policy search index in /database/schema.sql or /database/policies.sql.

What to inspect first:
Check vector column definition in policies table.

Files/folders to create or modify:
- /database/schema.sql

Exact implementation requirements:
Create stored RPC function `match_policies`:
```sql
CREATE OR REPLACE FUNCTION match_policies (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  name text,
  content text,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    policies.id,
    policies.name,
    policies.content,
    1 - (policies.embedding <=> query_embedding) AS similarity
  FROM policies
  WHERE 1 - (policies.embedding <=> query_embedding) > match_threshold
  ORDER BY policies.embedding <=> query_embedding
  LIMIT match_count;
$$;
```
Add IVFFlat index on embedding column.

What NOT to change:
Do not mismatch vector dimensions (use 768 for Gemini text-embedding-004).

Dependencies:
pgvector.

Environment variables:
None.

Expected output:
High-speed semantic search stored procedure in Supabase.

Verification steps:
Execute `SELECT * FROM match_policies(...)` with test vector to verify output.
```

---

# N8N PROMPTS

## 26. Main Workflow Prompt
```text
Objective:
Build the main orchestration workflow definition in /n8n/workflows/main-workflow.json.

What to inspect first:
Check PRD section 24 n8n Workflow layout.

Files/folders to create or modify:
- /n8n/workflows/main-workflow.json

Exact implementation requirements:
Construct n8n workflow JSON exported structure:
Nodes:
1. Webhook Trigger (`POST /api/v1/request`)
2. Request Validation Node
3. Fetch Policy Context Node (HTTP Request to Supabase match_policies RPC)
4. Gemini AI Agent Node (HTTP Request to Gemini API with structured JSON output prompt)
5. JSON Decision Router (Switch node evaluating `decision` field: AUTO_EXECUTE | NEEDS_APPROVAL | ESCALATE | REJECT)
6. Auto-Execute Action Node (SMTP / Webhook action)
7. Approval Request Node (Creates approval record in Supabase & emails Approver)
8. Escalation Node (Notifies Operations Manager)
9. Update Database Node (Supabase update request status & AI metrics)
10. Audit Log Node (Insert event into audit_logs).

What NOT to change:
Do not omit the error handling catch node on Webhook execution.

Dependencies:
n8n orchestrator engine.

Environment variables:
GEMINI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

Expected output:
Importable, production-ready n8n main workflow JSON file.

Verification steps:
Import workflow into n8n instance and execute test webhook trigger.
```

---

## 27. Approval Workflow Prompt
```text
Objective:
Build human approval callback workflow definition in /n8n/workflows/approval-workflow.json.

What to inspect first:
Check /n8n/workflows/main-workflow.json.

Files/folders to create or modify:
- /n8n/workflows/approval-workflow.json

Exact implementation requirements:
Construct workflow handling approver response:
Nodes:
1. Webhook Trigger (`POST /api/v1/approval-callback`)
2. Validate Approver Signature / Token
3. Switch Node (`status == APPROVED` vs `REJECTED`)
4. On Approved: Execute fulfillment action (e.g. create task / send order email)
5. On Rejected: Update request status to `REJECTED` and notify requester
6. Update Supabase approval and request records
7. Append Audit Log entry.

What NOT to change:
Do not resume workflow if approval token is invalid.

Dependencies:
n8n.

Environment variables:
None.

Expected output:
Fully automated approval loop callback handler workflow JSON.

Verification steps:
Post mock approval decision to webhook and verify workflow completion.
```

---

## 28. Follow-up Workflow Prompt
```text
Objective:
Build autonomous follow-up cron workflow definition in /n8n/workflows/followup-workflow.json.

What to inspect first:
Check requests table status fields.

Files/folders to create or modify:
- /n8n/workflows/followup-workflow.json

Exact implementation requirements:
Construct recurring monitoring workflow:
Nodes:
1. Cron Trigger (Every 1 hour / configurable interval)
2. Query Pending Requests Node (Select requests where status = 'PENDING_APPROVAL' and updated_at < NOW() - INTERVAL '24 hours')
3. Loop Items Node
4. Send Reminder Notification Node (Email to Approver)
5. Check Follow-Up Count:
   - If count >= 2 -> Escalate Request to Admin
   - Else -> Increment follow-up counter
6. Write Audit Log entry (`FOLLOWUP_SENT` / `AUTONOMOUS_ESCALATION`).

What NOT to change:
Do not spam notifications without checking last reminder timestamp.

Dependencies:
n8n Cron trigger.

Environment variables:
None.

Expected output:
Self-healing autonomous follow-up workflow JSON.

Verification steps:
Trigger cron manually in n8n and verify pending request scanning.
```

---

## 29. Escalation Workflow Prompt
```text
Objective:
Build emergency escalation workflow definition in /n8n/workflows/escalation-workflow.json.

What to inspect first:
Check decision router ESCALATE branch requirements.

Files/folders to create or modify:
- /n8n/workflows/escalation-workflow.json

Exact implementation requirements:
Nodes:
1. Webhook / Event Trigger (`ESCALATE`)
2. Gather Incident Context (Request details, low confidence score or missing policy reason)
3. Dispatch Priority Urgent Email / Slack notification to Operations Lead
4. Create high-priority review task in Supabase
5. Write Audit Log entry (`ESCALATION_DISPATCHED`).

What NOT to change:
Escalated items must never be auto-resolved without explicit human intervention.

Dependencies:
n8n.

Environment variables:
None.

Expected output:
Fail-safe operational escalation workflow JSON.

Verification steps:
Trigger escalation route and verify high-priority alert generation.
```

---

# AI PROMPTS

## 30. Gemini Decision Prompt
```text
Objective:
Define the master system prompt for Google Gemini in /backend/services/aiService.js and /prompts/ANTIGRAVITY_PROMPTS.md.

What to inspect first:
Check PRD Section 9 & 12 AI Decision Specs.

Files/folders to create or modify:
- /backend/services/aiService.js
- /prompts/ANTIGRAVITY_PROMPTS.md

Exact implementation requirements:
Use system instruction prompt:
```text
You are AURA (Autonomous Operations & Response Agent), an enterprise AI decision engine.
Analyze operational requests strictly using provided policy context.

RULES:
1. Output ONLY valid JSON matching this schema:
{
  "category": string,
  "priority": "low" | "medium" | "high" | "urgent",
  "confidence": number, // 0.00 to 1.00
  "decision": "AUTO_EXECUTE" | "NEEDS_APPROVAL" | "ESCALATE" | "REJECT",
  "reason": string, // Detailed explainability justification
  "required_action": string,
  "deadline": string | null,
  "missing_information": string[]
}
2. Decision Logic:
   - AUTO_EXECUTE: Request complies with retrieved policy AND confidence >= 0.90 AND no human approval explicitly mandated.
   - NEEDS_APPROVAL: Request complies with policy BUT policy mandates manager authorization OR cost/count threshold reached OR confidence is between 0.70 and 0.89.
   - ESCALATE: Request is ambiguous, confidence < 0.70, or violates standard rules requiring senior intervention.
   - REJECT: Request explicitly violates company policy.
3. NEVER invent policies. Base reasoning solely on provided Context.
```

What NOT to change:
Do not alter JSON keys or return markdown block wrappers around JSON.

Dependencies:
Gemini API.

Environment variables:
GEMINI_API_KEY.

Expected output:
Bulletproof JSON-generating system prompt.

Verification steps:
Test prompt with procurement demo request and assert strict JSON format.
```

---

## 31. Context Understanding Prompt
```text
Objective:
Define entity extraction and request intent classification prompt.

What to inspect first:
Check FR-03 AI Request Understanding requirements.

Files/folders to create or modify:
- /backend/services/aiService.js

Exact implementation requirements:
Formulate prompt extracting:
- Operational Intent (Procurement, Access Request, Leave, Expense, Maintenance)
- Quantities & Item Specs
- Key Target Dates & Deadlines
- Requester Role & Target Beneficiaries.

What NOT to change:
Ensure extraction missing_information array accurately lists omitted required specs.

Dependencies:
Gemini API.

Environment variables:
None.

Expected output:
High-precision entity extraction prompt.

Verification steps:
Pass demo text "Need 5 laptops for Monday" and verify extraction of quantity=5, deadline=Monday, item=laptops.
```

---

## 32. Policy Reasoning Prompt
```text
Objective:
Define policy compliance comparison prompt.

What to inspect first:
Check policy retrieval output structure.

Files/folders to create or modify:
- /backend/services/aiService.js

Exact implementation requirements:
Create reasoning prompt comparing extracted request parameters against retrieved policy chunks.
Ensure model explicitly cites section numbers/clause details in the `reason` field.

What NOT to change:
Do not allow hallucinated policy clauses.

Dependencies:
Gemini API.

Environment variables:
None.

Expected output:
Traceable, policy-backed AI explainability output.

Verification steps:
Verify `reason` text contains exact reference to retrieved policy rules.
```

---

## 33. Confidence Handling Prompt
```text
Objective:
Define confidence score algorithm and prompt calibration.

What to inspect first:
Check FR-07 Confidence-Based Decision Making specs.

Files/folders to create or modify:
- /backend/services/aiService.js

Exact implementation requirements:
Incorporate confidence scoring guidelines into prompt:
- 0.95+ Clear request, exact policy match, all parameters present
- 0.80-0.94 Valid request, policy match, slight parameter ambiguity
- 0.60-0.79 Missing details or partial policy match
- <0.60 Conflicting rules or high ambiguity.

What NOT to change:
Never auto-execute if confidence is below 0.90.

Dependencies:
Gemini API.

Environment variables:
None.

Expected output:
Calibrated confidence metric generation.

Verification steps:
Test complete vs incomplete request prompts and confirm appropriate confidence variance.
```

---

# INTEGRATION PROMPTS

## 34. Frontend + Backend Integration
```text
Objective:
Integrate Next.js frontend pages with backend service endpoints.

What to inspect first:
Check /frontend/lib/api.js and backend controllers.

Files/folders to create or modify:
- /frontend/lib/api.js
- /frontend/app/requests/page.js
- /frontend/app/requests/[id]/page.js
- /frontend/app/approvals/page.js

Exact implementation requirements:
Connect all UI actions to live API responses with reactive state updates, loading indicators, and toast error messages.

What NOT to change:
Keep client components modular and isolated.

Dependencies:
fetch / axios.

Environment variables:
NEXT_PUBLIC_BACKEND_URL.

Expected output:
End-to-end connected web application.

Verification steps:
Submit request in UI and observe instant update across dashboard, requests list, and database.
```

---

## 35. Backend + Supabase Integration
```text
Objective:
Verify seamless communication between Node.js backend services and Supabase database/storage.

What to inspect first:
Check /backend/config/supabase.js.

Files/folders to create or modify:
- /backend/config/supabase.js
- /backend/services/*

Exact implementation requirements:
Ensure all queries use parameterization, proper error handling, and connection pooling.

What NOT to change:
Do not bypass RLS for non-system client requests.

Dependencies:
@supabase/supabase-js.

Environment variables:
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

Expected output:
Fault-tolerant database integration layer.

Verification steps:
Run synthetic CRUD benchmark script against Supabase endpoints.
```

---

## 36. Backend + Gemini Integration
```text
Objective:
Integrate backend decision engine with official Google Gemini SDK.

What to inspect first:
Check /backend/services/aiService.js.

Files/folders to create or modify:
- /backend/services/aiService.js

Exact implementation requirements:
Initialize `@google/genai` (or `@google/generative-ai`) GoogleGenAI client with GEMINI_API_KEY. Implement automatic retry logic for rate limits and timeout handling.

What NOT to change:
Do not expose API key in logs or error traces.

Dependencies:
@google/genai.

Environment variables:
GEMINI_API_KEY.

Expected output:
Robust Gemini API integration service.

Verification steps:
Send request payload to Gemini service and print verified JSON output.
```

---

## 37. Backend + n8n Integration
```text
Objective:
Connect backend service triggers to n8n webhook orchestration endpoints.

What to inspect first:
Check /n8n/workflows/main-workflow.json trigger URLs.

Files/folders to create or modify:
- /backend/services/requestService.js
- /backend/services/approvalService.js

Exact implementation requirements:
Dispatch POST webhooks to n8n upon request creation and approval decision submission. Include HMAC signature or secret token header for security validation.

What NOT to change:
Do not block backend HTTP response if n8n webhook call is asynchronous.

Dependencies:
fetch.

Environment variables:
N8N_WEBHOOK_URL, N8N_SECRET_TOKEN.

Expected output:
Bi-directional backend-to-n8n workflow triggering.

Verification steps:
Trigger request flow and verify n8n execution log receipt.
```

---

## 38. n8n + Gmail Integration
```text
Objective:
Configure n8n Gmail / SMTP node for automated emails.

What to inspect first:
Check /n8n/workflows/main-workflow.json email nodes.

Files/folders to create or modify:
- /n8n/workflows/main-workflow.json
- /n8n/workflows/approval-workflow.json

Exact implementation requirements:
Configure email dispatch nodes with HTML templates for:
- Approval Request to Manager (with quick approve link)
- Request Fulfillment Confirmation to Employee
- Escalation Alert to Operations Team.

What NOT to change:
Do not hardcode email credentials inside workflow JSON. Use n8n environment variables.

Dependencies:
n8n Gmail Node / SMTP Node.

Environment variables:
SMTP_HOST, SMTP_USER, SMTP_PASS.

Expected output:
Automated operational email notifications.

Verification steps:
Test send email node in n8n and inspect formatted HTML email in inbox.
```

---

## 39. n8n + Calendar Integration
```text
Objective:
Configure n8n Google Calendar node for automated scheduling.

What to inspect first:
Check FR-09 Automated Actions requirements.

Files/folders to create or modify:
- /n8n/workflows/main-workflow.json

Exact implementation requirements:
Add optional action node creating onboarding / IT setup calendar events when procurement or onboarding requests are approved.

What NOT to change:
Do not fail overall request workflow if calendar API returns non-critical error.

Dependencies:
n8n Google Calendar Node.

Environment variables:
GOOGLE_CALENDAR_ID.

Expected output:
Seamless calendar invite generation upon request approval.

Verification steps:
Trigger onboarding request and check created event on demo calendar.
```

---

# TESTING PROMPTS

## 40. Frontend Testing
```text
Objective:
Perform end-to-end component rendering and routing validation on frontend.

What to inspect first:
Check /frontend/app subdirectories.

Files/folders to create or modify:
- /frontend

Exact implementation requirements:
Verify:
1. Zero client-side console errors
2. Clean responsive rendering on mobile and desktop
3. Form input sanitization and loading states
4. Active link styling across layout sidebar.

What NOT to change:
Do not introduce mock code that breaks production build.

Dependencies:
None.

Expected output:
100% clean frontend build.

Verification steps:
Run `npm run build` inside /frontend and confirm exit code 0.
```

---

## 41. Backend Testing
```text
Objective:
Validate backend service endpoints, controller logic, and error handling.

What to inspect first:
Check /backend routes and controllers.

Files/folders to create or modify:
- /backend

Exact implementation requirements:
Test:
1. Health check route (`GET /health`)
2. Request creation controller validation
3. Gemini AI response parsing resilience
4. Error handler response format.

What NOT to change:
Do not leak internal stack traces in production error responses.

Dependencies:
None.

Expected output:
Verified, error-free backend service layer.

Verification steps:
Run backend test suite or manual API endpoint verification checks.
```

---

## 42. Database Testing
```text
Objective:
Validate SQL schema constraints, pgvector matching performance, and seed data integrity.

What to inspect first:
Check /database SQL scripts.

Files/folders to create or modify:
- /database

Exact implementation requirements:
Verify:
1. All foreign keys and unique constraints function properly
2. Vector match query `match_policies` returns expected similarity scores (>0.75 for procurement query)
3. RLS rules prevent unauthorized access.

What NOT to change:
Do not drop production tables during verification.

Dependencies:
Supabase CLI / SQL Editor.

Environment variables:
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.

Expected output:
Verified database schema and vector search capability.

Verification steps:
Execute test vector query in Supabase SQL Editor and confirm output.
```

---

## 43. n8n Testing
```text
Objective:
Validate end-to-end n8n workflow execution paths.

What to inspect first:
Check /n8n/workflows JSON definitions.

Files/folders to create or modify:
- /n8n/workflows

Exact implementation requirements:
Test execution paths:
- AUTO_EXECUTE branch
- NEEDS_APPROVAL branch
- ESCALATE branch
- REJECT branch
Verify each branch updates Supabase and creates an audit log entry.

What NOT to change:
Do not leave mock webhook URLs in workflow definitions.

Dependencies:
n8n CLI / UI.

Expected output:
Fully operational n8n workflow suite.

Verification steps:
Trigger each branch manually and verify 100% execution success in n8n execution log.
```

---

## 44. End-to-End Testing
```text
Objective:
Execute the full hackathon core demo scenario end-to-end.

What to inspect first:
Check Demo Scenario specs in PRD section 26.

Files/folders to create or modify:
- /frontend
- /backend
- /database
- /n8n

Exact implementation requirements:
Scenario execution:
1. Submit: "We have 5 new employees joining Monday. They need laptops according to company policy."
2. Verify AI extracts quantity=5, deadline=Monday, category=procurement
3. Verify policy retrieval matches Procurement Policy
4. Verify AI decision = `NEEDS_APPROVAL` (confidence ~94%)
5. Verify approval record created & manager notified
6. Manager approves via /approvals UI
7. Verify n8n executes action & updates request status to `COMPLETED`
8. Verify complete audit trail timeline populated on /requests/[id].

What NOT to change:
Do not hardcode demo outcome; execute true dynamic pipeline.

Dependencies:
Full stack running.

Expected output:
Flawless end-to-end demo execution.

Verification steps:
Perform live demo walkthrough from request submit to final audit log verification.
```

---

## 45. Security Testing
```text
Objective:
Perform security audit against mandatory secure web skills guidelines.

What to inspect first:
Check mandatory-secure-web-skills reference.

Files/folders to create or modify:
- /frontend
- /backend

Exact implementation requirements:
Audit & verify:
1. No API keys or secrets in client-side bundles
2. HTML escaping / framework-native XSS prevention in Next.js JSX
3. Parameterized queries in database calls
4. RLS policies enforced in Supabase
5. Server ports bound strictly to localhost during local test mode.

What NOT to change:
Never compromise security rules for speed.

Dependencies:
None.

Expected output:
Zero critical security vulnerabilities.

Verification steps:
Inspect compiled frontend output and backend environment loading routines.
```

---

# FINALIZATION PROMPTS

## 46. Error Fixing Prompt
```text
Objective:
Diagnose and resolve any runtime, syntax, or environment errors across frontend, backend, database, and n8n.

What to inspect first:
Check server error logs, browser console output, and n8n execution errors.

Files/folders to create or modify:
Target specific error sources.

Exact implementation requirements:
Fix root cause without introducing breaking changes or masking symptoms with silent try-catches.

What NOT to change:
Do not disable linters or delete failing test assertions.

Dependencies:
None.

Expected output:
Zero runtime or build errors across all stack layers.

Verification steps:
Re-run build and verification commands after applying fixes.
```

---

## 47. Performance Optimization Prompt
```text
Objective:
Optimize application load times, vector search performance, and API response speeds.

What to inspect first:
Check Next.js bundle sizes and vector query indexes.

Files/folders to create or modify:
- /frontend/app
- /backend/services/policyService.js
- /database/schema.sql

Exact implementation requirements:
1. Enable Next.js image & asset optimization
2. Add IVFFlat index on pgvector column in Supabase
3. Implement in-memory caching for frequent policy lookups.

What NOT to change:
Do not sacrifice security or audit logging for micro-optimizations.

Dependencies:
None.

Expected output:
Sub-second dashboard loading and fast vector matching.

Verification steps:
Measure page load and API response latencies using browser performance tooling.
```

---

## 48. UI Polish Prompt
```text
Objective:
Perform final aesthetic, typography, spacing, and micro-animation pass across frontend.

What to inspect first:
Check PRD Design Aesthetics specifications.

Files/folders to create or modify:
- /frontend/app/globals.css
- /frontend/components/*

Exact implementation requirements:
Refine dark mode color palette (rich slate background `#090d16`, vibrant cyan accents `#06b6d4`, violet highlights `#8b5cf6`), glassmorphic backdrop filters, custom scrollbars, crisp typography scaling, and smooth state transitions.

What NOT to change:
Do not break layout responsiveness.

Dependencies:
lucide-react.

Expected output:
World-class, hackathon-winning UI aesthetic.

Verification steps:
Perform visual inspection across all screens.
```

---

## 49. Hackathon Demo Preparation Prompt
```text
Objective:
Prepare seed data, test scripts, and pre-warmed state for live hackathon presentation.

What to inspect first:
Check Core Demo Scenario guidelines.

Files/folders to create or modify:
- /database/seed.sql
- /docs/demo-script.md

Exact implementation requirements:
1. Populate database with realistic past requests and audit history
2. Create step-by-step presentation script detailing key innovation highlights (AI reasoning + policy RAG + n8n orchestration + human approval)
3. Ensure test procurement request ("We have 5 new employees joining Monday...") is ready to submit live.

What NOT to change:
Do not alter core workflow paths.

Dependencies:
None.

Expected output:
100% turnkey demo-ready platform.

Verification steps:
Run dry-run hackathon demo presentation from start to finish.
```

---

## 50. Deployment Prompt
```text
Objective:
Prepare project deployment configuration files for Vercel, Supabase, and n8n Cloud.

What to inspect first:
Check /frontend package.json and /backend configuration.

Files/folders to create or modify:
- /frontend/vercel.json (or Next.js deployment config)
- /docs/setup.md

Exact implementation requirements:
1. Ensure frontend builds smoothly for Vercel serverless deployment
2. Document environment variable requirements for production
3. Provide step-by-step n8n workflow import instructions in setup.md.

What NOT to change:
Do not check sensitive .env secret values into source control.

Dependencies:
None.

Expected output:
Production-ready deployment documentation and configuration.

Verification steps:
Run test production build `npm run build` locally.
```

---

## 51. Final Project Verification Prompt
```text
Objective:
Perform final end-to-end verification across the entire AURA workspace.

What to inspect first:
Inspect full workspace directory structure against strict project requirements.

Files/folders to create or modify:
None (Verification step).

Exact implementation requirements:
Verify:
1. Structure: /frontend, /backend, /n8n, /database, /prompts, /docs exist without extra root junk.
2. Code: Pure JavaScript only, no TypeScript, no MongoDB, no Firebase.
3. Functionality: Dashboard, Requests, Request Details, Approvals, Policies, Audit Log pages render flawlessly.
4. Core Scenario: Hackathon procurement demo runs seamlessly from request to audit log.
5. Compliance: 100% alignment with PRD and hackathon problem statement.

What NOT to change:
None.

Dependencies:
Full stack.

Expected output:
Complete, fully verified, hackathon-winning AURA Autonomous Operations & Response Agent platform.

Verification steps:
Output comprehensive completion summary confirming all requirements met.
```
