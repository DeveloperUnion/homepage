export function DXConsultingIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="56" height="56" rx="12" fill="#00b8d4" opacity="0.08" />
      {/* 拡大鏡 */}
      <circle cx="24" cy="24" r="8" stroke="#00b8d4" strokeWidth="2" fill="none" />
      <line x1="30" y1="30" x2="36" y2="36" stroke="#00b8d4" strokeWidth="2" strokeLinecap="round" />
      {/* グラフ線 */}
      <polyline points="18,28 22,22 26,25 30,19" stroke="#0097a7" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 小さなドット */}
      <circle cx="38" cy="18" r="2" fill="#4dd0e1" opacity="0.5" />
      <circle cx="42" cy="22" r="1.5" fill="#00b8d4" opacity="0.3" />
      {/* 矢印（成長） */}
      <path d="M 36 42 L 42 42 L 42 36" stroke="#00b8d4" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="36" y1="42" x2="42" y2="36" stroke="#00b8d4" strokeWidth="0" />
    </svg>
  );
}

export function ProductDevIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="56" height="56" rx="12" fill="#00b8d4" opacity="0.08" />
      {/* スマホフレーム */}
      <rect x="18" y="12" width="20" height="34" rx="3" stroke="#00b8d4" strokeWidth="1.5" fill="none" />
      <line x1="18" y1="18" x2="38" y2="18" stroke="#00b8d4" strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="40" x2="38" y2="40" stroke="#00b8d4" strokeWidth="1" opacity="0.4" />
      {/* 画面コンテンツ */}
      <rect x="21" y="21" width="14" height="3" rx="1" fill="#00b8d4" opacity="0.25" />
      <rect x="21" y="26" width="10" height="2" rx="1" fill="#4dd0e1" opacity="0.2" />
      <rect x="21" y="30" width="14" height="2" rx="1" fill="#00b8d4" opacity="0.15" />
      <rect x="21" y="34" width="8" height="4" rx="2" fill="#00b8d4" opacity="0.35" />
      {/* コードブラケット */}
      <path d="M 40 24 L 44 28 L 40 32" stroke="#0097a7" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 48 24 L 52 28 L 48 32" stroke="#4dd0e1" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* 接続ドット */}
      <circle cx="42" cy="16" r="2" fill="#00b8d4" opacity="0.3" />
      <line x1="38" y1="16" x2="40" y2="16" stroke="#00b8d4" strokeWidth="1" opacity="0.3" strokeDasharray="2 1" />
    </svg>
  );
}
