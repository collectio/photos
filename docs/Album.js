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
var Album = /** @class */ (function (_super) {
    __extends(Album, _super);
    function Album(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Album.prototype.render = function () {
        try {
            var album_1 = this.props.location.state.album;
            return (react_1.default.createElement("div", { id: "album" },
                react_1.default.createElement("nav", null,
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                        react_1.default.createElement("img", { className: "logo", src: "./assets/collectio.svg", alt: "Collectio" }))),
                react_1.default.createElement("div", { className: "album" },
                    react_1.default.createElement("div", { className: "hero" },
                        react_1.default.createElement("h4", null, album_1.title),
                        react_1.default.createElement("span", null, album_1.date),
                        react_1.default.createElement("div", { className: "cover", style: { backgroundImage: "url(" + album_1.photos[0].image + ")" } })),
                    react_1.default.createElement("div", { className: "actions" },
                        react_1.default.createElement(react_router_dom_1.Link, { to: {
                                pathname: "/select",
                                state: { album: album_1 }
                            }, className: "add" }, "\u904A\u3093\u3060\u30B2\u30FC\u30E0")),
                    react_1.default.createElement("div", { className: "photos" }, album_1.photos.map(function (photo) {
                        return (react_1.default.createElement(react_router_dom_1.Link, { to: {
                                pathname: "/photo",
                                state: { album: album_1, photo: photo }
                            }, key: photo.image },
                            react_1.default.createElement("div", { className: "photo", style: { backgroundImage: "url(" + photo.image + ")" } })));
                    })))));
        }
        catch (_a) {
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。');
            this.props.history.push('/');
            location.reload();
        }
    };
    return Album;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(Album);
//# sourceMappingURL=Album.js.map