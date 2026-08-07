const CACHE_PREFIX = "dosage-app-dosage-pr7-";
const CACHE_NAME = "dosage-app-dosage-pr7-0.1.0-3702799";
const APP_SHELL = [
  "./",
  "./assets/KaTeX_AMS-Regular-BQhdFMY1.woff2",
  "./assets/KaTeX_AMS-Regular-DMm9YOAa.woff",
  "./assets/KaTeX_AMS-Regular-DRggAlZN.ttf",
  "./assets/KaTeX_Caligraphic-Bold-ATXxdsX0.ttf",
  "./assets/KaTeX_Caligraphic-Bold-BEiXGLvX.woff",
  "./assets/KaTeX_Caligraphic-Bold-Dq_IR9rO.woff2",
  "./assets/KaTeX_Caligraphic-Regular-CTRA-rTL.woff",
  "./assets/KaTeX_Caligraphic-Regular-Di6jR-x-.woff2",
  "./assets/KaTeX_Caligraphic-Regular-wX97UBjC.ttf",
  "./assets/KaTeX_Fraktur-Bold-BdnERNNW.ttf",
  "./assets/KaTeX_Fraktur-Bold-BsDP51OF.woff",
  "./assets/KaTeX_Fraktur-Bold-CL6g_b3V.woff2",
  "./assets/KaTeX_Fraktur-Regular-CB_wures.ttf",
  "./assets/KaTeX_Fraktur-Regular-CTYiF6lA.woff2",
  "./assets/KaTeX_Fraktur-Regular-Dxdc4cR9.woff",
  "./assets/KaTeX_Main-Bold-Cx986IdX.woff2",
  "./assets/KaTeX_Main-Bold-Jm3AIy58.woff",
  "./assets/KaTeX_Main-Bold-waoOVXN0.ttf",
  "./assets/KaTeX_Main-BoldItalic-DxDJ3AOS.woff2",
  "./assets/KaTeX_Main-BoldItalic-DzxPMmG6.ttf",
  "./assets/KaTeX_Main-BoldItalic-SpSLRI95.woff",
  "./assets/KaTeX_Main-Italic-3WenGoN9.ttf",
  "./assets/KaTeX_Main-Italic-BMLOBm91.woff",
  "./assets/KaTeX_Main-Italic-NWA7e6Wa.woff2",
  "./assets/KaTeX_Main-Regular-B22Nviop.woff2",
  "./assets/KaTeX_Main-Regular-Dr94JaBh.woff",
  "./assets/KaTeX_Main-Regular-ypZvNtVU.ttf",
  "./assets/KaTeX_Math-BoldItalic-B3XSjfu4.ttf",
  "./assets/KaTeX_Math-BoldItalic-CZnvNsCZ.woff2",
  "./assets/KaTeX_Math-BoldItalic-iY-2wyZ7.woff",
  "./assets/KaTeX_Math-Italic-DA0__PXp.woff",
  "./assets/KaTeX_Math-Italic-flOr_0UB.ttf",
  "./assets/KaTeX_Math-Italic-t53AETM-.woff2",
  "./assets/KaTeX_SansSerif-Bold-CFMepnvq.ttf",
  "./assets/KaTeX_SansSerif-Bold-D1sUS0GD.woff2",
  "./assets/KaTeX_SansSerif-Bold-DbIhKOiC.woff",
  "./assets/KaTeX_SansSerif-Italic-C3H0VqGB.woff2",
  "./assets/KaTeX_SansSerif-Italic-DN2j7dab.woff",
  "./assets/KaTeX_SansSerif-Italic-YYjJ1zSn.ttf",
  "./assets/KaTeX_SansSerif-Regular-BNo7hRIc.ttf",
  "./assets/KaTeX_SansSerif-Regular-CS6fqUqJ.woff",
  "./assets/KaTeX_SansSerif-Regular-DDBCnlJ7.woff2",
  "./assets/KaTeX_Script-Regular-C5JkGWo-.ttf",
  "./assets/KaTeX_Script-Regular-D3wIWfF6.woff2",
  "./assets/KaTeX_Script-Regular-D5yQViql.woff",
  "./assets/KaTeX_Size1-Regular-C195tn64.woff",
  "./assets/KaTeX_Size1-Regular-Dbsnue_I.ttf",
  "./assets/KaTeX_Size1-Regular-mCD8mA8B.woff2",
  "./assets/KaTeX_Size2-Regular-B7gKUWhC.ttf",
  "./assets/KaTeX_Size2-Regular-Dy4dx90m.woff2",
  "./assets/KaTeX_Size2-Regular-oD1tc_U0.woff",
  "./assets/KaTeX_Size3-Regular-CTq5MqoE.woff",
  "./assets/KaTeX_Size3-Regular-DgpXs0kz.ttf",
  "./assets/KaTeX_Size4-Regular-BF-4gkZK.woff",
  "./assets/KaTeX_Size4-Regular-DWFBv043.ttf",
  "./assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2",
  "./assets/KaTeX_Typewriter-Regular-C0xS9mPB.woff",
  "./assets/KaTeX_Typewriter-Regular-CO6r4hn1.woff2",
  "./assets/KaTeX_Typewriter-Regular-D3Ib7_Hf.ttf",
  "./assets/index-BAjScLL_.js",
  "./assets/index-C8IkmCE3.css",
  "./icons/apple-touch-icon.png",
  "./icons/dosage-192.png",
  "./icons/dosage-512.png",
  "./images/container-1000ml.png",
  "./images/container-100ml.png",
  "./images/container-10ml.png",
  "./images/container-250ml.png",
  "./images/container-500ml.png",
  "./images/container-50ml.png",
  "./images/dilution-containers.png",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names
        .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
        .map((name) => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (request.method !== 'GET' || url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(async (cached) => {
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    })
  );
});
