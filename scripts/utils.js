"use strict";

var utils = {};

(function () {
    // Inspired from: https://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript
    function arrayBuffer2utf8(data) {
        var _arr, result = "";
        _arr = new Uint8Array(data);

        _.forEach(_arr, function (_item, i) {
            result += String.fromCharCode(_item);
        });

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

    function drawChart(samples) {
        var plotEl = document.getElementById("plot");

        var xArray = [], yArray = [];

        _.forEach(samples, function (_sample) {
            xArray.push(_sample.x);
            yArray.push(_sample.y);
        });

        var layout = {
            title: "Ecobici users (CDMX) per age :: November 2015",
            xaxis: {
                title: "Age"
            },
            yaxis: {
                title: "Number of users"
            }
        };

        Plotly.plot(plotEl, [{
            x: xArray,
            y: yArray
        }], layout);
    }

    function sendMessage(msg) {
        var uInt8View = utf82ArrayBuffer(JSON.stringify(msg.data));
        self.postMessage({type: msg.type, data: uInt8View}, [uInt8View]);

        /// Before Transferable Objects (via structured clone algorithm)
        //self.postMessage(JSON.parse(JSON.stringify(msg)));
    }

    // Taken from: https://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript
    function utf82ArrayBuffer(str) {
        var buf, bufView;
        buf = new ArrayBuffer(str.length);
        bufView = new Uint8Array(buf);

        _.forEach(str, function (_c, i) {
            bufView[i] = str.charCodeAt(i);
        });

        return buf;
    }


    utils.arrayBuffer2utf8 = arrayBuffer2utf8;
    utils.animateSquare = animateSquare;
    utils.drawChart = drawChart;
    utils.sendMessage = sendMessage;
    utils.utf82ArrayBuffer = utf82ArrayBuffer;
})();
