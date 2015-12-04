var currentVersion = "v1",
    oldVersion ="v0";

// From: http://www.html5rocks.com/en/tutorials/service-worker/introduction/
importScripts("/scripts/vendor/serviceworker-cache-polyfill.js");


// Inspired on: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener("install", function (event) {
    console.log("event @install", event);
    event.waitUntil(
        caches.open(currentVersion).then(function (cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/data/1511.data",
                "/scripts/",
                "/scripts/async.js",
                "/scripts/vendor/",
                "/scripts/vendor/d3.min.js",
                "/scripts/vendor/lodash.min.js",
                "/scripts/vendor/plotly.min.js",
                "/styles/",
                "/styles/cube.css",
                "/styles/square.css",
                "/styles/style.css",
                "/views/",
                "/views/async.html"
            ]);
        })
    );
});


self.addEventListener("activate", function (event) {
    console.log("event @activate", event);

    var cacheWhitelist = [oldVersion];

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(keyList[i]);
                }
            });
        })
    );
});


self.addEventListener("fetch", function (event) {
    var response;

    console.log("event @fetch", event);

    event.respondWith(
        caches
            .match(event.request)
            .catch(function () {
                console.log("@first-catch: fetch");
                return fetch(event.request);
            })
            .then(function (r) {
                console.log("Response (r) @then", r);
                response = r;
                caches
                    .open(currentVersion)
                    .then(function (cache) {
                        console.log("cache @then", cache);
                        cache.put(event.request, response);
                    });
                return response.clone();
                //return response ? response.clone() : null;
            })
            .catch(function () {
                console.log("@final-catch: default");
                return caches.match("/index.html");
            })
    );
});
