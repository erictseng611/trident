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
    "revision": "f63fa7701dcdb6b2452f67f5a05e9896"
  },
  {
    "url": "css/login.css",
    "revision": "f40e28338d4e86c3aaa9ac5a6bb286f8"
  },
  {
    "url": "html/app.html",
    "revision": "bc4030b91d539fd009bcab69f839cedc"
  },
  {
    "url": "html/createAccount.html",
    "revision": "1a44816114e7b489bd00776969eb4d79"
  },
  {
    "url": "images/logo.svg",
    "revision": "85ec8aaa1562e4ff9ed1ca49cee64c19"
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
    "revision": "6d2ba04338b2d622c710dd31006bf8cc"
  },
  {
    "url": "js/app.js",
    "revision": "1c19d340a92a4965e30a140b3bc5e01a"
  },
  {
    "url": "js/index.js",
    "revision": "fbf632542c0295432d27ca03b95ffda8"
  },
  {
    "url": "nmcss/app/app.css",
    "revision": "dfb3b082073b25fd82277d75b3592f4d"
  },
  {
    "url": "nmcss/app/match.css",
    "revision": "c8f4942b804c829d02265354b350149d"
  },
  {
    "url": "nmcss/login.css",
    "revision": "02d6f3e46d710a922414358f097dbb48"
  },
  {
    "url": "nmjs/app/app.js",
    "revision": "b010abc4a22f986ab04ce7f09f456817"
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
    "revision": "de08749cdfdc3954e30c9a4165dc08df"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
