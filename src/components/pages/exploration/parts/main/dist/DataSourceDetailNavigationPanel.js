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
exports.DataSourceDetailNavigationPanel = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var actions_1 = require("@state/exploration/interaction/actions");
var react_redux_1 = require("react-redux");
var DataSourceChartFrame_1 = require("@components/exploration/DataSourceChartFrame");
var ExplorationInfoHelper_1 = require("@core/exploration/ExplorationInfoHelper");
var time_1 = require("@data-at-hand/core/utils/time");
var date_fns_1 = require("date-fns");
var Styles_1 = require("@style/Styles");
var Sizes_1 = require("@style/Sizes");
var Colors_1 = require("@style/Colors");
var comma_number_1 = require("comma-number");
var convert_units_1 = require("convert-units");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var SvgIcon_1 = require("@components/common/svg/SvgIcon");
var DataDrivenQueryBar_1 = require("@components/exploration/DataDrivenQueryBar");
var ExplorationInfo_1 = require("@data-at-hand/core/exploration/ExplorationInfo");
var actions_2 = require("@data-at-hand/core/exploration/actions");
var listItemHeightNormal = 52;
var listItemHeightTall = 70;
var styles = react_native_1.StyleSheet.create({
    listItemStyle: __assign(__assign({}, Styles_1.StyleTemplates.flexHorizontalCenteredListContainer), { backgroundColor: '#fdfdfd', paddingLeft: Sizes_1.Sizes.horizontalPadding, paddingRight: Sizes_1.Sizes.horizontalPadding, borderBottomColor: "#00000015", borderBottomWidth: 1 }),
    listItemHighlightStyle: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderColor: Colors_1["default"].accent + "60",
        borderWidth: 3
    },
    listItemDateStyle: {
        color: Colors_1["default"].textGray,
        width: 120
    },
    listItemDateTodayStyle: {
        color: Colors_1["default"].today,
        fontWeight: '500',
        width: 120
    },
    listItemValueContainerStyle: __assign(__assign({}, Styles_1.StyleTemplates.fillFlex), { paddingBottom: 12, paddingTop: 12 }),
    listItemValueDigitStyle: {
        fontSize: 16
    },
    listItemValueUnitStyle: {
        fontSize: 14,
        color: Colors_1["default"].textGray
    },
    noItemIndicatorStyle: { alignSelf: 'center', color: Colors_1["default"].textColorLight }
});
var DataSourceDetailNavigationPanel = /** @class */ (function (_super) {
    __extends(DataSourceDetailNavigationPanel, _super);
    function DataSourceDetailNavigationPanel(props) {
        var _this = _super.call(this, props) || this;
        _this._listRef = react_1["default"].createRef();
        _this.onListElementClick = function (date) {
            _this.props.dispatchExplorationAction(actions_1.createGoToBrowseDayAction(actions_2.InteractionType.TouchOnly, DataSourceSpec_1.inferIntraDayDataSourceType(_this.props.source), date));
        };
        _this.onListElementLongPressIn = function (date, element) {
            _this.props.dispatchExplorationAction(actions_1.setTouchElementInfo(element));
        };
        _this.onListElementLongPressOut = function (date) {
            _this.props.dispatchExplorationAction(actions_1.setTouchElementInfo(null));
        };
        _this.onDiscardFilter = function () {
            _this.props.dispatchExplorationAction(actions_1.setDataDrivenQuery(actions_2.InteractionType.TouchOnly, null));
        };
        _this.onFilterModified = function (newFilter) {
            _this.props.dispatchExplorationAction(actions_1.setDataDrivenQuery(actions_2.InteractionType.TouchOnly, newFilter));
        };
        _this.getItemLayout = function (_, index) {
            var height = (_this.props.source === DataSourceSpec_1.DataSourceType.HoursSlept || _this.props.source === DataSourceSpec_1.DataSourceType.SleepRange) ? listItemHeightTall : listItemHeightNormal;
            return { length: height, offset: height * index, index: index };
        };
        _this.renderItem = function (_a) {
            var _b, _c;
            var item = _a.item;
            return react_1["default"].createElement(Item, { date: item["numberedDate"], today: _this.state.today, item: item, type: _this.props.source, unitType: _this.props.measureUnitType, isHovering: item["numberedDate"] === _this.props.pressedDate, isInQueryResult: ((_c = (_b = _this.props.dataset) === null || _b === void 0 ? void 0 : _b.highlightedDays) === null || _c === void 0 ? void 0 : _c[item["numberedDate"]]) === true, onClick: _this.onListElementClick, onLongPressIn: _this.onListElementLongPressIn, onLongPressOut: _this.onListElementLongPressOut });
        };
        //const dataList: Array<any> = (this.props.source === DataSourceType.Weight ? props.dataset.data.logs : props.dataset.data).slice(0)
        //dataList.sort((a: any, b: any) => b["numberedDate"] - a["numberedDate"])
        _this.state = {
            today: time_1.DateTimeHelper.toNumberedDateFromDate(props.getToday()),
            isLoadingAfterQueryUpdate: false
        };
        return _this;
    }
    DataSourceDetailNavigationPanel.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b, _c;
        if (prevProps.isLoadingData !== this.props.isLoadingData && this.props.isLoadingData === false) {
            if (this.state.isLoadingAfterQueryUpdate === true) {
                if (this.props.dataDrivenQuery != null && (((_a = this.props.dataDrivenQuery) === null || _a === void 0 ? void 0 : _a.type) === ExplorationInfo_1.NumericConditionType.Max || ((_b = this.props.dataDrivenQuery) === null || _b === void 0 ? void 0 : _b.type) === ExplorationInfo_1.NumericConditionType.Min)) {
                    var sourceRangedData_1 = this.props.dataset;
                    var highlightedDates_1 = Object.keys(sourceRangedData_1.highlightedDays).filter(function (date) { return sourceRangedData_1.highlightedDays[Number.parseInt(date)] === true; }).map(function (d) { return Number.parseInt(d); });
                    if (highlightedDates_1.length === 1) {
                        //only one highlighted day, navigate to it
                        var index = this.props.sortedDailyItems.findIndex(function (d) { return d["numberedDate"] === highlightedDates_1[0]; });
                        if (index != -1) {
                            (_c = this._listRef.current) === null || _c === void 0 ? void 0 : _c.scrollToIndex({
                                animated: true,
                                index: index
                            });
                        }
                    }
                }
                this.setState(__assign(__assign({}, this.state), { isLoadingAfterQueryUpdate: false }));
            }
        }
        if (prevProps.dataDrivenQuery !== this.props.dataDrivenQuery) {
            if (this.props.isLoadingData === true) {
                this.setState(__assign(__assign({}, this.state), { isLoadingAfterQueryUpdate: true }));
            }
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.create(500, react_native_1.LayoutAnimation.Types.easeInEaseOut, "opacity"));
        }
    };
    DataSourceDetailNavigationPanel.prototype.render = function () {
        if (this.props.dataset != null) {
            return react_1["default"].createElement(react_1["default"].Fragment, null,
                this.props.dataDrivenQuery != null ? react_1["default"].createElement(DataDrivenQueryBar_1.DataDrivenQueryBar, { filter: this.props.dataDrivenQuery, highlightedDays: this.props.dataset.highlightedDays, onDiscardFilterPressed: this.onDiscardFilter, onFilterModified: this.onFilterModified }) : null,
                react_1["default"].createElement(DataSourceChartFrame_1.DataSourceChartFrame, { data: this.props.dataset, filter: this.props.dataDrivenQuery, highlightedDays: this.props.dataset.highlightedDays, showToday: false, flat: true, showHeader: false }),
                this.props.sortedDailyItems.length > 0 && react_1["default"].createElement(react_native_1.FlatList, { ref: this._listRef, style: Styles_1.StyleTemplates.fillFlex, data: this.props.sortedDailyItems, renderItem: this.renderItem, getItemLayout: this.getItemLayout, keyExtractor: function (item) { return item["id"] || item["numberedDate"].toString(); } }),
                this.props.sortedDailyItems.length === 0 && react_1["default"].createElement(react_native_1.View, { style: Styles_1.StyleTemplates.contentVerticalCenteredContainer },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.noItemIndicatorStyle }, "No data during this range.")));
        }
        else
            return react_1["default"].createElement(react_native_1.ActivityIndicator, null);
    };
    return DataSourceDetailNavigationPanel;
}(react_1["default"].PureComponent));
function mapDispatchToProps(dispatch, ownProps) {
    return __assign(__assign({}, ownProps), { dispatchExplorationAction: function (action) { return dispatch(action); } });
}
function mapStateToProps(appState, ownProps) {
    var pressedDate = null;
    if (appState.explorationState.touchingElement) {
        var date = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValueOfParams(appState.explorationState.touchingElement.params, ExplorationInfo_1.ParameterType.Date);
        if (date != null) {
            pressedDate = date;
        }
    }
    var source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(appState.explorationDataState.info, ExplorationInfo_1.ParameterType.DataSource);
    var sourceRangedData = appState.explorationDataState.data;
    //const dataList: Array<any> = (source === DataSourceType.Weight ? sourceRangedData.data.logs : sourceRangedData.data).slice(0)
    //dataList.sort((a: any, b: any) => b["numberedDate"] - a["numberedDate"])
    var getTodayNew = function () {
        return new Date();
    };
    return __assign(__assign({}, ownProps), { source: source, dataset: sourceRangedData, sortedDailyItems: dataList, measureUnitType: appState.settingsState.unit, isLoadingData: appState.explorationDataState.isBusy, pressedDate: pressedDate, dataDrivenQuery: appState.explorationState.info.dataDrivenQuery, getToday: getTodayNew });
}
var connected = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataSourceDetailNavigationPanel);
exports.DataSourceDetailNavigationPanel = connected;
var Item = react_1["default"].memo(function (prop) {
    var dateString = react_1.useMemo(function () {
        var dateString;
        if (prop.date === prop.today) {
            dateString = "Today";
        }
        else if (prop.today - prop.date === 1) {
            dateString = 'Yesterday';
        }
        else
            dateString = date_fns_1.format(time_1.DateTimeHelper.toDate(prop.date), "MMM dd, eee");
        return dateString;
    }, [prop.date, prop.today]);
    var listItemStyle = react_1.useMemo(function () {
        var style;
        /*if (prop.type === DataSourceType.SleepRange || prop.type === DataSourceType.HoursSlept) style = { ...styles.listItemStyle, height: listItemHeightTall }
        else style = { ...styles.listItemStyle, height: listItemHeightNormal }*/
        if (prop.isInQueryResult === true) {
            style.backgroundColor = Colors_1["default"].highlightElementBackgroundOpaque;
        }
        return style;
    }, [prop.type, prop.isInQueryResult]);
    var valueView = react_1.useMemo(function () {
        var valueElement;
        switch (prop.type) {
            case DataSourceSpec_1.DataSourceType.StepCount:
                valueElement = react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueContainerStyle },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueDigitStyle }, comma_number_1["default"](prop.item.value)),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueUnitStyle }, " steps"));
                break;
            case DataSourceSpec_1.DataSourceType.HeartRate:
                valueElement = react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueContainerStyle },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueDigitStyle }, prop.item.value),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueUnitStyle }, " bpm"));
                break;
            case DataSourceSpec_1.DataSourceType.Weight:
                var valueText = void 0;
                var unit = void 0;
                switch (prop.unitType) {
                    case DataSourceSpec_1.MeasureUnitType.US:
                        valueText = convert_units_1["default"](prop.item.value).from('kg').to('lb').toFixed(1);
                        unit = ' lb';
                        break;
                    case DataSourceSpec_1.MeasureUnitType.Metric:
                    default:
                        valueText = prop.item.value.toFixed(1);
                        unit = ' kg';
                        break;
                }
                valueElement = react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueContainerStyle },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueDigitStyle }, valueText),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.listItemValueUnitStyle }, unit));
                break;
            case DataSourceSpec_1.DataSourceType.HoursSlept:
            case DataSourceSpec_1.DataSourceType.SleepRange:
                var pivot = date_fns_1.startOfDay(time_1.DateTimeHelper.toDate(prop.date));
                var actualBedTime = date_fns_1.addSeconds(pivot, Math.round(prop.item.bedTimeDiffSeconds));
                var actualWakeTime = date_fns_1.addSeconds(pivot, Math.round(prop.item.wakeTimeDiffSeconds));
                var rangeText = void 0;
                if (prop.item.bedTimeDiffSeconds != null && prop.item.wakeTimeDiffSeconds != null) {
                    rangeText = date_fns_1.format(actualBedTime, 'hh:mm a').toLowerCase() + " - " + date_fns_1.format(actualWakeTime, 'hh:mm a').toLowerCase();
                }
                else {
                    rangeText = "";
                }
                var lengthHr = Math.floor(prop.item.lengthInSeconds / 3600);
                var lengthMin = Math.floor((prop.item.lengthInSeconds % 3600) / 60);
                var lengthSec = prop.item.lengthInSeconds % 60;
                if (lengthSec > 30) {
                    lengthMin++;
                }
                var durationFormat = [];
                if (lengthHr > 0) {
                    durationFormat.push({ type: 'value', text: lengthHr });
                    durationFormat.push({ type: 'unit', text: " hr" });
                }
                durationFormat.push({ type: "value", text: lengthHr > 0 ? (" " + lengthMin) : lengthMin });
                durationFormat.push({ type: "unit", text: " min" });
                valueElement = react_1["default"].createElement(react_native_1.View, { style: styles.listItemValueContainerStyle },
                    react_1["default"].createElement(react_native_1.Text, { style: { marginBottom: 8, fontSize: Sizes_1.Sizes.smallFontSize, color: Colors_1["default"].textColorLight } }, rangeText),
                    react_1["default"].createElement(react_native_1.Text, null, durationFormat.map(function (f, i) { return react_1["default"].createElement(react_native_1.Text, { key: i, style: f.type === 'value' ? styles.listItemValueDigitStyle : styles.listItemValueUnitStyle }, f.text); })));
                break;
        }
        return valueElement;
    }, [prop.type, prop.item.bedTimeDiffSeconds, prop.item.wakeTimeDiffSeconds, prop.item.value]);
    var onPress = react_1.useCallback(function () {
        prop.onClick(prop.date);
    }, [prop.onClick, prop.date]);
    return react_1["default"].createElement(react_native_gesture_handler_1.TouchableHighlight, { activeOpacity: 0.95, 
        //onLongPress={onLongPress}
        onPress: onPress },
        react_1["default"].createElement(react_native_1.View, { style: listItemStyle },
            react_1["default"].createElement(react_native_1.Text, { style: prop.today === prop.date ? styles.listItemDateTodayStyle : styles.listItemDateStyle }, dateString),
            valueView,
            react_1["default"].createElement(SvgIcon_1.SvgIcon, { type: SvgIcon_1.SvgIconType.ArrowRight, color: Colors_1["default"].textGray }),
            prop.isHovering === true && react_1["default"].createElement(react_native_1.View, { style: styles.listItemHighlightStyle })));
});
