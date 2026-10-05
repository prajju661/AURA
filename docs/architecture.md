# AURA Architecture & System Blueprint

## System Overview
AURA (Autonomous Operations & Response Agent) is designed around a modular, decoupled architecture:

```
                  USER (Browser)
                       │
                       ▼
           ┌───────────────────────┐
           │   Next.js Frontend    │
           │ (Dashboard / Web App) │
           └───────────┬───────────┘
                       │
                       ▼
             n8n Webhook / API
                       │
                       ▼
           ┌───────────────────────┐
           │    n8n Workflow       │
           │  Orchestration Layer  │
           └───────────┬───────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
  Google Gemini     Supabase        pgvector
   AI Engine       PostgreSQL      Policy RAG
       │               │               │
       └───────────────┼───────────────┘
                       ▼
               Decision Engine
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   AUTO_EXECUTE  NEEDS_APPROVAL   ESCALATE / REJECT
        │              │              │
        ▼              ▼              ▼
     Actions        Manager         Alerts
   (SMTP/Cal)       Portal        (Ops Lead)
        │              │              │
        └──────────────┼──────────────┘
                       ▼
               Audit Trail & Memory
```

## Stack Components

| Layer | Technology | Role & Purpose |
|---|---|---|
| **Face / UX** | Next.js 14, Tailwind CSS, Lucide icons | Command Center Dashboard & Request Lifecycle Viewer |
| **Orchestrator** | n8n Workflows | Stateful workflow routing, webhook execution & follow-ups |
| **Brain** | Google Gemini API (1.5 Flash / Pro) | Structured JSON reasoning, intent extraction & explainability |
| **Knowledge** | Supabase `pgvector` | Vector search (`match_policies` RPC) for policy-aware decisioning |
| **Memory** | Supabase PostgreSQL | Relational store for users, requests, approvals, actions, audit logs |
| **Hands** | SMTP / Gmail & Google Calendar | Automated fulfillment actions and notification dispatchers |
