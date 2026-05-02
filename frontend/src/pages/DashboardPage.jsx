import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserSession, getUserData } from '../auth/sessionController';
import { cmsRoles, roleMenuGroups } from '../data/roleConfig';
import { getStudentById } from '../data/studentData';
import { getDashboardSummary } from '../services/dashboardService';
import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import KpiGrid from '../components/KpiGrid';

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const session = getUserSession();
  const dynamicUser = getUserData();
  const sessionRole = session?.role || null;
  const sessionUserId = session?.userId || null;
  const role = sessionRole || 'student';
  
  const data = dynamicUser ? {
    name: dynamicUser.name || dynamicUser.fullName || dynamicUser.staffName || 'User',
    label: dynamicUser.designation || dynamicUser.role?.toUpperCase() || role.toUpperCase(),
    ...cmsRoles[role], // Merge with default stats/tasks/alerts
    ...dynamicUser,
    // Override stats for students with dynamic values
    stats: role === 'student' ? [
      { value: dynamicUser.cgpa?.toString() || '0.0', label: 'Current GPA', sub: 'From academic record' },
      { value: `${dynamicUser.attendancePct || 0}%`, label: 'Attendance', sub: dynamicUser.attendancePct >= 75 ? 'Good standing' : 'Low attendance' },
      { value: dynamicUser.subjects?.length?.toString() || '0', label: 'Enrolled Courses', sub: 'Current semester' },
      { value: dynamicUser.feeStatus || 'N/A', label: 'Fee Status', sub: 'Financial record' },
    ] : (dynamicUser.stats || cmsRoles[role].stats)
  } : (cmsRoles[role] || cmsRoles.student);

  const menuGroups = roleMenuGroups[role] || roleMenuGroups.student;
  const userId = sessionUserId || 'N/A';
  const roleQuery = `?role=${encodeURIComponent(role)}`;
  const knownStudent = sessionUserId ? getStudentById(sessionUserId) : null;
  const fallbackStudentId = 'STU-2024-1547';

  function handlePrimaryAction() {
    if (role === 'faculty') {
      navigate(`/attendance${roleQuery}`);
    } else if (role === 'admin') {
      navigate(`/admin-fees${roleQuery}`);
    } else if (role === 'finance') {
      navigate(`/invoices${roleQuery}`);
    } else if (role === 'student') {
      navigate(`/timetable${roleQuery}`);
    }
  }

  function handleSecondaryAction() {
    if (role === 'faculty') {
      navigate(`/exams${roleQuery}`);
    } else if (role === 'admin') {
      navigate(`/administration${roleQuery}`);
    } else if (role === 'finance') {
      navigate(`/payroll${roleQuery}`);
    } else if (role === 'student') {
      navigate(`/attendance${roleQuery}`);
    }
  }

  useEffect(() => {
    if (!sessionRole || !sessionUserId) {
      navigate('/', { replace: true });
      return undefined;
    }

    document.title = 'MIT Connect - Dashboard';

    const expectedSearch = `?role=${encodeURIComponent(sessionRole)}`;
    if (location.search !== expectedSearch) {
      navigate(`/dashboard${expectedSearch}`, { replace: true });
    }

    function enforceSessionOnPageRestore() {
      if (!getUserSession()) {
        navigate('/', { replace: true });
      }
    }

    // Fetch dashboard summary for admin/finance roles
    async function fetchDashboardData() {
      if (role === 'admin' || role === 'finance') {
        setLoadingStats(true);
        const summary = await getDashboardSummary();
        if (summary) {
          setDashboardStats(summary);
        }
        setLoadingStats(false);
      }
    }

    fetchDashboardData();

    window.addEventListener('pageshow', enforceSessionOnPageRestore);
    return () => window.removeEventListener('pageshow', enforceSessionOnPageRestore);
  }, [data.label, location.search, navigate, sessionRole, sessionUserId, role]);

  return (
    <Layout 
      title="Dashboard"
      userId={userId}
      onProfilePrimaryAction={handlePrimaryAction}
      onProfileSecondaryAction={handleSecondaryAction}
    >
      {/* Quick Overview */}
      <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Overview</h3>
                <KpiGrid>
                  {(() => {
                    // For admin/finance roles, use real data from API
                    if ((role === 'admin' || role === 'finance') && dashboardStats) {
                      const adminStats = [
                        { 
                          value: String(dashboardStats.total_students), 
                          label: 'Total Students', 
                          icon: 'group',
                          sub: 'Approved & Active' 
                        },
                        { 
                          value: String(dashboardStats.total_faculty), 
                          label: 'Faculty Members', 
                          icon: 'person',
                          sub: 'Approved & Active' 
                        },
                        { 
                          value: String(dashboardStats.active_events), 
                          label: 'Active Events', 
                          icon: 'event',
                          sub: 'Current month' 
                        },
                        { 
                          value: String(dashboardStats.dept_requests), 
                          label: 'Dept Requests', 
                          icon: 'assignment',
                          sub: 'Pending action' 
                        },
                      ];
                      return adminStats.map((entry, index) => {
                        const colorSchemes = ['blue', 'green', 'emerald', 'cyan'];
                        return (
                          <KpiCard
                            key={entry.label}
                            icon={entry.icon}
                            label={entry.label}
                            value={entry.value}
                            colorScheme={colorSchemes[index % 4]}
                          />
                        );
                      });
                    }
                    
                    // For other roles, use default stats from roleConfig
                    return data.stats.map((entry, index) => {
                      const colorSchemes = ['blue', 'green', 'emerald', 'cyan'];
                      return (
                        <KpiCard
                          key={entry.label}
                          icon={entry.icon || 'dashboard'}
                          label={entry.label}
                          value={entry.value}
                          colorScheme={colorSchemes[index % 4]}
                        />
                      );
                    });
                  })()}
                </KpiGrid>
              </div>
    </Layout>
  );
}
