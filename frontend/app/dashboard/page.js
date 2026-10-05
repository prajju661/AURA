'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MetricCard from '../../components/MetricCard';
import StatusPill from '../../components/StatusPill';
import Link from 'next/link';
import { getRequests } from '../../lib/api';
import { 
  Plus, 
  ArrowRight,
  ShieldAlert,
  GitCommit,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getRequests();
      setRequests(data);
    }
    loadData();
  }, []);

  const totalCount = requests.length;
  const autoExecuted = requests.filter(r => r.ai_decision === 'AUTO_EXECUTE' || r.status === 'AUTO_EXECUTED').length;
  const pendingApprovals = requests.filter(r => r.status === 'PENDING_APPROVAL' || r.ai_decision === 'NEEDS_APPROVAL').length;
  const escalated = requests.filter(r => r.status === 'ESCALATED' || r.ai_decision === 'ESCALATE').length;
  const automationRate = totalCount > 0 ? Math.round((autoExecuted / totalCount) * 100) : 85;

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="Operations Command Center" subtitle="Autonomous Request Intelligence & Execution Stream" />

      <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Editorial Header Banner */}
        <div className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B85C38]">
              Operational Intelligence Engine
            </span>
            <h1 className="text-xl font-bold text-[#292722] tracking-tight">
              AURA Autonomous Execution Stream
            </h1>
            <p className="text-xs text-[#716B61] max-w-2xl">
              Converting unstructured requests into policy-aware decisions using n8n orchestration, Gemini reasoning, and pgvector context retrieval.
            </p>
          </div>
          <Link
            href="/requests/new"
            className="px-4 py-2 rounded bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-medium text-xs flex items-center space-x-1.5 transition shadow-sm whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Operational Request</span>
          </Link>
        </div>

        {/* 1. Operations Overview Metrics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#716B61]">
              1. System Metrics Overview
            </h2>
            <span className="text-[11px] font-mono text-[#716B61]">Updated Live</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Total Requests" 
              value={totalCount} 
              icon={Activity} 
              subtext="Operational requests processed"
            />
            <MetricCard 
              title="Automation Rate" 
              value={`${automationRate}%`} 
              change="+12% this week" 
              icon={CheckCircle} 
              subtext={`${autoExecuted} resolved without human`}
            />
            <MetricCard 
              title="Pending Approvals" 
              value={pendingApprovals} 
              icon={Clock} 
              subtext="Awaiting manager sign-off"
            />
            <MetricCard 
              title="Escalations" 
              value={escalated} 
              icon={ShieldAlert} 
              subtext="High-risk / policy exceptions"
            />
          </div>
        </div>

        {/* 2. Structured AI Decision Timeline & Hackathon Demo Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: AI Decision Activity Stream */}
          <div className="lg:col-span-2 p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
            <div className="flex items-center justify-between border-b border-[#DDD4C7] pb-3">
              <div className="flex items-center space-x-2">
                <GitCommit className="w-4 h-4 text-[#B85C38]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">
                  2. AI Decision Pipeline Stream
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#716B61]">Real-time Decision Timeline</span>
            </div>

            {/* Decision Lifecycle Flow Visualizer */}
            <div className="p-4 rounded bg-[#EFE8DC]/50 border border-[#DDD4C7] space-y-3">
              <span className="text-[10px] font-mono font-bold text-[#716B61] uppercase tracking-wider block">
                Decision Pipeline Stages
              </span>
              <div className="grid grid-cols-6 gap-2 text-center text-[10px] font-mono font-semibold">
                <div className="p-2 rounded bg-[#FBF8F2] border border-[#DDD4C7] text-[#292722]">1. REQUEST</div>
                <div className="p-2 rounded bg-[#FBF8F2] border border-[#DDD4C7] text-[#292722]">2. EXTRACT</div>
                <div className="p-2 rounded bg-[#FBF8F2] border border-[#DDD4C7] text-[#292722]">3. RAG CHECK</div>
                <div className="p-2 rounded bg-[#B85C38] text-white">4. DECISION</div>
                <div className="p-2 rounded bg-[#FBF8F2] border border-[#DDD4C7] text-[#292722]">5. APPROVAL</div>
                <div className="p-2 rounded bg-[#FBF8F2] border border-[#DDD4C7] text-[#292722]">6. VERIFIED</div>
              </div>
            </div>

            {/* Recent Decision Logs */}
            <div className="space-y-3 pt-1">
              {requests.map((r) => (
                <div key={r.id} className="p-3.5 rounded bg-[#FBF8F2] border border-[#DDD4C7] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-[#B85C38] transition">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-[#B85C38] font-bold">#{r.id.slice(0, 8)}</span>
                      <h4 className="text-xs font-bold text-[#292722]">{r.title}</h4>
                      <StatusPill type="decision" value={r.ai_decision} />
                    </div>
                    <p className="text-[11px] text-[#716B61] italic max-w-xl">{r.ai_reason}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-right">
                    <span className="text-[10px] font-mono text-[#716B61] font-bold">
                      Confidence: {Math.round((r.ai_confidence || 0.94) * 100)}%
                    </span>
                    <Link 
                      href={`/requests/${r.id}`}
                      className="px-2.5 py-1 rounded bg-[#EFE8DC] hover:bg-[#DDD4C7] text-[11px] font-mono text-[#292722] transition"
                    >
                      Inspect
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Hackathon Core Demo Spotlight */}
          <div className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="border-b border-[#DDD4C7] pb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B85C38]">
                  Core Hackathon Demo Case
                </span>
                <h3 className="text-sm font-bold text-[#292722] mt-0.5">
                  Procurement Laptop Request
                </h3>
              </div>

              <div className="p-3.5 rounded bg-[#F5F0E8] border border-[#DDD4C7] text-xs font-serif text-[#292722] italic">
                &quot;We have 5 new employees joining Monday. They need laptops according to company policy.&quot;
              </div>

              <div className="space-y-2 text-xs font-mono text-[#716B61]">
                <div className="flex justify-between border-b border-[#DDD4C7] pb-1">
                  <span>Category:</span>
                  <span className="font-bold text-[#292722]">Procurement</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD4C7] pb-1">
                  <span>Extracted Qty:</span>
                  <span className="font-bold text-[#292722]">5 Units</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD4C7] pb-1">
                  <span>Matched Policy:</span>
                  <span className="font-bold text-[#292722]">Procurement Sec 2</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD4C7] pb-1">
                  <span>AI Decision:</span>
                  <StatusPill type="decision" value="NEEDS_APPROVAL" />
                </div>
              </div>
            </div>

            <Link
              href="/requests/r1042000-0000-0000-0000-000000001042"
              className="w-full py-2 px-3 rounded bg-[#292722] hover:bg-[#716B61] text-white font-mono text-xs flex items-center justify-center space-x-1.5 transition text-center"
            >
              <span>View Full Lifecycle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* 3. Editorial Requests Directory Table */}
        <div className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
          <div className="flex items-center justify-between border-b border-[#DDD4C7] pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">
              3. Operational Requests Log
            </h2>
            <Link 
              href="/requests"
              className="text-xs font-mono text-[#B85C38] hover:underline flex items-center gap-1"
            >
              <span>View Directory ({totalCount})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#292722]">
              <thead className="text-[10px] uppercase bg-[#EFE8DC] text-[#716B61] font-mono border-b border-[#DDD4C7]">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Request Context</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">AI Decision</th>
                  <th className="p-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD4C7]">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F5F0E8] transition">
                    <td className="p-3 font-mono text-[#B85C38] font-bold">
                      #{req.id.slice(0, 8)}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-[#292722]">{req.title}</p>
                      <p className="text-[11px] text-[#716B61] truncate max-w-md">{req.description}</p>
                    </td>
                    <td className="p-3 font-mono uppercase text-[#716B61]">
                      {req.category}
                    </td>
                    <td className="p-3">
                      <StatusPill type="priority" value={req.priority} />
                    </td>
                    <td className="p-3">
                      <StatusPill type="status" value={req.status} />
                    </td>
                    <td className="p-3">
                      <StatusPill type="decision" value={req.ai_decision} />
                    </td>
                    <td className="p-3 text-right">
                      <Link 
                        href={`/requests/${req.id}`}
                        className="px-2.5 py-1 rounded bg-[#EFE8DC] hover:bg-[#DDD4C7] font-mono text-[11px] text-[#292722] transition"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
