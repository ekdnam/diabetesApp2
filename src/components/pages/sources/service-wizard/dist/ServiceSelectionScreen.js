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
var react_native_sqlite_storage_1 = require("react-native-sqlite-storage");
var DateRangeBar_1 = require("@components/exploration/DateRangeBar");
var ExplorationInfo_1 = require("@data-at-hand/core/exploration/ExplorationInfo");
var react_redux_2 = require("react-redux");
var react_2 = require("react");
var ExplorationInfoHelper_1 = require("@core/exploration/ExplorationInfoHelper");
var actions_3 = require("@state/exploration/interaction/actions");
var commands_1 = require("@state/speech/commands");
var SpeechContext_1 = require("@data-at-hand/core/speech/SpeechContext");
var actions_4 = require("@state/speech/actions");
// TouchableOpacity.defaultProps = { activeOpacity: 0.8 };
// const AppButton = ({ onPress: any, title: any }) => (
//   <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
//     <Text style={styles.appButtonText}>{title}</Text>
//   </TouchableOpacity>
// );
var HeaderRangeBar = react_1["default"].memo(function (props) {
    var explorationInfo = react_redux_2.useSelector(function (appState) { return appState.explorationState.info; });
    var dispatch = react_redux_2.useDispatch();
    var _a = react_2.useState(null), speechSessionId = _a[0], setSpeechSessionId = _a[1];
    var range = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(explorationInfo, ExplorationInfo_1.ParameterType.Range, props.parameterKey);
    var onRangeChanged = react_2.useCallback(function (from, to, xType, xContext) {
        dispatch(actions_3.createSetRangeAction(xType, xContext, [from, to], props.parameterKey));
    }, [dispatch, props.parameterKey]);
    var onLongPressIn = react_2.useCallback(function (position) {
        var sessionId = commands_1.makeNewSessionId();
        setSpeechSessionId(sessionId);
        dispatch(commands_1.startSpeechSession(sessionId, SpeechContext_1.SpeechContextHelper.makeTimeSpeechContext(position, props.parameterKey)));
        dispatch(actions_4.createSetShowGlobalPopupAction(true, sessionId));
    }, [dispatch, setSpeechSessionId, props.parameterKey]);
    var onLongPressOut = react_2.useCallback(function () {
        if (speechSessionId != null) {
            console.log("request stop dictation");
            dispatch(commands_1.requestStopDictation(speechSessionId));
            dispatch(actions_4.createSetShowGlobalPopupAction(false, speechSessionId));
        }
        setSpeechSessionId(null);
    }, [dispatch, speechSessionId, setSpeechSessionId]);
    return react_1["default"].createElement(DateRangeBar_1.DateRangeBar, { from: range && range[0], to: range && range[1], onRangeChanged: onRangeChanged, onLongPressIn: onLongPressIn, onLongPressOut: onLongPressOut, showBorder: props.showBorder });
});
var HeaderDateBar = react_1["default"].memo(function () {
    var _a = react_2.useState(null), speechSessionId = _a[0], setSpeechSessionId = _a[1];
    var explorationInfo = react_redux_2.useSelector(function (appState) { return appState.explorationState.info; });
    var dispatch = react_redux_2.useDispatch();
    var todayDate = new Date();
    // const date = explorationInfoHelper.getParameterValue<number>(explorationInfo, ParameterType.Date)!
    var date = parseInt(todayDate.toISOString().split('T')[0].replaceAll('-', ''));
    var onDateChanged = react_2.useCallback(function (date, interactionType, interactionContext) {
        dispatch(actions_3.setDateAction(interactionType, interactionContext, date));
    }, [dispatch]);
    var onLongPressIn = react_2.useCallback(function () {
        var newSessionId = commands_1.makeNewSessionId();
        dispatch(actions_4.createSetShowGlobalPopupAction(true, newSessionId));
        dispatch(commands_1.startSpeechSession(newSessionId, SpeechContext_1.SpeechContextHelper.makeTimeSpeechContext('date')));
        setSpeechSessionId(newSessionId);
    }, [dispatch, setSpeechSessionId]);
    var onLongPressOut = react_2.useCallback(function () {
        if (speechSessionId != null) {
            dispatch(actions_4.createSetShowGlobalPopupAction(false, speechSessionId));
            dispatch(commands_1.requestStopDictation(speechSessionId));
        }
        setSpeechSessionId(null);
    }, [speechSessionId, setSpeechSessionId, dispatch]);
    return react_1["default"].createElement(DateRangeBar_1.DateBar, { date: date, onDateChanged: onDateChanged, onLongPressIn: onLongPressIn, onLongPressOut: onLongPressOut });
});
var ServiceSelectionScreen = /** @class */ (function (_super) {
    __extends(ServiceSelectionScreen, _super);
    function ServiceSelectionScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            services: [],
            isLoading: false,
            loadingMessage: null,
            text: '',
            userDate: ''
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
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch'
            } },
            react_1["default"].createElement(react_native_1.TextInput, { style: {
                    borderWidth: 1,
                    margin: 12,
                    height: 50,
                    padding: 10,
                    borderColor: '#183059',
                    borderRadius: 8
                }, placeholder: "Enter BG level here", onChangeText: function (text) { return _this.setState({ text: text }); }, value: this.state.text }),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () {
                    console.log(_this.state.text);
                    var x = "Your BG level is " + _this.state.text;
                    react_native_1.Alert.alert(x);
                    insertRecordToDB(_this.state.text);
                }, style: {
                    margin: 12,
                    backgroundColor: '#276fbf',
                    padding: 12,
                    borderRadius: 10
                } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.appButtonText }, "Submit")),
            react_1["default"].createElement(react_native_1.TextInput, { style: {
                    // borderStartWidth : 0,
                    // borderEndWidth : 0,
                    // borderTopWidth : 0,
                    // borderLeftWidth : 1,
                    // borderRightWidth: 3,
                    // borderBottomWidth : 4,
                    borderWidth: 1,
                    margin: 12,
                    height: 50,
                    padding: 10,
                    borderColor: '#183059',
                    borderRadius: 8
                }, placeholder: "Enter date here (YYYY-MM-DD)", onChangeText: function (userDate) { return _this.setState({ userDate: userDate }); }, value: this.state.userDate }),
            react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () {
                    console.log(_this.state.userDate);
                    var x = "Your BG level is " + _this.state.text;
                    var y = 'Your date: ' + _this.state.userDate;
                    react_native_1.Alert.alert(x);
                    react_native_1.Alert.alert(y);
                    insertRecordToDBWithDate(_this.state.text, _this.state.userDate);
                }, style: {
                    margin: 12,
                    backgroundColor: '#276fbf',
                    padding: 12,
                    borderRadius: 10
                } },
                react_1["default"].createElement(react_native_1.Text, { style: styles.appButtonText }, "Submit with Date")),
            react_1["default"].createElement(HeaderDateBar, null),
            this.state.isLoading === true ? (react_1["default"].createElement(InitialLoadingIndicator_1.InitialLoadingIndicator, { loadingMessage: this.state.loadingMessage })) : null));
    };
    return ServiceSelectionScreen;
}(react_1["default"].Component));
function openDB() {
    console.log("try open the database:");
    _dbInitPromise = react_native_sqlite_storage_1["default"].openDatabase({ name: 'fitbit-local-cache.sqlite' })
        .then(function (db) {
        console.log("db opened.");
        return db
            .transaction(function (tx) {
        }).then(function (tx) { return db; });
    });
    return _dbInitPromise;
}
var insertRecordToDB = function (bgvalue) { return __awaiter(void 0, void 0, void 0, function () {
    var todayDate, dayOfWeek, month, numberedDate, year, bgValueAsNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                todayDate = new Date();
                dayOfWeek = todayDate.getDay();
                console.log("dayOfWeek: " + dayOfWeek + "| type: " + typeof (dayOfWeek));
                month = todayDate.getMonth();
                // console.log(typeof(month));
                console.log("month: " + month + "| type: " + typeof (month));
                numberedDate = parseInt(todayDate.toISOString().split('T')[0].replaceAll('-', ''));
                console.log("numberedDate: " + numberedDate + "| type: " + typeof (numberedDate));
                year = todayDate.getFullYear();
                console.log("year: " + year + "| type: " + typeof (year));
                bgValueAsNumber = parseInt(bgvalue);
                console.log("bgValueAsNumber: " + bgValueAsNumber + "| type: " + typeof (bgValueAsNumber));
                return [4 /*yield*/, openDB()];
            case 1: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [dayOfWeek, month, numberedDate, bgValueAsNumber, year])
                // await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220320, 120, 2022])
            ];
            case 2:
                _a.sent();
                // await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220320, 120, 2022])
                console.log('data inserted to database');
                return [2 /*return*/];
        }
    });
}); };
var insertRecordToDBWithDate = function (bgvalue, userDate) { return __awaiter(void 0, void 0, void 0, function () {
    var dateSplits, ourYear, ourMonth, ourDay, ourDate, dayOfWeek, month, numberedDate, year, bgValueAsNumber;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dateSplits = userDate.split('-');
                ourYear = parseInt(dateSplits[0]);
                ourMonth = parseInt(dateSplits[1]);
                ourDay = parseInt(dateSplits[2]);
                ourDate = new Date(ourYear, ourMonth - 1, ourDay);
                console.log(ourDate);
                dayOfWeek = ourDate.getDay();
                console.log("dayOfWeek: " + dayOfWeek + "| type: " + typeof (dayOfWeek));
                month = ourDate.getMonth();
                // console.log(typeof(month));
                console.log("month: " + month + "| type: " + typeof (month));
                numberedDate = parseInt(ourDate.toISOString().split('T')[0].replaceAll('-', ''));
                console.log("numberedDate: " + numberedDate + "| type: " + typeof (numberedDate));
                year = ourDate.getFullYear();
                console.log("year: " + year + "| type: " + typeof (year));
                bgValueAsNumber = parseInt(bgvalue);
                console.log("bgValueAsNumber: " + bgValueAsNumber + "| type: " + typeof (bgValueAsNumber));
                return [4 /*yield*/, openDB()];
            case 1: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [dayOfWeek, month, numberedDate, bgValueAsNumber, year])
                // await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220320, 120, 2022])
            ];
            case 2:
                _a.sent();
                // await (await openDB()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220320, 120, 2022])
                console.log('data inserted to database');
                return [2 /*return*/];
        }
    });
}); };
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
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { disabled: props.selectedAlready, style: {
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
            props.selectedAlready === true ? (react_1["default"].createElement(react_native_1.View, { style: {
                    position: 'absolute',
                    right: 12,
                    top: 8,
                    backgroundColor: Colors_1["default"].accent,
                    borderRadius: 12,
                    padding: 4,
                    paddingLeft: 8,
                    paddingRight: 8
                } },
                react_1["default"].createElement(react_native_1.Text, { style: {
                        fontSize: Sizes_1.Sizes.descriptionFontSize,
                        fontWeight: 'bold',
                        color: Colors_1["default"].WHITE
                    } }, "Already Selected"))) : (react_1["default"].createElement(react_1["default"].Fragment, null)))));
};
var styles = react_native_1.StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});