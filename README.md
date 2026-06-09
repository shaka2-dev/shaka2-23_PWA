# 引継ぎメモ（完全版）

以下をREADME.mdに貼り付けてください：

```markdown
# 📝 Shaka2瞑想 引継ぎメモ（完全版）

---

## 🎯 プロジェクト概要

**Shaka2瞑想（修正版23・PWA版）**

- NHK時報スタイルの心身調律歯磨きアプリ
- 鳥井式心身調律歯磨き法に基づいた設計
- モバイル向け PWA（Progressive Web App）対応
- GitHub Pages でデプロイ

**URL:** `https://shaka2-dev.github.io/shaka2-23_PWA/`

---

## 📁 ファイル構成

```
shaka2-23_PWA/
├── .nojekyll           ← Jekyll 無効化（必須）
├── index.html          ← メインアプリケーション
├── manifest.json       ← PWA マニフェスト
├── sw.js              ← Service Worker（CACHE_NAME: v11）
├── README.md          ← 本ドキュメント
└── .gitignore         ← 必要に応じて
```

---

## 🔑 重要な設定

### GitHub Pages

```
Settings → Pages
├─ Source: Deploy from a branch
├─ Branch: main / (root)
├─ Custom domain: 空白（重要：shaka2.dev は設定しない）
└─ Status: ✅ Your site is live at https://...
```

### Service Worker

```javascript
const CACHE_NAME = 'shaka2-pwa-v11';
```

### manifest.json

```json
{
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone"
}
```

---

## 🚨 最重要：修正時の原則

### 修正前に必ず確認すること

```
1. 「本当に問題が起きているか？」を実機で確認する
2. 正常に動いているものには手を加えない
3. 修正は1つずつ行い、その都度テストする
4. 修正前のコードを必ず控えておく（戻せるように）
5. sw.js の CACHE_NAME を必ず上げる（キャッシュ問題防止）
```

### なぜ「触っていない部分」が壊れるのか

```
【パターン1】前提の誤り
  思い込みで「問題がある」と判断し、正常なものに不要な修正を加える
  → 正常だったものが壊れる
  例：フロントカメラは既にミラー映像を返しているのに反転処理を追加
    → 二重反転で元に戻ってしまった

【パターン2】副作用
  「Aだけ変えたい」つもりがAの周囲（B, C）にも影響が波及する
  例：caMain要素を反転 → 映像だけでなく文字・ボタンも反転した

【パターン3】キャッシュ
  コードを修正しても古いバージョンが表示され続ける
  → 「直したのに直っていない」ように見える
  対策：sw.js の CACHE_NAME を必ず更新する
```

### 終盤の修正が危険な理由

```
終盤 =「動いているものに手を加える」作業
→ 触る必要がなかったものまで影響を受けるリスクが最も高い
→ 1つ変えたら即テスト。2つ同時に変えない。
```

---

## ✨ 修正履歴

### 2026年6月9日（最新）

**1. カメラミラー反転 - 解決**

- フロントカメラ（facingMode: 'user'）はブラウザが自動的にミラー映像を返す
- Canvas やCSS での追加反転は不要（二重反転になるため）
- 最終的にCanvasは映像描画のみ、反転処理なしで正常動作

**経緯と教訓：**
```
① Canvas方式で反転コードを追加 → 映像が表示されない
② 原因：updateCameraBackground()が呼び出されていなかった
③ requestAnimationFrame追加 → 描画は動くが反転して見えない
④ CSS scaleX(-1)を追加 → 文字が反転してしまった
⑤ 調査の結果：フロントカメラは元からミラー映像だった
⑥ 結論：反転処理は一切不要だった

教訓：「問題が本当に存在するか」を最初に確認すべきだった
```

**対応デバイス：**
- ✅ Android Chrome
- ✅ iPhone Safari
- ✅ PC Chrome / Firefox / Edge

**2. updateCameraBackground() の呼び出し修正**

- initCameraImmediately() 内で requestAnimationFrame(updateCameraBackground) を追加
- Canvas描画ループが正常に開始されるようになった

**3. Service Worker 更新**

- CACHE_NAME を v8 → v11 に更新（修正の過程で段階的に更新）

**4. NHK時報音の最適化**

- スタート前の電子音を削除
- 2秒待機 → NHK時報音（助走）直開始
- 4秒間の助走（ポ→ポ→ポ→ポーン）

**5. モード選択のトグル化**

- クリック1回でON、もう一度でOFF

---

## ⚠️ トラブルシューティング

### 404 エラーが出る場合

```
【原因】キャッシュが古い

【対応】
1. Ctrl + Shift + Delete（キャッシュ + クッキー両方クリア）
2. ブラウザを完全に閉じる
3. 再度開く
4. Settings → Pages で Save をクリック（可能な場合）
5. 24時間待つ（CDN キャッシュ更新）
```

### 修正したのに反映されない場合

```
【原因】Service Worker のキャッシュが古いバージョンを保持している

【対応】
1. sw.js の CACHE_NAME のバージョン番号を上げたか確認
2. F12 → Application → Service Workers → Unregister
3. F12 → Application → Cache storage → 右クリック → Delete
4. Ctrl + Shift + R（強制リロード）
```

### PWA がインストールできない場合

```
1. HTTPS 環境で実行しているか確認
2. manifest.json が正しくロードされているか確認
3. ブラウザキャッシュをクリア
4. Service Worker が登録されているか確認（F12 → Application）
```

### カメラが映らない場合

```
1. ブラウザのカメラ許可を確認（アドレスバー左の🔒アイコン）
2. 他のアプリがカメラを使用していないか確認
3. ブラウザキャッシュをクリア
```

---

## 🔄 更新手順

### ファイルを更新する場合

```
1. 修正前のコードを控える（メモ帳等にコピー）
2. GitHub の該当ファイルを編集（✏️ Edit）
3. コードを修正（1箇所ずつ）
4. 「Commit changes」をクリック
5. Actions タブでビルド完了を確認（✅）
6. sw.js の CACHE_NAME バージョンを上げる → Commit
7. 動作確認（下記手順）
8. 問題があれば控えておいたコードに戻す
```

### 動作確認手順（必ずこの順番で）

```
【PC】
1. F12 → Application → Service Workers → Unregister
2. F12 → Application → Cache storage → Delete
3. Ctrl + Shift + R（強制リロード）
4. スタート押して動作確認
5. Console にエラー（赤い文字）がないか確認

【Android】
1. Chrome → 設定 → プライバシーとセキュリティ → 閲覧履歴データの削除
2. キャッシュ + Cookie 両方削除
3. Chrome をタスクから完全終了（上スワイプ）
4. Chrome を再起動
5. アドレスバーに直接URL入力（検索欄ではない）
6. スタート押して動作確認
```

---

## 📋 機能チェックリスト

```
【基本機能】
☑ 利き手選択が動作
☑ 欠損歯登録が動作
☑ モード選択がトグル式

【音声】
☑ NHK時報音が鳴る
☑ 木魚のリズム音が鳴る

【ビジュアル】
☑ ビジュアルバー（吸・吐）が動作
☑ 歯の色が変わる
☑ タイマーが進む

【カメラ】
☑ カメラがミラー表示される（Android）
☑ カメラがミラー表示される（iPhone）
☑ カメラがミラー表示される（PC）
☑ 文字・UIが反転しない

【PWA】
☑ PWA インストール可能
☑ オフライン動作
```

---

## ⚠️ 技術的な注意事項（絶対に守ること）

### カメラ反転について

```
【絶対禁止】カメラ映像に反転処理を追加しないこと

理由：フロントカメラ（facingMode: 'user'）はブラウザが自動でミラー映像を返す。
Canvas の ctx.scale(-1,1) や CSS の scaleX(-1) を追加すると
二重反転になり、鏡像ではなくなる。

現在の正しい実装：
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ↑ これだけ。反転処理は一切なし。
```

### Service Worker について

```
【必須】コード修正時は必ず CACHE_NAME のバージョンを上げる

理由：バージョンを上げないと、ユーザーのブラウザに古いキャッシュが残り続ける。
修正が反映されず「直したのに直っていない」状態になる。

現在：const CACHE_NAME = 'shaka2-pwa-v11';
次回：const CACHE_NAME = 'shaka2-pwa-v12';
```

### カメラ許可ダイアログについて

```
初回アクセス時のみ許可ダイアログが表示される。
2回目以降はブラウザが許可を記憶しているため聞かれない。
これは正常動作。問題ではない。
```

---

## 🚀 各デバイスでのキャッシュクリア方法

### Android Chrome
```
設定 → プライバシーとセキュリティ → 閲覧履歴データの削除
→ キャッシュ + クッキー両方チェック → 削除
→ Chrome をタスクから完全終了 → 再起動
```

### iPhone Safari
```
設定 → Safari → 履歴とWebサイトデータを削除
→ Safari 完全に閉じる → 再度開く
```

### PC Chrome
```
Ctrl + Shift + Delete
→ キャッシュ + クッキー両方チェック → 削除
→ ブラウザ再起動
```

---

## 🎉 完成日・更新日

```
【初版】2026年6月8日 - 修正版23・PWA版 完成
【更新】2026年6月9日 - カメラ反転問題解決・sw.js v11更新
```

---

## 📌 次の保守者へ

```
【最重要ルール】
1. 正常に動いているものには手を加えない
2. 「本当に問題か？」を実機で確認してから修正する
3. 修正は1箇所ずつ。2つ同時に変えない
4. 修正前のコードを必ず控えておく
5. sw.js の CACHE_NAME を必ず上げる

【絶対にやってはいけないこと】
1. カメラ映像に反転処理を追加すること
2. sw.js のバージョンを上げずにコードを修正すること
3. キャッシュクリアせずに「動かない」と判断すること

【定期確認項目】
1. Service Worker キャッシュバージョン確認
2. GitHub Pages ビルド成功状況（Actions タブ）
3. 各デバイスでのカメラ動作確認
```

---

## 📚 参考資料

- **鳥井式心身調律歯磨き法** … 磨き方の基本
- **NHK時報** … 音声ガイダンス
- **PWA（Progressive Web App）** … オフライン対応
- **Service Worker API** … キャッシング機構
- **Web Audio API** … 音声生成
- **Canvas API** … カメラ映像描画
```

---

**これで以前のREADME.mdを上書きしてください。**

----
この内容は株式会社Exa Enterprise AIの提供する「exaBase 生成AI」の生成AIによって出力された内容です。
