const CACHE_NAME = "pwa-preguntas-v1";
const urlsToCache = [
  "/",
  "/questions.json",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
  // Next.js static files will be cached dynamically
];

// Install Service Worker
self.addEventListener("install", (event) => {
  console.log("PWA Preguntas: Service Worker installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("PWA Preguntas: Opened cache");
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log("PWA Preguntas: All files cached successfully");
        // Take control immediately
        self.skipWaiting();
      })
  );
});

// Fetch from cache with network-first strategy for better UX
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Try network first, then cache
    fetch(event.request)
      .then((response) => {
        // If we got a response, add it to cache and return it
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // If not in cache, return offline page or error
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline content not available", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
  );
});

// Update Service Worker
self.addEventListener("activate", (event) => {
  console.log("PWA Preguntas: Service Worker activating...");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log("PWA Preguntas: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("PWA Preguntas: Service Worker activated");
        // Take control of all pages
        return self.clients.claim();
      })
  );
});

// Handle messages from main thread
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
