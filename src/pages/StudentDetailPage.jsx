import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { getStudentById } from '../data/studentData'

// ─── Tab Components ──────────────────────────────────────────────

function OverviewTab({ student }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Core Info */}
      <div className="lg:col-span-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-3 mb-6 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[#2563eb] text-[20px]">contact_page</span>
              Contact Information
            </h3>
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                <p className="text-sm font-bold text-slate-700">{student.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Personal Email</p>
                <p className="text-sm font-bold text-slate-700">{student.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Permanent Address</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{student.address}</p>
              </div>
            </div>
          </div>

          {/* Family Details */}
          <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-3 mb-6 uppercase tracking-wider">
              <span className="material-symbols-outlined text-[#2563eb] text-[20px]">family_restroom</span>
              Family Details
            </h3>
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Father's Name</p>
                <p className="text-sm font-bold text-slate-700">{student.guardian}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mother's Name</p>
                <p className="text-sm font-bold text-slate-700">Sunita Devi</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Guardian Contact</p>
                <p className="text-sm font-bold text-slate-700">{student.guardianPhone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Info Strip */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-3 mb-6 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[#2563eb] text-[20px]">menu_book</span>
            Academic Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#2563eb] shadow-sm">
                  <span className="material-symbols-outlined">event_available</span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admission Date</p>
                  <p className="text-sm font-bold text-slate-700">{new Date(student.enrollDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm">
                  <span className="material-symbols-outlined">bloodtype</span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Blood Group</p>
                  <p className="text-sm font-bold text-slate-700">O+</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm">
                  <span className="material-symbols-outlined">task_alt</span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance</p>
                  <p className="text-sm font-bold text-slate-700">{student.attendancePct}%</p>
               </div>
            </div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-wider">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {['Python', 'Java', 'SQL', 'React JS', 'Node.js'].map((skill, idx) => (
              <span key={skill} className={`px-4 py-2 rounded-xl text-xs font-bold ${idx === 3 ? 'bg-[#2563eb]/10 text-[#2563eb]' : 'bg-slate-100 text-slate-600'}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Trends & Status */}
      <div className="lg:col-span-4 space-y-8">
        {/* GPA Trend Mock */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider text-slate-900 leading-none">GPA Trend</h3>
            <span className="px-2 py-0.5 bg-blue-50 text-[#2563eb] rounded-md text-[9px] font-black uppercase tracking-widest">B+ Average</span>
          </div>
          <div className="flex items-end justify-between h-24 gap-2 mb-4">
            {[35, 45, 100, 40].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-lg transition-all duration-1000 ${i === 2 ? 'bg-[#2563eb]' : 'bg-[#2563eb]/20'}`} 
                  style={{ height: `${h}%` }} 
                />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">SEM{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Calendar Mock */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Attendance: June 2024</h3>
              <div className="flex gap-1">
                 <div className="w-2 h-2 rounded-full bg-green-500" />
                 <div className="w-2 h-2 rounded-full bg-red-400" />
              </div>
           </div>
           <div className="grid grid-cols-7 gap-2">
              {['M','T','W','T','F','S','S'].map(d => (
                <div key={d} className="text-center text-[9px] font-black text-slate-300 py-1">{d}</div>
              ))}
              {Array.from({length: 21}).map((_, i) => (
                <div key={i} className={`aspect-square rounded-md border border-slate-50 transition-colors cursor-pointer ${
                  i === 15 ? 'bg-red-400' : 
                  i % 3 === 0 ? 'bg-green-100' : 
                  i % 2 === 0 ? 'bg-green-400' : 'bg-green-50'
                }`} />
              ))}
           </div>
        </div>

        {/* Academic Alert */}
        <div className="bg-[#2563eb]/5 border border-[#2563eb]/10 rounded-[32px] p-8 flex gap-4">
           <div className="w-10 h-10 bg-[#2563eb] rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-100">
              <span className="material-symbols-outlined text-[20px]">info</span>
           </div>
           <div>
              <p className="text-[10px] font-black text-[#2563eb] uppercase tracking-widest mb-1">Academic Alert</p>
              <p className="text-xs font-bold text-[#2563eb]/80 leading-relaxed">
                {student.name} has successfully completed 85% of his credit requirements for the current year.
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}

function AcademicsTab({ student }) {
  const subjects = student.subjects || []
  const totalObtained = subjects.reduce((s, sub) => s + sub.total, 0)
  const totalMax = subjects.length * 100
  const percentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Grades Table */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Semester Grades and Results</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter Semester
            </button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] border-b border-slate-50">
                   <th className="px-8 py-4">Semester</th>
                   <th className="px-4 py-4">Subject Code</th>
                   <th className="px-4 py-4">Subject Name</th>
                   <th className="px-4 py-4">Credits</th>
                   <th className="px-4 py-4">Grade</th>
                   <th className="px-8 py-4 text-center">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {subjects.map(sub => (
                   <tr key={sub.code} className="hover:bg-slate-50/50 transition-colors group">
                     <td className="px-8 py-5 text-sm font-bold text-slate-500">Sem {student.semester}</td>
                     <td className="px-4 py-5 text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-tight">{sub.code}</td>
                     <td className="px-4 py-5 text-sm font-bold text-slate-800">{sub.name}</td>
                     <td className="px-4 py-5 text-sm font-bold text-slate-500">4.0</td>
                     <td className="px-4 py-5 text-sm font-black text-slate-900">{sub.grade}</td>
                     <td className="px-8 py-5 text-center">
                       <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-md text-[9px] font-black uppercase tracking-widest">Pass</span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
          <div className="px-8 py-6 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-50">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Showing 1-5 of 18 subjects</p>
             <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-300 hover:text-slate-600 hover:border-slate-200 transition-all">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center bg-[#2563eb] border border-[#2563eb] rounded-lg text-white font-black text-[10px] shadow-lg shadow-blue-100">1</button>
                <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-500 hover:text-slate-900 font-black text-[10px]">2</button>
                <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-500 hover:text-slate-900 font-black text-[10px]">3</button>
                <button className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-lg text-slate-300 hover:text-slate-600 hover:border-slate-200 transition-all">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Right Column - Charts & Awards */}
      <div className="lg:col-span-4 space-y-8">
        {/* Credits Overview Radial Mock */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-black text-slate-800 self-start uppercase tracking-wider mb-8">Credits Overview</h3>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e2e8f0" strokeWidth="12" fill="none" />
              <circle
                cx="60" cy="60" r="54"
                stroke="#2563eb" strokeWidth="12" fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(110/145) * 339} ${339 - (110/145) * 339}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <p className="text-4xl font-black text-slate-900 leading-none">110</p>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">of 145 Earned</p>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4 mt-8 border-t border-slate-50 pt-8">
             <div className="text-center">
                <p className="text-lg font-black text-[#2563eb]">{student.cgpa}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Current CGPA</p>
             </div>
             <div className="text-center">
                <p className="text-lg font-black text-slate-800">CS Eng.</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Major</p>
             </div>
          </div>
        </div>

        {/* Academic Distinctions */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-6">Academic Distinctions</h3>
           <div className="space-y-4">
              {[
                { title: "Dean's List - Sem 2", desc: "Top 5% of class performance", color: "bg-blue-50 text-[#2563eb]", icon: "military_tech" },
                { title: "Smart Hackathon Runner-up", desc: "National Level Competition 2023", color: "bg-purple-50 text-purple-600", icon: "emoji_events" },
                { title: "Google Cloud Certification", desc: "Associate Cloud Engineer", color: "bg-slate-50 text-slate-600", icon: "verified" }
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 rounded-2xl border border-slate-50 hover:border-slate-100 transition-all hover:shadow-sm cursor-pointer group">
                   <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-800 leading-tight">{item.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}

function FeesTab({ student }) {
  const fees = student.fees || []
  const totalAmount = fees.reduce((s, f) => s + f.amount, 0)
  const totalPaid = fees.reduce((s, f) => s + f.paid, 0)
  const totalDue = fees.reduce((s, f) => s + f.due, 0)

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Payment Ledger */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Fee Payment Ledger</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2563eb] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1d4ed8] transition-all shadow-md shadow-blue-100">
               <span className="material-symbols-outlined text-[16px]">add</span>
               New Payment
            </button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] border-b border-slate-50">
                   <th className="px-8 py-4">Transaction ID</th>
                   <th className="px-4 py-4">Fee Type</th>
                   <th className="px-4 py-4">Date</th>
                   <th className="px-4 py-4">Method</th>
                   <th className="px-4 py-4 text-right">Amount</th>
                   <th className="px-8 py-4 text-center">Status</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {fees.map(f => (
                   <tr key={f.id} className="hover:bg-slate-50/50 transition-colors group">
                     <td className="px-8 py-5 text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">#{f.id}</td>
                     <td className="px-4 py-5 text-sm font-bold text-slate-800">{f.type}</td>
                     <td className="px-4 py-5 text-sm font-bold text-slate-500">{f.date}</td>
                     <td className="px-4 py-5">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">Online</span>
                     </td>
                     <td className="px-4 py-5 text-sm font-black text-slate-900 text-right">{fmt(f.amount)}</td>
                     <td className="px-8 py-5 text-center">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                           f.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                           {f.status}
                        </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Payment History Notes */}
        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4">Payment Remarks</h3>
           <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                 <div className="w-10 h-10 bg-blue-50 text-[#2563eb] rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
                 </div>
                 <p className="text-xs font-bold text-slate-500 leading-relaxed">
                   Next installment of ₹12,000 scheduled for July 15, 2024. Automated reminder has been sent to the guardian.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Column - Balance & Summary */}
      <div className="lg:col-span-4 space-y-8">
        {/* Outstanding Balance Card */}
        <div className="bg-[#1e293b] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Total Outstanding</p>
           <h4 className="text-5xl font-black mb-10 tracking-tighter">{fmt(totalDue)}</h4>
           
           <div className="space-y-6 pt-10 border-t border-white/10">
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Fees</span>
                 <span className="text-sm font-black">{fmt(totalAmount)}</span>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Paid Amount</span>
                 <span className="text-sm font-black text-green-400">{fmt(totalPaid)}</span>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Late Charges</span>
                 <span className="text-sm font-black text-red-400">₹0.00</span>
              </div>
           </div>
           
           <button className="w-full mt-10 py-4 bg-white text-[#1e293b] rounded-[24px] text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
              DOWNLOAD INVOICE (PDF)
           </button>
        </div>

        {/* Quick Payment Methods */}
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-6">Payment Methods</h3>
           <div className="space-y-3">
              {['HDFC Bank Summary', 'Unified Payments (UPI)', 'Credit/Debit Cards'].map(method => (
                <div key={method} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#2563eb]/30 transition-all cursor-pointer group">
                   <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{method}</span>
                   <span className="material-symbols-outlined text-slate-300 group-hover:text-[#2563eb] text-[18px]">chevron_right</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}

function DocumentsTab({ student }) {
  const docs = student.documents || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Category Cards and Helper */}
      <div className="lg:col-span-4 space-y-8">
        <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-6">File Categories</h3>
           <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Academic', count: 12, color: 'bg-blue-50 text-[#2563eb]', icon: 'school' },
                { label: 'Identity', count: 4, color: 'bg-green-50 text-green-600', icon: 'badge' },
                { label: 'Fees', count: 8, color: 'bg-purple-50 text-purple-600', icon: 'receipt_long' },
                { label: 'Others', count: 2, color: 'bg-slate-50 text-slate-400', icon: 'folder_open' }
              ].map(cat => (
                <div key={cat.label} className="p-4 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-[#2563eb]/20 transition-all cursor-pointer group">
                   <div className={`w-10 h-10 ${cat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                   </div>
                   <p className="text-xs font-black text-slate-900 mb-0.5">{cat.label}</p>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{cat.count} Files</p>
                </div>
              ))}
           </div>
        </div>

        {/* Upload Dropzone Preview */}
        <div className="bg-[#2563eb]/5 border-2 border-dashed border-[#2563eb]/20 rounded-[32px] p-10 flex flex-col items-center text-center group cursor-pointer hover:bg-[#2563eb]/10 transition-all">
           <div className="w-16 h-16 bg-white rounded-[24px] flex items-center justify-center text-[#2563eb] shadow-xl shadow-blue-100 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[32px]">cloud_upload</span>
           </div>
           <h4 className="text-sm font-black text-[#2563eb] uppercase tracking-widest mb-2">Upload New Media</h4>
           <p className="text-[10px] font-bold text-[#2563eb]/60 uppercase tracking-tight">Drag & drop or browse files</p>
        </div>
      </div>

      {/* Right Column - Document List */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Document Storage</h3>
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button className="px-4 py-2 bg-white text-[#2563eb] rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">Grid View</button>
               <button className="px-4 py-2 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest">List View</button>
            </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.1em] border-b border-slate-50">
                   <th className="px-8 py-4">Document Details</th>
                   <th className="px-4 py-4">Status</th>
                   <th className="px-4 py-4">Last Updated</th>
                   <th className="px-8 py-4 text-center">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                 {docs.map(doc => (
                   <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-[#2563eb]/10 group-hover:text-[#2563eb] transition-all">
                              <span className="material-symbols-outlined">{doc.type === 'pdf' ? 'picture_as_pdf' : 'description'}</span>
                           </div>
                           <div>
                              <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{doc.size}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-4 py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verified</span>
                        </div>
                     </td>
                     <td className="px-4 py-5 text-sm font-bold text-slate-500">
                        {new Date(doc.uploadDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                     </td>
                     <td className="px-8 py-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                           <button className="p-2 text-slate-300 hover:text-[#2563eb] hover:bg-blue-50 rounded-xl transition-all">
                              <span className="material-symbols-outlined text-[20px]">download</span>
                           </button>
                           <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Detail Page ────────────────────────────────────────────

const tabs = [
  { id: 'overview',  label: 'Overview',  icon: 'dashboard' },
  { id: 'academics', label: 'Academics', icon: 'school' },
  { id: 'fees',      label: 'Fees',      icon: 'payments' },
  { id: 'documents', label: 'Documents', icon: 'folder_open' },
]

export default function StudentDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const student = getStudentById(decodeURIComponent(id))

  if (!student) {
    return (
      <Layout title="Student Not Found">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">person_off</span>
          <h2 className="text-xl font-bold text-slate-700 mb-2">Student Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">No student record exists with ID "{decodeURIComponent(id)}"</p>
          <button
            onClick={() => navigate('/students')}
            className="px-5 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-semibold hover:bg-[#1d4ed8] transition-all"
          >
            Back to Students
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Students / ${student.name}`}>
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate('/students')}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-500 hover:text-[#2563eb] hover:border-[#2563eb] hover:shadow-md transition-all group uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Back to Students</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50/50 border border-blue-100 rounded-xl">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Active Session</span>
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="text-right hidden md:block">
              <span className="block text-sm font-black text-slate-900 leading-none">Admin Control</span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Super User</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Profile Card */}
      <div className="bg-white rounded-[32px] border border-slate-200/60 p-8 shadow-sm mb-8 relative overflow-hidden group">
        {/* Abstract background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-slate-50 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-1000" />
        <div className="absolute top-1/2 -right-12 w-32 h-32 bg-blue-50/30 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-[40px] p-1.5 bg-gradient-to-br from-[#2563eb] to-[#7c3aed] shadow-2xl">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full rounded-[36px] object-cover border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{student.name}</h2>
                <span className="px-3 py-1 bg-blue-50 text-[#2563eb] border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-widest mt-1 sm:mt-0">
                  {student.id}
                </span>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
                  <span className="text-base font-bold text-slate-600">{student.department}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:block" />
                  <span className="text-base font-bold text-slate-400">Semester {student.semester}</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-5 mt-2">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span className="material-symbols-outlined text-[20px] text-slate-300">school</span>
                      <span className="uppercase tracking-wide">{student.year} Year</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span className="material-symbols-outlined text-[20px] text-slate-300">location_on</span>
                      <span className="uppercase tracking-wide">Block C, Room 402</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                      <span className="material-symbols-outlined text-[20px] text-slate-300">event_available</span>
                      <span className="uppercase tracking-wide">Batch 2023-27</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-6 py-4 bg-[#2563eb] text-white rounded-[22px] text-sm font-black hover:bg-[#1d4ed8] hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>Quick Action</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-[22px] text-sm font-black hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[20px]">description</span>
              <span>Report</span>
            </button>
            <button className="p-4 bg-white border border-slate-200 text-slate-400 rounded-2xl hover:text-[#2563eb] hover:border-[#2563eb] transition-all shadow-sm group/edit">
              <span className="material-symbols-outlined text-[20px] group-hover/edit:rotate-12 transition-transform">edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Underlined Tab Navigation */}
      <div className="flex items-center gap-10 border-b border-slate-100 mb-10 px-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === tab.id
                ? 'text-[#2563eb]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2563eb] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && <OverviewTab student={student} />}
        {activeTab === 'academics' && <AcademicsTab student={student} />}
        {activeTab === 'fees' && <FeesTab student={student} />}
        {activeTab === 'documents' && <DocumentsTab student={student} />}
      </div>
    </Layout>
  )
}
