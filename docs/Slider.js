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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_slick_1 = __importDefault(require("react-slick"));
var SimpleSlider = /** @class */ (function (_super) {
    __extends(SimpleSlider, _super);
    function SimpleSlider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleSlider.prototype.render = function () {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            afterChange: this.props.afterChange
        };
        return (react_1.default.createElement(react_slick_1.default, __assign({}, settings), this.props.album.photos.map(function (photo) {
            return (react_1.default.createElement("div", { key: photo.image, className: "photo" },
                react_1.default.createElement("img", { src: photo.image }),
                react_1.default.createElement("span", null, photo.game.title ? photo.game.title : '遊んだゲーム未設定')));
        })));
    };
    return SimpleSlider;
}(react_1.default.Component));
exports.default = SimpleSlider;
//# sourceMappingURL=Slider.js.map