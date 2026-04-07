@AGENTS.md

## デプロイ前チェックリスト

コード変更後、デプロイ前に以下を確認すること:

- [ ] `npm run build` がエラーなく完了
- [ ] 全ページに title / description / OGP が設定されている
- [ ] 構造化データ（JSON-LD）にエラーがない
- [ ] 0件表示ページのキャッシュヘッダーが短期設定（revalidate 短め）
- [ ] モバイル表示でレイアウト崩れなし
- [ ] SEO関連テキスト・メタ情報・構造化データを削除していない

## デプロイ方法

手動デプロイ: `wrangler deploy`（自動デプロイではない）

## データ品質ゲート

データ投入・更新後は共通バリデーションを実行:

```bash
cd ~/automation-scripts
node shared/validate-data.mjs --table Gym
```

品質スコア80以上で PASS。CRITICAL が残っている場合はデプロイしない。

## 共通スクリプト（~/automation-scripts/shared/）

- `geocode.mjs --table Gym` — 住所→座標（国土地理院API）
- `nearest-station.mjs --table Gym` — 座標→最寄駅（HeartRails API）
- `validate-data.mjs --table Gym` — データ品質チェック
