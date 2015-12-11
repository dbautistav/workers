// Inspired on:
//  https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
importScripts("./scripts/shared.js");

// Taken from: https://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript
function utf82to(str) {
    var buf, bufView;
    buf = new ArrayBuffer(str.length);
    bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

self.onmessage = function (e) {
    var msg = {}, uInt8View;

    console.log("e @onmessage", e);

    switch (e.data) {
        case "getAppObj":
            setupArray();
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

    uInt8View = utf82to(JSON.stringify(msg.data));
    self.postMessage({type: msg.type, data: uInt8View}, [uInt8View]);



    /// Before Transferable Objects (via structured clone algorithm)
    //self.postMessage(JSON.parse(JSON.stringify(msg)));

};

self.onerror = function () {
    console.log("Worker error");
};
