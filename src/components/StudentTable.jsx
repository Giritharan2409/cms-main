import { useNavigate } from 'react-router-dom'

export default function StudentTable({ students }) {
  const navigate = useNavigate()

  const statusStyles = {
    ACTIVE:   'bg-[#10b981]/10 text-[#10b981]',
    PENDING:  'bg-[#f59e0b]/10 text-[#f59e0b]',
    INACTIVE: 'bg-[#ef4444]/10 text-[#ef4444]',
    GRADUATED: 'bg-[#2563eb]/10 text-[#2563eb]',
  }

  const feeStyles = {
    PAID:     'bg-[#10b981]/10 text-[#10b981]',
    OVERDUE:  'bg-[#ef4444]/10 text-[#ef4444]',
    PARTIAL:  'bg-[#f59e0b]/10 text-[#f59e0b]',
    PENDING:  'bg-[#f59e0b]/10 text-[#f59e0b]',
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[#64748b] text-[11px] font-bold uppercase tracking-[0.15em] border-b border-slate-50">
            <th className="pl-10 pr-4 py-6 w-8">
              <div className="w-5 h-5 rounded-md border-2 border-slate-200 flex items-center justify-center cursor-pointer hover:border-[#2563eb] transition-colors bg-white">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] opacity-0" />
              </div>
            </th>
            <th className="px-4 py-6">Student Information</th>
            <th className="px-4 py-6">Department</th>
            <th className="px-4 py-6 whitespace-nowrap">Semester</th>
            <th className="px-4 py-6">Status</th>
            <th className="px-4 py-6">Fee Status</th>
            <th className="pr-10 pl-4 py-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {students.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-10 py-24 text-center text-slate-400 bg-slate-50/30">
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-6xl mb-4 opacity-10 text-slate-900">group_off</span>
                  <p className="text-base font-bold text-slate-500">No students found matching your search</p>
                  <p className="text-xs font-medium text-slate-400 mt-1">Try adjusting your filters or search terms</p>
                </div>
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer"
                onClick={() => navigate(`/students/${encodeURIComponent(s.id)}`)}
              >
                <td className="pl-10 pr-4 py-5" onClick={(e) => e.stopPropagation()}>
                  <div className="w-5 h-5 rounded-md border-2 border-slate-200 flex items-center justify-center cursor-pointer group-hover:border-[#2563eb] transition-colors bg-white">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>
                </td>
                <td className="px-4 py-5 text-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[18px] overflow-hidden border-2 border-white shadow-md ring-1 ring-slate-100 flex-shrink-0">
                      <img
                        src={s.avatar || `https://ui-avatars.com/api/?name=${s.name}&background=2563eb&color=fff`}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#0f172a] group-hover:text-[#2563eb] transition-colors">{s.name}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5 tracking-tight uppercase">{s.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#334155]">{s.department}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter invisible group-hover:visible transition-all">Major</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                   <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#334155]">Sem {s.semester || 'N/A'}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{s.year}</span>
                  </div>
                </td>
                <td className="px-4 py-5">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[s.status.toUpperCase()] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-60" />
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-5">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${feeStyles[(s.feeStatus || 'PENDING').toUpperCase()] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                    {s.feeStatus || 'PENDING'}
                  </span>
                </td>
                <td className="pr-10 pl-4 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                  <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200">
                    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
