importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "css/app.css",
    "revision": "7daed9d8bfd407988d54f837ec515444"
  },
  {
    "url": "css/login.css",
    "revision": "f40e28338d4e86c3aaa9ac5a6bb286f8"
  },
  {
    "url": "html/app.html",
    "revision": "77707a83b28c48bfe49bad70e0b6b3a7"
  },
  {
    "url": "html/createAccount.html",
    "revision": "df7c2e16af1c91b01f3d137d71283d13"
  },
  {
    "url": "images/logo.svg",
    "revision": "85ec8aaa1562e4ff9ed1ca49cee64c19"
  },
  {
    "url": "images/projectTridentLogo.png",
    "revision": "9ba2a67938c9af997ffc704b03d3c052"
  },
  {
    "url": "images/serving.png",
    "revision": "e97a07fdd4d4d40d4a2288203b400f46"
  },
  {
    "url": "images/serving.svg",
    "revision": "4ef55dccf28fa8b98d5837dff4636043"
  },
  {
    "url": "images/triton.png",
    "revision": "6b8851cec0f79e0d5ed0dda5fc499cf7"
  },
  {
    "url": "index.html",
    "revision": "93b627260294261794c9889328b47575"
  },
  {
    "url": "js/app.js",
    "revision": "2e7613713235d386fca3dd51f519c7f1"
  },
  {
    "url": "js/index.js",
    "revision": "31fdc1764fa202dfeaaf8ce61abe2435"
  },
  {
    "url": "nmcss/app/app.css",
    "revision": "dfb3b082073b25fd82277d75b3592f4d"
  },
  {
    "url": "nmcss/app/match.css",
    "revision": "d55990f24534515e7257ece9e5e7fba8"
  },
  {
    "url": "nmcss/login.css",
    "revision": "02d6f3e46d710a922414358f097dbb48"
  },
  {
    "url": "nmjs/app/app.js",
    "revision": "0de088275c861c5e929a666e0a353009"
  },
  {
    "url": "nmjs/app/firebase.js",
    "revision": "2db2724c89bca39bd261cc0bede30bdf"
  },
  {
    "url": "nmjs/registration/firebase.js",
    "revision": "2db2724c89bca39bd261cc0bede30bdf"
  },
  {
    "url": "nmjs/registration/index.js",
    "revision": "52b29ace45d612a580910a13a3853508"
  },
  {
    "url": "workbox-cli-config.js",
    "revision": "62f4331fc52eb4b3c2349014b02b7570"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
