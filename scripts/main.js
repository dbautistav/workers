"use strict";

var app = {};

(function () {
    d3.csv("../data/ecobici.data", function (data) {
        app.data = data;

        console.log("app", app);

        var testerEl = document.getElementById('tester');
        Plotly.plot(testerEl, [{
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16]
        }], {
            margin: {t: 0}
        });
    });
})();
