import { useNavigate } from 'react-router-dom';

const ROLE_META = {
  admin:   { title: 'System Settings',  subtitle: 'Portal configuration & control', color: 'from-[#276221] to-[#1e4618]' },
  finance: { title: 'Finance Settings', subtitle: 'Billing & financial controls',    color: 'from-[#1a4f8a] to-[#0e3060]' },
  faculty: { title: 'My Settings',      subtitle: 'Account & preferences',           color: 'from-[#276221] to-[#1e4618]' },
  student: { title: 'My Settings',      subtitle: 'Account & preferences',           color: 'from-[#276221] to-[#1e4618]' },
};

/**
 * Unified two-column settings shell used by all roles.
 * Left: full-height branded sidebar with tab navigation
 * Right: active panel content
 */
export default function SettingsShell({ tabs, activeTab, onSelect, children, role }) {
  const navigate = useNavigate();
  const meta = ROLE_META[role] || ROLE_META.student;

  return (
    <div className="flex flex-col md:flex-row gap-0 w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] md:overflow-hidden">

      {/* ── Left: Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-full md:w-72 flex-shrink-0 md:border-r border-slate-200 bg-white md:h-full md:overflow-y-auto">
        <div className="flex flex-col h-full">

          {/* Branded Header */}
          <div className={`bg-gradient-to-br ${meta.color} px-6 py-7 text-white`}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px] text-white">settings</span>
              </div>
              <div>
                <p className="text-[13px] font-bold leading-tight">{meta.title}</p>
                <p className="text-[11px] text-white/70 mt-0.5">{meta.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="px-3 py-4 flex flex-col gap-0.5 flex-1">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelect(tab.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-150 group ${
                    isActive
                      ? 'bg-[#276221]/10 text-[#276221] font-bold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                  }`}
                >
                  {/* Icon */}
                  {tab.icon && (
                    <span
                      className={`material-symbols-outlined text-[20px] flex-shrink-0 transition-colors ${
                        isActive ? 'text-[#276221]' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {tab.icon}
                    </span>
                  )}

                  {/* Label */}
                  <span className="flex-1 truncate">{tab.label}</span>

                  {/* Active indicator */}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#276221] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Divider + Back Link */}
          <div className="px-3 pb-6 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => navigate(`/dashboard?role=${encodeURIComponent(role)}`)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all duration-150 group"
            >
              <span className="material-symbols-outlined text-[20px] flex-shrink-0 group-hover:-translate-x-0.5 transition-transform">
                arrow_back
              </span>
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Right: Panel Content ───────────────────────────────────────── */}
      <main className="flex-1 min-w-0 bg-[#f8fafc] px-6 md:px-8 py-8 md:h-full md:overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
