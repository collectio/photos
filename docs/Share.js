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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        return __awaiter(this, void 0, void 0, function () {
            var files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = [];
                        return [4 /*yield*/, this.state.photos.map(function (photo) { return __awaiter(_this, void 0, void 0, function () {
                                var file;
                                return __generator(this, function (_a) {
                                    file = dataURLtoFile(photo.image, 'test.jpg');
                                    files.push(file);
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        console.log(files);
                        if (navigator.share) {
                            navigator.share({
                                text: this.textArea.value,
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
                        return [2 /*return*/];
                }
            });
        });
    };
    Share.prototype.render = function () {
        var album = this.props.location.state.album;
        return (react_1.default.createElement("div", { id: "share" },
            react_1.default.createElement("nav", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: {
                        pathname: "/album",
                        state: { album: album }
                    }, className: "close" },
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