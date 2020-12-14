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
var Home_1 = __importDefault(require("./Home"));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            albums: []
        };
        return _this;
    }
    App.prototype.setAlbums = function (album) {
        this.state.albums.push(album);
        this.setState({});
    };
    App.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement("nav", null,
                react_1.default.createElement("ul", null,
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/about" }, "About")),
                    react_1.default.createElement("li", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/users" }, "Users")))),
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: function () { return react_1.default.createElement(Home_1.default, { albums: _this.state.albums, setAlbums: _this.setAlbums.bind(_this) }); } }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/about" }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/users" }, "Users"))));
    };
    return App;
}(react_1.default.Component));
exports.default = App;
//# sourceMappingURL=App.js.map