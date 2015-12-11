// Inspired on:
//  https://developers.google.com/web/updates/2011/12/Transferable-Objects-Lightning-Fast
importScripts("./scripts/shared.js");

// Taken from: https://developerblog.redhat.com/2014/05/20/communicating-large-objects-with-web-workers-in-javascript
function utf82ab(str) {
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

    //// Proved solution (it works!)      (begin)
    //uInt8View = new Uint8Array(msg.data); ///
    ////
    //for (var i = 0; i < uInt8View.length; i++) {
    //    uInt8View[i] = i;
    //}
    ////
    //self.postMessage({type: msg.type, data: uInt8View.buffer}, [uInt8View.buffer]); ///
    ////self.postMessage(uInt8View.buffer, [uInt8View.buffer]); ///
    //// Proved solution (it works!)      (end)


    // TESTING...      (begin)
    //uInt8View = utf82ab(JSON.stringify(msg.data));  // RESTORE AFTER TUNE
    uInt8View = utf82ab(JSON.stringify([1, 3, 5, 9, 7, 2, 8, 6, 4]));
    //self.postMessage(uInt8View, [uInt8View]);
    self.postMessage({type: msg.type, data: uInt8View}, [uInt8View]);
    // TESTING...      (end)


    //arrayBuffer = new ArrayBuffer(msg.data);
    ////self.postMessage(arrayBuffer.buffer, [arrayBuffer.buffer]);
    //
    //uInt8View = new Uint8Array(arrayBuffer);
    //self.postMessage(uInt8View.buffer, [uInt8View.buffer]);
    //
    ////msg.data = arrayBuffer;
    ////self.postMessage(msg, [msg.data.buffer]);

    //arrayBuffer = new ArrayBuffer(msg.data); // :(
    //self.postMessage(arrayBuffer.buffer, [arrayBuffer.buffer]); // :(


    //self.postMessage(JSON.parse(JSON.stringify(msg)));   /// Legacy (before Transferable Objects)

};

self.onerror = function () {
    console.log("Worker error");
};
