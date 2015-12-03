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


    // From: https://mourner.github.io/worker-data-load
    function animateSquare() {
        var square = document.getElementById("square"),
            start = Date.now();

        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout;

        function step() {
            var now = Date.now(),
                progress = now - start;

            if (progress > 7000) {
                progress = 0;
                start = now;
            }

            square.style.left = (progress / 10) + "px";

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
