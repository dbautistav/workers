"use strict";

var app = [];

(function () {
    var dataUrl = "./../data/1511.data";

    function updateAppDataObj(data) {
        //app = data; ///

        // TODO: improve me!
        //app = _.groupBy(data, "Edad_Usuario");
        //console.log("app", app);

        console.info("data @updateAppDataObj", data);

        app = data; //
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
