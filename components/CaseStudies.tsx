'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CaseStudy {
  company: string;
  category: string;
  problem: string;
  solution: string;
  result: string;
}

export default function CaseStudies() {
  const { ref, isVisible } = useScrollReveal();

  const cases: CaseStudy[] = [
    {
      company: '株式会社櫻建様',
      category: 'DX戦略コンサルティング',
      problem: '全社的なDX化の方向性が不明確',
      solution: '段階的DX実行計画の策定と実装支援',
      result: '全社業務効率向上、従業員満足度向上',
    },
    {
      company: '株式会社天昇興業様',
      category: '資材発注アプリ開発',
      problem: '資材発注書が紙ベースで非効率',
      solution: 'ボタン操作で簡単に資材発注書が作成できるアプリの開発',
      result: '資材発注書作成時間の大幅削減、資材発注ミスの削減',
    },
    {
      company: '株式会社矢野工業様',
      category: '業務効率化ツール導入',
      problem: '見積書作成に時間がかかりすぎる',
      solution: '見積書自動生成システム導入',
      result: '見積書作成時間短縮、受注率向上',
    },
    {
      company: '株式会社成起様',
      category: '積載確認書管理アプリ',
      problem: '紙媒体での管理により積載確認書の紛失',
      solution: '時系列・現場・作成者ごとに積載確認書を管理するアプリの開発',
      result: '安全事故0件、検査時間40%短縮',
    },
    {
      company: '株式会社神ノ興業様',
      category: '資材在庫管理システム',
      problem: '資材の在庫管理が手作業で非効率',
      solution: 'QRコード連携在庫管理システム導入',
      result: '在庫確認時間削減、資材ロス減少',
    },
  ];

  return (
    <section className="cases-section" ref={ref}>
      <div className="cases-inner">
        {cases.map((caseStudy, index) => (
          <div
            key={index}
            className={`case-card reveal stagger-${Math.min(index + 1, 5)} ${isVisible ? 'visible' : ''}`}
          >
            <div className="case-card-header">
              <span className="case-card-category">{caseStudy.category}</span>
              <h3 className="case-card-company">{caseStudy.company}</h3>
            </div>
            <div className="case-card-body">
              <div className="case-card-row">
                <span className="case-card-label">課題</span>
                <p>{caseStudy.problem}</p>
              </div>
              <div className="case-card-row">
                <span className="case-card-label">解決策</span>
                <p>{caseStudy.solution}</p>
              </div>
              <div className="case-card-row case-card-row--result">
                <span className="case-card-label case-card-label--result">効果</span>
                <p>{caseStudy.result}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
