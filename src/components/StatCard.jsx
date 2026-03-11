const colorMap = {
  blue: { bg: 'bg-[#2563eb]/10', text: 'text-[#2563eb]', iconBg: 'bg-[#2563eb]/10' },
  green: { bg: 'bg-[#10b981]/10', text: 'text-[#10b981]', iconBg: 'bg-[#10b981]/10' },
  purple: { bg: 'bg-[#8b5cf6]/10', text: 'text-[#8b5cf6]', iconBg: 'bg-[#8b5cf6]/10' },
  orange: { bg: 'bg-[#f59e0b]/10', text: 'text-[#f59e0b]', iconBg: 'bg-[#f59e0b]/10' },
  red: { bg: 'bg-[#ef4444]/10', text: 'text-[#ef4444]', iconBg: 'bg-[#ef4444]/10' },
}

export default function StatCard({ icon, label, value, trend, color = 'blue' }) {
  const theme = colorMap[color] || colorMap.blue

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center ${theme.text}`}>
        <span className="material-symbols-outlined text-[28px]">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-[#1e293b]">{value}</h3>
          {trend && (
            <span className="text-[10px] font-bold text-slate-400">
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
