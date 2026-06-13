import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSettingsApi } from '../../api/userSettingsApi';
import { useSettingsContext } from '../../context/SettingsContext';
import { destroyUserSession } from '../../auth/sessionController';
import { SettingsCard, SettingsError, SettingsLoader, SettingsToast } from '../settings/SettingsPanelCommon';

export default function SecuritySettings({ role, userId }) {
  const navigate = useNavigate();
  const { markSectionDirty } = useSettingsContext();
  const [sessions, setSessions] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  async function load() {
    setLoading(true);
    setError('');
    try {
      const [sessionData, historyData] = await Promise.all([
        userSettingsApi.getSessions(role, userId),
        userSettingsApi.getLoginHistory(role, userId),
      ]);
      setSessions(sessionData);
      setLoginHistory(historyData);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    markSectionDirty('security', false);
    load();
  }, [markSectionDirty, role, userId]); // eslint-disable-line

  async function handleLogoutAll() {
    setRunning(true);
    setError('');
    try {
      const response = await userSettingsApi.logoutAllDevices(role, userId);
      setSessions(response.data || []);
      setToast('All active sessions logged out. Redirecting…');
      setTimeout(() => { destroyUserSession(); navigate('/', { replace: true }); }, 1500);
    } catch (e) {
      setError(e.message);
    } finally {
      setRunning(false);
    }
  }

  if (loading) return <SettingsLoader label="Loading security data…" />;

  return (
    <div className="flex flex-col gap-5">
      <SettingsError message={error} />

      {/* Active Sessions */}
      <SettingsCard title="Active Sessions" description="Devices currently logged in to your account.">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-slate-500">{sessions.length} session{sessions.length !== 1 ? 's' : ''} active</span>
          <button onClick={load} className="text-xs font-semibold text-[#276221] hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">refresh</span> Refresh
          </button>
        </div>

        <div className="space-y-2">
          {sessions.length === 0 && (
            <p className="text-sm text-slate-400 py-4 text-center">No active sessions found.</p>
          )}
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
              <div>
                <p className="text-sm font-semibold text-slate-800">{s.device}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.location} &middot; Last seen: {new Date(s.lastSeen).toLocaleString()}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                {s.active ? 'Active' : 'Logged Out'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={handleLogoutAll}
            disabled={running}
            className="inline-flex items-center gap-2 px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            {running ? 'Logging out…' : 'Logout All Devices'}
          </button>
        </div>
      </SettingsCard>

      {/* Login History */}
      <SettingsCard title="Login History" description="Recent sign-in events for your account.">
        <div className="space-y-2">
          {loginHistory.length === 0 && (
            <p className="text-sm text-slate-400 py-4 text-center">No login history found.</p>
          )}
          {loginHistory.map((entry, i) => (
            <div key={`${entry.timestamp}-${i}`} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50">
              <div>
                <p className="text-sm font-semibold text-slate-800">{new Date(entry.timestamp).toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-0.5">IP: {entry.ip}</p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${entry.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </SettingsCard>

      <SettingsToast message={toast} onClear={() => setToast('')} />
    </div>
  );
}
