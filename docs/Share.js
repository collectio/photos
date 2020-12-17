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
var react_router_dom_1 = require("react-router-dom");
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    var mime;
    var m = arr[0];
    if (m) {
        var mi = m.match(/:(.*?);/);
        if (mi)
            mime = mi[1];
    }
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
var Share = /** @class */ (function (_super) {
    __extends(Share, _super);
    function Share(props) {
        var _this = _super.call(this, props) || this;
        try {
            var photos = _this.props.location.state.photos;
            _this.state = {
                photos: photos
            };
        }
        catch (_a) {
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。');
            _this.props.history.push('/');
            location.reload();
        }
        return _this;
    }
    Share.prototype.share = function () {
        var file = dataURLtoFile(this.state.photos[0].image, 'test.jpg');
        console.log(file);
        if (navigator.share) {
            navigator.share({
                text: 'Web Share API level2のテストです',
                url: 'https://collectio.jp/',
                files: [file]
            }).then(function () {
                console.log('Share was successful.');
            }).catch(function (error) {
                console.log('Sharing failed', error);
            });
        }
        else {
            alert('このブラウザではシェア機能が使えません。\n最新のSafari, Chromeをお使いください。');
        }
    };
    Share.prototype.render = function () {
        return (react_1.default.createElement("div", { id: "", onClick: this.share.bind(this) }, "share"));
    };
    return Share;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(Share);
//# sourceMappingURL=Share.js.map