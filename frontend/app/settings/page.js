'use client';

import Header from '../../components/Header';
import { Cpu, Database, Zap } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F5F0E8]">
      <Header title="System Settings & Configuration" subtitle="Configure AI confidence thresholds, n8n webhook routing, and Supabase database parameters" />

      <div className="p-8 space-y-6 max-w-4xl mx-auto w-full">
        {/* Gemini Engine Settings */}
        <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#DDD4C7] pb-3">
            <Cpu className="w-4 h-4 text-[#B85C38]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">AI Decision Engine Configuration</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[#716B61]">Selected AI Model</label>
              <input 
                type="text" 
                disabled 
                value="Google Gemini 1.5 Flash" 
                className="w-full p-2 rounded bg-[#F5F0E8] text-[#292722] border border-[#DDD4C7]" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#716B61]">Auto-Execution Confidence Threshold</label>
              <input 
                type="text" 
                defaultValue="90% (0.90)" 
                className="w-full p-2 rounded bg-[#F5F0E8] text-[#292722] border border-[#DDD4C7]" 
              />
            </div>
          </div>
        </div>

        {/* n8n Orchestrator Config */}
        <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#DDD4C7] pb-3">
            <Zap className="w-4 h-4 text-[#B08D57]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">n8n Workflow Webhooks</h2>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[#716B61]">Main Request Processing Webhook</label>
              <input 
                type="text" 
                defaultValue="http://localhost:5678/webhook/aura-request" 
                className="w-full p-2 rounded bg-[#F5F0E8] text-[#292722] border border-[#DDD4C7]" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#716B61]">Approval Callback Webhook</label>
              <input 
                type="text" 
                defaultValue="http://localhost:5678/webhook/aura-approval" 
                className="w-full p-2 rounded bg-[#F5F0E8] text-[#292722] border border-[#DDD4C7]" 
              />
            </div>
          </div>
        </div>

        {/* Supabase Config */}
        <div className="p-5 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-4">
          <div className="flex items-center space-x-2 border-b border-[#DDD4C7] pb-3">
            <Database className="w-4 h-4 text-[#B85C38]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#292722]">Supabase PostgreSQL & pgvector</h2>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[#716B61]">Vector Search RPC Function</label>
              <input 
                type="text" 
                disabled 
                value="match_policies (Cosine Similarity, 768-dim)" 
                className="w-full p-2 rounded bg-[#F5F0E8] text-[#292722] border border-[#DDD4C7]" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
