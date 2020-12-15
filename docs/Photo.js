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
var Photo = /** @class */ (function (_super) {
    __extends(Photo, _super);
    function Photo(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Photo.prototype.render = function () {
        return null;
    };
    return Photo;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(Photo);
//# sourceMappingURL=Photo.js.map