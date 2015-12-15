"use strict";

// Inspired on:
//  https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
var wrk = {
        dataUrl: "./data/1511.data"
    };

function sendMessage(msg) {
    var uInt8View = utf82ArrayBuffer(JSON.stringify(msg.data));
    self.postMessage({type: msg.type, data: uInt8View}, [uInt8View]);

    /// Before Transferable Objects (via structured clone algorithm)
    //self.postMessage(JSON.parse(JSON.stringify(msg)));
}

function SendDataAsMessage(data) {
    var groupedData = _.groupBy(data, "Edad_Usuario");

    var dataArray = [];
    _.forEach(_.keysIn(groupedData), function (_key) {
        dataArray.push({x: parseInt(_key), y: groupedData[_key].length});
    });

    sendMessage({
        data: dataArray || [],
        type: "ChartData"
    });
}

// Taken from: https://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript
function utf82ArrayBuffer(str) {
    var buf, bufView;
    buf = new ArrayBuffer(str.length);
    bufView = new Uint8Array(buf);

    _.forEach(str, function (_c, i) {
        bufView[i] = str.charCodeAt(i);
    });

    return buf;
}

self.onmessage = function (e) {
    switch (e.data) {
        case "getAppObj":
            importScripts("./scripts/vendor/d3.min.js");
            importScripts("./scripts/vendor/lodash.min.js");

            d3.csv(wrk.dataUrl, function (data) {
                if (data) {
                    SendDataAsMessage(data);
                }
            });
            break;

        default: ;
    }

};

self.onerror = function () {
    console.error("Worker error");
};
