"use strict";

(function () {
    var app = {}, msg;

    // Based on: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
    // Registering our service-worker
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register("./../worker.js", {
                scope: "./"
            })

            .then(function (registration) {
                console.log("registration", registration);

                if (registration.installing) {
                    console.log("Service worker installing");

                } else if (registration.waiting) {
                    console.log("Service worker installed");

                } else if (registration.active) {
                    console.log("Service worker active");
                }
            })

            .catch(function (err) {
                console.error("ServiceWorker failed to register. Are you visiting the HTTPS site?");
                console.error(err.message);
            });
    }


    function activate() {
        animateSquare();

        setTimeout(function () {
            init2ndWorker();
        }, 1000);
    }

    // Inspired from: https://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript
    function arrayBuffer2utf8(data) {
        var _arr, result = "";
        _arr = new Uint8Array(data);
        for (var i = 0; i < _arr.length; i++) {
            result += String.fromCharCode(_arr[i]);
        }
        return JSON.parse(result);
    }

    // Modified version from: https://mourner.github.io/worker-data-load
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

    function drawChart() {
        console.log("### app", app);

        var plotEl = document.getElementById("plot");

        var xArray = [], yArray = [];

        var samples = app.data;
        _.forEach(samples, function (_sample) {
            xArray.push(_sample.x);
            yArray.push(_sample.y);
        });

        Plotly.plot(plotEl, [{
            x: xArray,
            y: yArray
        }], {
            margin: {t: 0}
        });
    }

    // Modified version from: https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
    function init2ndWorker() {
        var worker = new Worker("./../sw2.js");

        worker.onmessage = function (e) {
            msg = e.data;
            console.warn("Data loaded in worker", e);

            switch (msg.type) {
                case "ChartData":
                    // With help from: https://stackoverflow.com/questions/16071211/using-transferable-objects-from-a-web-worker
                    app.data = arrayBuffer2utf8(msg.data);
                    drawChart();
                    break;

                default: ;
            }
        };

        var ab = new ArrayBuffer(1);
        worker.postMessage(ab, [ab]);
        if (ab.byteLength) {
            console.log("Transferables are not supported in your browser! :(");

        } else {
            console.log("Transferables are supported in your browser! :)");
            worker.postMessage("Init!");
        }

        setTimeout(function () {
            setupArray();
            worker.postMessage("getAppObj");
        }, 2000);
    }


    // Main entry point!
    activate();

})();
