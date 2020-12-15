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
        var album = this.props.location.state.album;
        return (react_1.default.createElement("div", { id: "album" },
            react_1.default.createElement("nav", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                    react_1.default.createElement("img", { className: "logo", src: "./assets/collectio.svg", alt: "Collectio" }))),
            react_1.default.createElement("div", { className: "album" },
                react_1.default.createElement("div", { className: "hero" },
                    react_1.default.createElement("h4", null, album.title),
                    react_1.default.createElement("span", null, album.date),
                    react_1.default.createElement("div", { className: "cover", style: { backgroundImage: "url(" + album.photos[0].image + ")" } })),
                react_1.default.createElement("div", { className: "actions" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: "/select" },
                        react_1.default.createElement("span", { className: "add" }, "\u904A\u3093\u3060\u30B2\u30FC\u30E0"))),
                react_1.default.createElement("div", { className: "photos" }, album.photos.map(function (photo) {
                    return (react_1.default.createElement(react_router_dom_1.Link, { to: {
                            pathname: "/photo",
                            state: { photo: photo }
                        } },
                        react_1.default.createElement("div", { key: photo.image, className: "photo", style: { backgroundImage: "url(" + photo.image + ")" } })));
                })))));
    };
    return Album;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(Album);
//# sourceMappingURL=Album.js.map