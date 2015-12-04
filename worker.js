// Inspired in: https://adactio.com/journal/9775
//var d3 = window.d3;

function dataLoad() {
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
}


self.addEventListener("install", function (event) {
    console.log("event @install", event);
    //event.waitUntil(updateStaticCache()
    //    .then(function () {
    //        return self.skipWaiting();
    //    })
    //);
});

self.addEventListener("activate", function (event) {
    console.log("event @activate", event);
});

self.addEventListener("message", function (event) {
    console.log("event @message", event);
    //if (event.data.command == "trimCaches") {
    //    trimCache(pagesCacheName, 35);
    //    trimCache(imagesCacheName, 20);
    //}
});

self.addEventListener("fetch", function (event) {
    console.log("event @fetch", event);
});


self.addEventListener("sync", function(event) {
    console.log("event @sync", event);
    if (event.tag == 'load') {
        event.waitUntil(dataLoad());
    }
});
