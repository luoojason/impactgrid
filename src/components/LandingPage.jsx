import styles from './LandingPage.module.css';

const STATS = [
  { value: '180+', label: 'Countries analyzed' },
  { value: '11', label: 'Data sources per run' },
  { value: '<60s', label: 'Full report time' },
];

const FEATURES = [
  {
    title: 'Climate & Geophysical Risk',
    body: 'IPCC projections, permafrost extent, seismic hazard—every physical risk quantified before you commit capital.',
  },
  {
    title: 'Political & Conflict Intelligence',
    body: 'Real-time ACLED conflict events layered with World Bank governance indicators to surface regulatory and security risk.',
  },
  {
    title: 'Opportunity Mapping',
    body: 'AI-identified project sites pinned on an interactive map with IRR drivers, comparable projects, and deal-specific risk flags.',
  },
  {
    title: 'Investment-Ready Documents',
    body: 'Structured briefs, financial models, and due-diligence summaries generated in seconds—ready to share with LPs.',
  },
];

export default function LandingPage({ onBegin }) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Renewable Energy Intelligence</div>
          <h1 className={styles.heroTitle}>
            Find the next<br />
            <em>emerging-market</em><br />
            energy opportunity.
          </h1>
          <p className={styles.heroSub}>
            ImpactGrid combines climate data, conflict intelligence, regulatory risk,
            and comparable projects into a single AI-powered analysis — delivered
            in under a minute.
          </p>
          <button className={styles.cta} onClick={onBegin}>
            Start your analysis
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.globeRing} />
          <div className={styles.globeRing2} />
          <svg className={styles.globeSvg} viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="96" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
            <circle cx="110" cy="110" r="68" stroke="currentColor" strokeWidth="1" opacity="0.2" />
            <circle cx="110" cy="110" r="40" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            {/* Latitude lines */}
            <ellipse cx="110" cy="110" rx="40" ry="14" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
            <ellipse cx="110" cy="110" rx="40" ry="28" stroke="currentColor" strokeWidth="0.75" opacity="0.15" />
            {/* Pin dots */}
            <circle cx="88"  cy="96"  r="4" fill="#d97706" />
            <circle cx="130" cy="88"  r="4" fill="#2563eb" />
            <circle cx="118" cy="122" r="4" fill="#0a7a6a" />
            <circle cx="96"  cy="130" r="3" fill="#dc2626" />
            <circle cx="140" cy="115" r="3" fill="#7c3aed" />
          </svg>
        </div>
      </section>

      <section className={styles.stats}>
        {STATS.map((s) => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      <section className={styles.features}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.featuresTitle}>Built for serious investors</h2>
          <p className={styles.featuresSub}>
            Every analysis draws from authoritative data sources — not language model hallucinations.
          </p>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIndex}>{String(i + 1).padStart(2, '0')}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.coda}>
        <p className={styles.codaText}>
          Ready to identify your next investment?
        </p>
        <button className={styles.ctaSecondary} onClick={onBegin}>
          Begin analysis →
        </button>
      </section>
    </main>
  );
}
