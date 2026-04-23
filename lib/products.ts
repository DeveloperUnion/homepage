import type { FeatureIconName } from '@/components/FeatureIcon';

export type WorkflowIcon = 'sunrise' | 'phone' | 'truck' | 'chart';

export interface ProductFunction {
  label: string;
  title: string;
  description: string[];
  bullets?: string[];
  image: string;
  imageAlt: string;
  imageFront?: string;
  imageFrontAlt?: string;
  imageLayout?: 'landscape' | 'portrait';
}

export interface ProductOverview {
  eyebrow: string;
  title: string;
  lead: string;
}

export interface ProductWorkflow {
  eyebrow: string;
  title: string;
  lead?: string;
  steps: {
    label: string;
    title: string;
    description: string;
    icon: WorkflowIcon;
  }[];
}

export interface Product {
  slug: string;
  brandSub: string;
  headlinePre: string;
  headlineLeadIn: string;
  headlineEm: string;
  headlinePost: string;
  sub: string;
  features: { label: string; icon: FeatureIconName }[];
  image: string;
  imageAlt: string;
  overview?: ProductOverview;
  functions?: ProductFunction[];
  workflow?: ProductWorkflow;
}

export const products: Product[] = [
  {
    slug: 'scaffold',
    brandSub: 'for 足場',
    headlinePre: '足場資材の発注を、',
    headlineLeadIn: 'もっと',
    headlineEm: 'かんたん',
    headlinePost: 'に。',
    sub: '現場で選んで、そのまま手配。',
    features: [
      { label: 'カンタン選択', icon: 'document' },
      { label: 'スピード発注', icon: 'cart' },
      { label: '即座に重量計算', icon: 'calculator' },
    ],
    image: '/images/products/scaffold-keyvisual.png',
    imageAlt: 'union 発注 for 足場 — 足場資材の発注画面イメージ',
    overview: {
      eyebrow: 'Feature',
      title: '現場で、選ぶ。<br/>そのまま、手配。',
      lead: '鉄パイプ、クランプ、ジャッキベース。現場で必要なものを、頭の中だけで把握しているうちは属人化から抜けられません。union 発注 for 足場 は、資材マスタを一度整えれば、毎回の発注を「選ぶだけ」に変えます。重量計算も自動、発注書PDFも即発行。電話とFAXで回していた業務を、1台のスマホで完結させます。',
    },
    functions: [
      {
        label: 'Function — 資材の登録',
        title: 'よく使う資材を、自社マスタとして一度登録。',
        description: [
          '自社でよく使う規格（単管 2m、固定クランプ、ジャッキベース調整式など）を資材マスタとして登録。品番・規格・重量・仕入先を 1 件ずつ入れれば、以降の発注では選ぶだけです。',
          'Excel で管理していた資材表の置き換えとして、CSV 取り込みにも対応予定。',
        ],
        bullets: [
          '品番・規格・重量・単価を登録',
          '仕入先を資材ごとに紐づけ',
          'カテゴリで検索・絞り込み',
        ],
        image: '/images/products/scaffold/function-registry.png',
        imageAlt: '資材管理画面。カテゴリ別に登録済みの資材を一覧表示し、編集・削除ができる',
      },
      {
        label: 'Function — 発注',
        title: '現場で選び、その場で発注。',
        description: [
          '資材マスタから必要な品目にチェック、数量を入れて発注ボタン。現場に居ながらそのまま取引先へ届きます。電話や FAX のやり取りが不要なので、聞き間違いや記入漏れが構造的に発生しません。',
          '選択した資材の合計重量はリアルタイムで表示。車両手配の判断もその場でできます。',
        ],
        bullets: [
          'チェックと数量入力だけで発注完了',
          '合計重量を自動計算',
          '取引先にはメール・FAX 連携で自動送信',
        ],
        image: '/images/products/scaffold/function-order-tablet.png',
        imageAlt: 'タブレットで表示した新規発注画面',
        imageFront: '/images/products/scaffold/function-order-phone.png',
        imageFrontAlt: 'スマートフォンで表示した新規発注画面',
      },
      {
        label: 'Function — PDF 出力',
        title: '発注書 PDF を、1 タップで。',
        description: [
          '取引先が PDF を要求するケース、社内の承認フローで PDF を添付するケース、どちらにも対応。発注と同時に、会社ロゴ入りの発注書 PDF を自動生成します。',
          '発注履歴から過去の発注書も再発行可能。紙の控えをファイリングしていた運用を、クラウド 1 本にまとめられます。',
        ],
        bullets: [
          '会社ロゴ・押印データを登録可能',
          '発注書／納品書フォーマットを切替',
          'PDF ダウンロード・メール添付',
        ],
        image: '/images/products/scaffold/function-pdf.png',
        imageAlt: 'スマートフォンで表示した資材発注書 PDF。印刷・PDF保存ボタンから出力できる',
        imageLayout: 'portrait',
      },
      {
        label: 'Function — 履歴管理',
        title: '過去の発注も、現場別にすぐ引ける。',
        description: [
          '現場名・期間・取引先で絞り込んで、いつ・何を・いくらで発注したかを即表示。納品ステータス（発注中 / 納品済 / 返却済）も一覧で追えます。',
          '監査対応、原価計算、次回発注の参考値として、現場ごとの資材使用量を蓄積していきます。',
        ],
        bullets: [
          '現場別・期間別に絞り込み',
          'ステータス（発注中 / 納品済 / 返却済）を可視化',
          'CSV エクスポートで会計連携',
        ],
        image: '/images/products/scaffold/function-history.png',
        imageAlt: '発注書履歴一覧の画面。現場名・担当者・発注日・合計重量・ステータスが一覧表示される',
      },
    ],
    workflow: {
      eyebrow: 'Workflow',
      title: '現場の 1 日が、こう変わる。',
      lead: '朝の確認から月末の締めまで、アプリ 1 つで回せるようになります。',
      steps: [
        {
          label: 'Morning',
          title: '朝、現場で資材をチェック',
          description: '足場の進捗を見ながら、足りない資材を把握。黒板にメモする代わりに、アプリの発注リストへそのまま。',
          icon: 'sunrise',
        },
        {
          label: 'On-site',
          title: 'その場で選んで、発注完了',
          description: '資材マスタから選んで数量を入力。合計重量を確認したら、ボタンひとつで取引先へ送信。電話確認はゼロ。',
          icon: 'phone',
        },
        {
          label: 'Next day',
          title: '資材到着、納品もアプリで記録',
          description: '翌日、現場に届いた資材のステータスを「納品済」に更新。紙の納品書と突き合わせる作業が消えます。',
          icon: 'truck',
        },
        {
          label: 'Month end',
          title: '現場別の履歴を、経理へエクスポート',
          description: '月末、現場ごとの発注履歴を CSV で出力。原価計算や請求確認のために Excel を作り直す必要がなくなります。',
          icon: 'chart',
        },
      ],
    },
  },
  {
    slug: 'lease',
    brandSub: 'for リース',
    headlinePre: 'リース機材の発注を、',
    headlineLeadIn: 'もっと',
    headlineEm: 'スムーズ',
    headlinePost: 'に。',
    sub: 'テンプレートで、電話確認ゼロへ。',
    features: [
      { label: 'テンプレート発注', icon: 'template' },
      { label: '在庫リアルタイム', icon: 'refresh' },
      { label: '返却まで一元管理', icon: 'clipboard' },
    ],
    image: '/images/products/lease-keyvisual.png',
    imageAlt: 'union 発注 for リース — リース機材の発注画面イメージ',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
