importScripts("/scripts/vendor/serviceworker-cache-polyfill.js");

self.addEventListener("activate", function (event) {
    console.log("event @activate", event);
});


// Inspired on: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener("install", function (event) {
    console.log("event @install", event);
    event.waitUntil(
        caches.open("v1").then(function (cache) {
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

self.addEventListener("fetch", function (event) {
    var response;

    console.log("event @fetch", event);

    event.respondWith(
        caches
            .match(event.request)
            .catch(function () {
                console.log("@first-catch");
                return fetch(event.request);
            })
            .then(function (r) {
                console.log("r @then", r);
                response = r;
                caches
                    .open("v1")
                    .then(function (cache) {
                        console.log("cache @then", cache);
                        cache.put(event.request, response);
                    });
                return response.clone();
                //return response ? response.clone() : null;
            })
            .catch(function () {
                console.log("@final-catch");
                return caches.match("/data/1511.data");
            })
    );
});
