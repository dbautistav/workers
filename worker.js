var currentVersion = "v1",
    oldVersion = "v0";

// From: http://www.html5rocks.com/en/tutorials/service-worker/introduction/
importScripts("./scripts/vendor/serviceworker-cache-polyfill.js");


// Inspired on: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches

            .open(currentVersion)

            .then(function (cache) {
                return cache
                    .addAll([
                        "./index.html",
                        "./sw2.js",
                        "./worker.js",
                        "./data/1511.data",
                        "./scripts/async.js",
                        "./scripts/load-data.js",
                        "./scripts/shared.js",
                        "./scripts/vendor/d3.min.js",
                        "./scripts/vendor/lodash.min.js",
                        "./scripts/vendor/plotly.min.js",
                        "./styles/cube.css",
                        "./styles/square.css",
                        "./styles/style.css",
                        "./views/async.html"
                    ])
                    .then(function () {
                        return self.skipWaiting();
                    });
            })
    );

});


self.addEventListener("activate", function (event) {
    //var cacheWhitelist = [oldVersion];
    //
    //event.waitUntil(
    //    caches
    //        .keys()
    //        .then(function (keyList) {
    //            return Promise
    //                .all(keyList
    //                    .map(function (key, i) {
    //                        if (cacheWhitelist.indexOf(key) === -1) {
    //                            return caches.delete(keyList[i]);
    //                        }
    //                    })
    //                );
    //        })
    //);
});


self.addEventListener("fetch", function (event) {
    var response;

    event.respondWith(
        caches

            .match(event.request)

            .catch(function () {
                return fetch(event.request);
            })

            .then(function (r) {
                response = r;

                caches

                    .open(currentVersion)

                    .then(function (cache) {
                        if (cache.put) {
                            cache.put(event.request, response);
                        }
                    });

                return response ? response.clone() : fetch(event.request);
            })

            .catch(function () {
                return fetch(event.request);
            })
    );

});
