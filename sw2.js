// Inspired on:
//  https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
importScripts("./scripts/shared.js");

self.onmessage = function (e) {
    var msg = {}, uInt8View;

    console.log("e @onmessage", e);

    switch (e.data) {
        case "getAppObj":
            msg.data = app || [];
            msg.type = "ChartData";
            break;

        default:
            importScripts("./scripts/vendor/d3.min.js");
            importScripts("./scripts/vendor/lodash.min.js");
            importScripts("./scripts/load-data.js");
            msg.data = [];
            msg.type = "";
    }

    arrayBuffer = new ArrayBuffer(msg.data);
    //self.postMessage(arrayBuffer.buffer, [arrayBuffer.buffer]);

    uInt8View = new Uint8Array(arrayBuffer);
    self.postMessage(uInt8View.buffer, [uInt8View.buffer]);

    //msg.data = arrayBuffer;
    //self.postMessage(msg, [msg.data.buffer]);

    //self.postMessage(JSON.parse(JSON.stringify(msg)));   /// Legacy (before Transferable Objects)

};

self.onerror = function () {
    log('worker error');
};
