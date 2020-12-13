"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var exif_js_1 = __importDefault(require("exif-js"));
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
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        _this.form = null;
        _this.input = null;
        return _this;
    }
    App.prototype.setFormRef = function (element) {
        this.form = element;
    };
    App.prototype.setInputRef = function (element) {
        this.input = element;
    };
    App.prototype.componentDidMount = function () {
        var _this = this;
        var reader = null;
        if (this.input) {
            this.input.addEventListener('change', function () {
                if (_this.input && _this.input.files && _this.input.files[0]) {
                    Array.from(_this.input.files).map(function (file) {
                        reader = new FileReader();
                        reader.onload = function (e) {
                            var div = document.createElement('div');
                            div.className = 'photo';
                            div.style.backgroundImage = "url(" + e.target.result + ")";
                            if (_this.form)
                                _this.form.appendChild(div);
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
        }
    };
    App.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("form", { action: "", encType: "multipart/form-data", ref: this.setFormRef.bind(this) },
                react_1.default.createElement("input", { className: "file", id: "file", type: "file", name: "image1", accept: "image/*", multiple: true, ref: this.setInputRef.bind(this) }),
                react_1.default.createElement("label", { htmlFor: "file" }))));
    };
    return App;
}(react_1.default.Component));
exports.default = App;
//# sourceMappingURL=App.js.map