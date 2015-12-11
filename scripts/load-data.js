"use strict";

var app = [];

(function () {
    var dataUrl = "./data/1511.data";

    function updateAppDataObj(data) {
        var groupedData = _.groupBy(data, "Edad_Usuario");

        app = [];
        _.forEach(_.keysIn(groupedData), function (_key) {
            app.push({x: parseInt(_key), y: groupedData[_key].length});
        });
        //console.log("app", app);
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
