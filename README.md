# 📋 README.md と引継ぎメモ作成

了解しました。以下の2つのファイルを作成します。

---

## 📄 README.md

```markdown
# 🪵 Shaka2瞑想（修正版23・PWA版）

NHK時報スタイルの心身調律歯磨きアプリ。鳥井式心身調律歯磨き法に基づいた設計で、モバイル向けPWA（Progressive Web App）対応です。

## 🌐 アクセス

**URL:** https://shaka2-dev.github.io/shaka2-23_PWA/

## 📱 対応デバイス

- ✅ PC Chrome / Firefox / Edge
- ✅ Android Chrome（PWA アプリ化可能）
- ✅ iPhone Safari（PWA アプリ化可能）

## 🎯 主な機能

### 1. 利き手設定
- 右手利き / 左手利き を選択可能
- 設定は localStorage に保存

### 2. 欠損歯登録
- 歯を タップして欠損 ⇔ 通常 を切り替え可能
- 設定は localStorage に保存

### 3. モード選択（トグル機能）
- **エリア磨きモード**
  - 標準：利き手 1 回
  - 念入り：利き手 2 回
  - ブレイン：利き手＋非優位手

- **歯間磨きモード**
  - 標準：利き手 1 回
  - ブレイン：非優位手 1 回

- **ワンタフト磨きモード**
  - 標準：利き手 1 回
  - ブレイン：非優位手 1 回

### 4. 磨きガイド
- NHK時報スタイルの音声ガイダンス
- 木魚のリズム音
- ビジュアルバー（吸・吐）
- 歯の色変化表示
- タイマー表示
- カメラ背景表示（ミラー映像）

### 5. PWA 機能
- オフライン動作対応
- ホーム画面にインストール可能
- Service Worker でキャッシング

## 🏗️ ファイル構成

```
shaka2-23_PWA/
├── index.html          ← メインアプリケーション
├── manifest.json       ← PWA マニフェスト
├── sw.js              ← Service Worker
├── README.md          ← このファイル
└── .gitignore         ← Git 無視設定
```

## 🔑 GitHub Pages 設定

```
Settings → Pages
├─ Source: Deploy from a branch
├─ Branch: main / (root)
├─ Custom domain: 空白（推奨）
└─ Status: Your site is live at https://shaka2-dev.github.io/shaka2-23_PWA/
```

## 🛠️ 技術スタック

- **言語**: HTML5 + CSS3 + Vanilla JavaScript
- **フレームワーク**: なし（依存なし）
- **PWA**: Service Worker API
- **Audio**: Web Audio API
- **Canvas**: Canvas API（カメラ背景用）
- **ストレージ**: localStorage

## 🎨 カラーデザイン

| 要素 | 状態 | 背景色 | 文字色 |
|------|------|--------|--------|
| モードカード | OFF | `#808080`（灰色） | `#ffff99`（薄黄色） |
| モードカード | ON | `#000000`（黒） | `#ffff00`（黄色） |
| スタートボタン | 有効 | `#4caf50`（緑） | 白色 |
| スタートボタン | 無効 | `#888888`（灰色） | 白色 |

## 🚨 トラブルシューティング

### 修正が反映されない場合

```
1. F12 → Application → Service Workers → Unregister
2. F12 → Application → Cache storage → Delete
3. Ctrl + Shift + R（強制リロード）
4. ページが正常に読み込まれるか確認
```

### Android PWA でトグル機能が動作しない場合

```
1. PWA アプリのキャッシュをクリア
   設定 → アプリ → Chrome → ストレージ → キャッシュを削除

2. PWA アプリを削除（ホーム画面のアイコン長押し → 削除）

3. Chrome ブラウザで再度インストール

4. Service Worker のバージョンが最新か確認
```

### カメラが映らない場合

```
1. ブラウザのカメラ許可を確認
   アドレスバー左の 🔒 → サイト設定 → カメラ

2. 他のアプリがカメラを占有していないか確認

3. キャッシュをクリアして再度アクセス
```

## 📝 更新履歴

### 2026年6月21日（最新）

**v21 リリース - Android PWA トグル機能完全修正**

- ✅ Android PWA でのタッチイベント問題を根本解決
- ✅ `touchend` + `click` イベントリスナーで堅牢な実装
- ✅ CSS に `touch-action: manipulation` を追加
- ✅ HTML から `onclick` を削除し、JavaScript でイベント管理
- ✅ PC と Android で完全に同一の動作を実現

### 2026年6月9日

**v19 リリース - カメラ反転問題解決**

- ✅ フロントカメラ（facingMode: 'user'）の反転処理を廃止
- ✅ Service Worker キャッシュ問題を解決
- ✅ sw.js のバージョン管理を強化

### 2026年6月8日

**v1 リリース - 初期公開**

- ✅ 修正版23・PWA版 として正式リリース

## 🔧 保守のポイント

### 必須ルール

```
1. 修正前に必ず実機で問題を確認する
2. 正常に動いているものには手を加えない
3. 修正は 1 箇所ずつ行い、その都度テストする
4. 修正前のコードを必ず控えておく
5. sw.js の CACHE_NAME を必ず上げる
```

### 修正手順

```
1. GitHub で該当ファイルを編集
2. Commit changes
3. sw.js で CACHE_NAME を 1 つ上げる
4. Commit changes
5. Actions タブで ✅ ビルド完了を確認
6. PC と Android で動作確認
```

### デバッグ方法

**PC:**
```
F12 → Console でエラーを確認
F12 → Application → Service Workers でバージョン確認
```

**Android:**
```
Chrome メニュー → 設定 → Chrome について で最新版を確認
設定 → プライバシーとセキュリティ → 閲覧履歴データ削除
```

## 📞 開発者向け情報

### Service Worker キャッシュバージョン管理

現在の最新バージョン: **v21**

**バージョン上げ方:**
```javascript
// sw.js 内
const CACHE_NAME = 'shaka2-pwa-v21';  // → 'shaka2-pwa-v22' に変更
```

### localStorage キー一覧

| キー | 用途 | 例 |
|------|------|-----|
| `shaka2_handedness` | 利き手設定 | `'right'` or `'left'` |
| `shaka2_missing` | 欠損歯情報 | `{"UR8":true,"UR7":true,...}` |
| `shaka2_settings` | モード選択 | `{"areaMode":"standard","interMode":"brain"}` |

## 📚 参考資料

- [鳥井式心身調律歯磨き法](https://example.com)
- [NHK時報](https://www3.nhk.or.jp/)
- [PWA（Progressive Web App）](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

## 📄 ライセンス

このプロジェクトはプライベートプロジェクトです。

## 🙏 謝辞

- Opus（Claude） - Android PWA トラブルシューティング支援
- ユーザーの皆様 - テスト・フィードバック支援
```

---

## 📋 引継ぎメモ（完全版2・2026年6月21日版）

```markdown
# 🪵 Shaka2瞑想 引継ぎメモ（完全版2）

## 📅 作成日

- 初版：2026年6月8日
- 更新：2026年6月21日（v21 リリース）

---

## 🎯 プロジェクト概要

**Shaka2瞑想（修正版23・PWA版）**

- NHK時報スタイルの心身調律歯磨きアプリ
- 鳥井式心身調律歯磨き法に基づいた設計
- モバイル向け PWA（Progressive Web App）対応
- GitHub Pages でデプロイ

**URL:** https://shaka2-dev.github.io/shaka2-23_PWA/

---

## 📁 ファイル構成

```
shaka2-23_PWA/
├── .nojekyll           ← Jekyll 無効化（必須）
├── index.html          ← メインアプリケーション
├── manifest.json       ← PWA マニフェスト
├── sw.js              ← Service Worker（CACHE_NAME: v21）
├── README.md          ← 説明書
└── .gitignore         ← Git 無視設定
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
const CACHE_NAME = 'shaka2-pwa-v21';  // 現在のバージョン
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

【パターン2】副作用
  「Aだけ変えたい」つもりがAの周囲（B, C）にも影響が波及する
  例：カード要素を反転 → 映像だけでなく文字・ボタンも反転した

【パターン3】キャッシュ
  コードを修正しても古いバージョンが表示され続ける
  → 「直したのに直っていない」ように見える
  対策：sw.js の CACHE_NAME を必ず更新する
```

---

## ✨ 修正履歴

### 2026年6月21日（最新）

**v21 リリース - Android PWA トグル機能完全修正**

**問題:**
- Android Chrome PWA でモード選択のトグル機能が正常に動作しない
- 1タップ目は ON になるが、2タップ目で OFF にならない
- PC では完全に正常に動作していた

**原因:**
- Android のタッチイベント（`touchend`）と クリックイベント（`click`）の競合
- ダブルタップズーム検出による 300ms ディレイの影響
- HTML の `onclick` では複合イベントハンドリングが不十分

**解決策:**
1. HTML から `onclick` を削除、各モードカードに ID を付与
2. CSS に `touch-action: manipulation;` を追加（ダブルタップズーム無効化）
3. JavaScript で `touchend` と `click` を明確に区別するイベントリスナーを追加
4. `e.preventDefault()` と `e.stopPropagation()` で徹底的にイベント制御

**実装コード:**
```javascript
function setupModeToggle(elementId, selectFunction) {
    var element = document.getElementById(elementId);
    if (!element) return;
    
    element.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        selectFunction();
    }, { passive: false });
    
    element.addEventListener('click', function(e) {
        if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
            return;
        }
        e.preventDefault();
        selectFunction();
    });
}
```

**対応デバイス:**
- ✅ PC Chrome / Firefox / Edge
- ✅ Android Chrome（PWA アプリ）
- ✅ iPhone Safari（PWA アプリ）

### 2026年6月9日

**v19 リリース - カメラミラー反転問題解決**

- フロントカメラ（facingMode: 'user'）はブラウザが自動的にミラー映像を返す
- Canvas やCSS での追加反転は不要（二重反転になるため）
- 最終的にCanvasは映像描画のみ、反転処理なしで正常動作

### 2026年6月8日

**v1 リリース - 修正版23・PWA版 完成**

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

### Android PWA でトグル機能が動作しない場合

```
【症状】
1タップ目で黒地に黄色太字（ON）になるが、
2タップ目で灰色地に薄黄色（OFF）に変わらない

【対応1】キャッシュクリア
1. 設定 → アプリ → Chrome → ストレージ → キャッシュを削除
2. Chrome をタスクから完全終了
3. Chrome を再起動

【対応2】PWA アプリを再インストール
1. ホーム画面で「Shaka2瞑想」を長押し → 削除
2. Chrome ブラウザで URL にアクセス
3. 画面下部に「インストール」が表示される
4. 「インストール」をタップ

【対応3】sw.js のバージョンが最新か確認
1. GitHub で sw.js を開く
2. CACHE_NAME が 'shaka2-pwa-v21' か確認
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
1. 設定 → プライバシーとセキュリティ → 閲覧履歴データの削除
2. キャッシュ + Cookie 両方削除
3. Chrome をタスクから完全終了（上スワイプ）
4. Chrome を再起動
5. アドレスバーに直接URL入力（検索欄ではない）
6. モードカードをテスト（トグル動作確認）
```

---

## 📋 機能チェックリスト

```
【基本機能】
☑ 利き手選択が動作
☑ 欠損歯登録が動作
☑ モード選択がトグル式（PC）
☑ モード選択がトグル式（Android）

【音声】
☑ NHK時報音が鳴る
☑ 木魚のリズム音が鳴る

【ビジュアル】
☑ ビジュアルバー（吸・吐）が動作
☑ 歯の色が変わる
☑ タイマーが進む
☑ モードカード ON/OFF の色が正しい（PC）
☑ モードカード ON/OFF の色が正しい（Android）

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

### Android PWA でのイベントハンドリング

```
【重要】
Android PWA では以下の複合イベントが発火する：
touchstart → touchend → mousedown → mouseup → click

【対策】
- onclick 属性は使用しない
- JavaScript の addEventListener で touchend / click を明確に区別
- e.preventDefault() と e.stopPropagation() で制御
- CSS に touch-action: manipulation; を追加
```

### Service Worker について

```
【必須】コード修正時は必ず CACHE_NAME のバージョンを上げる

理由：バージョンを上げないと、ユーザーのブラウザに古いキャッシュが残り続ける。
修正が反映されず「直したのに直っていない」状態になる。

現在：const CACHE_NAME = 'shaka2-pwa-v21';
次回：const CACHE_NAME = 'shaka2-pwa-v22';
```

### CSS の touch-action について

```
【設定】
.modeCard {
  touch-action: manipulation;  /* ダブルタップズーム無効化 */
}

【理由】
古い Android Chrome では、ダブルタップズーム検出のため 300ms の遅延が発生し、
複数のタップイベントが正しく処理されない場合がある。
touch-action: manipulation; で解決可能。
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
【更新】2026年6月9日 - カメラ反転問題解決・sw.js v19 リリース
【更新】2026年6月21日 - Android PWA トグル完全修正・v21 リリース
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
1. onclick 属性でイベントハンドリングをしようとすること（特に Android PWA）
2. sw.js のバージョンを上げずにコードを修正すること
3. キャッシュクリアせずに「動かない」と判断すること
4. 複数の修正を同時に行うこと

【定期確認項目】
1. Service Worker キャッシュバージョン確認（現在 v21）
2. GitHub Pages ビルド成功状況（Actions タブ）
3. PC と Android 両デバイスでの動作確認
4. localStorage の不正なデータ蓄積チェック
```

---

## 📚 参考資料

- **鳥井式心身調律歯磨き法** … 磨き方の基本
- **NHK時報** … 音声ガイダンス
- **PWA（Progressive Web App）** … オフライン対応
- **Service Worker API** … キャッシング機構
- **Web Audio API** … 音声生成
- **Canvas API** … カメラ映像描画
- **Opus（Claude）** … Android PWA トラブルシューティング支援
```

---

**両ファイルをリポジトリに commit・push してください。** 📝

----
この内容は株式会社Exa Enterprise AIの提供する「exaBase 生成AI」の生成AIによって出力された内容です。
