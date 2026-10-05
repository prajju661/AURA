'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getRequests } from '../../lib/api';
import { Download } from 'lucide-react';

export default function AuditPage() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [filterEvent, setFilterEvent] = useState('ALL');

  useEffect(() => {
    async function loadData() {
      const requests = await getRequests();
      const allLogs = [];
      requests.forEach(r => {
        if (r.audit_logs) {
          r.audit_logs.forEach(log => {
            allLogs.push({ ...log, requestId: r.id, title: r.title });
          });
        }
      });
      setAuditLogs(allLogs);
    }
    loadData();
  }, []);

  const filteredLogs = auditLogs.filter(log => filterEvent === 'ALL' || log.event === filterEvent);

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="System Audit Log Explorer" subtitle="Immutable compliance log of every AI decision, approval, and execution event" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7]">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto font-mono text-xs">
            {['ALL', 'REQUEST_RECEIVED', 'AI_ANALYSIS_COMPLETED', 'DECISION_GENERATED', 'APPROVAL_REQUESTED', 'APPROVED'].map((evt) => (
              <button
                key={evt}
                onClick={() => setFilterEvent(evt)}
                className={`px-2.5 py-1 rounded transition ${
                  filterEvent === evt
                    ? 'bg-[#B85C38] text-white font-bold'
                    : 'bg-[#EFE8DC] text-[#716B61] hover:bg-[#DDD4C7]'
                }`}
              >
                {evt}
              </button>
            ))}
          </div>

          <button 
            onClick={() => alert("Audit logs exported to JSON/CSV")}
            className="px-3 py-1.5 rounded bg-[#EFE8DC] hover:bg-[#DDD4C7] text-[#292722] text-xs font-mono flex items-center space-x-1.5 border border-[#DDD4C7]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit Trail</span>
          </button>
        </div>

        {/* Audit Log Table */}
        <div className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#292722]">
              <thead className="text-[10px] uppercase bg-[#EFE8DC] text-[#716B61] font-mono border-b border-[#DDD4C7]">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Request Ref</th>
                  <th className="p-3">Execution Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD4C7] font-mono text-[11px]">
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-[#F5F0E8] transition">
                    <td className="p-3 text-[#716B61]">{log.timestamp}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-[#EFE8DC] text-[#B85C38] border border-[#DDD4C7] font-bold">
                        {log.event}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#292722]">{log.actor}</td>
                    <td className="p-3 text-[#B85C38] font-bold">#{log.requestId.slice(0, 8)}</td>
                    <td className="p-3 text-[#716B61] max-w-md truncate">{log.details}</td>
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
