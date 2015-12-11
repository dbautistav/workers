var SIZE = 1024 * 1024 * 55; // 32MB
var arrayBuffer = null;
var uInt8View = null;
var originalLength = null;


function setupArray() {
    arrayBuffer = new ArrayBuffer(SIZE);
    uInt8View = new Uint8Array(arrayBuffer);
    originalLength = uInt8View.length;

    for (var i = 0; i < originalLength; ++i) {
        uInt8View[i] = i;
    }
}
