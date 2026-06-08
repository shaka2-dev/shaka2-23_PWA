// Service Worker: Shaka2瞑想 PWA対応版
const CACHE_VERSION = 'v23'; // 修正版23に対応
const CACHE_NAME = `shaka2-pwa-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './sw.js'
];

// ============ インストール ============
self.addEventListener('install', event => {
  console.log(`[SW] インストール開始: ${CACHE_NAME}`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[SW] キャッシュ作成: ${CACHE_NAME}`);
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(err => {
        console.error('[SW] インストールエラー:', err);
      })
  );
  
  self.skipWaiting();
});

// ============ アクティベーション ============
self.addEventListener('activate', event => {
  console.log('[SW] アクティベーション開始');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const deletePromises = cacheNames
          .filter(name => name.startsWith('shaka2-pwa-') && name !== CACHE_NAME)
          .map(name => {
            console.log(`[SW] 古いキャッシュを削除: ${name}`);
            return caches.delete(name);
          });
        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log('[SW] アクティベーション完了');
      })
  );
  
  self.clients.claim();
});

// ============ フェッチ ============
self.addEventListener('fetch', event => {
  // GETリクエストのみ処理
  if (event.request.method !== 'GET') {
    return;
  }

  // キャッシュファースト戦略
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // キャッシュがあればそれを返す
        if (cachedResponse) {
          console.log(`[SW] キャッシュから: ${event.request.url}`);
          return cachedResponse;
        }

        // キャッシュがなければネットワークから取得
        return fetch(event.request)
          .then(response => {
            // ステータスが OK でない場合はスキップ
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // 正常なレスポンスならキャッシュに保存
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
                console.log(`[SW] キャッシュに保存: ${event.request.url}`);
              });

            return response;
          })
          .catch(err => {
            console.error(`[SW] ネットワーク取得失敗: ${event.request.url}`, err);
            // オフライン時はホームページを返す
            return caches.match('./index.html');
          });
      })
      .catch(err => {
        console.error('[SW] キャッシュマッチエラー:', err);
        return caches.match('./index.html');
      })
  );
});

// ============ バックグラウンド同期 ============
self.addEventListener('sync', event => {
  if (event.tag === 'sync-settings') {
    console.log('[SW] バックグラウンド同期: 設定同期');
    event.waitUntil(
      Promise.resolve()
        .then(() => {
          console.log('[SW] 設定同期完了');
        })
    );
  }
});

// ============ メッセージング ============
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] SKIP_WAITING受信 - 新バージョンに切り替え');
    self.skipWaiting();
  }
});
