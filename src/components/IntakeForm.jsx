import { useState } from 'react';
import styles from './IntakeForm.module.css';

const FOCUS_OPTIONS = [
  { value: 'solar',       label: 'Solar',       icon: '☀' },
  { value: 'wind',        label: 'Wind',         icon: '💨' },
  { value: 'hydro',       label: 'Hydro',        icon: '💧' },
  { value: 'geothermal',  label: 'Geothermal',   icon: '🌋' },
  { value: 'storage',     label: 'Storage',      icon: '🔋' },
];

const RISK_OPTIONS = [
  { value: 'low',    label: 'Conservative', sub: 'Stable markets, lower upside' },
  { value: 'medium', label: 'Balanced',     sub: 'Mix of stability and growth' },
  { value: 'high',   label: 'Aggressive',   sub: 'Frontier markets, high upside' },
];

export default function IntakeForm({ onSubmit, error, submitting }) {
  const [form, setForm] = useState({
    companyName: '',
    companyDesc: '',
    investmentFocus: [],
    geoFocus: '',
    projectSizeMin: '',
    projectSizeMax: '',
    horizonYears: 10,
    existingPortfolio: '',
    riskTolerance: 'medium',
    specificRegions: '',
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((f) => ({
        ...f,
        investmentFocus: checked
          ? [...f.investmentFocus, value]
          : f.investmentFocus.filter((v) => v !== value),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      projectSizeMin: Number(form.projectSizeMin) || 0,
      projectSizeMax: Number(form.projectSizeMax) || 0,
      horizonYears: Number(form.horizonYears) || 10,
    });
  }

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbStep}>Analysis Setup</span>
          </div>
          <h1 className={styles.pageTitle}>Tell us about your investment thesis</h1>
          <p className={styles.pageDesc}>
            We'll use this to run targeted analysis across climate risk, conflict data,
            regulatory landscape, and comparable projects.
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Section 1: Organization */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>01</span>
            <div>
              <div className={styles.sectionTitle}>Your organization</div>
              <div className={styles.sectionHint}>Helps us contextualize the analysis for your fund type and mandate.</div>
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.label}>Fund or company name <span className={styles.req}>*</span></label>
              <input
                className={styles.input}
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                required
                placeholder="e.g. Meridian Climate Partners"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Brief description</label>
              <textarea
                className={styles.textarea}
                name="companyDesc"
                value={form.companyDesc}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your fund strategy, stage, or mandate"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Existing portfolio</label>
              <textarea
                className={styles.textarea}
                name="existingPortfolio"
                value={form.existingPortfolio}
                onChange={handleChange}
                rows={2}
                placeholder="List current investments, if any"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Focus */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>02</span>
            <div>
              <div className={styles.sectionTitle}>Investment focus</div>
              <div className={styles.sectionHint}>Select all technology types you're actively deploying capital into.</div>
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.label}>Technology types</label>
              <div className={styles.chips}>
                {FOCUS_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`${styles.chip} ${form.investmentFocus.includes(opt.value) ? styles.chipActive : ''}`}
                  >
                    <input
                      type="checkbox"
                      name="investmentFocus"
                      value={opt.value}
                      checked={form.investmentFocus.includes(opt.value)}
                      onChange={handleChange}
                      className={styles.hiddenInput}
                    />
                    <span className={styles.chipIcon}>{opt.icon}</span>
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Target geographies <span className={styles.req}>*</span></label>
                <input
                  className={styles.input}
                  name="geoFocus"
                  value={form.geoFocus}
                  onChange={handleChange}
                  placeholder="e.g. Kenya, Nigeria, Brazil"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Specific regions</label>
                <input
                  className={styles.input}
                  name="specificRegions"
                  value={form.specificRegions}
                  onChange={handleChange}
                  placeholder="e.g. Sub-Saharan Africa"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Deal parameters */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>03</span>
            <div>
              <div className={styles.sectionTitle}>Deal parameters</div>
              <div className={styles.sectionHint}>Used to filter comparable projects and size the opportunity pipeline.</div>
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Minimum deal size (USD)</label>
                <input
                  className={styles.input}
                  type="number"
                  name="projectSizeMin"
                  value={form.projectSizeMin}
                  onChange={handleChange}
                  min={0}
                  placeholder="5,000,000"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Maximum deal size (USD)</label>
                <input
                  className={styles.input}
                  type="number"
                  name="projectSizeMax"
                  value={form.projectSizeMax}
                  onChange={handleChange}
                  min={0}
                  placeholder="50,000,000"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Investment horizon (years)</label>
                <input
                  className={styles.input}
                  type="number"
                  name="horizonYears"
                  value={form.horizonYears}
                  onChange={handleChange}
                  min={1}
                  max={50}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Risk tolerance */}
        <div className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionNum}>04</span>
            <div>
              <div className={styles.sectionTitle}>Risk tolerance</div>
              <div className={styles.sectionHint}>Shapes how we weight political, climate, and operational risk in the analysis.</div>
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <div className={styles.riskGroup}>
                {RISK_OPTIONS.map((r) => (
                  <label
                    key={r.value}
                    className={`${styles.riskCard} ${form.riskTolerance === r.value ? styles.riskActive : ''}`}
                  >
                    <input
                      type="radio"
                      name="riskTolerance"
                      value={r.value}
                      checked={form.riskTolerance === r.value}
                      onChange={handleChange}
                      className={styles.hiddenInput}
                    />
                    <div className={styles.riskDot} />
                    <div>
                      <div className={styles.riskLabel}>{r.label}</div>
                      <div className={styles.riskSub}>{r.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.submit} type="submit" disabled={submitting}>
            {submitting ? (
              <><span className={styles.dot} />Initializing analysis…</>
            ) : (
              <>Run Analysis →</>
            )}
          </button>
        </div>

      </form>
    </main>
  );
}
