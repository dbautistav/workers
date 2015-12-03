"use strict";

var app = {};

(function () {
    //var dataUrl = "../data/ecobici.data";
    var dataUrl = "https://raw.githubusercontent.com/dbautistav/workers/gh-pages/data/ecobici.data";

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


    d3.csv(dataUrl, function (data) {
        app.data = data;
        drawChart();
    });
})();
