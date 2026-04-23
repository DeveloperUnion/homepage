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
    sub: 'カタログから選ぶ、電話は要らない。',
    features: [
      { label: 'カタログ発注', icon: 'template' },
      { label: '承認・出荷フロー', icon: 'refresh' },
      { label: '履歴を一元管理', icon: 'clipboard' },
    ],
    image: '/images/products/lease-keyvisual.png',
    imageAlt: 'union 発注 for リース — リース機材の発注画面イメージ',
    overview: {
      eyebrow: 'Feature',
      title: 'カタログに、並べる。<br/>発注は、顧客から届く。',
      lead: '電話応対、FAX の確認、見積書の再送 — 受注業務は、貴社の事務員が本来やるべき仕事を静かに食い続けていませんか。union 発注 for リース は、貴社のカタログを整えれば、そこから先の受注は顧客が自分で完結させる仕組みです。営業時間外の発注も取りこぼさず、新人でも承認ボタンだけで対応でき、事務員は本来の業務に集中できます。毎日の問い合わせ対応が消える分、貴社のリソースは提案と配送、つまり利益が生まれる仕事に回ります。',
    },
    functions: [
      {
        label: 'Function — カタログ登録',
        title: '取扱資材を、会社の資産として並べる。',
        description: [
          '貸し出している機材を画像・スペック・カテゴリとともに登録するだけで、顧客向けカタログサイトに反映されます。営業担当者の頭の中にあった商品知識が、Web 上の資産として社内に残ります。',
          '新商品の追加、廃番の非表示化はフラグ 1 つ。営業資料を作り直す手間、FAX で単価表を送り直す作業から解放されます。',
        ],
        bullets: [
          '画像・スペック・カテゴリをまとめて登録',
          '掲載 / 非掲載のフラグで、シーズンや廃番にも即応',
          '商品情報が属人化せず、引き継ぎも簡単',
        ],
        image: '/images/products/lease/function-catalog.svg',
        imageAlt: '資材マスタの登録画面。画像・スペック・カテゴリを紐づけて管理',
      },
      {
        label: 'Function — 顧客の発注',
        title: '電話応対から、担当者を解放する。',
        description: [
          '顧客はカテゴリ閲覧・検索・カートの 3 ステップで、自分で発注を完結できます。貴社の担当者は「電話 → 在庫確認 → 見積 → 折返し」の往復から離れ、本来の提案や配送の差配に時間を使えるようになります。',
          'カタログサイトは 24 時間動き続けるので、営業時間外や休業中の発注も取りこぼしません。受注チャンスの機会損失が、構造的に消えます。',
        ],
        bullets: [
          '電話・FAX 対応が、受注業務から消える',
          '24 時間受付で、営業時間外の発注も取りこぼさない',
          'URL や QR コードで、既存顧客へもすぐ案内できる',
        ],
        image: '/images/products/lease/function-order-tablet.svg',
        imageAlt: '顧客向けカタログサイトのタブレット表示',
        imageFront: '/images/products/lease/function-order-phone.svg',
        imageFrontAlt: 'スマートフォンでカートから発注するイメージ',
      },
      {
        label: 'Function — 承認・出荷',
        title: '誰が対応しても、同じ品質で回る。',
        description: [
          '「受付 → 承認 → 出荷 → 完了」の 4 ステータスを、管理画面で一元操作。操作ログと却下理由も自動で記録されるため、業務が特定の担当者に依存しなくなります。',
          '新人でもその日から承認ボタンを押せて、ベテランが抜けても同じオペレーションが回り続けます。引き継ぎや採用の負担も、構造的に軽くなります。',
        ],
        bullets: [
          '未確認 / 承認済 / 出荷済 / 完了 / 却下 でフィルタ',
          '操作者・却下理由を自動記録、属人化を防ぐ',
          '新人オンボーディングは、承認ボタン 1 つの説明で完了',
        ],
        image: '/images/products/lease/function-approve.svg',
        imageAlt: '発注管理画面。ステータス別のフィルタと承認・出荷の操作',
      },
      {
        label: 'Function — 発注履歴',
        title: '履歴が、次の提案の燃料になる。',
        description: [
          'すべての発注とステータス変更は、顧客別・期間別・ステータス別で絞り込み検索が可能。月末の売上集計、顧客ごとの発注傾向、品揃えの判断材料が、Excel を作り直す作業ではなく、絞り込みボタン 1 つで手に入ります。',
          '「あの顧客、最近発注が減っている」「この資材は季節ごとに動きが読める」といった気づきが、履歴画面からそのまま営業アクションにつながります。',
        ],
        bullets: [
          '顧客別・期間別・ステータス別で絞り込み',
          '月末の売上集計を、ボタン 1 つで完了',
          '顧客の発注パターンが、提案資料の根拠になる',
        ],
        image: '/images/products/lease/function-history.svg',
        imageAlt: '発注履歴画面。顧客・期間・ステータスで絞り込み可能',
      },
    ],
    workflow: {
      eyebrow: 'Workflow',
      title: '受注業務が、こう変わる。',
      lead: 'カタログ登録から月末の振り返りまで、アプリが業務の土台になります。',
      steps: [
        {
          label: 'Setup',
          title: '資材をカタログに登録',
          description: '取扱資材を画像・スペック付きで登録。一度整えれば、以降の受注はここから全て引き出されます。',
          icon: 'sunrise',
        },
        {
          label: 'Invite',
          title: '既存顧客へ URL を案内',
          description: 'メール・QR コード・名刺で、カタログサイトの URL を配布。顧客はログイン不要ですぐに発注を始められます。',
          icon: 'phone',
        },
        {
          label: 'Fulfill',
          title: '届いた発注を、承認 → 出荷',
          description: '管理画面で届いた発注を確認、承認すれば出荷のステータスへ。却下や修正も画面内で完結。',
          icon: 'truck',
        },
        {
          label: 'Review',
          title: '月末、履歴から業務を振り返る',
          description: '顧客別・期間別の発注履歴を一覧。売上や稼働状況の集計、翌月の品揃えの判断に直結します。',
          icon: 'chart',
        },
      ],
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
