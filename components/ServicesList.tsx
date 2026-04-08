'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Service {
  name: string;
  tagline: string;
  description?: string;
  features?: string[];
  comingSoon?: boolean;
}

export default function ServicesList() {
  const { ref, isVisible } = useScrollReveal(0.05);

  const services: Service[] = [
    {
      name: 'union 資材発注 for 足場',
      tagline: '足場業界向け資材発注アプリ',
      description:
        '紙とFAXに頼っていた足場資材の発注業務を、スマートフォンひとつで完結。現場から数タップで発注書を作成・送信でき、発注ミスや転記作業を削減します。職人と現場監督、どちらも迷わず使えるシンプルな設計です。',
      features: [
        'スマホから数タップで資材発注',
        '発注履歴・発注書PDFを自動保存',
        '現場・作業者ごとの発注管理',
      ],
    },
    {
      name: 'union 資材発注 for リース',
      tagline: 'リース業界向け資材発注アプリ',
      description:
        'リース資材の出庫・返却業務を、現場主導でデジタル化。テンプレート化された発注フローと、リアルタイムな在庫状況の共有によって、電話確認や差し戻しを大幅に削減します。',
      features: [
        'リース資材専用の発注テンプレート',
        '在庫状況のリアルタイム連携',
        '出庫・返却履歴の一元管理',
      ],
    },
    {
      name: 'union 介護記録',
      tagline: '利用者一人ひとりの「今日」を、かんたんに記録',
      comingSoon: true,
    },
    {
      name: 'union 日報',
      tagline: '現場の今日を、3分で残す',
      comingSoon: true,
    },
    {
      name: 'union 勤怠管理',
      tagline: '現場主義の勤怠管理',
      comingSoon: true,
    },
  ];

  return (
    <section className="services-list-section" ref={ref}>
      <div className="services-list-inner">
        {services.map((service, index) => (
          <article
            key={service.name}
            className={`service-item reveal stagger-${Math.min(index + 1, 5)} ${isVisible ? 'visible' : ''}`}
          >
            <div className="service-item-head">
              <h2 className="service-item-name">
                {service.name}
                {service.comingSoon && (
                  <span className="service-item-badge">Coming Soon</span>
                )}
              </h2>
              <p className="service-item-tagline">{service.tagline}</p>
            </div>

            {(service.description || service.features) && (
              <div className="service-item-body">
                {service.description && (
                  <p className="service-item-description">{service.description}</p>
                )}

                {service.features && (
                  <ul className="service-item-features">
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <span className="service-item-feature-mark" aria-hidden="true">
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
