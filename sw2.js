onmessage = function (e) {
    var msg = null;

    console.log("e @onmessage", e);

    switch (e.data) {
        case "getAppObj":
            msg = app || {};
            break;

        default:
            importScripts("./scripts/vendor/d3.min.js");
            importScripts("./scripts/vendor/lodash.min.js");
            importScripts("./scripts/load-data.js");
            msg = [1, "a", true, {fileName: null}];
    }

    postMessage(JSON.parse(JSON.stringify(msg)));
};
