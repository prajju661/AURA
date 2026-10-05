# AURA — Autonomous Operations & Response Agent

> **Tagline**: *Understand. Decide. Act. Follow Up.*

AURA is an AI-powered autonomous operations platform that converts unstructured operational requests into intelligent, policy-aware, traceable actions.

Built for **HackSprint 24-Hour Hackathon** (Track: AI Automation with n8n, Problem Statement: PS22).

---

## 🏗️ Project Architecture & Structure

```text
aura/
│
├── frontend/          # Next.js 14 App Router (JS, Tailwind CSS, Lucide icons)
│   ├── app/           # App router pages (/dashboard, /requests, /approvals, etc.)
│   ├── components/    # Reusable enterprise UI components
│   ├── lib/           # Supabase client & API services
│   └── public/        # Static assets
│
├── backend/           # Node.js service layer
│   ├── services/      # Gemini AI, pgvector RAG, Decision Engine, Approvals, Audit
│   ├── controllers/   # Request & Approval API handlers
│   ├── routes/        # Express REST endpoints
│   ├── utils/         # JSON parser & logger
│   └── config/        # Supabase & Gemini credentials
│
├── n8n/               # Workflow orchestration JSON definitions
│   └── workflows/     # Main, Approval, Follow-up, & Escalation workflows
│
├── database/          # Database definitions & seeds
│   ├── schema.sql     # PostgreSQL + pgvector 6 core tables
│   ├── seed.sql       # Demo scenario seed data
│   └── policies.sql   # Supabase RLS security policies
│
├── prompts/           # Antigravity master build prompts
│   └── ANTIGRAVITY_PROMPTS.md  # 52 copy-paste ready build prompts (0-51)
│
├── docs/              # Documentation
│   ├── architecture.md
│   ├── api.md
│   └── setup.md
│
├── README.md
└── .gitignore
```

---

## 💡 Core Demo Scenario

**Manager Request**:
> *"We have 5 new employees joining Monday. They need laptops according to company policy."*

**AURA Autonomous Execution Loop**:
1. **Receive**: Request submitted via dashboard.
2. **Understand**: Gemini extracts `quantity=5`, `deadline=Monday`, `category=procurement`.
3. **Retrieve**: pgvector retrieves matched *Procurement Policy*.
4. **Decide**: AI determines `NEEDS_APPROVAL` (94% confidence) because unit count > 3.
5. **Ask**: Approval task dispatched to Manager Morgan.
6. **Act**: Manager approves -> n8n executes order fulfillment action.
7. **Audit**: 100% of event lifecycle recorded in immutable audit logs.

---

## 🔒 Security
- Server secrets (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are isolated strictly in backend/n8n.
- Row Level Security (RLS) policies guard database access.
- Strict JSON schema validation prevents unstructured LLM execution risks.

---

## 📄 Documentation
- [Architecture Blueprint](file:///e:/AURO/docs/architecture.md)
- [API Reference](file:///e:/AURO/docs/api.md)
- [Setup Guide](file:///e:/AURO/docs/setup.md)
- [Master Prompts](file:///e:/AURO/prompts/ANTIGRAVITY_PROMPTS.md)
- [PRD Document](file:///e:/AURO/PRD.md)
