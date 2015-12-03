"use strict";

var app = {};

(function () {
    var dataUrl = "./../data/1511.data";

    function drawChart() {
        app.groupedData = _.groupBy(app.data, "Edad_Usuario");

        console.log("app", app);

        var plotEl = document.getElementById('plot');

        var xArray = [], yArray = [];

        _.forEach(_.keysIn(app.groupedData), function (_key) {
            xArray.push(_key);
            yArray.push(app.groupedData[_key].length);
        });

        Plotly.plot(plotEl, [{
            x: xArray,
            y: yArray
        }], {
            margin: {t: 0}
        });
    }


    function updateAppDataAndDrawChart(data) {
        app.data = data;
        drawChart();
    }


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

    d3.csv(dataUrl, function (data) {
        if (data) {
            updateAppDataAndDrawChart(data);

        } else {
            dataUrl = "https://raw.githubusercontent.com/dbautistav/workers/gh-pages/data/1511.data";
            d3.csv(dataUrl, function (data) {
                updateAppDataAndDrawChart(data);
            });
        }
    });
})();
