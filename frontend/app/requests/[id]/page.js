'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import StatusPill from '../../../components/StatusPill';
import { getRequestById, submitApprovalDecision } from '../../../lib/api';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ArrowLeft,
  GitCommit,
  BookOpen,
  History,
  Activity,
  CheckCircle2
} from 'lucide-react';

export default function RequestDetailsPage({ params }) {
  const [request, setRequest] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getRequestById(params.id);
      setRequest(data);
    }
    loadData();
  }, [params.id]);

  if (!request) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-[#F5F0E8]">
        <p className="text-xs font-mono text-[#716B61]">Loading Operational Intelligence...</p>
      </div>
    );
  }

  const handleDecision = async (status) => {
    setActionLoading(true);
    await submitApprovalDecision(request.id, status, approvalComment || 'Decision processed via Dashboard');
    const updated = await getRequestById(request.id);
    setRequest({ ...updated });
    setActionLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title={`Request #${request.id.slice(0, 8)}`} subtitle="Operational Request Lifecycle & Decision Pipeline" />

      <div className="p-8 space-y-6 max-w-6xl mx-auto w-full">
        <Link 
          href="/requests" 
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#716B61] hover:text-[#B85C38] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </Link>

        {/* Overview Header Panel */}
        <div className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-[#292722] tracking-tight">{request.title}</h1>
              <StatusPill type="status" value={request.status} />
            </div>
            <p className="text-xs text-[#716B61] max-w-2xl">{request.description}</p>
            <div className="flex items-center space-x-4 text-[11px] text-[#716B61] font-mono pt-1">
              <span>Submitted by: <strong className="text-[#292722]">{request.created_by_name || 'Evan Employee'}</strong></span>
              <span>•</span>
              <span>Category: <strong className="text-[#B85C38] uppercase">{request.category}</strong></span>
              <span>•</span>
              <span>Deadline: <strong className="text-[#292722]">{request.deadline || 'N/A'}</strong></span>
            </div>
          </div>

          <div className="p-4 rounded bg-[#EFE8DC] border border-[#DDD4C7] text-center min-w-[150px]">
            <span className="text-[10px] text-[#716B61] font-mono uppercase tracking-wider block">AI Confidence</span>
            <span className="text-2xl font-bold text-[#B85C38] font-mono">
              {Math.round((request.ai_confidence || 0.94) * 100)}%
            </span>
          </div>
        </div>

        {/* Structured AI Decision Lifecycle Stages Flow */}
        <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#716B61]">
            Decision Timeline Pipeline
          </span>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-[10px] font-mono font-bold">
            <div className="p-2.5 rounded bg-[#EFE8DC] border border-[#DDD4C7] text-[#292722]">1. REQUEST</div>
            <div className="p-2.5 rounded bg-[#EFE8DC] border border-[#DDD4C7] text-[#292722]">2. UNDERSTOOD</div>
            <div className="p-2.5 rounded bg-[#EFE8DC] border border-[#DDD4C7] text-[#292722]">3. POLICY CHECK</div>
            <div className="p-2.5 rounded bg-[#B85C38] text-white">4. {request.ai_decision}</div>
            <div className="p-2.5 rounded bg-[#EFE8DC] border border-[#DDD4C7] text-[#292722]">5. APPROVAL</div>
            <div className={`p-2.5 rounded border ${request.status === 'APPROVED' ? 'bg-[#B08D57] text-white' : 'bg-[#EFE8DC] text-[#716B61] border-[#DDD4C7]'}`}>
              6. {request.status === 'APPROVED' ? 'VERIFIED' : 'PENDING'}
            </div>
          </div>
        </div>

        {/* 2-Column Inspection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Col: Reasoning & Policy RAG */}
          <div className="space-y-6">
            
            {/* AI Decision Explainability Box */}
            <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD4C7] pb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">
                  AI Decision Reasoning
                </span>
                <StatusPill type="decision" value={request.ai_decision} />
              </div>
              <div className="p-3.5 rounded bg-[#F5F0E8] border border-[#DDD4C7] text-xs text-[#292722] font-mono leading-relaxed">
                {request.ai_reason}
              </div>
            </div>

            {/* Retrieved Policy Context */}
            <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-3">
              <div className="flex items-center justify-between border-b border-[#DDD4C7] pb-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#B85C38]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">
                    Retrieved Policy Context (pgvector)
                  </span>
                </div>
              </div>

              {request.retrieved_policy ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#292722]">
                    <span>{request.retrieved_policy.name}</span>
                    <span className="font-mono text-[10px] text-[#B08D57]">Similarity: {Math.round((request.retrieved_policy.similarity || 0.92) * 100)}%</span>
                  </div>
                  <div className="p-3.5 rounded bg-[#F5F0E8] border border-[#DDD4C7] text-xs text-[#716B61] italic font-serif">
                    &quot;{request.retrieved_policy.clause}&quot;
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#716B61] italic">No specific policy match required.</p>
              )}
            </div>

            {/* Human Authorization Box */}
            {request.status === 'PENDING_APPROVAL' && (
              <div className="p-5 rounded-lg bg-[#F5F0E8] border border-[#B85C38]/40 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B85C38] block">
                  Human Authorization Action
                </span>
                <p className="text-xs text-[#716B61]">
                  Policy Section 2 mandates manager authorization for laptop procurement orders exceeding 3 units.
                </p>

                <input
                  type="text"
                  placeholder="Approver comment..."
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  className="w-full p-2.5 rounded bg-[#FBF8F2] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
                />

                <div className="flex items-center space-x-3 pt-1">
                  <button
                    onClick={() => handleDecision('APPROVED')}
                    disabled={actionLoading}
                    className="flex-1 py-2 rounded bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-mono font-bold text-xs flex items-center justify-center space-x-1 transition shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve Request</span>
                  </button>

                  <button
                    onClick={() => handleDecision('REJECTED')}
                    disabled={actionLoading}
                    className="flex-1 py-2 rounded bg-[#F5F0E8] hover:bg-[#EFE8DC] text-[#991B1B] font-mono font-bold text-xs border border-[#991B1B]/30 flex items-center justify-center space-x-1 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject Request</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Col: Executed Actions & Audit Timeline */}
          <div className="space-y-6">
            
            {/* Executed Actions */}
            <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722] border-b border-[#DDD4C7] pb-2 block">
                Executed n8n Actions
              </span>
              <div className="space-y-2">
                {request.actions && request.actions.map((act, i) => (
                  <div key={i} className="p-3 rounded bg-[#F5F0E8] border border-[#DDD4C7] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-mono text-[#B85C38] font-bold block">{act.type}</span>
                      <span className="text-[#716B61]">{act.details}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8C6D38] border border-[#B08D57]/30 text-[10px] font-mono font-bold uppercase">
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Timeline */}
            <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722] border-b border-[#DDD4C7] pb-2 block">
                Audit Timeline
              </span>
              <div className="relative pl-4 border-l-2 border-[#DDD4C7] space-y-4 my-2">
                {request.audit_logs && request.audit_logs.map((log, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#B85C38]"></div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#716B61]">
                      <span className="font-bold text-[#292722]">{log.event}</span>
                      <span>{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#716B61] mt-0.5">{log.details}</p>
                    <span className="text-[10px] font-mono text-[#B85C38]">Actor: {log.actor}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
