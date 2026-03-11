import { useState } from 'react'
import Layout from '../components/Layout'
import StatCard from '../components/StatCard'
import SearchFilter from '../components/SearchFilter'
import StudentTable from '../components/StudentTable'
import AddStudentModal from '../components/AddStudentModal'
import { students, getStudentStats, departments, years } from '../data/studentData'

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [department, setDepartment] = useState('All')
  const [year, setYear] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemsPerPage = 8

  const stats = getStudentStats()

  // Filter logic
  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = department === 'All' || s.department === department
    const matchesYear = year === 'All' || s.year === year
    return matchesSearch && matchesDept && matchesYear
  })

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const paginatedStudents = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset to page 1 when filters change
  const handleSearch = (val) => { setSearchQuery(val); setCurrentPage(1) }
  const handleDept = (val) => { setDepartment(val); setCurrentPage(1) }
  const handleYear = (val) => { setYear(val); setCurrentPage(1) }

  return (
    <Layout title="Students">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Students</h1>
        <p className="text-slate-500 text-sm mt-1">Manage and monitor all enrolled students across departments</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="groups" label="Total Students" value={stats.total} trend="All departments" color="blue" />
        <StatCard icon="co_present" label="Active Students" value={stats.active} trend="Currently enrolled" color="green" />
        <StatCard icon="trending_up" label="Avg Attendance" value={`${stats.avgAttendance}%`} trend="This semester" color="purple" />
        <StatCard icon="warning" label="Fee Defaulters" value={stats.feeDefaulters} trend="Need follow-up" color="red" />
      </div>

      {/* Search / Filter Toolbar */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        department={department}
        onDepartmentChange={handleDept}
        year={year}
        onYearChange={handleYear}
        departments={departments}
        years={years}
        onAddClick={() => setIsModalOpen(true)}
      />

      {/* Student Table */}
      <StudentTable students={paginatedStudents} currentPage={currentPage} itemsPerPage={itemsPerPage} />

      {/* Add Student Modal */}
      <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> of{' '}
            <span className="font-semibold text-slate-700">{filtered.length}</span> students
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="material-symbols-outlined text-base align-middle">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                  page === currentPage
                    ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <span className="material-symbols-outlined text-base align-middle">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
