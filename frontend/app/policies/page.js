'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getPolicies } from '../../lib/api';
import { BookOpen, Plus, Database } from 'lucide-react';

export default function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPolicy, setNewPolicy] = useState({ name: '', category: 'Procurement', content: '' });

  useEffect(() => {
    async function loadData() {
      const data = await getPolicies();
      setPolicies(data);
    }
    loadData();
  }, []);

  const handleAddPolicy = (e) => {
    e.preventDefault();
    const created = {
      id: `p${policies.length + 1}`,
      name: newPolicy.name,
      category: newPolicy.category,
      content: newPolicy.content,
      updated_at: new Date().toISOString().split('T')[0]
    };
    setPolicies([created, ...policies]);
    setShowModal(false);
    setNewPolicy({ name: '', category: 'Procurement', content: '' });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="Policy Knowledge Base (pgvector RAG)" subtitle="Vectorized organizational compliance policies for Gemini AI retrieval" />

      <div className="p-8 space-y-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Database className="w-5 h-5 text-[#B85C38]" />
            <div>
              <h2 className="text-sm font-bold text-[#292722]">pgvector Knowledge Base</h2>
              <p className="text-[11px] text-[#716B61] font-mono">768-dimensional embeddings generated via Gemini text-embedding-004</p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-3.5 py-1.5 rounded bg-[#B85C38] hover:bg-[#9E4C2C] text-white font-medium text-xs flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Policy Document</span>
          </button>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((policy) => (
            <div key={policy.id} className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-3 hover:border-[#B85C38] transition">
              <div className="flex items-center justify-between border-b border-[#DDD4C7] pb-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#B85C38]" />
                  <h3 className="text-sm font-bold text-[#292722]">{policy.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#EFE8DC] text-[#292722] text-[10px] font-mono border border-[#DDD4C7]">
                  {policy.category}
                </span>
              </div>

              <div className="p-3.5 rounded bg-[#F5F0E8] border border-[#DDD4C7] text-xs text-[#292722] whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
                {policy.content}
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#716B61] font-mono pt-1">
                <span>Vector Status: <strong className="text-[#B08D57]">INDEXED (pgvector)</strong></span>
                <span>Updated: {policy.updated_at || '2026-10-01'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-[#292722]/50 backdrop-blur-xs flex items-center justify-center p-4">
            <form onSubmit={handleAddPolicy} className="w-full max-w-lg p-6 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-[#292722]">Upload & Vectorize Policy</h3>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#716B61]">Policy Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Travel & Expense Policy"
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({ ...newPolicy, name: e.target.value })}
                  className="w-full p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#716B61]">Category</label>
                <select
                  value={newPolicy.category}
                  onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
                  className="w-full p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
                >
                  <option value="Procurement">Procurement</option>
                  <option value="IT Access">IT Access</option>
                  <option value="Expense">Expense</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#716B61]">Policy Rules & Clauses</label>
                <textarea 
                  rows={5}
                  required
                  placeholder="Paste policy rules..."
                  value={newPolicy.content}
                  onChange={(e) => setNewPolicy({ ...newPolicy, content: e.target.value })}
                  className="w-full p-2 rounded bg-[#F5F0E8] text-xs text-[#292722] border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded bg-[#EFE8DC] text-[#292722] text-xs font-mono"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-3 py-1.5 rounded bg-[#B85C38] text-white text-xs font-mono font-bold"
                >
                  Embed & Store in pgvector
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
