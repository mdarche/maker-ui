if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>n(e,i),_={module:{uri:i},exports:c,require:o};s[i]=Promise.all(t.map((e=>_[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-de618606"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_oMvCyIC_Iy_eTkbOQ0LH/_buildManifest.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/_oMvCyIC_Iy_eTkbOQ0LH/_middlewareManifest.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/_oMvCyIC_Iy_eTkbOQ0LH/_ssgManifest.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/framework-15e75f92fdb7f319.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/main-dc7a0c3543331453.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/404-a24446a1ee663994.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/_app-1e4a39216b4ad7a4.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/_error-de1d7d802fe43d61.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/carousel-933c5d820e5bbae5.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/contribute-d4c7f6e2d79e4999.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/credits-c173922922e1843e.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements-9547543fb984da71.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/accordion-f025db580ff53b44.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/announcement-c0ed13cf549385ce.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/cookie-notice-8862dea2111ab0fa.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/dropdown-ad0310bba0f4e2e8.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/generate-01f6ca20dd4d5ee4.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/modal-1847ad6681227e69.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/page-transition-9f2be359d9b28757.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/popover-50d086cd8ada9fc6.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/spinner-8dcf77e902859609.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/table-of-contents-361784771e5d687a.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/tabs-77e9a6cdaa686ad9.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/elements/tooltip-1120ec8fb45d8370.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/faqs-7f297a30aeb5b846.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/forms-0912b20c75e40e6c.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/forms/fields-1de5fa80ef806267.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/forms/form-87d8e8c029bad74b.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/forms/pagination-d26552307134e51a.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/forms/submission-9e7cf90000fe5838.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/forms/validation-498a9af59a96e8c1.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/getting-started-9341d50cf29db957.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/hooks-3f210c27f3b620e6.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout-e1c9cf519b1ba6e6.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/color-button-1b6cb5ab04f4f2bd.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/content-b57ca329e82a6935.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/footer-2267b82a36ff600d.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/header-4b7a883a7a8f2968.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/layout-6aeeb509f78de5c3.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/main-c8d2332a47206cab.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/menus-40ca31fe26e603b9.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/mobile-menu-04529d413b2136e9.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/navbar-b5ab41c496f10834.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/section-00ca256602f1866a.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/side-nav-c9d3fe0f6e31d47f.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/sidebar-6b0b593855afa61f.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/layout/topbar-81e3c446f091ab12.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/lightbox-cc82ef660c4e6c8c.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/maker-ui-options-d614945301874e97.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/primitives-3dcd166f2b454ad5.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/styling-components-ffb3a2cc78bef188.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/docs/utilities-7144b3f4716c2d5f.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/guides-3ca9528c40d79316.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/pages/index-fad15294e6b99ada.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/chunks/webpack-3ede62a6cf12399f.js",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/_next/static/css/d5e88875cdaa09da.css",revision:"_oMvCyIC_Iy_eTkbOQ0LH"},{url:"/favicon-32x32.png",revision:"ffe4f3c56eb908bef7ab47bafb976fc2"},{url:"/favicon.ico",revision:"241f9785d8c3c6a10610de126a57bcb4"},{url:"/icon-512x512.png",revision:"a64daacc22f0db915491adf40dc97345"},{url:"/icon.png",revision:"b0425fd1a71a5f29f371052bb1e71da1"},{url:"/manifest.json",revision:"b3cf747f506d2196cddb747ade2f1de7"},{url:"/robots.txt",revision:"b547f5ec71678754ff92fa261ab6ad4e"},{url:"/safari-pinned-tab.svg",revision:"830a6e2e0a086da6d1cc461337cf5b2a"},{url:"/sitemap.xml",revision:"a5d8e759f668982d9d7312a5e7484a60"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
