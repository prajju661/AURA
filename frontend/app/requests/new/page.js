'use client';

import { useState } from 'react';
import Header from '../../../components/Header';
import { useRouter } from 'next/navigation';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: 'Procurement for New Onboarding Cohort',
    description: 'We have 5 new employees joining Monday. They need laptops according to company policy.',
    category: 'procurement',
    priority: 'high',
    deadline: '2026-10-05'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/requests/r1042000-0000-0000-0000-000000001042');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="Submit Operational Request" subtitle="Inbound Operational Request Dispatcher" />

      <div className="p-8 space-y-6 max-w-3xl mx-auto w-full">
        <Link 
          href="/requests" 
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#716B61] hover:text-[#B85C38] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </Link>

        {/* Demo Preset Card */}
        <div className="p-4 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#292722]">Hackathon Demo Procurement Request</p>
            <p className="text-[11px] text-[#716B61]">Click submit to run the procurement approval workflow demo.</p>
          </div>
          <button 
            type="button"
            onClick={() => setFormData({
              title: 'Procurement for New Onboarding Cohort',
              description: 'We have 5 new employees joining Monday. They need laptops according to company policy.',
              category: 'procurement',
              priority: 'high',
              deadline: '2026-10-05'
            })}
            className="px-3 py-1 rounded bg-[#EFE8DC] hover:bg-[#DDD4C7] text-[#292722] font-mono text-xs font-bold transition"
          >
            Load Preset
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-mono text-[#716B61]">Request Title</label>
            <input 
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2.5 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-[#716B61]">Unstructured Request Description</label>
            <textarea 
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#716B61]">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
              >
                <option value="procurement">Procurement</option>
                <option value="it_access">IT Access</option>
                <option value="hr">HR</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#716B61]">Priority</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#716B61]">Deadline</label>
              <input 
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-mono font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
          >
            {loading ? (
              <span>Processing Request...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Request to AURA</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
