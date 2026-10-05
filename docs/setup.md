# AURA Installation & Setup Guide

## Quick Start (Hackathon Setup)

### Prerequisites
- Node.js 18+ & npm
- Supabase project (with PostgreSQL & `pgvector` enabled)
- Google Gemini API key
- n8n instance (Self-hosted or n8n Cloud)

### 1. Database Setup
1. Log into your Supabase Dashboard -> SQL Editor.
2. Run `/database/schema.sql` to initialize tables and `pgvector` extension.
3. Run `/database/policies.sql` to configure Row Level Security (RLS).
4. Run `/database/seed.sql` to load demo policies and hackathon test data.

### 2. Backend Environment Setup
Create `/backend/.env`:
```env
PORT=5000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
GEMINI_API_KEY=your-gemini-api-key
N8N_WEBHOOK_URL=http://localhost:5678/webhook/aura-request
```

### 3. Frontend Environment Setup
Create `/frontend/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### 4. n8n Import Setup
1. Open n8n -> Workflows -> Import from File.
2. Select `/n8n/workflows/main-workflow.json`.
3. Import `approval-workflow.json` and `followup-workflow.json`.
4. Configure environment credentials in n8n.
5. Activate all 3 workflows.

### 5. Running local development
```bash
# Terminal 1: Backend
cd backend
npm install
npm start

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```
Access dashboard at: `http://localhost:3000/dashboard`
