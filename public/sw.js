const CACHE_PREFIX = "gurupeeth-pwa-";
const CACHE_NAME = `${CACHE_PREFIX}offline-v2`;
const OFFLINE_URL = "/offline.html";
const PRECACHE_MANIFEST_URL = "/offline-precache.json";
const ROOT_URL = "/";
const CORE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/app-assets/aarti.json",
  "/app-assets/nityasevastotramantra.json",
  "/app-assets/newswamicharitra.json",
  "/app-assets/guru-app-icon.png",
  "/app-assets/guru-app-icon-192.png",
  "/app-assets/guru-app-icon-512.png",
  "/app-assets/swami_samarth.png",
  "/app-assets/new_nitya_seva.png",
  "/app-assets/new_arti_sangrah.png",
  "/app-assets/new_swamicharitra.png",
  "/app-assets/new_mantra_jap.png",
  "/app-assets/new_abjya_chandi.png",
  "/app-assets/new_margadarshika.png",
  "/app-assets/new_san_var.png",
  "/app-assets/new_majhi_seva.png",
  "/app-assets/cardgurupeeth.png",
  "/app-assets/cardprasadalay.png",
  "/app-assets/cardayuhospital.png",
  "/app-assets/nunitoregular.ttf",
  "/app-assets/poppins_regular.otf",
];

async function cacheUrl(cache, url) {
  try {
    const response = await fetch(url, { cache: "reload" });
    if (response.ok && response.type === "basic") {
      await cache.put(url, response.clone());
    }
  } catch {
    // A single optional image must not prevent the offline worker from installing.
  }
}

async function installOfflineResources() {
  const cache = await caches.open(CACHE_NAME);
  const urls = new Set(CORE_URLS);

  try {
    const manifestResponse = await fetch(PRECACHE_MANIFEST_URL, { cache: "reload" });
    if (manifestResponse.ok) {
      const manifestUrls = await manifestResponse.json();
      if (Array.isArray(manifestUrls)) {
        for (const url of manifestUrls) {
          if (typeof url === "string" && url.startsWith("/")) urls.add(url);
        }
      }
    }
  } catch {
    // Keep the fixed core list as a fallback if the generated manifest is absent.
  }

  await Promise.all([...urls].map((url) => cacheUrl(cache, url)));

  try {
    const home = await fetch(ROOT_URL, { cache: "reload" });
    if (home.ok && home.type === "basic") await cache.put(ROOT_URL, home.clone());
  } catch {
    // The worker may still install; the offline screen will explain that first use
    // requires an online visit to download the app shell.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(installOfflineResources());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
        .map((name) => caches.delete(name)),
    );
    await self.clients.claim();
  })());
});

async function networkFirst(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok && response.type === "basic") {
      await cache.put(request, response.clone());
      return response;
    }
    return (await cache.match(request)) || response;
  } catch {
    return (await cache.match(request)) || (await cache.match(new URL(request.url).pathname)) || null;
  }
}

async function cacheFirst(request, cache) {
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok && response.type === "basic") await cache.put(request, response.clone());
    return response;
  } catch {
    return null;
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (request.mode === "navigate") {
      const response = await networkFirst(request, cache);
      if (response) return response;

      if (url.pathname === ROOT_URL) {
        const home = await cache.match(ROOT_URL);
        if (home) return home;
      }

      return (await cache.match(OFFLINE_URL)) || new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    if (url.pathname.startsWith("/assets/")) {
      return (await cacheFirst(request, cache)) || fetch(request);
    }

    if (url.pathname.startsWith("/app-assets/")) {
      return (await networkFirst(request, cache)) || new Response("Offline content is not cached yet.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return fetch(request);
  })());
});
