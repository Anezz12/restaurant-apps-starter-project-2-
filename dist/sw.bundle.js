if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let r={};const o=e=>a(e,c),t={module:{uri:c},exports:r,require:o};i[c]=Promise.all(n.map((e=>t[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-c7741fe8"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"app.bundle.js",revision:"efcb720973b078c9a3f572351237f1cc"},{url:"app.bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"app.webmanifest",revision:"aeeda7c481b660a6b59f8affdffbcc55"},{url:"favicon.png",revision:"36f541019e223a60eb62de63d59ba094"},{url:"heros/hero-image_1.jpg",revision:"a2f444d9e2e43a5d0373b1a0d8cb2236"},{url:"heros/hero-image_2.jpg",revision:"49f78cae81de4f48caf1c2fe0271c828"},{url:"heros/hero-image_3.jpg",revision:"d232e05589056e05f52cf2689f315c6c"},{url:"heros/hero-image_4.jpg",revision:"4ea98fe648a0b853ab379c928b5fd0bf"},{url:"icons/128x128.png",revision:"e7a7efeda4a92bfc71bd0307ab8e1fd2"},{url:"icons/144x144.png",revision:"e732a6096b6b4657e994322602232297"},{url:"icons/152x152.png",revision:"9c8bca5a779ddac3a9dd9818cc01076e"},{url:"icons/192x192.png",revision:"229cc1aae4f7be23485852e66911e130"},{url:"icons/384X384.png",revision:"37cc14b6955a45c7f37c8cffe15a4bb5"},{url:"icons/72x72.png",revision:"6d749a2b508246bce2e8365ab73cc2c7"},{url:"icons/96x96.png",revision:"6003627b3945b726e82d4fd21aaaab91"},{url:"icons/favicon.png",revision:"36f541019e223a60eb62de63d59ba094"},{url:"index.html",revision:"dd27255c801ea1df76c1751f56b62bf5"}],{}),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/list")),new e.StaleWhileRevalidate({cacheName:"restaurant-api-dicoding-list",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/images/")),new e.StaleWhileRevalidate({cacheName:"restaurant-api-dicoding-images",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://restaurant-api.dicoding.dev/detail/")),new e.NetworkFirst({cacheName:"restaurant-api-dicoding-detail",plugins:[]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com/,new e.StaleWhileRevalidate({cacheName:"google-fonts-webfonts",plugins:[]}),"GET"),e.registerRoute((({url:e})=>e.href.startsWith("https://kit.fontawesome.com/4d69af1ea6.js")),new e.CacheFirst({cacheName:"fontawesome-kit",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.bundle.js.map
