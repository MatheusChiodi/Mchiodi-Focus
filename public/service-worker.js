const CACHE_VERSION = "v2"; // Mude isso a cada alteração significativa no projeto
const CACHE_NAME = `mchiodi-focus-${CACHE_VERSION}`;

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Detecta se está em ambiente local
const isLocalhost = self.location.hostname === "localhost";

// Install: Cache inicial
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Aplica imediatamente

  if (isLocalhost) return; // Evita cache local

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Cache aberto:", CACHE_NAME);
      return cache.addAll(urlsToCache);
    }),
  );
});

// Activate: Limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deletando cache antigo:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
  self.clients.claim(); // Assuma imediatamente todos os clientes
});

// Fetch: Busca do cache ou rede
self.addEventListener("fetch", (event) => {
  const requestURL = new URL(event.request.url);

  // Ignora requisições não HTTP
  if (!requestURL.protocol.startsWith("http")) return;

  // Em desenvolvimento, ignora totalmente o cache
  if (isLocalhost) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic"
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache
              .put(event.request, responseToCache)
              .catch((err) =>
                console.warn("Erro ao cachear", event.request.url, err),
              );
          });

          return networkResponse;
        })
        .catch((error) => {
          console.error("[SW] Erro ao buscar recurso da rede:", error);
          throw error;
        });
    }),
  );
});

// Push notification
self.addEventListener("push", (event) => {
  const title = "MChiodi Focus";
  const options = {
    body: event.data.text(),
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
