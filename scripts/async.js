"use strict";

(function () {
    // Based on: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
    // Registering our service-worker
    if (navigator.serviceWorker) {
        navigator.serviceWorker
            .register("./../worker.js", {
                scope: "./../"
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
        utils.animateSquare();
        init2ndWorker();
    }

    // Modified version from: https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
    function init2ndWorker() {
        var msg, samples;
        var worker = new Worker("./../sw2.js");

        worker.onmessage = function (e) {
            msg = e.data;
            //console.log("Data loaded in worker", e);

            switch (msg.type) {
                case "ChartData":
                    // With help from: https://stackoverflow.com/questions/16071211/using-transferable-objects-from-a-web-worker
                    samples = utils.arrayBuffer2utf8(msg.data);
                    utils.drawChart(samples);
                    break;

                default: ;
            }
        };

        var ab = new ArrayBuffer(1);
        worker.postMessage(ab, [ab]);
        if (ab.byteLength) {
            console.log("Transferables are not supported in your browser! :(");
            worker.postMessage("Init!");

        } else {
            console.log("Transferables are supported in your browser! :)");
            worker.postMessage("getAppObj");
        }

    }


    // Main entry point!
    activate();

})();
