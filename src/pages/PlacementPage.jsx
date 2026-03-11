import Layout from '../components/Layout'

const placementData = [
  { name: 'Johnathan Doe', company: 'Google',    role: 'SWE Intern',     package: '$12,000/yr', status: 'Selected', date: 'Nov 5, 2023'  },
  { name: 'Alice Smith',   company: 'Microsoft', role: 'Cloud Intern',   package: '$10,500/yr', status: 'Selected', date: 'Nov 8, 2023'  },
  { name: 'Michael Ross',  company: 'Amazon',    role: 'Data Analyst',   package: '$9,000/yr',  status: 'Process',  date: 'Dec 1, 2023'  },
  { name: 'Elena Lopez',   company: 'Figma',     role: 'Design Intern',  package: '$8,500/yr',  status: 'Process',  date: 'Dec 3, 2023'  },
  { name: 'David Kim',     company: 'Stripe',    role: 'Backend Intern', package: '$11,000/yr', status: 'Selected', date: 'Nov 20, 2023' },
]

export default function PlacementPage() {
  return (
    <Layout title="Placement">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Placement Tracker</h1>
          <p className="text-slate-500 mt-1">Campus Recruitment — Batch 2024</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1162d4] text-white rounded-lg text-sm font-semibold hover:bg-[#1162d4]/90">
          <span className="material-symbols-outlined text-lg">add</span>Add Entry
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: 'emoji_events', label: 'Students Placed',   value: '3',     color: 'text-[#1162d4] bg-[#1162d4]/10' },
          { icon: 'business',    label: 'Companies Visited',  value: '5',     color: 'text-purple-600 bg-purple-100' },
          { icon: 'attach_money',label: 'Avg. Package',       value: '$10.2k',color: 'text-emerald-600 bg-emerald-100' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.color}`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Package</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {placementData.map((p) => (
              <tr key={p.name} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">{p.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600 font-medium">{p.company}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{p.role}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-900">{p.package}</td>
                <td className="px-6 py-4 text-sm text-slate-500">{p.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    p.status === 'Selected' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
