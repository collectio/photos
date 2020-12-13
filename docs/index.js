"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var exif_js_1 = __importDefault(require("exif-js"));
var form = document.querySelector('form');
var input = document.getElementById('image1');
var base64ToArrayBuffer = function (base64) {
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binaryString = atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};
var reader = null;
input.addEventListener('change', function () {
    if (input.files && input.files[0]) {
        __spreadArrays(input.files).map(function (file) {
            reader = new FileReader();
            reader.onload = function (e) {
                var label = document.createElement('label');
                label.style.backgroundImage = "url(" + e.target.result + ")";
                form.appendChild(label);
                //回転対応 ,  回転具合を見てlabelを回転
                var arrayBuffer = base64ToArrayBuffer(reader.result);
                var exif = exif_js_1.default.readFromBinaryFile(arrayBuffer);
                console.log(exif);
                // let rotate = 0;
                // if (exif && exif.Orientation) {
                //     console.log(exif.Orientation)
                //   switch (exif.Orientation) {
                //     case 3:
                //       rotate = 180;
                //       break;
                //     case 6:
                //       rotate = 90;
                //       break;
                //     case 8:
                //       rotate = -90;
                //       break;
                //   }
                // }
                // label.style.transform = `rotate(${rotate}deg)`;
                // label.style.webkitTransform = `rotate(${rotate}deg)`;
            };
            reader.readAsDataURL(file);
        });
    }
});
//# sourceMappingURL=index.js.map