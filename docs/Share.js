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
        _this.textArea = null;
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
    // async convertFile(url: string) {
    //     const blob = await fetch(url).then(res => res.blob())
    //     console.log(blob.type)
    //     return new File([blob], 'test.jpg',{ type: blob.type })
    // }
    Share.prototype.setTextInputRef = function (element) {
        this.textArea = element;
    };
    Share.prototype.share = function () {
        var text = this.textArea.value;
        var titles = ['\n'];
        var files = [];
        this.state.photos.map(function (photo) {
            var file = dataURLtoFile(photo.image, 'test.jpg');
            files.push(file);
            if (photo.game && titles.indexOf(photo.game.title) === -1)
                titles.push('#' + photo.game.title);
        });
        text += titles.join(' ');
        // console.log(text)
        // console.log(files)
        if (navigator.share) {
            navigator.share({
                text: text,
                url: 'https://collectio.jp/',
                files: files
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
        var album = this.props.location.state.album;
        return (react_1.default.createElement("div", { id: "share" },
            react_1.default.createElement("nav", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: {
                        pathname: "/album",
                        state: { album: album }
                    }, className: "back" },
                    react_1.default.createElement("img", { className: "logo", src: "./assets/back.svg", alt: "\u623B\u308B" }))),
            react_1.default.createElement("div", { className: "photos" }, this.state.photos.map(function (photo, index) {
                return (react_1.default.createElement("div", { className: 'photo', style: { backgroundImage: "url(" + photo.image + ")" } }));
            })),
            react_1.default.createElement("textarea", { name: "comment", id: "comment", ref: this.setTextInputRef.bind(this), placeholder: "\u30B2\u30FC\u30E0\u3092\u904A\u3093\u3060\u611F\u60F3\u306A\u3069" }),
            react_1.default.createElement("button", { onClick: this.share.bind(this) }, "\u5171\u6709")));
    };
    return Share;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(Share);
//# sourceMappingURL=Share.js.map