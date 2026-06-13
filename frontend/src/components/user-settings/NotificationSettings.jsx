import { useEffect, useMemo, useState } from 'react';
import { userSettingsApi } from '../../api/userSettingsApi';
import { useSettingsContext } from '../../context/SettingsContext';
import { SettingsCard, SettingsActions, SettingsError, SettingsLoader, SettingsToast, ToggleRow, isDirty } from '../settings/SettingsPanelCommon';

function labelFor(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (v) => v.toUpperCase()).trim();
}

export default function NotificationSettings({ role, userId }) {
  const { setSectionData, markSectionDirty } = useSettingsContext();
  const [form, setForm] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    userSettingsApi.getNotifications(role, userId).then((data) => {
      if (!mounted) return;
      setForm(data);
      setBaseline(data);
      setSectionData('notifications', data);
    }).catch((e) => { if (mounted) setError(e.message); })
    .finally(() => { if (mounted) setLoading(false); });

    return () => {
      mounted = false;
      markSectionDirty('notifications', false);
    };
  }, [markSectionDirty, role, setSectionData, userId]);

  const dirty = useMemo(() => isDirty(form, baseline), [form, baseline]);

  useEffect(() => {
    markSectionDirty('notifications', dirty);
  }, [dirty, markSectionDirty]);

  function updateField(field, value) {
    setForm((cur) => ({ ...cur, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const response = await userSettingsApi.updateNotifications(role, userId, form);
      const updated = response.data;
      setForm(updated);
      setBaseline(updated);
      setSectionData('notifications', updated);
      setToast('Notification preferences saved.');
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setForm(baseline);
    setToast('Notification preferences reset.');
  }

  if (loading) return <SettingsLoader label="Loading notification preferences…" />;
  if (!form) return <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-sm text-red-500">{error || 'Unable to load notifications.'}</div>;

  return (
    <div className="flex flex-col gap-5">
      <SettingsError message={error} />

      <SettingsCard title="Notification Preferences" description="Control which alerts and updates you receive from MIT Connect.">
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          {Object.entries(form)
            .filter(([key]) => key !== 'email' && key !== 'sms')
            .map(([key, value]) => (
              <ToggleRow
                key={key}
                label={labelFor(key)}
                checked={Boolean(value)}
                onChange={(v) => updateField(key, v)}
              />
            ))}
        </div>
        <SettingsActions onSave={handleSave} onReset={handleReset} saving={saving} disableSave={!dirty} />
      </SettingsCard>

      <SettingsToast message={toast} onClear={() => setToast('')} />
    </div>
  );
}
