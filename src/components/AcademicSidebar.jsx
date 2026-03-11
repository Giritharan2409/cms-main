import { NavLink, useNavigate } from 'react-router-dom'
import { destroyUserSession } from '../auth/sessionController'

const navGroups = [
  {
    label: 'Main Menu',
    items: [
      { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    ],
  },
  {
    label: 'Academics',
    items: [
      { to: '/timetable',  icon: 'calendar_month', label: 'Timetable' },
      { to: '/attendance', icon: 'fact_check',      label: 'Attendance' },
      { to: '/exams',      icon: 'quiz',            label: 'Exams' },
      { to: '/placement',  icon: 'work',            label: 'Placement' },
      { to: '/facility',   icon: 'meeting_room',    label: 'Facility' },
    ],
  },
]

export default function AcademicSidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    destroyUserSession()
    navigate('/', { replace: true })
  }

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col fixed h-full overflow-y-auto z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#2563eb] w-10 h-10 rounded-lg flex items-center justify-center text-white">
          <span className="material-symbols-outlined">school</span>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">MIT Connect</h1>
          <p className="text-xs text-slate-500">College Admin</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-[#2563eb]/10 text-[#2563eb] font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`
                  }
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
