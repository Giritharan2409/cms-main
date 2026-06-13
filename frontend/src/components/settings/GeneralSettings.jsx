import { useEffect, useState } from 'react';
import { settingsApi } from '../../api/settingsApi';
import { SettingsActions, SettingsCard, SettingsError, SettingsLoader, SettingsToast, inputCls, labelCls, isDirty } from './SettingsPanelCommon';

export default function GeneralSettings() {
  const [form, setForm] = useState(null);
  const [baseline, setBaseline] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    settingsApi.getGeneralSettings().then((data) => {
      setForm(data);
      setBaseline(data);
    }).catch(() => setError('Failed to load settings.'));
  }, []);

  function setField(key, value) {
    setForm((cur) => ({ ...cur, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const updated = await settingsApi.updateGeneralSettings(form);
      setBaseline(updated);
      setForm(updated);
      setToast('Portal settings saved successfully.');
    } catch {
      setError('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  }

  function handleReset() {
    setForm(baseline);
    setToast('Settings reset to last saved values.');
  }

  if (!form) return <SettingsLoader label="Loading portal settings…" />;

  const dirty = isDirty(form, baseline);

  return (
    <div className="flex flex-col gap-5">
      <SettingsError message={error} />

      {/* Portal Identity */}
      <SettingsCard title="Portal Identity" description="Customize the name and regional settings for the portal.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Portal Name</label>
            <input
              type="text"
              value={form.portalName || ''}
              onChange={(e) => setField('portalName', e.target.value)}
              className={inputCls}
              placeholder="e.g. MIT Connect"
            />
          </div>
          <div>
            <label className={labelCls}>Language</label>
            <select value={form.language || 'English'} onChange={(e) => setField('language', e.target.value)} className={inputCls}>
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Timezone</label>
            <select value={form.timezone || 'Asia/Kolkata'} onChange={(e) => setField('timezone', e.target.value)} className={inputCls}>
              <option>Asia/Kolkata</option>
              <option>UTC</option>
              <option>Asia/Singapore</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Date Format</label>
            <select value={form.dateFormat || 'DD/MM/YYYY'} onChange={(e) => setField('dateFormat', e.target.value)} className={inputCls}>
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
        <SettingsActions onSave={handleSave} onReset={handleReset} saving={saving} disableSave={!dirty} />
      </SettingsCard>

      {/* Branding */}
      <SettingsCard title="Branding Assets" description="Upload your institution logo and favicon.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>University Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setField('logoFileName', e.target.files?.[0]?.name || form.logoFileName)}
              className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#276221]/10 file:text-[#276221] hover:file:bg-[#276221]/20 transition-all"
            />
            {form.logoFileName && (
              <p className="text-xs text-slate-500 mt-1.5">Current: <span className="font-medium">{form.logoFileName}</span></p>
            )}
          </div>
          <div>
            <label className={labelCls}>Favicon</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setField('faviconFileName', e.target.files?.[0]?.name || form.faviconFileName)}
              className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#276221]/10 file:text-[#276221] hover:file:bg-[#276221]/20 transition-all"
            />
            {form.faviconFileName && (
              <p className="text-xs text-slate-500 mt-1.5">Current: <span className="font-medium">{form.faviconFileName}</span></p>
            )}
          </div>
        </div>
        <SettingsActions onSave={handleSave} onReset={handleReset} saving={saving} disableSave={!dirty} />
      </SettingsCard>

      <SettingsToast message={toast} onClear={() => setToast('')} />
    </div>
  );
}
