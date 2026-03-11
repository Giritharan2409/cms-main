export default function SearchFilter({ searchQuery, onSearchChange, onAddClick }) {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
      <div className="relative flex-1 group w-full lg:w-auto">
        <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563eb] text-[20px] transition-colors">search</span>
        <input
          type="text"
          placeholder="Search students by name, ID, or department..."
          className="w-full bg-white border border-slate-200 rounded-[18px] pl-12 pr-6 py-4 text-sm focus:ring-4 focus:ring-[#2563eb]/10 focus:border-[#2563eb] outline-none transition-all placeholder:text-slate-400 shadow-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto h-full">
        <button className="flex items-center justify-center gap-2 h-[52px] px-6 bg-white border border-slate-200 rounded-[18px] text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]">filter_alt</span>
          <span className="hidden sm:inline">Filter</span>
        </button>
        <button className="flex items-center justify-center gap-2 h-[52px] px-6 bg-white border border-slate-200 rounded-[18px] text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
          <span className="material-symbols-outlined text-[20px]">ios_share</span>
          <span className="hidden sm:inline">Export</span>
        </button>
        <div className="w-px h-8 bg-slate-200 mx-1 hidden lg:block" />
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 h-[52px] px-6 bg-[#2563eb] text-white rounded-[18px] text-sm font-bold hover:bg-[#1d4ed8] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-100 flex-1 lg:flex-none whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add Student</span>
        </button>
      </div>
    </div>
  )
}
