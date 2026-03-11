export default function SearchFilter({ searchQuery, onSearchChange, department, onDepartmentChange, year, onYearChange, departments, years, onAddClick }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3 flex-1">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] transition-all duration-200"
          />
        </div>

        {/* Department Filter */}
        <select
          value={department}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] cursor-pointer"
        >
          {departments.map(d => (
            <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb] cursor-pointer"
        >
          {years.map(y => (
            <option key={y} value={y}>{y === 'All' ? 'All Years' : y}</option>
          ))}
        </select>
      </div>

      {/* Add Student Button */}
      <button 
        onClick={onAddClick}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-semibold hover:bg-[#1d4ed8] shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">person_add</span>
        Add Student
      </button>
    </div>
  )
}
