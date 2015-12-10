onmessage = function (e) {
    var msg = {};

    console.log("e @onmessage", e);

    switch (e.data) {
        case "getAppObj":
            msg.data = app || {};
            msg.type = "ChartData";
            break;

        default:
            importScripts("./scripts/vendor/d3.min.js");
            importScripts("./scripts/vendor/lodash.min.js");
            importScripts("./scripts/load-data.js");
            msg.data = {};
            msg.type = "";
    }

    postMessage(JSON.parse(JSON.stringify(msg)));
};
