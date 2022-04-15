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
exports.ExplorationScreen = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("@style/Colors");
var Styles_1 = require("@style/Styles");
var react_redux_1 = require("react-redux");
var BottomBar_1 = require("@components/pages/exploration/parts/main/BottomBar");
var header_1 = require("@components/pages/exploration/parts/header");
var ExplorationInfoHelper_1 = require("@core/exploration/ExplorationInfoHelper");
var DataServiceManager_1 = require("@measure/DataServiceManager");
var ExplorationInfo_1 = require("@data-at-hand/core/exploration/ExplorationInfo");
var reducers_1 = require("@state/exploration/data/reducers");
var actions_1 = require("@state/exploration/interaction/actions");
var react_native_elements_1 = require("react-native-elements");
var Sizes_1 = require("@style/Sizes");
var OverviewMainPanel_1 = require("@components/pages/exploration/parts/main/OverviewMainPanel");
var BusyHorizontalIndicator_1 = require("@components/exploration/BusyHorizontalIndicator");
var IntraDayMainPanel_1 = require("@components/pages/exploration/parts/main/IntraDayMainPanel");
var CyclicComparisonMainPanel_1 = require("@components/pages/exploration/parts/main/CyclicComparisonMainPanel");
var MultiRangeComparisonMainPanel_1 = require("@components/pages/exploration/parts/main/MultiRangeComparisonMainPanel");
var FilteredDatesChartMainPanel_1 = require("@components/pages/exploration/parts/main/FilteredDatesChartMainPanel");
var ComparisonInitPanel_1 = require("@components/pages/exploration/parts/main/ComparisonInitPanel");
var TooltipOverlay_1 = require("@components/pages/exploration/parts/main/TooltipOverlay");
var react_native_permissions_1 = require("react-native-permissions");
var GlobalSpeechOverlay_1 = require("@components/pages/exploration/parts/main/GlobalSpeechOverlay");
var react_native_haptic_feedback_1 = require("react-native-haptic-feedback");
var commands_1 = require("@state/speech/commands");
var SvgIcon_1 = require("@components/common/svg/SvgIcon");
var zIndices_1 = require("@components/pages/exploration/parts/zIndices");
var DataBusyOverlay_1 = require("@components/pages/exploration/parts/main/DataBusyOverlay");
var InitialLoadingIndicator_1 = require("@components/pages/exploration/parts/main/InitialLoadingIndicator");
var actions_2 = require("@state/speech/actions");
var SpeechContext_1 = require("@data-at-hand/core/speech/SpeechContext");
var TouchSafeBottomSheet_1 = require("@components/common/TouchSafeBottomSheet");
var rxjs_1 = require("rxjs");
var SpeechEventQueue_1 = require("@core/speech/SpeechEventQueue");
var SpeechEventNotificationOverlay_1 = require("@components/pages/exploration/SpeechEventNotificationOverlay");
var utils_1 = require("@data-at-hand/core/utils");
var contexts_1 = require("./contexts");
var time_1 = require("@data-at-hand/core/utils/time");
var actions_3 = require("@data-at-hand/core/exploration/actions");
var CyclicTimeFrame_1 = require("@data-at-hand/core/exploration/CyclicTimeFrame");
var DataSourceDetailNavigationPanel_1 = require("./parts/main/DataSourceDetailNavigationPanel");
var styles = react_native_1.StyleSheet.create({
    headerContainerStyle: {
        backgroundColor: Colors_1["default"].headerBackground,
        zIndex: zIndices_1.ZIndices.Header,
        elevation: 7
    },
    mainContainerStyle: __assign(__assign({}, Styles_1.StyleTemplates.screenDefaultStyle), { backgroundColor: "#EFEFF4", zIndex: react_native_1.Platform.OS === 'android' ? 50 : undefined }),
    perpareFailedContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    prepareFailedTextStyle: {
        fontSize: Sizes_1.Sizes.normalFontSize,
        fontWeight: '600',
        marginBottom: 20
    },
    historyPanelStyle: {
        position: 'absolute',
        right: Sizes_1.Sizes.horizontalPadding - 4,
        bottom: Sizes_1.Sizes.horizontalPadding,
        flexDirection: 'row', alignItems: 'center',
        justifyContent: 'flex-end'
    },
    historyButtonStyle: {
        borderRadius: 50,
        height: 38, padding: 0,
        backgroundColor: Colors_1["default"].primary + "ee",
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 3,
        paddingLeft: 8,
        paddingRight: 16
    },
    historyButtonContainerStyle: {
        paddingLeft: 4,
        paddingRight: 4
    },
    historyButtonTitleStyle: {
        fontSize: Sizes_1.Sizes.smallFontSize,
        color: Colors_1["default"].WHITE,
        fontWeight: 'bold'
    }
});
var undoIconStyle = react_1["default"].createElement(SvgIcon_1.SvgIcon, { type: SvgIcon_1.SvgIconType.Reset, size: 20, color: Colors_1["default"].WHITE });
var PrepareStatus;
(function (PrepareStatus) {
    PrepareStatus[PrepareStatus["FAILED"] = -1] = "FAILED";
    PrepareStatus[PrepareStatus["INITIAL"] = 0] = "INITIAL";
    PrepareStatus[PrepareStatus["ACQUIRING_PERMISSION"] = 1] = "ACQUIRING_PERMISSION";
    PrepareStatus[PrepareStatus["ACTIVATING_SERVICE"] = 2] = "ACTIVATING_SERVICE";
    PrepareStatus[PrepareStatus["PREPARED"] = 3] = "PREPARED";
})(PrepareStatus || (PrepareStatus = {}));
var ExplorationScreen = /** @class */ (function (_super) {
    __extends(ExplorationScreen, _super);
    function ExplorationScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.comparisonBottomSheetRef = react_1["default"].createRef();
        _this.CompBottomSheetRef = react_1["default"].createRef();
        _this.compBottomSheetRef = react_1["default"].createRef();
        _this.speechUndoButtonRef = react_1["default"].createRef();
        _this.speechFeedbackRef = react_1["default"].createRef();
        _this.undoHideTimeout = null;
        _this.subscriptions = new rxjs_1.Subscription();
        _this.onAppStateChange = function (nextAppState) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.appState.match(/inactive|background/) &&
                            nextAppState === 'active')) return [3 /*break*/, 3];
                        console.log('App has come to the foreground!');
                        if (!(this.state.prepareStatus === PrepareStatus.ACQUIRING_PERMISSION)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.prepare()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        if (this.state.appState === 'active' &&
                            nextAppState.match(/inactive|background/)) {
                            console.log("app came to the background!");
                            this.props.dispatchAbortSpeech();
                        }
                        _a.label = 4;
                    case 4:
                        this.setState({ appState: nextAppState });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onHardwareBackPress = function () {
            if (_this.props.backNavStackSize > 0) {
                _this.props.dispatchCommand(actions_1.goBackAction());
                return true;
            }
            else
                return false;
        };
        _this.onBottomBarButtonPress = function (mode) {
            var _a, _b;
            switch (mode) {
                case ExplorationInfo_1.ExplorationMode.Browse:
                    _this.props.dispatchCommand(actions_1.createGoToBrowseOverviewAction(actions_3.InteractionType.TouchOnly));
                    break;
                case ExplorationInfo_1.ExplorationMode.Compare:
                    (_a = _this.comparisonBottomSheetRef.current) === null || _a === void 0 ? void 0 : _a.open();
                    break;
                default:
                    (_b = _this.CompBottomSheetRef.current) === null || _b === void 0 ? void 0 : _b.open();
            }
        };
        _this.undo = function () {
            console.log("undo speech command");
            _this.props.dispatchCommand(actions_1.createRestorePreviousInfoAction());
        };
        _this.onGlobalSpeechInputPressIn = function () {
            react_native_haptic_feedback_1["default"].trigger("impactHeavy", {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: true
            });
            var sessionId = commands_1.makeNewSessionId();
            _this.props.dispatchSetShowGlobalPopup(true, sessionId);
            _this.props.dispatchStartSpeechSession(sessionId, _this.props.explorationInfo.type);
            _this.setState(__assign(__assign({}, _this.state), { globalSpeechSessionId: sessionId }));
        };
        _this.onGlobalSpeechInputPressOut = function () {
            _this.props.dispatchFinishDictation(_this.state.globalSpeechSessionId);
            _this.props.dispatchSetShowGlobalPopup(false, _this.state.globalSpeechSessionId);
            _this.setState(__assign(__assign({}, _this.state), { globalSpeechSessionId: null }));
        };
        _this.onPressActivateButton = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepare()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            appState: react_native_1.AppState.currentState,
            loadingMessage: null,
            globalSpeechSessionId: null,
            undoIgnored: false,
            prepareStatus: PrepareStatus.INITIAL
        };
        return _this;
    }
    ExplorationScreen.prototype.forwardUserToPermissionSettings = function (title, content) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            react_native_1.Alert.alert(title, content, [
                {
                    text: "Open settings",
                    onPress: function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, react_native_permissions_1.openSettings()];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); }
                }
            ], {
                cancelable: false
            });
        });
    };
    ExplorationScreen.prototype.checkPermission = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a, microphonePermissionStatus, speechRecognitionPermissionStatus, audioRecordPermissionStatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(react_native_1.Platform.OS === 'ios')) return [3 /*break*/, 14];
                        return [4 /*yield*/, Promise.all([react_native_permissions_1.PERMISSIONS.IOS.MICROPHONE, react_native_permissions_1.PERMISSIONS.IOS.SPEECH_RECOGNITION].map(function (p) { return react_native_permissions_1.check(p); }))];
                    case 1:
                        _a = _b.sent(), microphonePermissionStatus = _a[0], speechRecognitionPermissionStatus = _a[1];
                        console.log("micro:", microphonePermissionStatus, "speech:", speechRecognitionPermissionStatus);
                        if (!(microphonePermissionStatus === react_native_permissions_1.RESULTS.GRANTED && speechRecognitionPermissionStatus === react_native_permissions_1.RESULTS.GRANTED)) return [3 /*break*/, 2];
                        console.log("All required permissions are met.");
                        return [2 /*return*/, "granted"];
                    case 2:
                        if (!(microphonePermissionStatus === react_native_permissions_1.RESULTS.BLOCKED && speechRecognitionPermissionStatus === react_native_permissions_1.RESULTS.BLOCKED)) return [3 /*break*/, 4];
                        console.log("Both permissions are blocked.");
                        return [4 /*yield*/, this.forwardUserToPermissionSettings('Permissions required', "Please grant permission for microphone and speech recognition in the settings.")];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, "forwarded"];
                    case 4:
                        if (!(microphonePermissionStatus === react_native_permissions_1.RESULTS.BLOCKED)) return [3 /*break*/, 6];
                        console.log("Microphone permission is blocked.");
                        return [4 /*yield*/, this.forwardUserToPermissionSettings('Microphone permission required', "Please grant permission for the microphone access.")];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, "forwarded"];
                    case 6:
                        if (!(microphonePermissionStatus !== react_native_permissions_1.RESULTS.GRANTED && microphonePermissionStatus !== react_native_permissions_1.RESULTS.UNAVAILABLE)) return [3 /*break*/, 8];
                        return [4 /*yield*/, react_native_permissions_1.request(react_native_permissions_1.PERMISSIONS.IOS.MICROPHONE)];
                    case 7:
                        microphonePermissionStatus = _b.sent();
                        _b.label = 8;
                    case 8:
                        if (!(speechRecognitionPermissionStatus === react_native_permissions_1.RESULTS.BLOCKED)) return [3 /*break*/, 10];
                        console.log("Speech recognition permission is blocked.");
                        return [4 /*yield*/, this.forwardUserToPermissionSettings('Speech recognition permission required', "Please grant permission for speech recognition.")];
                    case 9:
                        _b.sent();
                        return [2 /*return*/, "forwarded"];
                    case 10:
                        if (!(speechRecognitionPermissionStatus !== react_native_permissions_1.RESULTS.GRANTED && speechRecognitionPermissionStatus !== react_native_permissions_1.RESULTS.UNAVAILABLE)) return [3 /*break*/, 12];
                        return [4 /*yield*/, react_native_permissions_1.request(react_native_permissions_1.PERMISSIONS.IOS.SPEECH_RECOGNITION)];
                    case 11:
                        speechRecognitionPermissionStatus = _b.sent();
                        _b.label = 12;
                    case 12:
                        if (microphonePermissionStatus === react_native_permissions_1.RESULTS.GRANTED && speechRecognitionPermissionStatus === react_native_permissions_1.RESULTS.GRANTED) {
                            console.log("All required permissions are met.");
                            return [2 /*return*/, "forwarded"];
                        }
                        else {
                            return [2 /*return*/, this.checkPermission()];
                        }
                        _b.label = 13;
                    case 13: return [3 /*break*/, 20];
                    case 14:
                        if (!(react_native_1.Platform.OS === 'android')) return [3 /*break*/, 20];
                        return [4 /*yield*/, react_native_permissions_1.check(react_native_permissions_1.PERMISSIONS.ANDROID.RECORD_AUDIO)];
                    case 15:
                        audioRecordPermissionStatus = _b.sent();
                        if (!(audioRecordPermissionStatus === react_native_permissions_1.RESULTS.GRANTED)) return [3 /*break*/, 16];
                        return [2 /*return*/, "granted"];
                    case 16:
                        if (!(audioRecordPermissionStatus === react_native_permissions_1.RESULTS.DENIED)) return [3 /*break*/, 18];
                        return [4 /*yield*/, react_native_permissions_1.request(react_native_permissions_1.PERMISSIONS.ANDROID.RECORD_AUDIO)];
                    case 17:
                        audioRecordPermissionStatus = _b.sent();
                        return [2 /*return*/, this.checkPermission()];
                    case 18:
                        if (!(audioRecordPermissionStatus === react_native_permissions_1.RESULTS.BLOCKED)) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.forwardUserToPermissionSettings('Speech recognition permission required', "Please grant permission for speech recognition.")];
                    case 19:
                        _b.sent();
                        return [2 /*return*/, "forwarded"];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    ExplorationScreen.prototype.setPrepareStatus = function (status) {
        this.setState(__assign(__assign({}, this.state), { prepareStatus: status }));
    };
    ExplorationScreen.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Component was mount.");
                        this.subscriptions.add(SpeechEventQueue_1.SpeechEventQueue.instance.onNewEventPushed.subscribe(function (event) {
                            var _a;
                            console.log("notify speech event");
                            (_a = _this.speechFeedbackRef.current) === null || _a === void 0 ? void 0 : _a.notify(event);
                        }, function () {
                        }, function () {
                        }));
                        react_native_1.AppState.addEventListener('change', this.onAppStateChange);
                        react_native_1.BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
                        return [4 /*yield*/, this.prepare()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ExplorationScreen.prototype.prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permissionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setPrepareStatus(PrepareStatus.PREPARED);
                        return [4 /*yield*/, this.checkPermission()];
                    case 1:
                        permissionResult = _a.sent();
                        if (permissionResult === 'granted') {
                            console.log("All permissions are granted. Proceed to activation..");
                            // await this.performServiceActivationPhase()
                        }
                        else if (permissionResult === 'forwarded') {
                            console.log("I will wait the user to return from the permission settings.");
                        }
                        else {
                            this.setPrepareStatus(PrepareStatus.FAILED);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ExplorationScreen.prototype.performServiceActivationPhase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var serviceActivationResult, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setPrepareStatus(PrepareStatus.ACTIVATING_SERVICE);
                        if (!(react_native_1.Platform.OS === 'ios')) return [3 /*break*/, 4];
                        console.log("App is currently not in foregroud. Defer the activation to the app state listener.");
                        _a.label = 1;
                    case 1:
                        if (!(react_native_1.AppState.currentState !== 'active')) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.sleep(100)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        console.log("Okay now the app is in foregroud. Try activation now.");
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, DataServiceManager_1.DataServiceManager.instance.getServiceByKey(this.props.selectedServiceKey).activateInSystem(function (progressInfo) {
                                _this.setState(__assign(__assign({}, _this.state), { loadingMessage: progressInfo.message }));
                            })];
                    case 5:
                        serviceActivationResult = _a.sent();
                        if (serviceActivationResult.success == true) {
                            this.setState(__assign(__assign({}, this.state), { loadingMessage: null }));
                            console.log("activated ", this.props.selectedServiceKey, "successfully.");
                            this.props.dispatchDataReload(this.props.explorationInfo);
                            this.setPrepareStatus(PrepareStatus.PREPARED);
                        }
                        else {
                            console.log("service not activated:", serviceActivationResult.error);
                            this.setPrepareStatus(PrepareStatus.FAILED);
                        }
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.log("service activation error: ", this.props.selectedServiceKey, error_1);
                        this.setPrepareStatus(PrepareStatus.FAILED);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ExplorationScreen.prototype.componentDidUpdate = function (prevProps, prevState) {
        return __awaiter(this, void 0, void 0, function () {
            var dataReloadNeeded, isExplorationInfoChanged;
            var _this = this;
            return __generator(this, function (_a) {
                dataReloadNeeded = false;
                isExplorationInfoChanged = ExplorationInfoHelper_1.explorationInfoHelper.equals(prevProps.explorationInfo, this.props.explorationInfo) === false;
                if (this.props.explorationInfo.type !== prevProps.explorationInfo.type || isExplorationInfoChanged === true) {
                    if (this.state.prepareStatus === PrepareStatus.PREPARED) {
                        dataReloadNeeded = true;
                    }
                }
                if (this.props.selectedServiceKey !== prevProps.selectedServiceKey) {
                    dataReloadNeeded = true;
                    if (this.state.prepareStatus === PrepareStatus.FAILED) {
                        this.setState(__assign(__assign({}, this.state), { prepareStatus: PrepareStatus.PREPARED }));
                    }
                }
                if (dataReloadNeeded === true) {
                    console.log("should reload data");
                    this.props.dispatchDataReload(this.props.explorationInfo);
                }
                if (isExplorationInfoChanged === true && this.props.isUndoAvailable) {
                    //new undoable condition
                    requestAnimationFrame(function () {
                        _this.setState(__assign(__assign({}, _this.state), { undoIgnored: false }));
                        if (_this.undoHideTimeout) {
                            clearTimeout(_this.undoHideTimeout);
                        }
                        _this.undoHideTimeout = setTimeout(function () {
                            _this.setState(__assign(__assign({}, _this.state), { undoIgnored: true })),
                                _this.undoHideTimeout = null;
                        }, 8000);
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    ExplorationScreen.prototype.componentWillUnmount = function () {
        react_native_1.AppState.removeEventListener('change', this.onAppStateChange);
        react_native_1.BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBackPress);
        this.subscriptions.unsubscribe();
    };
    ExplorationScreen.prototype.render = function () {
        var _this = this;
        return react_1["default"].createElement(contexts_1.TodayContext.Provider, { value: time_1.DateTimeHelper.toNumberedDateFromDate(new Date()) },
            react_1["default"].createElement(react_native_1.View, { style: Styles_1.StyleTemplates.screenDefaultStyle },
                react_1["default"].createElement(react_native_1.StatusBar, { barStyle: "light-content", backgroundColor: Colors_1["default"].headerBackground }),
                react_1["default"].createElement(react_native_1.View, { style: styles.headerContainerStyle },
                    react_1["default"].createElement(header_1.ExplorationViewHeader, null)),
                this.state.prepareStatus === PrepareStatus.FAILED ? react_1["default"].createElement(react_native_1.View, { style: [styles.mainContainerStyle, styles.perpareFailedContainerStyle] },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.prepareFailedTextStyle }, "Activate to use Data@Hand."),
                    react_1["default"].createElement(react_native_elements_1.Button, { type: "outline", title: "Activate Again", onPress: this.onPressActivateButton })) : react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(react_native_1.View, { style: styles.mainContainerStyle },
                        this.props.isDataLoading === true && react_1["default"].createElement(BusyHorizontalIndicator_1.BusyHorizontalIndicator, null),
                        this.props.loadedDataInfo != null ?
                            this.makeMainPanel(this.props.loadedDataInfo.type) : react_1["default"].createElement(react_1["default"].Fragment, null),
                        this.props.isUndoAvailable === true && this.state.undoIgnored === false && react_1["default"].createElement(react_native_1.View, { style: styles.historyPanelStyle },
                            react_1["default"].createElement(react_native_elements_1.Button, { ref: this.speechUndoButtonRef, key: "undo", containerStyle: styles.historyButtonContainerStyle, buttonStyle: styles.historyButtonStyle, icon: undoIconStyle, onPress: this.undo, title: "Undo speech", titleStyle: styles.historyButtonTitleStyle }))),
                    react_1["default"].createElement(BottomBar_1.BottomBar, { mode: ExplorationInfoHelper_1.explorationInfoHelper.getMode(this.props.explorationInfo), onModePress: this.onBottomBarButtonPress, onVoiceButtonPressIn: this.onGlobalSpeechInputPressIn, onVoiceButtonPressOut: this.onGlobalSpeechInputPressOut }),
                    react_1["default"].createElement(TouchSafeBottomSheet_1.TouchSafeBottomSheet, { ref: this.comparisonBottomSheetRef },
                        react_1["default"].createElement(ComparisonInitPanel_1.ComparisonInitPanel, { info: this.props.explorationInfo, onCompleted: function () { var _a; (_a = _this.comparisonBottomSheetRef.current) === null || _a === void 0 ? void 0 : _a.close(); } })),
                    react_1["default"].createElement(TooltipOverlay_1.TooltipOverlay, null),
                    react_1["default"].createElement(GlobalSpeechOverlay_1.GlobalSpeechOverlay, { isGlobalSpeechButtonPressed: this.props.showGlobalSpeechPopup }),
                    react_1["default"].createElement(DataBusyOverlay_1.DataBusyOverlay, { isBusy: this.props.isDataLoading === true || this.state.prepareStatus !== PrepareStatus.PREPARED }),
                    this.state.prepareStatus !== PrepareStatus.PREPARED ? react_1["default"].createElement(InitialLoadingIndicator_1.InitialLoadingIndicator, { loadingMessage: this.state.loadingMessage }) : react_1["default"].createElement(react_1["default"].Fragment, null),
                    react_1["default"].createElement(SpeechEventNotificationOverlay_1.SpeechEventNotificationOverlay, { ref: this.speechFeedbackRef }))));
    };
    ExplorationScreen.prototype.makeMainPanel = function (type) {
        switch (type) {
            case ExplorationInfo_1.ExplorationType.B_Overview:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.B_Overview ");
                return react_1["default"].createElement(OverviewMainPanel_1.OverviewMainPanel, null);
            case ExplorationInfo_1.ExplorationType.B_Range:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.B_Range ");
                return react_1["default"].createElement(DataSourceDetailNavigationPanel_1.DataSourceDetailNavigationPanel, null);
            case ExplorationInfo_1.ExplorationType.B_Day:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.B_Day ");
                return IntraDayMainPanel_1.getIntraDayMainPanel(this.props.loadedDataInfo);
            case ExplorationInfo_1.ExplorationType.C_Cyclic:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.C_Cyclic ");
                return react_1["default"].createElement(CyclicComparisonMainPanel_1.CyclicComparisonMainPanel, null);
            case ExplorationInfo_1.ExplorationType.C_TwoRanges:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.C_TwoRanges ");
                return react_1["default"].createElement(MultiRangeComparisonMainPanel_1.MultiRangeComparisonMainPanel, null);
            case ExplorationInfo_1.ExplorationType.C_CyclicDetail_Range:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.C_CyclicDetail_Range ");
                return react_1["default"].createElement(MultiRangeComparisonMainPanel_1.MultiRangeComparisonMainPanel, { noDataMessageOverride: "No data exist. Please check whether the current range includes <b>" + CyclicTimeFrame_1.getCycleDimensionSpec(ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(this.props.loadedDataInfo, ExplorationInfo_1.ParameterType.CycleDimension)).name + "</b>." });
            case ExplorationInfo_1.ExplorationType.C_CyclicDetail_Daily:
                console.log("&&& In ExplorationScreen.tsx - makeMainPanel() - in the case of ExplorationType.C_CyclicDetail_Daily ");
                return react_1["default"].createElement(FilteredDatesChartMainPanel_1.FilteredDatesChartMainPanel, null);
        }
    };
    return ExplorationScreen;
}(react_1["default"].PureComponent));
function mapDispatchToProps(dispatch, ownProps) {
    return __assign(__assign({}, ownProps), { dispatchCommand: function (command) { return dispatch(command); }, dispatchDataReload: function (info) { return dispatch(reducers_1.startLoadingForInfo(info)); }, dispatchStartSpeechSession: function (sessionId, currentExplorationType) { return dispatch(commands_1.startSpeechSession(sessionId, SpeechContext_1.SpeechContextHelper.makeGlobalContext(currentExplorationType))); }, dispatchFinishDictation: function (sessionId) { return dispatch(commands_1.requestStopDictation(sessionId)); }, dispatchSetShowGlobalPopup: function (value, sessionId) { return dispatch(actions_2.createSetShowGlobalPopupAction(value, sessionId)); }, dispatchAbortSpeech: function () { return dispatch(commands_1.abortAll()); } });
}
function mapStateToProps(appState, ownProps) {
    return __assign(__assign({}, ownProps), { explorationInfo: appState.explorationState.info, backNavStackSize: appState.explorationState.backNavStack.length, isUndoAvailable: appState.explorationState.prevInfo != null, loadedDataInfo: appState.explorationDataState.info, isDataLoading: appState.explorationDataState.isBusy, selectedServiceKey: appState.settingsState.serviceKey, showGlobalSpeechPopup: appState.speechRecognizerState.showGlobalPopup });
}
var explorationScreen = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ExplorationScreen);
exports.ExplorationScreen = explorationScreen;
