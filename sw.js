let log = console.log.bind(console); //bind our console to a letiable
let version = "0.0.0";
let cacheName = "currency-converter";
let cache = `${cacheName}-${version}`;
let filesToCache = [
  "/",
  "index.html",
  "js/app.js",
  "/?app=true",
  "https://free.currencyconverterapi.com/api/v5/currencies",
  "https://unpkg.com/idb@2.0.4/lib/idb.js"
];

//Add event listener for install
self.addEventListener("install", function (event) {
  log("ServiceWorker Installing......");
  event.waitUntil(
    caches
      .open(cache) //open this cache from caches and it will return a Promise
      .then(function (cache) {
        //catch that promise
        log("ServiceWorker is Caching files");
        cache.addAll(filesToCache); //add all required files to cache it also returns a Promise
      })
  );
});

//Add event listener for fetch
self.addEventListener("fetch", function (event) {
  event.respondWith(
    //it either takes a Response object as a parameter or a promise that resolves to a Response object
    caches
      .match(event.request) //If there is a match in the cache of this request object
      .then(function (response) {
        if (response) {
          log("Fulfilling " + event.request.url + " from cache.");
          //returning response object
          return response;
        } else {
          log(event.request.url + " not found in cache fetching from network.");
          //return promise that resolves to Response object
          return fetch(event.request);
        }
      })
  );
});

self.addEventListener("activate", function (event) {
  log("ServiceWorker Activate");
  event.waitUntil(
    caches
      .keys() // return all the keys in the cache as an array
      .then(function (keyList) {
        //run everything using Promise.all()
        Promise.all(
          keyList.map(function (key) {
            if (key !== cache) {
              // delete stale cache
              caches.delete(key)
            }
          })
        );
      })
  );
});
