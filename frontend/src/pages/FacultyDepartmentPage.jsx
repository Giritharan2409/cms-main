import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import KpiGrid from '../components/KpiGrid';
import { Building2, Users, BookOpen, Mail, MapPin, Share2, Edit, X, Save } from 'lucide-react';
import { getUserData, getUserSession } from '../auth/sessionController';
import { settingsApi } from '../api/settingsApi';
import { buildApiUrl } from '../api/apiBase';
import { cmsRoles } from '../data/roleConfig';



// Edit Department Modal
function EditDepartmentModal({ isOpen, onClose, department, onSave }) {
  const [formData, setFormData] = useState(department || {});

  useEffect(() =>{
    if (department) {
      setFormData(department);
    }
  }, [department]);

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData(prev =>({ ...prev, [name]: value }));
  };

  const handleSubmit = () =>{
    onSave(formData);
    alert('Department information updated successfully!');
    onClose();
  };

  if (!isOpen || !department) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}><div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Edit Department Details
          </h2><button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
          ><X size={20} color="#6b7280" /></button></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Department Name
          </label><input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Department Code
            </label><input
              type="text"
              name="code"
              value={formData.code || ''}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Head of Department
            </label><input
              type="text"
              name="head"
              value={formData.head || ''}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email
          </label><input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Phone
          </label><input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Location
          </label><input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ marginBottom: '20px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Description
          </label><textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            rows="3"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          /></div><div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}><button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) =>e.target.style.background = '#d1d5db'}
            onMouseLeave={(e) =>e.target.style.background = '#e5e7eb'}
          >Cancel
          </button><button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              background: '#276221',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) =>e.target.style.background = '#1e4618'}
            onMouseLeave={(e) =>e.target.style.background = '#276221'}
          ><Save size={16} />Save Changes
          </button></div></div></div>);
}

// Add Department Modal
function AddDepartmentModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    head: '',
    totalFaculty: 0,
    totalStudents: 0,
    courses: 0,
    email: '',
    phone: '',
    location: '',
    description: ''
  });

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData(prev =>({ 
      ...prev, 
      [name]: name.includes('total') || name === 'courses' ? (value === '' ? '' : Number(value)) : value 
    }));
  };

  const handleSubmit = () =>{
    if (!formData.name || !formData.code) {
      alert('Please fill in all required fields');
      return;
    }
    
    const newDept = {
      id: Date.now(),
      ...formData,
      totalFaculty: formData.totalFaculty === '' ? 0 : Number(formData.totalFaculty),
      totalStudents: formData.totalStudents === '' ? 0 : Number(formData.totalStudents),
      courses: formData.courses === '' ? 0 : Number(formData.courses)
    };
    
    onSave(newDept);
    setFormData({
      name: '',
      code: '',
      head: '',
      totalFaculty: 0,
      totalStudents: 0,
      courses: 0,
      email: '',
      phone: '',
      location: '',
      description: ''
    });
    alert('Department added successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}><div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Add New Department
          </h2><button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
          ><X size={20} color="#6b7280" /></button></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Department Name *
          </label><input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Computer Science & Engineering"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Department Code *
            </label><input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="e.g., CSE"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Head of Department
            </label><input
              type="text"
              name="head"
              value={formData.head}
              onChange={handleChange}
              placeholder="e.g., Prof. Name"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email
          </label><input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="dept@mit.edu"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Phone
          </label><input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91-9876543210"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ marginBottom: '12px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Location
          </label><input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Building A, Floor 3"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          /></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Faculty
            </label><input
              type="number"
              name="totalFaculty"
              value={formData.totalFaculty}
              onChange={handleChange}
              min="0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Students
            </label><input
              type="number"
              name="totalStudents"
              value={formData.totalStudents}
              onChange={handleChange}
              min="0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div><div><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Courses
            </label><input
              type="number"
              name="courses"
              value={formData.courses}
              onChange={handleChange}
              min="0"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            /></div></div><div style={{ marginBottom: '20px' }}><label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Description
          </label><textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Brief description of the department"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
          /></div><div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}><button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) =>e.target.style.background = '#d1d5db'}
            onMouseLeave={(e) =>e.target.style.background = '#e5e7eb'}
          >Cancel
          </button><button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              background: '#06b6d4',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) =>e.target.style.background = '#3d8b30'}
            onMouseLeave={(e) =>e.target.style.background = '#06b6d4'}
          ><Save size={16} />Add Department
          </button></div></div></div>);
}

// Share Department Modal
function ShareDepartmentModal({ isOpen, onClose, departmentName }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/department/${departmentName}`;

  const handleCopyLink = () =>{
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() =>setCopied(false), 2000);
  };

  const handleShareEmail = () =>{
    const subject = `Department Information - ${departmentName}`;
    const body = `Check out this department information: ${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}><div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)'
      }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Share Department
          </h2><button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
          ><X size={20} color="#6b7280" /></button></div><div style={{ marginBottom: '16px' }}><label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>Share Link
          </label><div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '6px'
          }}><input
              type="text"
              value={shareUrl}
              readOnly
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '13px',
                color: '#374151'
              }}
            /><button
              onClick={handleCopyLink}
              style={{
                padding: '6px 10px',
                background: '#276221',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >{copied ? 'Copied!' : 'Copy'}
            </button></div></div><div style={{ marginBottom: '20px' }}><button
            onClick={handleShareEmail}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) =>{
              e.target.style.background = '#e5e7eb';
              e.target.style.borderColor = '#c4b5fd';
            }}
            onMouseLeave={(e) =>{
              e.target.style.background = '#f3f4f6';
              e.target.style.borderColor = '#d1d5db';
            }}
          >Share via Email
          </button></div><div style={{ display: 'flex', justifyContent: 'flex-end' }}><button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: '#276221',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) =>e.target.style.background = '#1e4618'}
            onMouseLeave={(e) =>e.target.style.background = '#276221'}
          >Close
          </button></div></div></div>);
}

export default function FacultyDepartmentPage() {
  const userData = getUserData();
  const session = getUserSession();
  const role = session?.role || 'student';
  const userDept = userData?.departmentId || userData?.department || '';
  
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchDepartments() {
      try {
        let list = [];
        try {
          const data = await settingsApi.getDepartments();
          list = Array.isArray(data) ? data : [];
        } catch (_) { list = []; }

        if (role === 'faculty') {
          // Filter to faculty's own department
          let filtered = list.filter(d =>
            d.code === userDept ||
            d.name === userDept ||
            (userDept && d.name?.toLowerCase().includes(userDept.toLowerCase()))
          );

          // --- FALLBACK: if API returned nothing, build from faculty profile ---
          if (filtered.length === 0) {
            try {
              const res = await fetch(buildApiUrl(`/faculty/${session?.userId}`));
              const profile = res.ok ? await res.json() : null;
              const deptName =
                profile?.department ||
                profile?.departmentId ||
                userDept ||
                userData?.department ||
                'School of Engineering';

              filtered = [{
                id: 'my-dept',
                name: deptName,
                code: profile?.departmentId || deptName?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 4) || 'DEPT',
                head: profile?.name || userData?.name || session?.userId || 'Department Head',
                totalFaculty: profile?.totalFaculty || 0,
                totalStudents: profile?.totalStudents || 0,
                courses: profile?.courses || 0,
                email: profile?.email || userData?.email || '',
                phone: profile?.phone || userData?.phone || '',
                location: profile?.location || userData?.location || 'Campus',
                description: `${deptName} department.`,
              }];
            } catch (err) {
              // Last resort: use roleConfig data + session data
              const facultyConfig = cmsRoles.faculty;
              const deptName = userDept || userData?.department || facultyConfig?.team || 'School of Engineering';
              const facultyName = userData?.name || facultyConfig?.name || session?.userId || 'Department Head';
              filtered = [{
                id: 'my-dept',
                name: deptName,
                code: deptName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 4) || 'DEPT',
                head: facultyName,
                totalFaculty: 0,
                totalStudents: 0,
                courses: 0,
                email: userData?.email || '',
                phone: userData?.phone || '',
                location: userData?.location || 'Campus',
                description: `${deptName} — managed by ${facultyName}.`,
              }];
            }
          }

          if (cancelled) return;
          setDepartments(filtered);
          setLoading(false);
          setSelectedDept(filtered[0] || null);
          return;
        }

        if (cancelled) return;
        setDepartments(list);
        setLoading(false);

        const userDeptMatch = list.find(d =>
          d.code === userDept ||
          d.name === userDept ||
          (userDept && d.name?.toLowerCase().includes(userDept.toLowerCase()))
        );
        if (userDeptMatch) {
          setSelectedDept(userDeptMatch);
        } else if (list.length > 0) {
          setSelectedDept(list[0]);
        }
      } catch (err) {
        console.error('Failed to fetch departments:', err);
        setLoading(false);
      }
    }
    fetchDepartments();
    return () => { cancelled = true; };
  }, [userDept, role]);

  const handleEditSave = async (updatedData) =>{
    try {
      const saved = await settingsApi.updateDepartment(updatedData.id, updatedData);
      setSelectedDept(saved);
      setDepartments(departments.map(d =>d.id === saved.id ? saved : d));
    } catch (err) {
      console.error('Failed to update department:', err);
      // Optimistic local update
      setSelectedDept(updatedData);
      setDepartments(departments.map(d =>d.id === updatedData.id ? updatedData : d));
    }
  };

  const handleAddDepartment = async (newDept) =>{
    try {
      const saved = await settingsApi.createDepartment(newDept);
      setDepartments([...departments, saved]);
      setSelectedDept(saved);
    } catch (err) {
      console.error('Failed to add department:', err);
      setDepartments([...departments, newDept]);
      setSelectedDept(newDept);
    }
  };

  // For faculty: show their department's stats directly; for admin: aggregate all
  const stats = role === 'faculty' && selectedDept
    ? {
        totalDepts: 1,
        totalFacultyAcross: selectedDept.totalFaculty || 0,
        totalStudentsAcross: selectedDept.totalStudents || 0,
        totalCourses: selectedDept.courses || 0,
      }
    : {
        totalDepts: departments.length,
        totalFacultyAcross: departments.reduce((sum, d) => sum + (d.totalFaculty || 0), 0),
        totalStudentsAcross: departments.reduce((sum, d) => sum + (d.totalStudents || 0), 0),
        totalCourses: departments.reduce((sum, d) => sum + (d.courses || 0), 0),
      };
  return (
    <Layout title="Departments">
      <div style={{ paddingBottom: '40px' }}>

        {/* ── ADMIN: keep original sidebar+add button layout ── */}
        {role !== 'faculty' && (
          <>
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsAddOpen(true)}
                style={{
                  padding: '10px 20px', background: '#276221', color: 'white',
                  border: 'none', borderRadius: '8px', fontSize: '14px',
                  fontWeight: '600', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                }}
              >+ Add Department</button>
            </div>
            <KpiGrid>
              <KpiCard icon="domain"  label="Departments"    value={departments.length.toString()} colorScheme="green" />
              <KpiCard icon="person"  label="Total Faculty"  value={departments.reduce((s,d)=>s+(d.totalFaculty||0),0).toString()} colorScheme="green" />
              <KpiCard icon="group"   label="Total Students" value={departments.reduce((s,d)=>s+(d.totalStudents||0),0).toString()} colorScheme="emerald" />
              <KpiCard icon="school"  label="Total Courses"  value={departments.reduce((s,d)=>s+(d.courses||0),0).toString()} colorScheme="emerald" />
            </KpiGrid>
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
              <div style={{ background:'#fff', borderRadius:'12px', overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.1)', maxHeight:'600px', display:'flex', flexDirection:'column' }}>
                <div style={{ padding:'16px', borderBottom:'1px solid #e5e7eb', background:'#f9fafb', fontWeight:'600', color:'#374151', fontSize:'14px' }}>Departments</div>
                <div style={{ overflow:'auto', flex:1 }}>
                  {loading ? <div style={{ padding:'16px', textAlign:'center', color:'#9ca3af' }}>Loading...</div>
                    : departments.map(dept => (
                      <button key={dept.id} onClick={() => setSelectedDept(dept)} style={{
                        width:'100%', padding:'12px 16px', border:'none',
                        background: selectedDept?.id===dept.id ? '#f0fdf4' : 'transparent',
                        borderLeft: selectedDept?.id===dept.id ? '3px solid #276221' : '3px solid transparent',
                        textAlign:'left', cursor:'pointer', transition:'all 0.2s', borderBottom:'1px solid #f3f4f6'
                      }}>
                        <div style={{ fontSize:'13px', fontWeight:'600', color: selectedDept?.id===dept.id ? '#276221' : '#1f2937', marginBottom:'2px' }}>{dept.code}</div>
                        <div style={{ fontSize:'12px', color:'#6b7280' }}>{dept.name}</div>
                      </button>
                    ))
                  }
                </div>
              </div>
              {selectedDept && (
                <div style={{ background:'#fff', borderRadius:'12px', padding:'24px', boxShadow:'0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ marginBottom:'20px', display:'flex', justifyContent:'space-between', alignItems:'start' }}>
                    <div>
                      <div style={{ fontSize:'12px', fontWeight:'600', color:'#276221', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'4px' }}>{selectedDept.code}</div>
                      <h2 style={{ fontSize:'22px', fontWeight:'700', color:'#1f2937', margin:0 }}>{selectedDept.name}</h2>
                      <p style={{ fontSize:'14px', color:'#6b7280', margin:'6px 0 0' }}>{selectedDept.description}</p>
                    </div>
                    <div style={{ display:'flex', gap:'8px' }}>
                      <button onClick={() => setIsEditOpen(true)} style={{ padding:'8px 14px', background:'#f5f3ff', color:'#7c3aed', border:'1px solid #ddd6fe', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}><Edit size={14}/>Edit</button>
                      <button onClick={() => setIsShareOpen(true)} style={{ padding:'8px 14px', background:'#276221', color:'white', border:'none', borderRadius:'8px', fontSize:'13px', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}><Share2 size={14}/>Share</button>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'20px' }}>
                    {[{label:'Faculty',value:selectedDept.totalFaculty,bg:'#f0fdf4',color:'#15803d'},{label:'Students',value:selectedDept.totalStudents,bg:'#fdf2f8',color:'#be185d'},{label:'Courses',value:selectedDept.courses,bg:'#eff6ff',color:'#1e40af'}].map(s=>(
                      <div key={s.label} style={{ background:s.bg, borderRadius:'10px', padding:'16px' }}>
                        <div style={{ fontSize:'11px', fontWeight:'600', color:s.color, textTransform:'uppercase', marginBottom:'4px' }}>{s.label}</div>
                        <div style={{ fontSize:'26px', fontWeight:'700', color:s.color }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:'#f9fafb', borderRadius:'10px', padding:'16px' }}>
                    <h3 style={{ fontSize:'13px', fontWeight:'600', color:'#374151', margin:'0 0 12px' }}>Contact</h3>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                      <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}><Mail size={16} color="#276221"/><div><div style={{ fontSize:'11px', color:'#9ca3af', fontWeight:'600' }}>EMAIL</div><a href={`mailto:${selectedDept.email}`} style={{ fontSize:'13px', color:'#276221' }}>{selectedDept.email||'—'}</a></div></div>
                      <div style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}><MapPin size={16} color="#276221"/><div><div style={{ fontSize:'11px', color:'#9ca3af', fontWeight:'600' }}>LOCATION</div><div style={{ fontSize:'13px', color:'#374151' }}>{selectedDept.location||'—'}</div></div></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════
            FACULTY: Beautiful full-width department profile
            ══════════════════════════════════════════════════ */}
        {role === 'faculty' && (
          loading ? (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'300px' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ width:'48px', height:'48px', border:'4px solid #e5e7eb', borderTopColor:'#276221', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}/>
                <p style={{ color:'#6b7280', fontSize:'14px' }}>Loading your department...</p>
              </div>
            </div>
          ) : !selectedDept ? (
            <div style={{ textAlign:'center', padding:'80px 24px', color:'#6b7280' }}>
              <span className="material-symbols-outlined" style={{ fontSize:'64px', opacity:0.2, display:'block', marginBottom:'12px' }}>domain</span>
              <p>No department information found.</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'24px' }}>

              {/* ── Hero Banner ── */}
              <div style={{
                background: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #276221 70%, #15803d 100%)',
                borderRadius: '20px',
                padding: '40px 40px 32px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(39,98,33,0.35)',
              }}>
                {/* Decorative circles */}
                <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'200px', height:'200px', background:'rgba(255,255,255,0.05)', borderRadius:'50%' }}/>
                <div style={{ position:'absolute', bottom:'-60px', right:'120px', width:'160px', height:'160px', background:'rgba(255,255,255,0.04)', borderRadius:'50%' }}/>
                <div style={{ position:'absolute', top:'20px', right:'200px', width:'80px', height:'80px', background:'rgba(255,255,255,0.06)', borderRadius:'50%' }}/>

                <div style={{ position:'relative', zIndex:1 }}>
                  {/* Dept code badge */}
                  <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:'100px', padding:'6px 16px', marginBottom:'20px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize:'16px', color:'rgba(255,255,255,0.9)' }}>domain</span>
                    <span style={{ fontSize:'12px', fontWeight:'700', color:'rgba(255,255,255,0.95)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{selectedDept.code}</span>
                  </div>

                  <h1 style={{ fontSize:'36px', fontWeight:'800', color:'white', margin:'0 0 10px', lineHeight:'1.1', letterSpacing:'-0.5px' }}>
                    {selectedDept.name}
                  </h1>
                  <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.75)', margin:'0 0 28px', maxWidth:'520px', lineHeight:'1.6' }}>
                    {selectedDept.description}
                  </p>

                  {/* Share button */}
                  <button
                    onClick={() => setIsShareOpen(true)}
                    style={{
                      display:'inline-flex', alignItems:'center', gap:'8px',
                      padding:'10px 20px', background:'rgba(255,255,255,0.15)',
                      backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)',
                      borderRadius:'10px', color:'white', fontSize:'13px',
                      fontWeight:'600', cursor:'pointer', transition:'all 0.2s'
                    }}
                    onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.25)'}
                    onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
                  >
                    <Share2 size={15}/>Share Department
                  </button>
                </div>
              </div>

              {/* ── 4 Stat Cards ── */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:'16px' }}>
                {[
                  { icon:'person', label:'Faculty Members', value: selectedDept.totalFaculty ?? '—', bg:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'#bbf7d0', iconBg:'#276221', val:'#15803d' },
                  { icon:'group',  label:'Total Students',  value: selectedDept.totalStudents ?? '—', bg:'linear-gradient(135deg,#fdf4ff,#f3e8ff)', border:'#e9d5ff', iconBg:'#9333ea', val:'#7e22ce' },
                  { icon:'menu_book', label:'Courses Offered', value: selectedDept.courses ?? '—', bg:'linear-gradient(135deg,#eff6ff,#dbeafe)', border:'#bfdbfe', iconBg:'#2563eb', val:'#1d4ed8' },
                  { icon:'event_seat', label:'Established', value:'2003', bg:'linear-gradient(135deg,#fff7ed,#ffedd5)', border:'#fed7aa', iconBg:'#ea580c', val:'#c2410c' },
                ].map(s => (
                  <div key={s.label} style={{
                    background: s.bg, borderRadius:'16px', padding:'22px',
                    border: `1px solid ${s.border}`,
                    boxShadow:'0 4px 16px rgba(0,0,0,0.06)',
                    transition:'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,0.1)'}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.06)'}}
                  >
                    <div style={{ width:'40px', height:'40px', background:s.iconBg, borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'14px' }}>
                      <span className="material-symbols-outlined" style={{ fontSize:'20px', color:'white' }}>{s.icon}</span>
                    </div>
                    <div style={{ fontSize:'30px', fontWeight:'800', color:s.val, lineHeight:1, marginBottom:'6px' }}>{s.value}</div>
                    <div style={{ fontSize:'12px', fontWeight:'600', color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.5px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* ── Bottom Row: HOD Card + Contact Info ── */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>

                {/* Head of Department card */}
                <div style={{
                  background:'white', borderRadius:'16px', padding:'28px',
                  boxShadow:'0 4px 20px rgba(0,0,0,0.07)', border:'1px solid #f1f5f9',
                }}>
                  <div style={{ fontSize:'11px', fontWeight:'700', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'20px' }}>Head of Department</div>
                  <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                    <div style={{
                      width:'60px', height:'60px', borderRadius:'50%',
                      background:'linear-gradient(135deg,#276221,#15803d)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      boxShadow:'0 8px 20px rgba(39,98,33,0.3)', flexShrink:0
                    }}>
                      <span style={{ fontSize:'22px', fontWeight:'700', color:'white' }}>
                        {(selectedDept.head||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize:'18px', fontWeight:'700', color:'#1f2937', marginBottom:'4px' }}>{selectedDept.head || 'Not assigned'}</div>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:'100px', padding:'3px 10px' }}>
                        <div style={{ width:'6px', height:'6px', background:'#22c55e', borderRadius:'50%' }}/>
                        <span style={{ fontSize:'11px', fontWeight:'600', color:'#16a34a' }}>Department Head</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact info card */}
                <div style={{
                  background:'white', borderRadius:'16px', padding:'28px',
                  boxShadow:'0 4px 20px rgba(0,0,0,0.07)', border:'1px solid #f1f5f9',
                }}>
                  <div style={{ fontSize:'11px', fontWeight:'700', color:'#9ca3af', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'20px' }}>Contact Information</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                    {[
                      { icon:'mail', label:'Email', value: selectedDept.email, href:`mailto:${selectedDept.email}` },
                      { icon:'call', label:'Phone', value: selectedDept.phone, href:`tel:${selectedDept.phone}` },
                      { icon:'location_on', label:'Location', value: selectedDept.location },
                    ].map(item => (
                      <div key={item.label} style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                        <div style={{ width:'36px', height:'36px', background:'#f0fdf4', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <span className="material-symbols-outlined" style={{ fontSize:'18px', color:'#276221' }}>{item.icon}</span>
                        </div>
                        <div>
                          <div style={{ fontSize:'11px', color:'#9ca3af', fontWeight:'600', marginBottom:'2px' }}>{item.label}</div>
                          {item.href && item.value
                            ? <a href={item.href} style={{ fontSize:'14px', color:'#276221', textDecoration:'none', fontWeight:'500' }}>{item.value}</a>
                            : <div style={{ fontSize:'14px', color: item.value ? '#374151' : '#d1d5db', fontWeight:'500' }}>{item.value || 'Not provided'}</div>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )
        )}

        {/* Modals */}
        <AddDepartmentModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSave={handleAddDepartment} />
        <EditDepartmentModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} department={selectedDept} onSave={handleEditSave} />
        <ShareDepartmentModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} departmentName={selectedDept?.name || 'Department'} />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </Layout>
  );
}

