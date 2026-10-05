export default function StatusPill({ type, value }) {
  let styles = 'bg-[#F5F0E8] text-[#716B61] border-[#DDD4C7]';

  if (type === 'decision' || type === 'status') {
    switch (value) {
      case 'AUTO_EXECUTE':
      case 'AUTO_EXECUTED':
      case 'APPROVED':
      case 'SUCCESS':
      case 'COMPLETED':
        styles = 'bg-[#B08D57]/10 text-[#8C6D38] border-[#B08D57]/30';
        break;
      case 'NEEDS_APPROVAL':
      case 'PENDING_APPROVAL':
        styles = 'bg-[#D97706]/10 text-[#B45309] border-[#D97706]/30';
        break;
      case 'ESCALATE':
      case 'ESCALATED':
        styles = 'bg-[#B85C38]/10 text-[#B85C38] border-[#B85C38]/30';
        break;
      case 'REJECT':
      case 'REJECTED':
        styles = 'bg-[#991B1B]/10 text-[#991B1B] border-[#991B1B]/30';
        break;
      case 'PENDING':
      default:
        styles = 'bg-[#EFE8DC] text-[#716B61] border-[#DDD4C7]';
    }
  } else if (type === 'priority') {
    switch (value?.toLowerCase()) {
      case 'high':
      case 'urgent':
        styles = 'bg-[#B85C38]/10 text-[#B85C38] border-[#B85C38]/30';
        break;
      case 'medium':
        styles = 'bg-[#B08D57]/10 text-[#8C6D38] border-[#B08D57]/30';
        break;
      default:
        styles = 'bg-[#EFE8DC] text-[#716B61] border-[#DDD4C7]';
    }
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${styles}`}>
      {value}
    </span>
  );
}
