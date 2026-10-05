export default function MetricCard({ title, value, change, icon: Icon, subtext }) {
  return (
    <div className="p-4 rounded-lg bg-[#FBF8F2] border border-[#DDD4C7] space-y-2 transition-all hover:border-[#B85C38]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-[#716B61] uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-[#716B61]" />}
      </div>

      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl font-extrabold text-[#292722] tracking-tight">{value}</h3>
        {change && (
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#B08D57]/10 text-[#8C6D38] border border-[#B08D57]/20">
            {change}
          </span>
        )}
      </div>

      {subtext && <p className="text-[11px] text-[#716B61] font-mono">{subtext}</p>}
    </div>
  );
}
