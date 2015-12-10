"use strict";

var app = null;

(function () {
    var dataUrl = "./../data/1511.data";

    function updateAppDataObj(data) {
        app = data;
    }


    // "Main" entry point!
    d3.csv(dataUrl, function (data) {
        if (data) {
            updateAppDataObj(data);

        } else {
            dataUrl = "https://raw.githubusercontent.com/dbautistav/workers/gh-pages/data/1511.data";
            d3.csv(dataUrl, function (data) {
                updateAppDataObj(data);
            });
        }
    });
})();
