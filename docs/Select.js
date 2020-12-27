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
var fetch_jsonp_1 = __importDefault(require("fetch-jsonp"));
var Slider_1 = __importDefault(require("./Slider"));
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(props) {
        var _this = _super.call(this, props) || this;
        _this.textInput = null;
        try {
            var album = _this.props.location.state.album;
            _this.state = {
                index: 0,
                loading: false,
                album: album,
                suggests: [],
                histories: []
            };
        }
        catch (_a) {
            _this.props.history.push('/');
            location.reload();
            alert('ホームに戻ります。\n理由:ブラウザのリロード、フリック操作での戻るなど。');
        }
        return _this;
    }
    Select.prototype.componentDidMount = function () {
        if (this.textInput) {
            this.textInput.addEventListener('focus', function () {
                scrollTo(0, 140);
            });
            this.textInput.focus();
        }
    };
    Select.prototype.setTextInputRef = function (element) {
        this.textInput = element;
    };
    Select.prototype.hiraToKana = function (str) {
        return str.replace(/[\u3041-\u3096]/g, function (match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    };
    Select.prototype.onSearch = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var query, games, suggests, mergedSuggests, suggest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        event.preventDefault();
                        query = this.textInput.value;
                        if (query === '')
                            return [2 /*return*/, this.setState({ suggests: [] })];
                        return [4 /*yield*/, this.search(query)];
                    case 1:
                        games = _a.sent();
                        this.setState({ loading: true });
                        if (!(games.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.search(this.hiraToKana(query))];
                    case 2:
                        games = _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.suggest(query)];
                    case 4:
                        suggests = _a.sent();
                        this.setState({ loading: false });
                        mergedSuggests = games.concat(suggests);
                        if (mergedSuggests.length === 0) {
                            suggest = { title: query };
                            mergedSuggests = [suggest];
                        }
                        this.setState({ suggests: mergedSuggests });
                        return [2 /*return*/];
                }
            });
        });
    };
    Select.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var r, suggests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("https://db-api-mxiq5qapta-an.a.run.app/search?q=" + encodeURIComponent(query)).then(function (r) { return r.json(); })];
                    case 1:
                        r = _a.sent();
                        suggests = [];
                        r.map(function (game) {
                            suggests.push(game);
                        });
                        return [2 /*return*/, suggests];
                }
            });
        });
    };
    Select.prototype.suggest = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var s, suggests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch_jsonp_1.default("https://www.google.com/complete/search?hl=ja&client=firefox&q=" + encodeURIComponent(query)).then(function (r) { return r.json(); })];
                    case 1:
                        s = _a.sent();
                        suggests = [];
                        s[1].map(function (suggest) {
                            var data = {
                                title: suggest,
                            };
                            suggests.push(data);
                        });
                        return [2 /*return*/, suggests];
                }
            });
        });
    };
    Select.prototype.selectSuggest = function (suggest) {
        this.state.album.photos[this.state.index].game.title = suggest.title;
        this.state.histories.unshift(suggest);
        this.setState({ suggests: [] });
        this.textInput.value = '';
    };
    Select.prototype.selectHistory = function (history) {
        this.state.album.photos[this.state.index].game.title = history.title;
        this.setState({ suggests: [] });
        this.textInput.value = '';
    };
    Select.prototype.afterChange = function (index) {
        this.setState({ index: index });
    };
    Select.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement("div", { id: "select" },
            react_1.default.createElement("nav", null,
                react_1.default.createElement(react_router_dom_1.Link, { to: {
                        pathname: "/album",
                        state: { album: this.state.album }
                    }, className: "close" },
                    react_1.default.createElement("img", { src: "./assets/close.svg" })),
                react_1.default.createElement(react_router_dom_1.Link, { to: "/" },
                    react_1.default.createElement("img", { className: "logo", src: "./assets/collectio.svg", alt: "Collectio" }))),
            react_1.default.createElement("form", { action: "", onSubmit: this.onSearch.bind(this) },
                react_1.default.createElement("div", { className: "bg" },
                    react_1.default.createElement("input", { type: "text", ref: this.setTextInputRef.bind(this), placeholder: "\u30B2\u30FC\u30E0\u3092\u691C\u7D22", onChange: this.onSearch.bind(this) }),
                    this.state.histories.length > 0 ? (react_1.default.createElement("div", { className: "histories" },
                        react_1.default.createElement("div", null, this.state.histories.map(function (history, i) {
                            return react_1.default.createElement("div", { key: 'history' + i, onClick: _this.selectHistory.bind(_this, history) }, history.title);
                        })))) : null),
                this.state.suggests.length === 0 && this.state.loading ? (react_1.default.createElement("div", { className: "suggests" }, "\u8AAD\u307F\u8FBC\u307F\u4E2D...")) : null,
                this.state.suggests.length > 0 ? (react_1.default.createElement("div", { className: "suggests" }, this.state.suggests.slice(0, 100).map(function (suggest, i) {
                    return react_1.default.createElement("div", { key: 'suggest' + i, onClick: _this.selectSuggest.bind(_this, suggest) }, suggest.title);
                }))) : null),
            react_1.default.createElement(Slider_1.default, { album: this.state.album, afterChange: this.afterChange.bind(this) })));
    };
    return Select;
}(react_1.default.Component));
exports.default = react_router_dom_1.withRouter(Select);
//# sourceMappingURL=Select.js.map