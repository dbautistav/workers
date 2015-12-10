"use strict";

var app = {};

(function () {
    var dataUrl = "./../data/1511.data";

    function drawChart() {
        app.groupedData = _.groupBy(app.data, "Edad_Usuario");

        console.log("app", app);

        var plotEl = document.getElementById("plot");

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
        app.drawChart = drawChart;
        //drawChart();  ///
    }


    // "Main" entry point!
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
