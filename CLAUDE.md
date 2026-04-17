# プロジェクト作業指示

## デザインシステム参照

カラートークン・命名規則は kensetsu-tech 配下の共有ドキュメントを canonical とする：

@../design-system/COLOR_TOKENS.md
@../design-system/per-app/service-site.md

- このアプリは Tailwind を使わず、CSS Modules + `:root{}` で運用している別パラダイム
- canonical の Tailwind utility（`bg-surface` 等）は使えない。命名規則のみ参考にする
- gray scale 9 段階（`--gray-50` 〜 `--gray-900`）は Material Design 系として継続
- accent は `--primary-color` (#00b8d4) を独自命名で運用中
- ハードコード hex（`#f8f8f2` 等）は既知の負債。CSS Modules を触る機会があれば `var()` 経由に置き換える
