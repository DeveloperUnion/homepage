export default function CompanyInfo() {
  const companyData = [
    { label: '会社名', value: '株式会社main character' },
    { label: 'ブランド名', value: '建設テックパートナーズ' },
    { label: '代表者', value: '代表取締役　北島壮馬' },
    { label: '設立', value: '2025年6月' },
    {
      label: '所在地',
      value: '〒814-0001<br />福岡県福岡市早良区百道2-15-1'
    }
  ];

  const businessItems = [
    '建設現場の生産性向上支援',
    '建設業特化DX支援事業',
    'カスタムアプリケーション開発',
    '業務効率化ツール導入支援'
  ];

  return (
    <section className="section company-info-section">
      <div className="card-grid">
        <div className="tech-card">
          <h3>会社概要</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {companyData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: index < companyData.length - 1 ? '1px solid #e2e8f0' : 'none'
                  }}
                >
                  <td style={{ padding: '0.75rem 0', fontWeight: 600, width: '30%' }}>
                    {item.label}
                  </td>
                  <td
                    style={{ padding: '0.75rem 0' }}
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tech-card">
          <h3>事業内容</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {businessItems.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: '0.5rem 0',
                  borderBottom: index < businessItems.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <i className="fas fa-check text-primary" style={{ marginRight: '0.5rem' }}></i>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
