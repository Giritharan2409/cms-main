import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import AddEditFacultyModal from '../components/AddEditFacultyModal';
import { 
  Users, UserPlus, Filter, Search, BookOpen, Clock, 
  MapPin, Award, CheckCircle, XCircle 
} from 'lucide-react';
import '../styles.css';
import { API_BASE } from '../api/apiBase';

export default function FacultyPage() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFaculty, setEditFaculty] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaculty();
  }, [departmentFilter, statusFilter]);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/faculty?`;
      if (departmentFilter) url += `departmentId=${departmentFilter}&`;
      if (statusFilter) url += `employmentStatus=${statusFilter}&`;
      
      const response = await fetch(url);
      const data = await response.json();
      setFacultyList(data);
    } catch (error) {
      console.error('Error fetching faculty mapping:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = facultyList.filter(f => 
    f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Faculty Directory">
      <div className="page-container">
        <div className="page-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 className="page-title">Faculty Management</h1>
            <p className="page-subtitle">Manage faculty profiles, course mappings, and performance</p>
          </div>
          <div className="page-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => { setEditFaculty(null); setIsModalOpen(true); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
            >
              <UserPlus size={18} />
              Add Faculty
            </button>
          </div>
        </div>

      <div className="stats-grid" style={{ marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <StatCard 
          icon="group" 
          title="Total Faculty" 
          value={facultyList.length} 
          trend="+2" 
          trendUp={true} 
          color="blue" 
        />
        <StatCard 
          icon="workspace_premium" 
          title="Active Members" 
          value={facultyList.filter(f => f.employment_status === 'Active').length} 
          trend="0" 
          trendUp={true} 
          color="green" 
        />
        <StatCard 
          icon="domain" 
          title="Departments" 
          value={new Set(facultyList.map(f => f.departmentId)).size} 
          trend="Stable" 
          trendUp={true} 
          color="purple" 
        />
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 className="card-title">Faculty Directory</h2>
          </div>
          
          <div className="filters-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'var(--surface-color)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', gridColumn: 'span 1' }}>
              <Search size={18} style={{ color: 'var(--text-tertiary)', marginRight: '0.75rem', flexShrink: 0 }} />
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.95rem' }}
              />
            </div>
            
            <select 
              className="select-input" 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'var(--text-primary)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
            
            <select 
               className="select-input"
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'var(--text-primary)', fontSize: '0.95rem', cursor: 'pointer' }}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On-Leave">On Leave</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-color)', borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ width: '10%', padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Faculty ID</th>
                <th style={{ width: '22%', padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Name</th>
                <th style={{ width: '18%', padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Designation</th>
                <th style={{ width: '15%', padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Department</th>
                <th style={{ width: '18%', padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Email</th>
                <th style={{ width: '10%', padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Status</th>
                <th style={{ width: '7%', padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Loading Faculty Data...</td></tr>
              ) : filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty, index) => (
                  <tr key={faculty._id} style={{ 
                    borderBottom: '1px solid var(--border-color)', 
                    backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)',
                    transition: 'background-color 0.2s ease'
                  }} 
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)'}
                  >
                    <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textAlign: 'left' }}>
                      {faculty.employeeId}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem', textAlign: 'left' }}>
                      {faculty.name}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left' }}>
                      {faculty.designation || 'Faculty Member'}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontSize: '0.9rem', textAlign: 'left' }}>
                      {faculty.departmentId}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', textAlign: 'left', wordBreak: 'break-word' }}>
                      {faculty.email || 'N/A'}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '0.4rem 0.8rem', 
                        borderRadius: 'var(--radius-md)', 
                        fontSize: '0.8rem', 
                        fontWeight: 600,
                        backgroundColor: faculty.employment_status === 'Active' ? '#d1fae5' : 
                                       faculty.employment_status === 'On-Leave' ? '#fef3c7' : '#fee2e2',
                        color: faculty.employment_status === 'Active' ? '#065f46' : 
                               faculty.employment_status === 'On-Leave' ? '#92400e' : '#7f1d1d',
                        whiteSpace: 'nowrap'
                      }}>
                        {faculty.employment_status || 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => navigate(`/faculty/${faculty.employeeId}`)}
                        style={{ 
                          padding: '0.5rem 1rem', 
                          fontSize: '0.85rem', 
                          fontWeight: 500,
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    No faculty members found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddEditFacultyModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFaculty}
        editMode={!!editFaculty}
        initialData={editFaculty}
      />
    </div>
    </Layout>
  );
}
