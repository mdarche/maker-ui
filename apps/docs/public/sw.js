if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const c={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return c;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-72761204"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/middleware-manifest.json",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/UZHmf5urpYqJRSIyMRdzL/_buildManifest.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/UZHmf5urpYqJRSIyMRdzL/_middlewareManifest.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/UZHmf5urpYqJRSIyMRdzL/_ssgManifest.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/framework-9181fc91e66bac1d.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/main-d4f6dfc1084269ed.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/404-c338326d254ca613.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/_app-53cd41c585086fe3.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/_error-230ed0e6b3b304c1.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/carousel-30e5a916d7c9d0c0.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/contribute-3677f518706f6636.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/credits-ce7ac8db65e91def.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements-5f5d33a786915768.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/accordion-36380dae9c85488b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/announcement-8c44f9283eb7f7db.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/cookie-notice-185087efd608ed88.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/dropdown-9eade08756d1ec24.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/generate-7e744cd17ce4a85e.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/modal-45edbdab09d42c0e.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/page-transition-a8ecca18d806fbc0.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/popover-8aebc4914831a203.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/spinner-fa6eb6e956054af8.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/table-of-contents-379a36c82ef70c9e.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/tabs-85f3ea34ba0662d8.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/elements/tooltip-e5202cbc36a22f1b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/faqs-27a1df2aa78e41c7.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/forms-ddfcbd598794861b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/forms/fields-bb1b1aa68ce6475b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/forms/form-0c59de1b9d56b8ec.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/forms/pagination-63ab232a94bcaead.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/forms/submission-4f38f55a5ae1f7d1.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/forms/validation-02a1d65c90db5601.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/getting-started-1055aaa4aeac491c.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/hooks-41793cd60b088ab4.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout-362662ccb090d450.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/color-button-d8255f1c785e8e32.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/content-ffcb5e570d845705.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/footer-8ed353c0c98d3c06.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/header-2605ab0a0fa547ae.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/layout-be28931f84d2524c.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/main-d3157f9c0acce0eb.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/menus-77aa85ed0dc20e2b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/mobile-menu-90c8d7c5ab3d1d32.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/navbar-f5d5be1fc00b56fb.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/section-06aa6a66095b6fb5.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/side-nav-3829711d54bfeb16.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/sidebar-b27255f4623cbe8b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/layout/topbar-0332e3610548e141.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/lightbox-08204b3d1757847d.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/maker-ui-options-d90569f2023bf8c3.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/primitives-501071c040c42ad5.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/styling-components-d30d2ef93c6077a4.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/docs/utilities-736390cc0935ce5b.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/guides-3b6996854f828be9.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/pages/index-0b5ca63ac36791ae.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/chunks/webpack-c0a215d97fde373a.js",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/_next/static/css/d5e88875cdaa09da.css",revision:"UZHmf5urpYqJRSIyMRdzL"},{url:"/favicon-32x32.png",revision:"ffe4f3c56eb908bef7ab47bafb976fc2"},{url:"/favicon.ico",revision:"241f9785d8c3c6a10610de126a57bcb4"},{url:"/icon-512x512.png",revision:"a64daacc22f0db915491adf40dc97345"},{url:"/icon.png",revision:"b0425fd1a71a5f29f371052bb1e71da1"},{url:"/manifest.json",revision:"b3cf747f506d2196cddb747ade2f1de7"},{url:"/robots.txt",revision:"b547f5ec71678754ff92fa261ab6ad4e"},{url:"/safari-pinned-tab.svg",revision:"830a6e2e0a086da6d1cc461337cf5b2a"},{url:"/sitemap.xml",revision:"ecc8590c2e785b1c499b85f0254ed85d"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
