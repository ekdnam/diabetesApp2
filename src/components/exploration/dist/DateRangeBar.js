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
exports.DateBar = exports.DateRangeBar = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Colors_1 = require("@style/Colors");
var SpeechAffordanceIndicator_1 = require("./SpeechAffordanceIndicator");
var Sizes_1 = require("@style/Sizes");
var react_native_dash_1 = require("react-native-dash");
var date_fns_1 = require("date-fns");
var CalendarPickers_1 = require("@components/common/CalendarPickers");
var time_1 = require("@data-at-hand/core/utils/time");
var SwipedFeedback_1 = require("@components/common/SwipedFeedback");
var BottomSheet_1 = require("@components/common/BottomSheet");
var react_native_haptic_feedback_1 = require("react-native-haptic-feedback");
var react_redux_1 = require("react-redux");
var DataServiceManager_1 = require("@measure/DataServiceManager");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Animations_1 = require("@components/common/Animations");
var react_native_wheel_picker_android_1 = require("react-native-wheel-picker-android");
var Styles_1 = require("@style/Styles");
var utils_1 = require("@data-at-hand/core/utils");
var react_native_elements_1 = require("react-native-elements");
var actions_1 = require("@data-at-hand/core/exploration/actions");
var pluralize_1 = require("pluralize");
var dateButtonWidth = Sizes_1.sizeByScreen(140, 130);
var barHeight = Sizes_1.sizeByScreen(60, 54);
var dateButtonSubTextStyle = {
    marginTop: 2,
    fontSize: Sizes_1.Sizes.tinyFontSize,
    color: '#B8BAC0'
};
var conatinerStyleBase = {
    alignSelf: 'stretch',
    backgroundColor: "#00000025",
    height: barHeight,
    flexDirection: 'row',
    justifyContent: 'center'
};
var dateButtonDateTextStyleBase = {
    fontSize: Sizes_1.Sizes.normalFontSize,
    color: Colors_1["default"].WHITE,
    fontWeight: '600',
    marginRight: 4
};
var styles = react_native_1.StyleSheet.create({
    containerStyle: conatinerStyleBase,
    conatainerWithBorder: __assign(__assign({}, conatinerStyleBase), { borderBottomColor: '#ffffff30', borderBottomWidth: 1 }),
    dateButtonContainerStyle: {
        height: barHeight,
        justifyContent: 'center',
        alignItems: 'center',
        width: dateButtonWidth
    },
    dateButtonContainerStyleFreeWidth: {
        height: barHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: Sizes_1.Sizes.horizontalPadding,
        paddingLeft: Sizes_1.Sizes.horizontalPadding
    },
    dateButtonDatePartStyle: {
        flexDirection: 'row'
    },
    dateButtonDateTextStyle: dateButtonDateTextStyleBase,
    dateButtonDateTextStyleLight: __assign(__assign({}, dateButtonDateTextStyleBase), { color: Colors_1["default"].textColorLight, fontWeight: '500' }),
    midViewDescriptionTextStyle: __assign(__assign({}, dateButtonSubTextStyle), { marginBottom: 2 }),
    dateButtonIndicatorContainerStyle: {
        position: 'absolute', right: -5, top: -2
    },
    midViewContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dashViewStyle: {
        alignSelf: 'stretch',
        marginTop: -Sizes_1.Sizes.normalFontSize
    },
    dashLineStyle: {
        borderRadius: 100, overflow: 'hidden'
    },
    midViewFooterContainerStyle: {
        position: 'absolute',
        bottom: 10
    },
    periodButtonStyle: {
        backgroundColor: Colors_1["default"].speechAffordanceColorText,
        borderRadius: 100,
        paddingLeft: Sizes_1.sizeByScreen(12, 9),
        paddingRight: Sizes_1.sizeByScreen(12, 9),
        paddingTop: 2,
        paddingBottom: 2
    },
    periodButtonTitleStyle: {
        fontSize: Sizes_1.Sizes.tinyFontSize,
        color: Colors_1["default"].headerBackgroundDarker,
        fontWeight: 'bold'
    },
    yearPopupButtonStyle: { alignSelf: 'flex-end', marginRight: Sizes_1.Sizes.horizontalPadding }
});
var DateRangeBar = /** @class */ (function (_super) {
    __extends(DateRangeBar, _super);
    function DateRangeBar(props) {
        var _this = _super.call(this, props) || this;
        _this.swipedFeedbackRef = react_1["default"].createRef();
        _this.bottomSheetRef = react_1["default"].createRef();
        _this.toButtonRef = react_1["default"].createRef();
        _this.fromButtonRef = react_1["default"].createRef();
        _this.onFromDatePressed = function () {
            _this.onClickedElement('from');
        };
        _this.onToDatePressed = function () {
            _this.onClickedElement('to');
        };
        _this.onPeriodPressed = function () {
            _this.onClickedElement('period');
        };
        _this.handleSwipe = function (direction) {
            var _a;
            var sign = direction === 'left' ? 1 : -1;
            var shiftedRange = time_1.DateTimeHelper.pageRange(_this.state.fromDate, _this.state.toDate, sign);
            _this.setRange(shiftedRange[0], shiftedRange[1], actions_1.InteractionType.TouchOnly, 'swipe');
            (_a = _this.swipedFeedbackRef.current) === null || _a === void 0 ? void 0 : _a.startFeedback(direction);
        };
        _this.onSwipeLeft = function (ev) {
            if (ev.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
                _this.handleSwipe('left');
            }
        };
        _this.onSwipeRight = function (ev) {
            if (ev.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
                _this.handleSwipe('right');
            }
        };
        _this.setRange = function (from, to, interactionType, interactionContext) {
            var _a;
            if (interactionType === void 0) { interactionType = actions_1.InteractionType.TouchOnly; }
            var newState = DateRangeBar.deriveState(from, to, __assign(__assign({}, _this.state), { clickedElementType: null }));
            _this.setState(newState);
            (_a = _this.bottomSheetRef.current) === null || _a === void 0 ? void 0 : _a.close();
            if (_this.props.onRangeChanged) {
                _this.props.onRangeChanged(newState.from, newState.to, interactionType, interactionContext);
            }
        };
        _this.setFromDate = function (from, interactionType) {
            if (interactionType === void 0) { interactionType = actions_1.InteractionType.TouchOnly; }
            _this.setRange(time_1.DateTimeHelper.toNumberedDateFromDate(from), _this.state.to, interactionType, 'picker');
        };
        _this.setToDate = function (to, interactionType) {
            if (interactionType === void 0) { interactionType = actions_1.InteractionType.TouchOnly; }
            _this.setRange(_this.state.from, time_1.DateTimeHelper.toNumberedDateFromDate(to), interactionType, 'picker');
        };
        _this.setMonthByCalendar = function (monthDate) {
            _this.setRange(time_1.DateTimeHelper.toNumberedDateFromDate(date_fns_1.startOfMonth(monthDate)), time_1.DateTimeHelper.toNumberedDateFromDate(date_fns_1.endOfMonth(monthDate)), actions_1.InteractionType.TouchOnly, 'picker');
        };
        _this.onYearSelected = function (year) {
            _this.setRange(time_1.DateTimeHelper.toNumberedDateFromValues(year, 1, 1), time_1.DateTimeHelper.toNumberedDateFromValues(year, 12, 31), actions_1.InteractionType.TouchOnly, 'picker');
        };
        _this.onWeekSelected = function (start, end) {
            _this.setRange(time_1.DateTimeHelper.toNumberedDateFromDate(start), time_1.DateTimeHelper.toNumberedDateFromDate(end), actions_1.InteractionType.TouchOnly, 'picker');
        };
        _this.onFromButtonLongPressIn = function () {
            react_native_haptic_feedback_1["default"].trigger("impactHeavy", {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: true
            });
            if (_this.props.onLongPressIn) {
                _this.props.onLongPressIn('from');
            }
            else {
                requestAnimationFrame(function () {
                    var _a;
                    (_a = _this.fromButtonRef.current) === null || _a === void 0 ? void 0 : _a.playDenialAnimation();
                });
            }
        };
        _this.onFromButtonLongPressOut = function () {
            _this.props.onLongPressOut && _this.props.onLongPressOut('from');
        };
        _this.onToButtonLongPressIn = function () {
            var _a;
            react_native_haptic_feedback_1["default"].trigger("impactHeavy", {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: true
            });
            if (_this.props.onLongPressIn != null) {
                _this.props.onLongPressIn('to');
            }
            else {
                (_a = _this.toButtonRef.current) === null || _a === void 0 ? void 0 : _a.playDenialAnimation();
            }
        };
        _this.onToButtonLongPressOut = function () {
            _this.props.onLongPressOut && _this.props.onLongPressOut('to');
        };
        _this.onPeriodButtonLongPress = function (ev) {
            if (ev.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
                react_native_haptic_feedback_1["default"].trigger("impactHeavy", {
                    enableVibrateFallback: true,
                    ignoreAndroidSystemSettings: true
                });
                _this.props.onLongPressIn && _this.props.onLongPressIn('period');
            }
            else if (ev.nativeEvent.state === react_native_gesture_handler_1.State.END) {
                _this.props.onLongPressOut && _this.props.onLongPressOut('period');
            }
        };
        _this.state = DateRangeBar.deriveState(props.from, props.to, { isBottomSheetOpen: false });
        return _this;
    }
    DateRangeBar.deriveState = function (from, to, prevState) {
        if (to < from) {
            var fromTemp = from;
            from = to;
            to = fromTemp;
        }
        var fromDate = time_1.DateTimeHelper.toDate(from);
        var toDate = time_1.DateTimeHelper.toDate(to);
        var numDays = -date_fns_1.differenceInCalendarDays(fromDate, toDate) + 1;
        var semanticTest = time_1.DateTimeHelper.rangeSemantic(fromDate, toDate);
        var newState = __assign(__assign({}, prevState), { from: from,
            to: to,
            fromDate: fromDate,
            toDate: toDate, semanticPeriodCaptured: false, numDays: numDays, level: "day", periodName: undefined });
        if (semanticTest) {
            switch (semanticTest.semantic) {
                case 'month':
                    newState.semanticPeriodCaptured = true;
                    newState.level = 'month';
                    newState.periodName = date_fns_1.format(fromDate, "MMM yyyy");
                    break;
                case 'mondayWeek':
                case 'sundayWeek':
                    newState.semanticPeriodCaptured = true;
                    newState.level = 'week';
                    newState.periodName = "Week of " + date_fns_1.format(fromDate, "MMM d");
                    break;
                case 'year':
                    newState.semanticPeriodCaptured = true;
                    newState.level = 'year';
                    newState.periodName = date_fns_1.format(fromDate, 'yyyy');
                    break;
            }
        }
        return newState;
    };
    DateRangeBar.getDerivedStateFromProps = function (nextProps, currentState) {
        if (currentState.from !== nextProps.from ||
            currentState.to !== nextProps.to) {
            return DateRangeBar.deriveState(nextProps.from, nextProps.to, currentState);
        }
        return null;
    };
    DateRangeBar.prototype.onClickedElement = function (type) {
        var _a;
        this.setState(__assign(__assign({}, this.state), { clickedElementType: type }));
        (_a = this.bottomSheetRef.current) === null || _a === void 0 ? void 0 : _a.open();
    };
    DateRangeBar.prototype.componentDidUpdate = function () {
    };
    DateRangeBar.prototype.render = function () {
        var modalPickerView;
        if (this.state.clickedElementType) {
            switch (this.state.clickedElementType) {
                case 'period':
                    switch (this.state.level) {
                        case 'week':
                            modalPickerView = react_1["default"].createElement(CalendarPickers_1.WeekPicker, { selectedWeekFirstDay: this.state.fromDate, onWeekSelected: this.onWeekSelected });
                            break;
                        case 'month':
                            modalPickerView = react_1["default"].createElement(CalendarPickers_1.MonthPicker, { selectedMonth: this.state.fromDate, onMonthSelected: this.setMonthByCalendar });
                            break;
                        case 'year':
                            modalPickerView = react_1["default"].createElement(YearPicker, { year: date_fns_1.getYear(this.state.fromDate), onYearSelected: this.onYearSelected });
                            break;
                    }
                    break;
                case 'from':
                    modalPickerView = react_1["default"].createElement(CalendarPickers_1.DatePicker, { selectedDay: this.state.fromDate, disabledDates: [this.state.toDate], onDayPress: this.setFromDate, ghostRange: [this.state.fromDate, this.state.toDate] });
                    break;
                case 'to':
                    modalPickerView = react_1["default"].createElement(CalendarPickers_1.DatePicker, { selectedDay: this.state.toDate, disabledDates: [this.state.fromDate], onDayPress: this.setToDate, ghostRange: [this.state.fromDate, this.state.toDate] });
                    break;
            }
        }
        return react_1["default"].createElement(react_native_gesture_handler_1.FlingGestureHandler, { direction: react_native_gesture_handler_1.Directions.LEFT, onHandlerStateChange: this.onSwipeLeft },
            react_1["default"].createElement(react_native_gesture_handler_1.FlingGestureHandler, { direction: react_native_gesture_handler_1.Directions.RIGHT, onHandlerStateChange: this.onSwipeRight },
                react_1["default"].createElement(react_native_1.View, { style: __assign(__assign({}, (this.props.showBorder === true ? styles.conatainerWithBorder : styles.containerStyle)), { backgroundColor: this.props.isLightMode ? null : styles.containerStyle.backgroundColor }) },
                    react_1["default"].createElement(SwipedFeedback_1.SwipedFeedback, { ref: this.swipedFeedbackRef }),
                    react_1["default"].createElement(DateButton, { ref: this.fromButtonRef, date: this.state.from, onPress: this.onFromDatePressed, isLightMode: this.props.isLightMode, showSpeechIndicator: this.props.showSpeechIndicator, onLongPressIn: this.onFromButtonLongPressIn, onLongPressOut: this.onFromButtonLongPressOut }),
                    react_1["default"].createElement(react_native_1.View, { style: styles.midViewContainerStyle },
                        react_1["default"].createElement(react_native_dash_1["default"], { style: styles.dashViewStyle, dashGap: 4, dashColor: "gray", dashLength: 3, dashThickness: 3, dashStyle: styles.dashLineStyle }),
                        react_1["default"].createElement(react_native_1.View, { style: styles.midViewFooterContainerStyle }, this.state.semanticPeriodCaptured === true ? (react_1["default"].createElement(react_native_gesture_handler_1.LongPressGestureHandler, { maxDist: Number.MAX_VALUE, shouldCancelWhenOutside: false, onHandlerStateChange: this.onPeriodButtonLongPress },
                            react_1["default"].createElement(react_native_gesture_handler_1.BorderlessButton, { onPress: this.onPeriodPressed },
                                react_1["default"].createElement(react_native_1.View, { style: styles.periodButtonStyle, hitSlop: { top: 15, bottom: 15 } },
                                    react_1["default"].createElement(react_native_1.Text, { style: styles.periodButtonTitleStyle }, this.state.periodName))))) : (react_1["default"].createElement(react_native_1.Text, { style: styles.midViewDescriptionTextStyle }, pluralize_1["default"]("Day", this.state.numDays, true))))),
                    react_1["default"].createElement(DateButton, { ref: this.toButtonRef, date: this.state.to, onPress: this.onToDatePressed, isLightMode: this.props.isLightMode, showSpeechIndicator: this.props.showSpeechIndicator, onLongPressIn: this.onToButtonLongPressIn, onLongPressOut: this.onToButtonLongPressOut }),
                    react_1["default"].createElement(BottomSheet_1.BottomSheet, { ref: this.bottomSheetRef }, modalPickerView))));
    };
    return DateRangeBar;
}(react_1["default"].PureComponent));
exports.DateRangeBar = DateRangeBar;
//Year Picker============================================================================================================================================
var YearPicker = react_1["default"].memo(function (props) {
    var _a = react_1.useState(0), selectedIndex = _a[0], setSelectedIndex = _a[1];
    var _b = react_1.useState(date_fns_1.getYear(new Date()) - 10), minimumYear = _b[0], setMinimumYear = _b[1];
    var serviceKey = react_redux_1.useSelector(function (appState) {
        return appState.settingsState.serviceKey;
    });
    react_1.useEffect(function () {
        var service = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(serviceKey);
        var fetchInitialDate = function () { return __awaiter(void 0, void 0, void 0, function () {
            var initialDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.getDataInitialDate()];
                    case 1:
                        initialDate = _a.sent();
                        setMinimumYear(time_1.DateTimeHelper.getYear(initialDate));
                        return [2 /*return*/];
                }
            });
        }); };
        fetchInitialDate();
    }, [serviceKey]);
    var getTodayNew = function () {
        return new Date();
    };
    var maximumYear = react_1.useMemo(function () {
        return date_fns_1.getYear(getTodayNew());
    }, [serviceKey]);
    var yearLabels = react_1.useMemo(function () { return utils_1.getNumberSequence(minimumYear, maximumYear).map(function (y) { return y.toString(); }); }, [minimumYear, maximumYear]);
    react_1.useEffect(function () {
        setSelectedIndex(yearLabels.indexOf(props.year.toString()));
    }, [props.year, yearLabels]);
    var onItemSelected = react_1.useCallback(function (index) {
        setSelectedIndex(index);
    }, [yearLabels]);
    var onApplyPress = react_1.useCallback(function () {
        props.onYearSelected(Number.parseInt(yearLabels[selectedIndex]));
    }, [selectedIndex, yearLabels, props.onYearSelected]);
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_elements_1.Button, { type: "clear", title: "Apply", style: styles.yearPopupButtonStyle, onPress: onApplyPress }),
        react_1["default"].createElement(react_native_wheel_picker_android_1.WheelPicker, { selectedItemTextFontFamily: undefined, itemTextFontFamily: undefined, style: Styles_1.StyleTemplates.wheelPickerCommonStyle, data: yearLabels, initPosition: yearLabels.indexOf(props.year.toString()), selectedItem: selectedIndex, onItemSelected: onItemSelected }));
});
var DateButton = react_1["default"].forwardRef(function (props, ref) {
    var serviceKey = react_redux_1.useSelector(function (appState) { return appState.settingsState.serviceKey; });
    // const today = DataServiceManager.instance.getServiceByKey(serviceKey).getToday()
    var today = new Date();
    var date = time_1.DateTimeHelper.toDate(props.date);
    var dateString = date_fns_1.format(date, props.overrideFormat || "MMM dd, yyyy");
    var subText = time_1.isToday(date, today) === true ? 'Today' : (time_1.isYesterday(date, today) === true ? "Yesterday" : date_fns_1.format(date, "EEEE"));
    var movement = react_1.useState(new react_native_1.Animated.Value(0))[0];
    react_1.useImperativeHandle(ref, function () { return ({
        playDenialAnimation: function () {
            movement.setValue(0);
            react_native_1.Animated.timing(movement, Animations_1.denialAnimationSettings.timingConfig).start();
        }
    }); }, [movement]);
    var onLongPressStateChange = react_1.useCallback(function (ev) {
        if (ev.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
            props.onLongPressIn && props.onLongPressIn();
        }
        else if (ev.nativeEvent.state === react_native_gesture_handler_1.State.END) {
            props.onLongPressOut && props.onLongPressOut();
        }
    }, [props.onLongPressIn, props.onLongPressOut]);
    return react_1["default"].createElement(react_native_gesture_handler_1.LongPressGestureHandler, { onHandlerStateChange: onLongPressStateChange, shouldCancelWhenOutside: false, maxDist: Number.MAX_VALUE },
        react_1["default"].createElement(react_native_gesture_handler_1.BorderlessButton, { onPress: props.onPress, shouldCancelWhenOutside: false, rippleColor: "rgba(255,255,255,0.2)" },
            react_1["default"].createElement(react_native_1.Animated.View, { style: __assign(__assign({}, (props.freeWidth === true ? styles.dateButtonContainerStyleFreeWidth : styles.dateButtonContainerStyle)), { transform: [{ translateX: movement.interpolate(Animations_1.denialAnimationSettings.interpolationConfig) }] }) },
                react_1["default"].createElement(react_native_1.View, { style: styles.dateButtonDatePartStyle },
                    react_1["default"].createElement(react_native_1.Text, { style: props.isLightMode === true ? styles.dateButtonDateTextStyleLight : styles.dateButtonDateTextStyle }, dateString),
                    props.showSpeechIndicator !== false ? react_1["default"].createElement(react_native_1.View, { style: styles.dateButtonIndicatorContainerStyle },
                        react_1["default"].createElement(SpeechAffordanceIndicator_1.SpeechAffordanceIndicator, null)) : null),
                react_1["default"].createElement(react_native_1.Text, { style: styles.midViewDescriptionTextStyle }, subText))));
});
//Date Bar============================================================================================================================================
exports.DateBar = react_1["default"].memo(function (props) {
    var _a = react_1.useState(props.date), date = _a[0], setDate = _a[1];
    react_1.useEffect(function () {
        setDate(props.date);
    }, [props.date]);
    var bottomSheetRef = react_1.useRef(null);
    var swipedFeedbackRef = react_1.useRef(null);
    var serviceKey = react_redux_1.useSelector(function (appState) { return appState.settingsState.serviceKey; });
    var getTodayNew = function () {
        return new Date();
    };
    var getToday = getTodayNew;
    var makeShiftDay = react_1.useMemo(function () { return function (amount, interactionContext) { return function () {
        var _a;
        var newDate = date_fns_1.addDays(time_1.DateTimeHelper.toDate(date), amount);
        if (date_fns_1.differenceInCalendarDays(newDate, getToday()) < 1) {
            var newNumberedDate = time_1.DateTimeHelper.toNumberedDateFromDate(newDate);
            setDate(newNumberedDate);
            props.onDateChanged && props.onDateChanged(newNumberedDate, actions_1.InteractionType.TouchOnly, interactionContext);
            (_a = swipedFeedbackRef.current) === null || _a === void 0 ? void 0 : _a.startFeedback(amount > 0 ? 'left' : 'right');
        }
    }; }; }, [date, setDate, props.onDateChanged, swipedFeedbackRef]);
    var shiftLeft = react_1.useMemo(function () { return makeShiftDay(1, 'swipe'); }, [makeShiftDay]);
    var shiftRight = react_1.useMemo(function () { return makeShiftDay(-1, 'swipe'); }, [makeShiftDay]);
    var swipeLeft = react_1.useCallback(function (ev) {
        if (ev.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
            shiftLeft();
        }
    }, [shiftLeft]);
    var swipeRight = react_1.useCallback(function (ev) {
        if (ev.nativeEvent.state === react_native_gesture_handler_1.State.ACTIVE) {
            shiftRight();
        }
    }, [shiftRight]);
    var onPress = react_1.useCallback(function () { var _a; (_a = bottomSheetRef.current) === null || _a === void 0 ? void 0 : _a.open(); }, [bottomSheetRef]);
    var onCalendarDayPress = react_1.useCallback(function (d) {
        var _a;
        var newDate = time_1.DateTimeHelper.toNumberedDateFromDate(d);
        setDate(newDate);
        (_a = bottomSheetRef.current) === null || _a === void 0 ? void 0 : _a.close();
        props.onDateChanged && props.onDateChanged(newDate, actions_1.InteractionType.TouchOnly, 'picker');
        console.log("DATE****: ", newDate);
        react_native_1.Alert.alert(newDate.toString());
    }, [setDate, bottomSheetRef, props.onDateChanged]);
    return react_1["default"].createElement(react_native_gesture_handler_1.FlingGestureHandler, { direction: react_native_gesture_handler_1.Directions.LEFT, onHandlerStateChange: swipeLeft },
        react_1["default"].createElement(react_native_gesture_handler_1.FlingGestureHandler, { direction: react_native_gesture_handler_1.Directions.RIGHT, onHandlerStateChange: swipeRight },
            react_1["default"].createElement(react_native_1.View, { style: styles.containerStyle },
                react_1["default"].createElement(SwipedFeedback_1.SwipedFeedback, { ref: swipedFeedbackRef }),
                react_1["default"].createElement(DateButton, { date: date, overrideFormat: "MMMM dd, yyyy", freeWidth: true, onPress: onPress, onLongPressIn: props.onLongPressIn, onLongPressOut: props.onLongPressOut }),
                react_1["default"].createElement(BottomSheet_1.BottomSheet, { ref: bottomSheetRef },
                    react_1["default"].createElement(CalendarPickers_1.DatePicker, { selectedDay: time_1.DateTimeHelper.toDate(date), latestPossibleDay: getToday(), onDayPress: onCalendarDayPress })))));
});
