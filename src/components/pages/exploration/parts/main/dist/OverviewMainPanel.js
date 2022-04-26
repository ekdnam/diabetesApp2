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
exports.OverviewMainPanel = void 0;
var actions_1 = require("@state/exploration/interaction/actions");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var react_native_1 = require("react-native");
var DataSourceChartFrame_1 = require("@components/exploration/DataSourceChartFrame");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var Sizes_1 = require("@style/Sizes");
var time_1 = require("@data-at-hand/core/utils/time");
var DataServiceManager_1 = require("@measure/DataServiceManager");
var DataDrivenQueryBar_1 = require("@components/exploration/DataDrivenQueryBar");
var DataSourceManager_1 = require("@measure/DataSourceManager");
var reducers_1 = require("@state/exploration/data/reducers");
var common_1 = require("@components/visualization/browse/common");
var actions_2 = require("@data-at-hand/core/exploration/actions");
var MIN_REFRESH_TIME_FOR_PERCEPTION = 1000;
var separatorStyle = { height: Sizes_1.Sizes.verticalPadding };
var OverviewMainPanel = /** @class */ (function (_super) {
    __extends(OverviewMainPanel, _super);
    function OverviewMainPanel(props) {
        var _this = _super.call(this, props) || this;
        _this._listRef = react_1["default"].createRef();
        _this.currentTimeoutForRefreshingFlag = undefined;
        _this.onDiscardFilter = function () {
            _this.props.dispatchAction(actions_1.setDataDrivenQuery(actions_2.InteractionType.TouchOnly, null));
        };
        _this.onFilterModified = function (newFilter) {
            _this.props.dispatchAction(actions_1.setDataDrivenQuery(actions_2.InteractionType.TouchOnly, newFilter));
        };
        _this.onHeaderPressed = function (source) {
            _this.props.dispatchAction(actions_1.createGoToBrowseRangeAction(actions_2.InteractionType.TouchOnly, source));
        };
        _this.onTodayPressed = function (source) {
            _this.props.dispatchAction(actions_1.createGoToBrowseDayAction(actions_2.InteractionType.TouchOnly, DataSourceSpec_1.inferIntraDayDataSourceType(source), time_1.DateTimeHelper.toNumberedDateFromDate(_this.props.selectedService.getToday())));
        };
        //FlatList handlers ==========================================================================================
        _this.Separator = function () {
            return react_1["default"].createElement(react_native_1.View, { style: separatorStyle });
        };
        _this.onScroll = function (event) {
            var scrollY = event.nativeEvent.contentOffset.y;
            _this.currentListScrollOffset = scrollY;
        };
        _this.getItemLayout = function (_, index) {
            var height = common_1.CommonBrowsingChartStyles.CHART_HEIGHT + DataSourceChartFrame_1.HEADER_HEIGHT + DataSourceChartFrame_1.FOOTER_HEIGHT + separatorStyle.height;
            return { length: height, offset: height * index, index: index };
        };
        _this.renderItem = function (_a) {
            var item = _a.item;
            console.log("@@@ In OverviewMainPanel.tsx - renderItem() - item ", item);
            console.log("@@@ In OverviewMainPanel.tsx - renderItem() - item.source ", item.source);
            console.log("@@@ In OverviewMainPanel.tsx - renderItem() - dataDrivenQuery ", _this.props.dataDrivenQuery);
            console.log("@@@ In OverviewMainPanel.tsx - renderItem() - highlightedDays ", _this.props.data.highlightedDays);
            console.log("@@@ In OverviewMainPanel.tsx - renderItem() - onHeaderPressed ", _this.onHeaderPressed);
            console.log("@@@ In OverviewMainPanel.tsx - renderItem() - onTodayPressed ", _this.onTodayPressed);
            try {
                var dataSourceType = DataSourceSpec_1.inferIntraDayDataSourceType(item.source);
                console.log("### In OverviewMainPanel.tsx - renderItem() - dataSourceType ", dataSourceType);
            }
            catch (err) {
                console.log("### In OverviewMainPanel.tsx - renderItem() - exception thrown ", err);
            }
            return react_1["default"].createElement(DataSourceChartFrame_1.DataSourceChartFrame, { key: item.source.toString(), data: item, filter: _this.props.dataDrivenQuery, highlightedDays: _this.props.data.highlightedDays, onHeaderPressed: _this.onHeaderPressed, onTodayPressed: DataSourceSpec_1.inferIntraDayDataSourceType(item.source) != null ? _this.onTodayPressed : null });
        };
        _this.keyExtractor = function (item) { return item.source; };
        _this.onRefresh = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("start refresh");
                        this.setState(__assign(__assign({}, this.state), { refreshingSince: Date.now() }));
                        return [4 /*yield*/, this.props.selectedService.refreshDataToReflectRecentInfo()];
                    case 1:
                        _a.sent();
                        this.props.dispatchDataReload();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onViewableItemsChanged = function (args) {
            var viewableDataSources = args.viewableItems.map(function (token) { return token.key; });
            _this.props.dispatchAction(actions_1.memoUIStatus("viewableDataSources", viewableDataSources));
        };
        _this.viewabilityConfig = {
            itemVisiblePercentThreshold: 95,
            minimumViewTime: 500,
            waitForInteraction: true
        };
        _this.state = {
            scaleX: common_1.CommonBrowsingChartStyles.makeDateScale(undefined, props.data.range[0], props.data.range[1]),
            refreshingSince: null
        };
        return _this;
    }
    OverviewMainPanel.getDerivedStateFromProps = function (nextProps, currentState) {
        if (nextProps.data != null && nextProps.data.range != null) {
            var currenDomain = currentState.scaleX.domain();
            if (currenDomain[0] !== nextProps.data.range[0] || currenDomain[1] !== nextProps.data.range[1]) {
                return __assign(__assign({}, currentState), { scaleX: common_1.CommonBrowsingChartStyles.makeDateScale(currentState.scaleX.copy(), nextProps.data.range[0], nextProps.data.range[1]) });
            }
            else
                return null;
        }
        else
            return null;
    };
    OverviewMainPanel.prototype.componentDidMount = function () {
        var _this = this;
        console.log("mount overview main panel.");
        if (this._listRef.current != null && this.props.overviewScrollY != null) {
            requestAnimationFrame(function () {
                _this._listRef.current.scrollToOffset({ offset: _this.props.overviewScrollY, animated: false });
            });
        }
        if (this.props.data != null) {
            // We need to modify the this.props.data.sourceDataList here
            var viewableDataSources = this.props.data.sourceDataList.map(function (d) { return d.source; });
            this.props.dispatchAction(actions_1.memoUIStatus("viewableDataSources", viewableDataSources));
        }
    };
    OverviewMainPanel.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a;
        if (prevProps.dataDrivenQuery !== this.props.dataDrivenQuery) {
            react_native_1.LayoutAnimation.configureNext(react_native_1.LayoutAnimation.create(500, react_native_1.LayoutAnimation.Types.easeInEaseOut, "opacity"));
            if (this.props.dataDrivenQuery != null && (prevProps.dataDrivenQuery == null || prevProps.dataDrivenQuery.dataSource !== this.props.dataDrivenQuery.dataSource)) {
                (_a = this._listRef.current) === null || _a === void 0 ? void 0 : _a.scrollToIndex({
                    animated: true,
                    index: this.props.data.sourceDataList.findIndex(function (d) { return d.source === _this.props.dataDrivenQuery.dataSource; })
                });
            }
        }
        if (prevProps.isLoading === true && this.props.isLoading === false && this.state.refreshingSince != null) {
            if (this.currentTimeoutForRefreshingFlag) {
                clearTimeout(this.currentTimeoutForRefreshingFlag);
            }
            var minLoadingTimeLeft = Math.max(MIN_REFRESH_TIME_FOR_PERCEPTION, Date.now() - this.state.refreshingSince);
            if (minLoadingTimeLeft > 0) {
                this.currentTimeoutForRefreshingFlag = setTimeout(function () {
                    _this.setState(__assign(__assign({}, _this.state), { refreshingSince: null }));
                    console.log("finished refreshing.");
                }, minLoadingTimeLeft);
            }
            else {
                this.setState(__assign(__assign({}, this.state), { refreshingSince: null }));
                console.log("finished refreshing.");
            }
        }
    };
    OverviewMainPanel.prototype.componentWillUnmount = function () {
        console.log("unmount overview main panel.");
        this.props.dispatchAction(actions_1.memoUIStatus("overviewScrollY", this.currentListScrollOffset));
        this.props.dispatchAction(actions_1.memoUIStatus("viewableDataSources", undefined));
    };
    //===============================================================================================================
    OverviewMainPanel.prototype.render = function () {
        console.log("%%% In OverviewMainPanel.tsx - in render() function ");
        if (this.props.data != null) {
            return react_1["default"].createElement(common_1.DateRangeScaleContext.Provider, { value: this.state.scaleX },
                this.props.dataDrivenQuery != null ? react_1["default"].createElement(DataDrivenQueryBar_1.DataDrivenQueryBar, { filter: this.props.dataDrivenQuery, highlightedDays: this.props.data.highlightedDays, onDiscardFilterPressed: this.onDiscardFilter, onFilterModified: this.onFilterModified }) : react_1["default"].createElement(react_1["default"].Fragment, null),
                react_1["default"].createElement(react_native_1.FlatList, { ref: this._listRef, windowSize: DataSourceManager_1.DataSourceManager.instance.supportedDataSources.length, extraData: this.props.dataDrivenQuery, viewabilityConfig: this.viewabilityConfig, onViewableItemsChanged: this.onViewableItemsChanged, 
                    /* sourceDataList: Array<OverviewSourceRow>; */
                    data: this.props.data.sourceDataList, keyExtractor: this.keyExtractor, ItemSeparatorComponent: this.Separator, renderItem: this.renderItem, onScroll: this.onScroll, refreshing: this.state.refreshingSince != null, onRefresh: this.onRefresh, getItemLayout: this.getItemLayout }));
        }
        else
            return react_1["default"].createElement(react_1["default"].Fragment, null);
    };
    return OverviewMainPanel;
}(react_1["default"].PureComponent));
function mapStateToProps(state, ownProps) {
    console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function");
    var selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(state.settingsState.serviceKey);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - state = ", state);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - ownProps = ", ownProps);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - selectedService = ", selectedService);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - state.explorationDataState.isBusy = ", state.explorationDataState.isBusy);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - state.explorationDataState.data = ", state.explorationDataState.data);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - state.explorationState.uiStatus.overviewScrollY = ", state.explorationState.uiStatus.overviewScrollY);
    // console.log("$$$ In OverviewMainPanel.tsx - mapStateToProps() function - state.explorationState.info.dataDrivenQuery = ", state.explorationState.info.dataDrivenQuery);
    return __assign(__assign({}, ownProps), { isLoading: state.explorationDataState.isBusy, data: state.explorationDataState.data, overviewScrollY: state.explorationState.uiStatus.overviewScrollY, dataDrivenQuery: state.explorationState.info.dataDrivenQuery, selectedService: selectedService });
}
function mapDispatchToProps(dispatch, ownProps) {
    console.log("$$$ In OverviewMainPanel.tsx - mapDispatchToProps() function");
    return __assign(__assign({}, ownProps), { dispatchAction: function (action) { return dispatch(action); }, dispatchDataReload: function () { return dispatch(reducers_1.startLoadingForInfo(undefined, true)); } });
}
var overviewMainPanel = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OverviewMainPanel);
exports.OverviewMainPanel = overviewMainPanel;
