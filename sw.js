const CACHE_NAME = 'money-fly-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/money-bouquet.jpg', // 注意這裡我幫你改成 jpg 了
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

// 攔截網路請求：有快取讀快取，沒快取上網抓
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});