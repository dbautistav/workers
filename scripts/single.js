"use strict";

(function () {
    var dataUrl = "./../data/1511.data";

    function activate() {
        utils.animateSquare();
        d3.csv(dataUrl, function (data) {
            if (data) {
                handleAppDataAndDrawChart(data);
            }
        });
    }

    function handleAppDataAndDrawChart(data) {
        var groupedData = _.groupBy(data, "Edad_Usuario");

        var dataArray = [];
        _.forEach(_.keysIn(groupedData), function (_key) {
            dataArray.push({x: parseInt(_key), y: groupedData[_key].length});
        });
        utils.drawChart(dataArray);
    }


    // Main entry point!
    activate();

})();
