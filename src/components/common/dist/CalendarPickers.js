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
exports.__esModule = true;
exports.MonthPicker = exports.WeekPicker = exports.DatePicker = void 0;
var react_1 = require("react");
var react_native_calendars_1 = require("react-native-calendars");
var Colors_1 = require("@style/Colors");
var date_fns_1 = require("date-fns");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var Sizes_1 = require("@style/Sizes");
var SvgIcon_1 = require("./svg/SvgIcon");
var react_redux_1 = require("react-redux");
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var calendarTheme = {
    selectedDayBackgroundColor: Colors_1["default"].accent,
    selectedDayTextColor: Colors_1["default"].WHITE,
    arrowColor: Colors_1["default"].textColorLight,
    todayTextColor: Colors_1["default"].today,
    textDayFontSize: 13,
    textDayFontWeight: '500',
    textMonthFontWeight: 'bold',
    textMonthFontSize: 18,
    dayTextColor: Colors_1["default"].textColorLight,
    monthTextColor: Colors_1["default"].chartDimmedText,
    'stylesheet.calendar.header': {
        header: {
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        arrow: {
            padding: 22
        }
    }
};
var calendarProps = {
    theme: calendarTheme,
    style: { height: 400 },
    renderArrow: function (direction) {
        switch (direction) {
            default:
            case 'left':
                return react_1["default"].createElement(SvgIcon_1.SvgIcon, { type: SvgIcon_1.SvgIconType.ArrowLeft, color: 'gray' });
            case 'right':
                return react_1["default"].createElement(SvgIcon_1.SvgIcon, { type: SvgIcon_1.SvgIconType.ArrowRight, color: 'gray' });
        }
    }
};
function formatDate(date) { return date_fns_1.format(date, "yyyy-MM-dd"); }
function parseDate(calendarPickerDateObject) { return date_fns_1.set(new Date(), { year: calendarPickerDateObject.year, month: calendarPickerDateObject.month - 1, date: calendarPickerDateObject.day }); }
exports.DatePicker = function (props) {
    var _a;
    var serviceKey = react_redux_1.useSelector(function (appState) { return appState.settingsState.serviceKey; });
    // const today = DataServiceManager.instance.getServiceByKey(serviceKey).getToday()
    var today = new Date();
    var markedDates = {};
    if (props.selectedDay) {
        markedDates[formatDate(props.selectedDay)] = { selected: true };
    }
    (_a = props.disabledDates) === null || _a === void 0 ? void 0 : _a.forEach(function (date) {
        markedDates[formatDate(date)] = {
            disabled: true,
            disableTouchEvent: true,
            selected: true,
            selectedColor: 'lightgray'
        };
    });
    /*
    if(props.ghostRange){
        markedDates[formatDate(props.ghostRange[0])] = {startingDay: true, color: 'gray'}

        markedDates[formatDate(props.ghostRange[1])] = {endingDay: true, color: 'gray'}
    }*/
    return react_1["default"].createElement(react_native_calendars_1.Calendar, __assign({}, calendarProps, { current: props.selectedDay || today, markedDates: markedDates, minDate: props.earliedPossibleDay, maxDate: props.latestPossibleDay, onDayPress: function (d) {
            props.onDayPress && props.onDayPress(parseDate(d));
        } }));
};
var selectedWeekRangeMarkInfoBase = {
    selected: true,
    color: Colors_1["default"].accent
};
exports.WeekPicker = function (props) {
    var serviceKey = react_redux_1.useSelector(function (appState) { return appState.settingsState.serviceKey; });
    // const today = DataServiceManager.instance.getServiceByKey(serviceKey).getToday()
    var today = new Date();
    var markedDates = {};
    if (props.selectedWeekFirstDay) {
        for (var i = 0; i < 7; i++) {
            var date = date_fns_1.addDays(props.selectedWeekFirstDay, i);
            if (i === 0) {
                markedDates[formatDate(date)] = __assign(__assign({}, selectedWeekRangeMarkInfoBase), { startingDay: true });
            }
            else if (i === 6) {
                markedDates[formatDate(date)] = __assign(__assign({}, selectedWeekRangeMarkInfoBase), { endingDay: true });
            }
            else {
                markedDates[formatDate(date)] = selectedWeekRangeMarkInfoBase;
            }
        }
    }
    return react_1["default"].createElement(react_native_calendars_1.Calendar, __assign({}, calendarProps, { current: props.selectedWeekFirstDay || today, markedDates: markedDates, markingType: 'period', onDayPress: function (d) {
            var selectedDate = parseDate(d);
            var startDayOfWeek = date_fns_1.getDay(props.selectedWeekFirstDay);
            var startDayOfSelectedWeek = date_fns_1.startOfWeek(selectedDate, { weekStartsOn: startDayOfWeek });
            var endDayOfSelectedWeek = date_fns_1.endOfWeek(selectedDate, { weekStartsOn: startDayOfWeek });
            if (props.onWeekSelected != null) {
                props.onWeekSelected(startDayOfSelectedWeek, endDayOfSelectedWeek);
            }
        } }));
};
var monthPickerStyle = react_native_1.StyleSheet.create({
    pickerContainerStyle: {
        flexDirection: 'column'
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomColor: "#00000030",
        borderBottomWidth: 1,
        paddingBottom: 12,
        paddingTop: 12
    },
    arrowButtonContainerStyle: {},
    titleStyle: {
        color: calendarTheme.monthTextColor,
        fontWeight: calendarTheme.textMonthFontWeight,
        fontSize: calendarTheme.textMonthFontSize
    },
    monthRowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    monthButtonStyle: {
        flex: 0.22,
        height: 50
    },
    monthButtonSelectedStyle: {
        borderColor: Colors_1["default"].accent,
        borderRadius: 9,
        borderWidth: 2.5
    },
    monthButtonTitleStyle: {
        fontSize: Sizes_1.Sizes.normalFontSize,
        color: Colors_1["default"].textColorLight,
        fontWeight: 'bold'
    }
});
var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.prevYear = function () {
            _this.setState(__assign(__assign({}, _this.state), { currentYear: _this.state.currentYear - 1 }));
        };
        _this.nextYear = function () {
            _this.setState(__assign(__assign({}, _this.state), { currentYear: _this.state.currentYear + 1 }));
        };
        _this.onMonthPressed = function (month) {
            var monthDate = date_fns_1.set(_this.props.getToday(), { year: _this.state.currentYear, month: month });
            _this.setState(__assign(__assign({}, _this.state), { selectedMonth: monthDate }));
            if (_this.props.onMonthSelected) {
                _this.props.onMonthSelected(monthDate);
            }
        };
        var selectedMonth = props.selectedMonth || props.getToday();
        _this.state = {
            currentYear: date_fns_1.getYear(selectedMonth),
            selectedMonth: props.selectedMonth
        };
        return _this;
    }
    MonthPicker.prototype.render = function () {
        var _this = this;
        return react_1["default"].createElement(react_native_1.View, { style: monthPickerStyle.pickerContainerStyle },
            react_1["default"].createElement(react_native_1.View, { style: monthPickerStyle.headerStyle },
                react_1["default"].createElement(react_native_elements_1.Button, { type: "clear", icon: react_1["default"].createElement(SvgIcon_1.SvgIcon, { type: SvgIcon_1.SvgIconType.ArrowLeft, color: "gray" }), onPress: this.prevYear, containerStyle: monthPickerStyle.arrowButtonContainerStyle }),
                react_1["default"].createElement(react_native_1.Text, { style: monthPickerStyle.titleStyle }, this.state.currentYear),
                react_1["default"].createElement(react_native_elements_1.Button, { type: "clear", icon: react_1["default"].createElement(SvgIcon_1.SvgIcon, { type: SvgIcon_1.SvgIconType.ArrowRight, color: "gray" }), onPress: this.nextYear, containerStyle: monthPickerStyle.arrowButtonContainerStyle })),
            [0, 1, 2, 3].map(function (row) { return react_1["default"].createElement(react_native_1.View, { key: "row_" + row, style: monthPickerStyle.monthRowStyle }, [0, 1, 2].map(function (month) { return month + (row * 3); }).map(function (month) {
                var isSelected = _this.state.currentYear === date_fns_1.getYear(_this.state.selectedMonth) && date_fns_1.getMonth(_this.state.selectedMonth) === month;
                return react_1["default"].createElement(react_native_elements_1.Button, { type: "clear", titleStyle: __assign(__assign({}, monthPickerStyle.monthButtonTitleStyle), { color: isSelected === true ? Colors_1["default"].accent : Colors_1["default"].textColorLight }), buttonStyle: isSelected === true ? monthPickerStyle.monthButtonSelectedStyle : {}, containerStyle: monthPickerStyle.monthButtonStyle, key: month, title: monthNames[month].toUpperCase(), onPress: function () { return isSelected === false && _this.onMonthPressed(month); } });
            })); }));
    };
    return MonthPicker;
}(react_1["default"].Component));
function mapDispatchToProps(dispatch, ownProps) {
    return __assign({}, ownProps);
}
function mapStateToProps(appState, ownProps) {
    return __assign(__assign({}, ownProps), { getToday: getTodayDate });
    function getTodayDate() {
        return new Date();
    }
}
var connected = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(MonthPicker);
exports.MonthPicker = connected;
