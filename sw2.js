var app = {};

onmessage = function (e) {
    importScripts("./scripts/vendor/d3.min.js");
    importScripts("./scripts/vendor/lodash.min.js");
    importScripts("./scripts/load-data.js");
    postMessage(app);
    //postMessage(true);
};
