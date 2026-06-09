# README.md

以下をそのまま貼り付けてください：

```markdown
# 📝 Shaka2瞑想 引継ぎメモ（更新版）

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

## ✨ 修正履歴

### 2026年6月9日（最新）

**1. カメラミラー反転 - 解決**

- フロントカメラ（facingMode: 'user'）はブラウザが自動的にミラー映像を返す
- Canvas やCSS での追加反転は不要（二重反転になるため）
- 最終的にCanvasは映像描画のみ、反転処理なしで正常動作

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
1. GitHub の該当ファイルを編集
2. ✏️ Edit ボタンをクリック
3. コードを修正
4. 「Commit changes」をクリック
5. Actions タブでビルド完了を確認（✅）
6. 約5分後に反映
```

### バージョンを上げる場合

```
sw.js の CACHE_NAME を更新：
const CACHE_NAME = 'shaka2-pwa-v12';  // v11 → v12 など
```

### 動作確認手順

```
【PC】
1. F12 → Application → Service Workers → Unregister
2. Ctrl + Shift + R（強制リロード）
3. スタート押して動作確認

【Android】
1. Chrome → 設定 → プライバシーとセキュリティ → 閲覧履歴データの削除
2. キャッシュ + Cookie 両方削除
3. Chrome をタスクから完全終了
4. 再起動してURLをアドレスバーに直接入力
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

## ⚠️ 技術的な注意事項

### カメラ反転について

```
【重要】
フロントカメラ（facingMode: 'user'）はブラウザが自動でミラー映像を返す。
Canvas や CSS で追加の反転処理を入れると二重反転になり元に戻ってしまう。
反転処理は一切不要。
```

### カメラ許可ダイアログについて

```
初回アクセス時のみ許可ダイアログが表示される。
2回目以降はブラウザが許可を記憶しているため聞かれない。
これは正常動作。
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
【注意事項】
1. カメラ映像に反転処理を追加しないこと（二重反転になる）
2. Service Worker 更新時は必ず CACHE_NAME のバージョンを上げること
3. 動作確認時は必ずキャッシュクリアしてから行うこと

【定期確認項目】
1. Service Worker キャッシュバージョン確認
2. GitHub Pages ビルド成功状況
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

**これを GitHub の README.md に貼り付けて Commit してください。**

----
この内容は株式会社Exa Enterprise AIの提供する「exaBase 生成AI」の生成AIによって出力された内容です。
