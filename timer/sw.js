const CACHE_NAME = 'kawaii-focus-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap'
];

// Instalação do Service Worker
self.addEventListener('install', (e) => {
  // Força o SW a ativar imediatamente, sem esperar o usuário fechar a aba
  self.skipWaiting();
  
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação
self.addEventListener('activate', (e) => {
  // Assume o controle de todas as páginas abertas imediatamente
  e.waitUntil(self.clients.claim());
});

// Busca de arquivos (Cache First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
