# AURA API Documentation

## Webhook & API Endpoints

### 1. Submit Request Trigger
- **Endpoint**: `POST /api/v1/request` (n8n Webhook)
- **Description**: Receives a new operational request from frontend or external integrations.
- **Request Body**:
```json
{
  "title": "Procurement for New Onboarding Cohort",
  "description": "We have 5 new employees joining Monday. They need laptops according to company policy.",
  "category": "procurement",
  "priority": "high",
  "deadline": "2026-10-05",
  "created_by": "e2222222-2222-2222-2222-222222222222"
}
```
- **Response**:
```json
{
  "request_id": "r1042000-0000-0000-0000-000000001042",
  "status": "RECEIVED",
  "ai_decision": "NEEDS_APPROVAL",
  "confidence": 0.94
}
```

### 2. Approval Callback
- **Endpoint**: `POST /api/v1/approval-callback`
- **Description**: Handles manager approve/reject actions.
- **Request Body**:
```json
{
  "approval_id": "ap104200-0000-0000-0000-000000001042",
  "request_id": "r1042000-0000-0000-0000-000000001042",
  "status": "APPROVED",
  "comment": "Laptops approved as per Q4 onboarding budget."
}
```

### 3. Policy Similarity Search (RPC)
- **Endpoint**: `POST /rest/v1/rpc/match_policies`
- **Request Body**:
```json
{
  "query_embedding": [... 768 floats ...],
  "match_threshold": 0.75,
  "match_count": 3
}
```
