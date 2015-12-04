"use strict";

(function () {
    // Modified version taken from: https://mourner.github.io/worker-data-load
    function animateSquare() {
        var side = "right",
            square = document.getElementById("square"),
            start = Date.now();

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout;

        function step() {
            var now = Date.now(),
                progress,
                progressProportion = 5, width = 4000;

            if (side == "right") {
                progress = now - start;
                if (progress > width) {
                    side = "left";
                    start = now;
                }

            } else {
                progress = width + start - now;
                if (progress < 0) {
                    side = "right";
                    start = now;
                }
            }

            square.style.left = (progress / progressProportion) + "px";

            requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    animateSquare();

    // Register our service-worker
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register("/worker.js", {
                scope: "/"
            })
            .then(function (registration) {
                console.log("registration", registration);
                //registration.sync.register("load").then(function () {
                //    // registration succeeded
                //}, function () {
                //    // registration failed
                //});
            })
            .catch(function (err) {
                console.log("ServiceWorker failed to register. Are you visiting the HTTPS site?");
                console.log(err.message);
            });
    }
})();
