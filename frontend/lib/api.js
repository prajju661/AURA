import { supabase } from './supabaseClient';

export const INITIAL_REQUESTS = [
  {
    id: "r1042000-0000-0000-0000-000000001042",
    title: "Procurement for New Onboarding Cohort",
    description: "We have 5 new employees joining Monday. They need laptops according to company policy.",
    category: "procurement",
    priority: "high",
    deadline: "2026-10-05",
    status: "PENDING_APPROVAL",
    ai_decision: "NEEDS_APPROVAL",
    ai_confidence: 0.94,
    ai_reason: "Request complies with procurement guidelines, but quantity (5 laptops) exceeds auto-execution limit of 3 units. Manager approval is mandated by Procurement Policy Section 2.",
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
    created_by_name: "Evan Employee",
    retrieved_policy: {
      name: "Procurement Policy",
      clause: "Section 2: Any procurement request exceeding 3 units or $2,500 total value REQUIRES explicit approval from Department Manager.",
      similarity: 0.92
    },
    actions: [
      { type: "EMAIL_NOTIFICATION", status: "SUCCESS", details: "Approval email dispatched to morgan@aura.org" }
    ],
    audit_logs: [
      { event: "REQUEST_RECEIVED", actor: "Employee Evan", timestamp: "10:30 AM", details: "Submitted via Web Dashboard" },
      { event: "AI_ANALYSIS_COMPLETED", actor: "Gemini AI Engine", timestamp: "10:31 AM", details: "Extracted quantity=5, deadline=Monday, category=procurement" },
      { event: "POLICY_RETRIEVED", actor: "pgvector RAG", timestamp: "10:31 AM", details: "Matched Procurement Policy (Similarity: 92%)" },
      { event: "DECISION_GENERATED", actor: "AURA Decision Engine", timestamp: "10:32 AM", details: "Decision = NEEDS_APPROVAL (Confidence: 94%)" },
      { event: "APPROVAL_REQUESTED", actor: "n8n Workflow Engine", timestamp: "10:32 AM", details: "Approval task created for Manager Morgan" }
    ]
  },
  {
    id: "r1041000-0000-0000-0000-000000001041",
    title: "GitHub Developer License Access",
    description: "Requesting GitHub Copilot Enterprise license key for Q4 projects.",
    category: "it_access",
    priority: "medium",
    deadline: "2026-10-10",
    status: "AUTO_EXECUTED",
    ai_decision: "AUTO_EXECUTE",
    ai_confidence: 0.98,
    ai_reason: "Standard role-based developer tool request. Standard IT policy permits auto-provisioning for active engineering staff.",
    created_at: new Date(Date.now() - 120 * 60000).toISOString(),
    created_by_name: "Sarah Dev",
    retrieved_policy: {
      name: "IT Access Control Policy",
      clause: "Section 1: Standard developer licenses are auto-approved for verified active engineering employees.",
      similarity: 0.96
    },
    actions: [
      { type: "API_PROVISIONING", status: "SUCCESS", details: "GitHub Copilot Enterprise seat provisioned" },
      { type: "EMAIL_NOTIFICATION", status: "SUCCESS", details: "Access link sent to sarah@aura.org" }
    ],
    audit_logs: [
      { event: "REQUEST_RECEIVED", actor: "Sarah Dev", timestamp: "08:45 AM", details: "Submitted request" },
      { event: "AI_ANALYSIS_COMPLETED", actor: "Gemini AI Engine", timestamp: "08:45 AM", details: "Category: IT Access, Priority: Medium" },
      { event: "DECISION_GENERATED", actor: "AURA Decision Engine", timestamp: "08:46 AM", details: "Decision = AUTO_EXECUTE (Confidence: 98%)" },
      { event: "ACTION_EXECUTED", actor: "n8n Workflow Engine", timestamp: "08:46 AM", details: "License seat assigned via API" }
    ]
  },
  {
    id: "r1040000-0000-0000-0000-000000001040",
    title: "Production AWS Root Credentials Access",
    description: "Need full admin access to production AWS root account to inspect database lag.",
    category: "it_access",
    priority: "urgent",
    deadline: "ASAP",
    status: "ESCALATED",
    ai_decision: "ESCALATE",
    ai_confidence: 0.65,
    ai_reason: "Request seeks root administrative production access which violates standard Security Policy Section 2. Escalated to Chief Security Officer.",
    created_at: new Date(Date.now() - 240 * 60000).toISOString(),
    created_by_name: "David Admin",
    retrieved_policy: {
      name: "IT Access Control Policy",
      clause: "Section 2: Production AWS root administrative access requires Security Officer authorization.",
      similarity: 0.88
    },
    actions: [
      { type: "SLACK_ALERT", status: "SUCCESS", details: "Security alert sent to #security-ops channel" }
    ],
    audit_logs: [
      { event: "REQUEST_RECEIVED", actor: "David Admin", timestamp: "06:15 AM", details: "Submitted urgent access request" },
      { event: "AI_ANALYSIS_COMPLETED", actor: "Gemini AI Engine", timestamp: "06:16 AM", details: "Detected sensitive scope violation" },
      { event: "DECISION_GENERATED", actor: "AURA Decision Engine", timestamp: "06:16 AM", details: "Decision = ESCALATE (Confidence: 65%)" },
      { event: "ESCALATION_DISPATCHED", actor: "n8n Workflow Engine", timestamp: "06:17 AM", details: "Alert sent to CSO" }
    ]
  }
];

export const INITIAL_POLICIES = [
  {
    id: "p1",
    name: "Procurement Policy",
    category: "Procurement",
    content: "1. Overview: Standard laptop allocation for new hires includes high-performance hardware.\n2. Approval Rules: Any procurement request exceeding 3 units or $2,500 total value REQUIRES explicit approval from the Department Manager before order placement.\n3. Fulfillment: IT asset team processes approved orders within 48 hours.",
    updated_at: "2026-10-01"
  },
  {
    id: "p2",
    name: "IT Access Control Policy",
    category: "IT Access",
    content: "1. Standard Access: Role-based access to GitHub, Slack, and Email is auto-provisioned upon onboarding verification.\n2. Privileged Access: Production AWS / Database administrative access requires Security Officer authorization.",
    updated_at: "2026-09-28"
  },
  {
    id: "p3",
    name: "Expense Reimbursement Policy",
    category: "Expense",
    content: "1. Submissions: Expenses under $100 for office supplies are auto-approved.\n2. Travel & High Value: Expenses over $100 require receipt upload and manager sign-off.",
    updated_at: "2026-09-25"
  }
];

export async function getRequests() {
  try {
    const { data, error } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return INITIAL_REQUESTS;
    }
    return data;
  } catch (err) {
    return INITIAL_REQUESTS;
  }
}

export async function getRequestById(id) {
  const requests = await getRequests();
  return requests.find(r => r.id === id) || INITIAL_REQUESTS[0];
}

export async function getPolicies() {
  try {
    const { data, error } = await supabase.from('policies').select('*');
    if (error || !data || data.length === 0) {
      return INITIAL_POLICIES;
    }
    return data;
  } catch (err) {
    return INITIAL_POLICIES;
  }
}

export async function submitApprovalDecision(requestId, status, comment) {
  // Update state in memory / Supabase
  const req = INITIAL_REQUESTS.find(r => r.id === requestId);
  if (req) {
    req.status = status === 'APPROVED' ? 'APPROVED' : 'REJECTED';
    req.audit_logs.push({
      event: status === 'APPROVED' ? 'APPROVED' : 'REJECTED',
      actor: 'Manager Morgan',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details: `Status set to ${status}. Comment: ${comment}`
    });
    if (status === 'APPROVED') {
      req.actions.push({
        type: 'ORDER_FULFILLMENT',
        status: 'SUCCESS',
        details: 'n8n workflow triggered laptop procurement order with vendor.'
      });
      req.audit_logs.push({
        event: 'ACTION_EXECUTED',
        actor: 'n8n Workflow Engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: 'Procurement order placed successfully.'
      });
    }
  }
  return { success: true, request: req };
}
