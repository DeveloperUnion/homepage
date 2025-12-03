export default function StatsSection() {
  const stats = [
    { number: '7社', label: '導入企業数' },
    { number: '20h', label: '業務効率化時間（月・一人当たり）' },
    { number: '24h', label: 'サポート時間' },
  ];

  return (
    <section className="stats-section">
      <div className="section">
        <h2 className="section-title" style={{ color: 'white', marginBottom: '3rem' }}>
          数字で見る実績
        </h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
