"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
exports.__esModule = true;
exports.ServiceSelectionScreen = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Sizes_1 = require("@style/Sizes");
var Styles_1 = require("@style/Styles");
var DataServiceManager_1 = require("@measure/DataServiceManager");
var Colors_1 = require("@style/Colors");
var react_redux_1 = require("react-redux");
var actions_1 = require("@state/settings/actions");
var InitialLoadingIndicator_1 = require("@components/pages/exploration/parts/main/InitialLoadingIndicator");
var actions_2 = require("@state/exploration/interaction/actions");
var ServiceSelectionScreen = /** @class */ (function (_super) {
    __extends(ServiceSelectionScreen, _super);
    function ServiceSelectionScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            services: [],
            isLoading: false,
            loadingMessage: null
        };
        return _this;
    }
    ServiceSelectionScreen.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var supportedServices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DataServiceManager_1.DataServiceManager.instance.getServicesSupportedInThisSystem()];
                    case 1:
                        supportedServices = _a.sent();
                        this.setState(__assign(__assign({}, this.state), { services: supportedServices }));
                        return [2 /*return*/];
                }
            });
        });
    };
    ServiceSelectionScreen.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: {
                flex: 1, flexDirection: 'column', alignItems: 'stretch'
            } },
            react_1["default"].createElement(react_native_1.ScrollView, { style: { flex: 1 } }, this.state.services
                .map(function (service, index) { return react_1["default"].createElement(ServiceElement, { key: service.key, index: index, selectedAlready: _this.props.selectedServiceKey === service.key, source: service, onSelected: function () { return __awaiter(_this, void 0, void 0, function () {
                    var activationResult, err_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(this.props.selectedServiceKey != service.key)) return [3 /*break*/, 5];
                                console.log("start loading");
                                react_native_1.InteractionManager.runAfterInteractions(function () {
                                });
                                requestAnimationFrame(function () {
                                    _this.setState(__assign(__assign({}, _this.state), { isLoading: true }));
                                });
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, 4, 5]);
                                console.log("start activation of new service..");
                                return [4 /*yield*/, DataServiceManager_1.DataServiceManager.instance.getServiceByKey(service.key).activateInSystem(function (progressInfo) {
                                        _this.setState(__assign(__assign({}, _this.state), { loadingMessage: progressInfo.message }));
                                    })];
                            case 2:
                                activationResult = _a.sent();
                                console.log("finished the activation of new service.");
                                if (activationResult.success === true) {
                                    //await DataServiceManager.instance.getServiceByKey(this.props.selectedServiceKey).deactivatedInSystem()
                                    this.props.selectService(service.key);
                                }
                                return [3 /*break*/, 5];
                            case 3:
                                err_1 = _a.sent();
                                console.error("Failed to sign in to ", service.key, err_1);
                                return [3 /*break*/, 5];
                            case 4:
                                console.log("finish loading");
                                this.setState(__assign(__assign({}, this.state), { isLoading: false, loadingMessage: null }));
                                this.props.navigation.goBack();
                                return [7 /*endfinally*/];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); } }); })),
            this.state.isLoading === true ? react_1["default"].createElement(InitialLoadingIndicator_1.InitialLoadingIndicator, { loadingMessage: this.state.loadingMessage }) : null));
    };
    return ServiceSelectionScreen;
}(react_1["default"].Component));
function mapStateToPropsScreen(appState, ownProps) {
    return __assign(__assign({}, ownProps), { selectedServiceKey: appState.settingsState.serviceKey });
}
var getTodayNew = function () {
    return new Date();
};
function mapDispatchToPropsScreen(dispatch, ownProps) {
    return __assign(__assign({}, ownProps), { selectService: function (key) {
            dispatch(actions_1.setService(key));
            dispatch(actions_2.resetAction(getTodayNew()));
        } });
}
var connectedServiceSelectionScreen = react_redux_1.connect(mapStateToPropsScreen, mapDispatchToPropsScreen)(ServiceSelectionScreen);
exports.ServiceSelectionScreen = connectedServiceSelectionScreen;
var ServiceElement = function (props) {
    return react_1["default"].createElement(react_native_1.TouchableOpacity, { disabled: props.selectedAlready, style: {
            marginTop: 24,
            marginRight: 20,
            marginLeft: 20
        }, activeOpacity: 0.3, onPress: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                props.onSelected();
                return [2 /*return*/];
            });
        }); } },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.ImageBackground, { style: {
                    justifyContent: 'center',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    aspectRatio: 2.5 / 1,
                    opacity: props.selectedAlready === true ? 0.5 : 1
                }, imageStyle: { borderRadius: 12 }, source: props.source.thumbnail },
                react_1["default"].createElement(react_native_1.Text, { style: __assign(__assign({}, Styles_1.StyleTemplates.titleTextStyle), { fontSize: 36, alignContent: 'center', fontWeight: '600', color: Colors_1["default"].WHITE }) }, props.source.name)),
            props.selectedAlready === true ?
                (react_1["default"].createElement(react_native_1.View, { style: { position: 'absolute', right: 12, top: 8, backgroundColor: Colors_1["default"].accent, borderRadius: 12, padding: 4, paddingLeft: 8, paddingRight: 8 } },
                    react_1["default"].createElement(react_native_1.Text, { style: { fontSize: Sizes_1.Sizes.descriptionFontSize, fontWeight: 'bold', color: Colors_1["default"].WHITE } }, "Already Selected"))) : (react_1["default"].createElement(react_1["default"].Fragment, null))));
};
