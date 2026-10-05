import { Bell, Search } from 'lucide-react';

export default function Header({ title = 'Operations Command Center', subtitle = 'Understand. Decide. Act. Follow Up.' }) {
  return (
    <header className="h-16 border-b border-[#DDD4C7] bg-[#FBF8F2] sticky top-0 z-20 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-base font-bold text-[#292722] tracking-tight">
          {title}
        </h2>
        <p className="text-[11px] text-[#716B61] font-mono">{subtitle}</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#716B61] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search operations..."
            className="pl-8 pr-3 py-1.5 text-xs bg-[#F5F0E8] text-[#292722] rounded-md border border-[#DDD4C7] focus:outline-none focus:border-[#B85C38] w-56 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-md bg-[#F5F0E8] border border-[#DDD4C7] text-[#716B61] hover:text-[#292722] transition relative">
          <Bell className="w-3.5 h-3.5" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#B85C38] absolute top-1.5 right-1.5"></span>
        </button>
      </div>
    </header>
  );
}
