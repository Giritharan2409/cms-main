export default function TopBar({ title }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        {title && <h2 className="text-xl font-bold tracking-tight">{title}</h2>}
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
          <input
            className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#2563eb]/30 outline-none"
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">Administrator</p>
              <p className="text-[10px] font-bold text-[#2563eb] uppercase">MIT Connect</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
