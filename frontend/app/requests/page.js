'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import StatusPill from '../../components/StatusPill';
import Link from 'next/link';
import { getRequests } from '../../lib/api';
import { Search, Plus } from 'lucide-react';

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadData() {
      const data = await getRequests();
      setRequests(data);
    }
    loadData();
  }, []);

  const filteredRequests = requests.filter(r => {
    const matchesFilter = filter === 'ALL' || r.status === filter || r.ai_decision === filter;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="Operations Requests Directory" subtitle="Inspect and manage all inbound operational requests" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Editorial Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7]">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-[#716B61] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Filter requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F5F0E8] text-[#292722] rounded border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto font-mono text-xs">
            {['ALL', 'PENDING_APPROVAL', 'AUTO_EXECUTE', 'ESCALATE', 'REJECT'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-2.5 py-1 rounded transition ${
                  filter === status
                    ? 'bg-[#B85C38] text-white font-bold'
                    : 'bg-[#EFE8DC] text-[#716B61] hover:bg-[#DDD4C7]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <Link
            href="/requests/new"
            className="px-3.5 py-1.5 rounded bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-medium text-xs flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Request</span>
          </Link>
        </div>

        {/* Requests Table */}
        <div className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#292722]">
              <thead className="text-[10px] uppercase bg-[#EFE8DC] text-[#716B61] font-mono border-b border-[#DDD4C7]">
                <tr>
                  <th className="p-3">Request ID</th>
                  <th className="p-3">Title & Context</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">AI Decision</th>
                  <th className="p-3">Confidence</th>
                  <th className="p-3 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD4C7]">
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F5F0E8] transition">
                    <td className="p-3 font-mono text-[#B85C38] font-bold">
                      #{req.id.slice(0, 8)}
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-[#292722]">{req.title}</p>
                      <p className="text-[11px] text-[#716B61] truncate max-w-sm">{req.description}</p>
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
                    <td className="p-3 font-mono font-bold text-[#292722]">
                      {Math.round((req.ai_confidence || 0.9) * 100)}%
                    </td>
                    <td className="p-3 text-right">
                      <Link 
                        href={`/requests/${req.id}`}
                        className="px-2.5 py-1 rounded bg-[#EFE8DC] hover:bg-[#DDD4C7] font-mono text-[11px] text-[#292722] transition"
                      >
                        Inspect Lifecycle
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
