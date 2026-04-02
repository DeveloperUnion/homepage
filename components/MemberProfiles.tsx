'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Member {
  name: string;
  position: string;
  education: string[];
  vision: string;
}

export default function MemberProfiles() {
  const { ref, isVisible } = useScrollReveal();

  const members: Member[] = [
    {
      name: '北島 壮馬',
      position: '代表取締役',
      education: [
        'APU（立命館アジア太平洋大学）在学中',
        'エクサウィザーズ（AIスタートアップ）',
        'インサイドセールス、フィールドセールス経験'
      ],
      vision: '父が経営する建設業（足場屋）の事務所を訪れた際、人材不足と紙媒体による非効率な業務を目の当たりにしました。まずは父の会社の業務効率化から始め、建設業界全体のDX化に貢献したいという想いから起業を決意いたしました。'
    },
    {
      name: '下平 陵生',
      position: 'エンジニア',
      education: [
        '京都大学 建築学科 在学中',
        '株式会社Base connect エンジニア',
        'システム開発・運用経験'
      ],
      vision: '建築学科で学ぶ中で、将来の街づくりへの興味を深めました。その街づくりを担う建設業界をテクノロジーで支援し、より良い社会基盤の構築に貢献したいという想いから参加いたしました。'
    }
  ];

  return (
    <section className="members-section" ref={ref}>
      <div className="members-inner">
        {members.map((member, index) => (
          <div
            key={index}
            className={`member-card reveal stagger-${index + 1} ${isVisible ? 'visible' : ''}`}
          >
            <div className="member-card-header">
              <div className="member-avatar">
                {member.name.charAt(0)}
              </div>
              <div>
                <h3 className="member-name">{member.name}</h3>
                <span className="member-position">{member.position}</span>
              </div>
            </div>

            <div className="member-card-body">
              <div className="member-section">
                <h4 className="member-section-label">経歴</h4>
                <ul className="member-career-list">
                  {member.education.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="member-section">
                <h4 className="member-section-label">想い</h4>
                <p className="member-vision">{member.vision}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
