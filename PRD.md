# PRD — AURA (Autonomous Operations & Response Agent)

**Hackathon:** HackSprint – 24-Hour Hackathon  
**Track:** AI Automation with n8n  
**Problem Statement:** PS22  
**Version:** 1.0  
**Status:** MVP / Hackathon Build  

---

## 1. Product Overview

### Product Name
**AURA — Autonomous Operations & Response Agent**

### Tagline
*Understand. Decide. Act. Follow Up.*

### Product Description
AURA is an AI-powered autonomous workflow system that converts unstructured operational requests into intelligent, traceable actions.

It uses **n8n** as the workflow orchestration layer, **Google Gemini** as the reasoning engine, and **Supabase** as the data and knowledge layer.

AURA can understand a request, retrieve relevant organizational policies, make a decision, execute an appropriate action, request human approval when necessary, and automatically follow up on pending tasks.

---

## 2. Problem Statement

Organizations receive operational requests through multiple channels such as:
- Emails
- Forms
- Documents
- APIs
- Internal requests

Employees must manually:
- Read the request
- Understand the context
- Find relevant information
- Check policies
- Decide what to do
- Contact the appropriate person
- Track the request
- Follow up
- Escalate delayed requests

**This results in:**
- Repetitive manual work
- Slow processing
- Missed follow-ups
- Inconsistent decisions
- Lack of visibility
- Human errors

---

## 3. Proposed Solution

AURA creates an autonomous operational workflow.

```
Request
   ↓
Understand
   ↓
Retrieve Context
   ↓
Check Policy
   ↓
Reason
   ↓
Decide
   ↓
Act / Ask / Escalate
   ↓
Verify
   ↓
Follow Up
   ↓
Close
```

The system automates routine decisions while keeping humans involved whenever human judgment or authorization is required.

---

## 4. Goals

### Primary Goals
- Automate repetitive operational workflows.
- Use AI for contextual understanding and decision-making.
- Reduce unnecessary human intervention.
- Provide policy-aware decisions.
- Automatically perform follow-ups.
- Maintain a complete audit trail.
- Provide explainable AI decisions.

### Hackathon Goal
Demonstrate a complete workflow where:  
`One request → AI reasoning → policy/context → decision → action/approval → follow-up → audit trail`

---

## 5. Target Users

### Primary Users
- Operations teams
- HR teams
- IT teams
- Administrative teams
- Managers

### Secondary Users
- Employees
- Team leads
- Organization administrators

---

## 6. Core Use Case

### Example: Procurement Request

User submits:
> *"We have 5 new employees joining Monday. They need laptops according to company policy."*

**AURA processes it:**
```
Request received
      ↓
AI identifies procurement request
      ↓
Extracts quantity = 5
      ↓
Detects deadline = Monday
      ↓
Retrieves procurement policy
      ↓
Checks approval requirement
      ↓
Decision = NEEDS_APPROVAL
      ↓
Manager receives approval request
      ↓
Manager approves
      ↓
n8n executes next action
      ↓
Request updated
      ↓
Audit log created
```

---

## 7. Functional Requirements

### FR-01 — User Authentication
Users should be able to securely log in.

#### Requirements
- Login
- Logout
- User session
- Role-based access

#### Roles
- **Admin**: Manage policies, View all requests, View analytics
- **Employee**: Submit requests, View own requests, Track status
- **Approver**: Review approval requests, Approve/reject requests

---

### FR-02 — Request Submission
Users should be able to submit an operational request.

#### Input fields
- Title
- Description
- Category (optional)
- Deadline (optional)
- Attachment (optional)

The system should send the request to the n8n webhook.

---

### FR-03 — AI Request Understanding
Gemini should analyze the request.

#### AI should extract:
- Category
- Priority
- Deadline
- Entities
- Required action
- Missing information
- Confidence score

#### Example Output:
```json
{
  "category": "procurement",
  "priority": "high",
  "deadline": "2026-10-05",
  "confidence": 0.94
}
```

---

### FR-04 — Context Retrieval
Before making a decision, AURA should retrieve relevant information.

#### Sources:
- Organizational policies
- Previous requests
- Existing records
- Knowledge base

The retrieved information is provided to the AI as context.

---

### FR-05 — Policy Knowledge Base
Administrators should be able to upload organizational policy documents.

#### Examples:
- Procurement Policy
- IT Access Policy
- Leave Policy
- Expense Policy

#### System Process:
```
Upload Document → Extract Text → Create Chunks → Generate Embeddings → Store in pgvector → Retrieve Relevant Context
```

---

### FR-06 — AI Decision Engine
AURA should make one of four decisions:

1. **AUTO_EXECUTE**: Safe to perform automatically.
2. **NEEDS_APPROVAL**: Human authorization is required.
3. **ESCALATE**: The request is uncertain, overdue, or requires higher-level intervention.
4. **REJECT**: The request violates a policy or cannot be fulfilled.

---

### FR-07 — Confidence-Based Decision Making
The AI should provide a confidence score.

#### Routing Rules:
- **Confidence > 90%**: Auto-process when policy permits
- **Medium confidence**: Human approval
- **Low confidence**: Escalate

*Note: The exact thresholds should be configurable rather than hard-coded into the UI.*

---

### FR-08 — Human-in-the-Loop Approval

```
AI Decision → Approval Record → Approver Notification → Approve / Reject → n8n continues workflow
```

#### Approval Record details:
- Approver
- Decision
- Comment
- Timestamp

---

### FR-09 — Automated Actions
n8n should execute appropriate actions.

#### Possible actions:
- Send email
- Create calendar event
- Update database
- Send notification
- Trigger another workflow
- Create task

---

### FR-10 — Autonomous Follow-Up
AURA should monitor pending requests.

```
Request Pending → Wait → Check Status → No Response? → Send Reminder → Still Pending? → Escalate
```

Every follow-up should be recorded.

---

### FR-11 — Audit Trail
Every significant event should be recorded.

#### Example Log Timeline:
- `10:30` — Request received
- `10:31` — AI analysis completed
- `10:31` — Policy retrieved
- `10:32` — Approval requested
- `10:45` — Approved
- `10:46` — Action executed

Users should be able to view the complete timeline from the request details page.

---

### FR-12 — Dashboard
The dashboard should provide a high-level overview.

#### Metrics:
- Total requests
- Automated requests
- Pending approvals
- Escalated requests
- Completed requests
- Estimated time saved

#### Request Table Columns:
| Request ID | Category | Priority | Status | AI Decision | Confidence |
|---|---|---|---|---|---|
| #1042 | Procurement | High | Pending Approval | NEEDS_APPROVAL | 94% |

---

### FR-13 — Request Details Page
The page should display:
- **Original Request**: What the user submitted.
- **AI Analysis**: Category, Priority, Deadline, Confidence.
- **Context Used**: Relevant policy information.
- **Decision**: Decision, Reason, Required Action.
- **Actions**: Actions performed by n8n.
- **Audit Timeline**: Complete request history.

---

## 8. Non-Functional Requirements

### Performance
- Dashboard should load quickly.
- AI workflow should provide feedback within a reasonable time.
- n8n workflows should handle failures gracefully.

### Security
- API keys must remain server-side.
- Authentication must be enabled.
- Database access should use appropriate RLS policies.
- Users should only access permitted data.

### Reliability
- Failed workflows should be logged.
- AI failures should not silently execute actions.
- Uncertain decisions should move to human review.

### Explainability
Every AI decision should include:
- Decision
- Confidence
- Reason
- Context/policy used

---

## 9. Technology Stack

- **Frontend**: Next.js, JavaScript, Tailwind CSS, shadcn/ui
- **Automation**: n8n (Primary workflow orchestration engine)
- **AI**: Google Gemini API (Understanding, Extraction, Reasoning, Classification, Decision generation)
- **Backend / Database**: Supabase (PostgreSQL, Authentication, Storage, pgvector)
- **Integrations**: Gmail / SMTP, Google Calendar, Webhooks, REST APIs
- **Deployment**: Vercel, n8n Cloud, GitHub

---

## 10. System Architecture

```
                  USER
                   │
                   ▼
           ┌───────────────┐
           │    Next.js    │
           │   Dashboard   │
           └───────┬───────┘
                   │
                   ▼
             n8n Webhook
                   │
                   ▼
           ┌───────────────┐
           │      n8n      │
           │ Orchestrator  │
           └───────┬───────┘
                   │
       ┌───────────┼───────────┐
       ▼           ▼           ▼
    Gemini      Supabase    pgvector
      AI           DB       Policy KB
       │           │           │
       └───────────┼───────────┘
                   ▼
            Decision Engine
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
      Execute    Approval   Escalate
        │          │          │
        └──────────┼──────────┘
                   ▼
              Follow-up
                   │
                   ▼
              Audit Log
                   │
                   ▼
             Dashboard
```

---

## 11. Database Design

### `users`
- `id`
- `name`
- `email`
- `role`
- `created_at`

### `requests`
- `id`
- `title`
- `description`
- `category`
- `priority`
- `deadline`
- `status`
- `ai_decision`
- `ai_confidence`
- `ai_reason`
- `created_by`
- `created_at`

### `policies`
- `id`
- `name`
- `content`
- `embedding`
- `created_at`

### `approvals`
- `id`
- `request_id`
- `approver_id`
- `status`
- `comment`
- `created_at`

### `actions`
- `id`
- `request_id`
- `action_type`
- `status`
- `result`
- `executed_at`

### `audit_logs`
- `id`
- `request_id`
- `event`
- `actor`
- `details`
- `timestamp`

---

## 12. n8n Workflow

### Main Workflow
`Webhook → Validate Request → Fetch Request Context → Retrieve Policy → Gemini AI Agent → Parse Decision → Decision Router`

### Routing
```
             Decision
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
AUTO_EXECUTE  APPROVAL   ESCALATE
      │          │          │
      ▼          ▼          ▼
   Action     Notify     Notify
      │       Approver   Manager
      │          │
      └──────────┼──────────┘
                 ▼
             Update DB
                 ↓
             Audit Log
```

---

## 13. MVP Scope

Because this is a 24-hour hackathon, the MVP will focus on one complete workflow.

### Must Have
- Authentication
- Dashboard
- Request submission
- n8n webhook
- Gemini AI analysis
- Policy retrieval
- Decision engine
- Human approval
- Email notification
- Audit trail

### Secondary
- Automated follow-up
- Google Calendar
- Multiple input sources
- Analytics

### Not in MVP
- Voice assistant
- Mobile application
- Complex multi-agent architecture
- Large-scale enterprise integrations

---

## 14. Demo Flow Scenario

1. **Employee submits request**: *"We have 5 new employees joining Monday. They need laptops according to company policy."*
2. Receive request
3. Understand request
4. Identify procurement
5. Retrieve procurement policy
6. Analyze approval requirement
7. Generate decision
8. Request manager approval
9. Manager approves
10. Execute action
11. Update database
12. Record audit trail

---

## 15. Success Metrics

- **Automation**: Percentage of routine workflow completed automatically
- **Decision Quality**: AI decision + confidence + policy context
- **Human Intervention**: Human involvement only when required
- **Efficiency**: Reduction in manual processing steps
- **Traceability**: 100% of major workflow events recorded

---

## 16. Unique Selling Proposition

AURA goes beyond simple automation by combining AI reasoning, organizational context, policy awareness, human approval, and autonomous follow-up into one workflow.

> **Core principle:** AI decides. n8n executes. Humans control critical decisions.

---

## 17. Future Scope
- Multi-agent collaboration
- More enterprise integrations
- Advanced analytics
- Voice-based requests
- Role-specific AI agents
- Predictive workflow escalation
- Organization-wide automation marketplace

---

## 18. Final Product Vision

AURA transforms repetitive operational processes into intelligent autonomous workflows, allowing organizations to spend less time managing tasks and more time making meaningful decisions.
