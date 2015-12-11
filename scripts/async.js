"use strict";

(function () {
    var app = {}, msg;

    // Based on: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
    // Registering our service-worker
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register("/worker.js", {
            //.register("https://raw.githubusercontent.com/dbautistav/workers/gh-pages/worker.js", {
                scope: "/"
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
        //app.groupedData = _.groupBy(app.data, "Edad_Usuario");
        console.log("### app", app);

        var plotEl = document.getElementById("plot");

        var xArray = [], yArray = [];

        //var input = app.groupedData;
        var input = app.data;
        _.forEach(_.keysIn(input), function (_key) {
            xArray.push(_key);
            yArray.push(input[_key]/10000);
            //yArray.push(app.groupedData[_key].length); //?
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
        var worker = new Worker("/sw2.js");
        //var worker = new Worker("https://raw.githubusercontent.com/dbautistav/workers/gh-pages/sw2.js");

        worker.onmessage = function (e) {
            msg = e.data;
            console.warn("Data loaded in worker", e);

            switch (msg.type) {
                case "ChartData":
                    // With help from: https://stackoverflow.com/questions/16071211/using-transferable-objects-from-a-web-worker
                    //app.data = msg; //?
                    app.data = new Uint8Array(msg.data);
                    ////app.data = msg.data;    ///
                    console.log("***");
                    console.log("msg", msg);
                    console.log("new Uint8Array(msg.data)", new Uint8Array(msg.data));
                    console.log("JSON.stringify(msg.data)", JSON.stringify(msg.data));
                    console.log("msg.data.byteLength", msg.data.byteLength);
                    console.log("***");
                    drawChart();
                    break;

                default:
                    ;
            }
        };
        //worker.postMessage("Init!");

        var ab = new ArrayBuffer(1);
        worker.postMessage(ab, [ab]);
        if (ab.byteLength) {
            console.log("Transferables are not supported in your browser! :(");

        } else {
            console.log("Transferables are supported in your browser! :)");
        }

        setTimeout(function () {
            setupArray();
            worker.postMessage("getAppObj");
        }, 2000);
    }


    // Main entry point!
    activate();

})();
