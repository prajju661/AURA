'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import StatusPill from '../../components/StatusPill';
import Link from 'next/link';
import { getRequests, submitApprovalDecision } from '../../lib/api';
import { Check, X, Shield, ArrowRight } from 'lucide-react';

export default function ApprovalsPage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [comment, setComment] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getRequests();
      setPendingRequests(data.filter(r => r.status === 'PENDING_APPROVAL' || r.ai_decision === 'NEEDS_APPROVAL'));
    }
    loadData();
  }, []);

  const handleAction = async (requestId, status) => {
    setLoading(true);
    await submitApprovalDecision(requestId, status, comment[requestId] || 'Approved via Manager Portal');
    const data = await getRequests();
    setPendingRequests(data.filter(r => r.status === 'PENDING_APPROVAL' || r.ai_decision === 'NEEDS_APPROVAL'));
    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="Manager Approval Portal" subtitle="Human-in-the-Loop Operations Authorization" />

      <div className="p-8 space-y-6 max-w-5xl mx-auto w-full">
        {/* Banner */}
        <div className="p-4 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Shield className="w-5 h-5 text-[#B85C38]" />
            <div>
              <h2 className="text-xs font-bold text-[#292722]">Pending Human Authorization Queue</h2>
              <p className="text-[11px] text-[#716B61]">Review policy compliance and AI decision reasoning before authorizing.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#B85C38]/10 text-[#B85C38] text-xs font-mono font-bold border border-[#B85C38]/20">
            {pendingRequests.length} Pending
          </span>
        </div>

        {/* List */}
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="p-12 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] text-center space-y-2">
              <Check className="w-8 h-8 text-[#B08D57] mx-auto" />
              <h3 className="text-sm font-bold text-[#292722]">Approval Queue Clear</h3>
              <p className="text-xs text-[#716B61]">There are no pending authorizations requiring review.</p>
            </div>
          ) : (
            pendingRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#DDD4C7] pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-[#B85C38] font-bold">#{req.id.slice(0, 8)}</span>
                      <h3 className="text-sm font-bold text-[#292722]">{req.title}</h3>
                      <StatusPill type="priority" value={req.priority} />
                    </div>
                    <p className="text-[11px] text-[#716B61] mt-0.5">Submitted by {req.created_by_name || 'Evan Employee'} • Category: {req.category}</p>
                  </div>
                  <Link 
                    href={`/requests/${req.id}`}
                    className="text-xs font-mono text-[#B85C38] hover:underline flex items-center gap-1"
                  >
                    <span>Full Context</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded bg-[#F5F0E8] border border-[#DDD4C7]">
                    <span className="text-[10px] font-mono text-[#716B61] block mb-0.5">Request Details</span>
                    <p className="text-[#292722]">{req.description}</p>
                  </div>

                  <div className="p-3 rounded bg-[#F5F0E8] border border-[#DDD4C7]">
                    <span className="text-[10px] font-mono text-[#B85C38] font-bold block mb-0.5">Gemini AI Reasoning (94% confidence)</span>
                    <p className="text-[#716B61] italic">{req.ai_reason}</p>
                  </div>
                </div>

                <div className="pt-1 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3">
                  <input
                    type="text"
                    placeholder="Approver comment..."
                    value={comment[req.id] || ''}
                    onChange={(e) => setComment({ ...comment, [req.id]: e.target.value })}
                    className="w-full md:flex-1 p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
                  />

                  <div className="flex items-center space-x-2 w-full md:w-auto">
                    <button
                      onClick={() => handleAction(req.id, 'APPROVED')}
                      disabled={loading}
                      className="px-4 py-2 rounded bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-mono font-bold text-xs flex items-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleAction(req.id, 'REJECTED')}
                      disabled={loading}
                      className="px-4 py-2 rounded bg-[#F5F0E8] hover:bg-[#EFE8DC] text-[#991B1B] font-mono font-bold text-xs border border-[#991B1B]/30 flex items-center space-x-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
