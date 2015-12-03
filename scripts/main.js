"use strict";

var app = {};

(function () {
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


    // "../data/ecobici.data"
    d3.csv("https://raw.githubusercontent.com/dbautistav/workers/gh-pages/data/ecobici.data", function (data) {
        app.data = data;
        drawChart();
    });
})();
