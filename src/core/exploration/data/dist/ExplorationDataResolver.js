"use strict";
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
exports.explorationDataResolver = void 0;
var ExplorationInfoHelper_1 = require("@core/exploration/ExplorationInfoHelper");
var DataSourceManager_1 = require("@measure/DataSourceManager");
var DataServiceManager_1 = require("@measure/DataServiceManager");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var time_1 = require("@data-at-hand/core/utils/time");
var d3_array_1 = require("d3-array");
var utils_1 = require("@data-at-hand/core/utils");
var ExplorationInfo_1 = require("@data-at-hand/core/exploration/ExplorationInfo");
var dateSortFunc = function (a, b) {
    if (a.numberedDate > b.numberedDate) {
        return 1;
    }
    else if (a.numberedDate === b.numberedDate) {
        return 0;
    }
    else
        return -1;
};
var ExplorationDataResolver = /** @class */ (function () {
    function ExplorationDataResolver() {
    }
    ExplorationDataResolver.prototype.loadData = function (explorationInfo, selectedServiceKey, prevInfo, prevServiceKey, prevData) {
        // console.log("In ExplorationDataResolver.ts in loadData() explorationInfo = ", explorationInfo);
        // console.log("In ExplorationDataResolver.ts in loadData() selectedServiceKey = ", selectedServiceKey);
        // console.log("In ExplorationDataResolver.ts in loadData() prevInfo = ", prevInfo);
        // console.log("In ExplorationDataResolver.ts in loadData() prevServiceKey = ", prevServiceKey);
        // console.log("In ExplorationDataResolver.ts in loadData() prevData = ", prevData);
        var usePrevData = selectedServiceKey === prevServiceKey;
        switch (explorationInfo.type) {
            case ExplorationInfo_1.ExplorationType.B_Overview:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.B_Overview case of the switch ");
                return this.loadOverviewData(explorationInfo, selectedServiceKey, usePrevData === true ? prevInfo : undefined, usePrevData === true ? prevData : null);
            case ExplorationInfo_1.ExplorationType.B_Range:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.B_Range case of the switch ");
                return this.loadBrowseRangeData(explorationInfo, selectedServiceKey, usePrevData === true ? prevInfo : undefined, usePrevData === true ? prevData : null);
            case ExplorationInfo_1.ExplorationType.B_Day:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.B_Day case of the switch ");
                return this.loadIntraDayData(explorationInfo, selectedServiceKey);
            case ExplorationInfo_1.ExplorationType.C_Cyclic:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.C_Cyclic case of the switch ");
                return this.loadCyclicComparisonData(explorationInfo, selectedServiceKey);
            case ExplorationInfo_1.ExplorationType.C_TwoRanges:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.C_TwoRanges case of the switch ");
                return this.loadTwoRangeComparisonData(explorationInfo, selectedServiceKey);
            case ExplorationInfo_1.ExplorationType.C_CyclicDetail_Range:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.C_CyclicDetail_Range case of the switch ");
                return this.loadCyclicRangeDetailData(explorationInfo, selectedServiceKey);
            case ExplorationInfo_1.ExplorationType.C_CyclicDetail_Daily:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in ExplorationType.C_CyclicDetail_Daily case of the switch ");
                return this.loadCyclicDailyDetailData(explorationInfo, selectedServiceKey);
            default:
                console.log("In ExplorationDataResolver.ts in loadData() Reached in default case of the switch ");
                Promise.reject({ error: 'Unsupported exploration type.' });
        }
        return Promise.resolve(null);
    };
    ExplorationDataResolver.prototype.loadBrowseRangeData = function (info, selectedServiceKey, prevInfo, prevData) {
        return __awaiter(this, void 0, Promise, function () {
            var range, source, selectedService, prevSourceRowData, prevSource, data, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        range = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range);
                        source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.DataSource);
                        selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
                        if (prevInfo != null && prevData != null) {
                            if (prevInfo.type === ExplorationInfo_1.ExplorationType.B_Overview) {
                                prevSourceRowData = prevData.sourceDataList.find(function (e) { return e.source === source; });
                            }
                            else if (prevInfo.type === ExplorationInfo_1.ExplorationType.B_Range) {
                                prevSource = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(prevInfo, ExplorationInfo_1.ParameterType.DataSource);
                                if (prevSource === source) {
                                    prevSourceRowData = prevData;
                                }
                            }
                        }
                        return [4 /*yield*/, this.loadBrowseRangeDataImpl(range, source, selectedService, prevSourceRowData)];
                    case 1:
                        data = _d.sent();
                        _a = [__assign({}, data)];
                        _b = {};
                        if (!info.dataDrivenQuery) return [3 /*break*/, 3];
                        return [4 /*yield*/, selectedService.fetchFilteredDates(info.dataDrivenQuery, range[0], range[1])];
                    case 2:
                        _c = (_d.sent());
                        return [3 /*break*/, 4];
                    case 3:
                        _c = undefined;
                        _d.label = 4;
                    case 4: return [2 /*return*/, __assign.apply(void 0, _a.concat([(_b.highlightedDays = _c, _b)]))];
                }
            });
        });
    };
    ExplorationDataResolver.prototype.loadBrowseRangeDataImpl = function (range, source, service, prevData) {
        return __awaiter(this, void 0, Promise, function () {
            var benchmarkStart, newQueryRegion, newData_1, newPart, casted, excludeIndex, data, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("In ExplorationDataResolver.ts in loadBrowseRangeDataImpl()");
                        if (!prevData) return [3 /*break*/, 3];
                        benchmarkStart = Date.now();
                        newQueryRegion = time_1.DateTimeHelper.subtract(range, prevData.range);
                        if (!(newQueryRegion.overlap === true && newQueryRegion.rest.length < 2)) return [3 /*break*/, 3];
                        newData_1 = __assign(__assign({}, prevData), { range: range });
                        newPart = null;
                        if (!(newQueryRegion.rest.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, service.fetchData(source, newQueryRegion.rest[0][0], newQueryRegion.rest[0][1], false, false)];
                    case 1:
                        newPart = _c.sent();
                        _c.label = 2;
                    case 2:
                        switch (source) {
                            case DataSourceSpec_1.DataSourceType.StepCount:
                            case DataSourceSpec_1.DataSourceType.BloodGlucose:
                            case DataSourceSpec_1.DataSourceType.HeartRate:
                            case DataSourceSpec_1.DataSourceType.SleepRange:
                            case DataSourceSpec_1.DataSourceType.HoursSlept:
                                {
                                    newData_1.data = prevData.data.filter(function (datum) { return datum.numberedDate <= range[1] && datum.numberedDate >= range[0]; });
                                    if (newPart) {
                                        utils_1.fastConcatTo(newData_1.data, newPart.data);
                                    }
                                    newData_1.data.sort(dateSortFunc);
                                }
                                break;
                            case DataSourceSpec_1.DataSourceType.Weight:
                                {
                                    casted = prevData;
                                    newData_1.data = {
                                        trend: casted.data.trend.filter(function (datum) { return datum.numberedDate <= range[1] && datum.numberedDate >= range[0]; }),
                                        logs: casted.data.logs.filter(function (datum) { return datum.numberedDate <= range[1] && datum.numberedDate >= range[0]; }),
                                        futureNearestLog: casted.data.futureNearestLog,
                                        pastNearestLog: casted.data.pastNearestLog
                                    };
                                    if (newPart) {
                                        utils_1.fastConcatTo(newData_1.data.trend, newPart.data.trend);
                                        utils_1.fastConcatTo(newData_1.data.logs, newPart.data.logs);
                                        if (casted.range[0] > range[0]) {
                                            newData_1.data.pastNearestLog = newPart.data.pastNearestLog;
                                        }
                                        if (casted.range[1] < range[1]) {
                                            newData_1.data.futureNearestLog = newPart.data.futureNearestLog;
                                        }
                                    }
                                    newData_1.data.logs.sort(dateSortFunc);
                                    newData_1.data.trend.sort(dateSortFunc);
                                    if (newData_1.data.pastNearestLog == null && newPart == null && range[0] > casted.range[0] && casted.data.logs.length > 0) {
                                        excludeIndex = casted.data.logs.findIndex(function (l) { return l.numberedDate >= range[0]; });
                                        if (excludeIndex > 0) {
                                            newData_1.data.pastNearestLog = casted.data.logs[excludeIndex - 1];
                                        }
                                        else if (excludeIndex === -1) {
                                            newData_1.data.pastNearestLog = casted.data.logs[casted.data.logs.length - 1];
                                        }
                                    }
                                }
                                break;
                        }
                        switch (source) {
                            case DataSourceSpec_1.DataSourceType.StepCount:
                            case DataSourceSpec_1.DataSourceType.BloodGlucose:
                            case DataSourceSpec_1.DataSourceType.HeartRate:
                                newData_1.statistics.forEach(function (statistic) {
                                    switch (statistic.type) {
                                        case "avg":
                                            {
                                                statistic.value = d3_array_1.mean(newData_1.data, function (d) { return d["value"]; });
                                            }
                                            break;
                                        case 'range':
                                            {
                                                statistic.value = [d3_array_1.min(newData_1.data, function (d) { return d["value"]; }), d3_array_1.max(newData_1.data, function (d) { return d["value"]; })];
                                            }
                                            break;
                                        case 'total':
                                            {
                                                statistic.value = d3_array_1.sum(newData_1.data, function (d) { return d["value"]; });
                                            }
                                            break;
                                    }
                                });
                                break;
                            case DataSourceSpec_1.DataSourceType.Weight:
                                newData_1.statistics.forEach(function (statistic) {
                                    switch (statistic.type) {
                                        case "avg":
                                            {
                                                statistic.value = d3_array_1.mean(newData_1.data.trend, function (d) { return d["value"]; });
                                            }
                                            break;
                                        case 'range':
                                            {
                                                statistic.value = [d3_array_1.min(newData_1.data.trend, function (d) { return d["value"]; }), d3_array_1.max(newData_1.data.trend, function (d) { return d["value"]; })];
                                            }
                                            break;
                                    }
                                });
                                break;
                            case DataSourceSpec_1.DataSourceType.HoursSlept:
                                newData_1.statistics.forEach(function (statistic) {
                                    switch (statistic.type) {
                                        case "avg":
                                            {
                                                statistic.value = d3_array_1.mean(newData_1.data, function (d) { return d["lengthInSeconds"]; });
                                            }
                                            break;
                                        case 'range':
                                            {
                                                statistic.value = [d3_array_1.min(newData_1.data, function (d) { return d["lengthInSeconds"]; }), d3_array_1.max(newData_1.data, function (d) { return d["lengthInSeconds"]; })];
                                            }
                                            break;
                                        case 'total':
                                            {
                                                statistic.value = d3_array_1.sum(newData_1.data, function (d) { return d["lengthInSeconds"]; });
                                            }
                                            break;
                                    }
                                });
                                break;
                            /*case DataSourceType.SleepRange:
                              newData.statistics.forEach(statistic => {
                                switch (statistic.type) {
                                  case 'waketime':
                                    {
                                      statistic.value = mean(newData.data, (d: any) => d["wakeTimeDiffSeconds"])
                                    }
                                    break;
                                  case 'bedtime':
                                    {
                                      statistic.value = mean(newData.data, (d: any) => d["bedTimeDiffSeconds"])
                                    }
                                    break;
                                }
                              })
                              break;*/
                        }
                        console.log("Reusing prevData for rangeData took ", Date.now() - benchmarkStart, "millis.");
                        return [2 /*return*/, newData_1];
                    case 3:
                        console.log("In ExplorationDataResolver.ts in loadBrowseRangeDataImpl() calling service.fetchData() function");
                        return [4 /*yield*/, service.fetchData(source, range[0], range[1])
                            // console.log("In ExplorationDataResolver.ts in loadBrowseRangeDataImpl() data from service.fetchData() function = ", data);
                        ];
                    case 4:
                        data = _c.sent();
                        // console.log("In ExplorationDataResolver.ts in loadBrowseRangeDataImpl() data from service.fetchData() function = ", data);
                        console.log("In ExplorationDataResolver.ts in loadBrowseRangeDataImpl() calling service.getPreferredValueRange(source) function");
                        _a = data;
                        return [4 /*yield*/, service.getPreferredValueRange(source)];
                    case 5:
                        _a.preferredValueRange = _c.sent();
                        console.log("In ExplorationDataResolver.ts in loadBrowseRangeDataImpl() calling service.getGoalValue(source) function");
                        _b = data;
                        return [4 /*yield*/, service.getGoalValue(source)];
                    case 6:
                        _b.goal = _c.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ExplorationDataResolver.prototype.loadOverviewData = function (info, selectedServiceKey, prevInfo, prevData) {
        var _this = this;
        console.log("In ExplorationDataResolver.ts in loadOverviewData()");
        var range = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range);
        var selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
        return Promise.all(DataSourceManager_1.DataSourceManager.instance.supportedDataSources.map(function (source) {
            var prevSourceRowData;
            if (prevInfo != null && prevData != null) {
                console.log("In ExplorationDataResolver.ts in loadOverviewData() prevInfo != null && prevData != null -> entered in if part");
                if (prevInfo.type === ExplorationInfo_1.ExplorationType.B_Overview) {
                    console.log("In ExplorationDataResolver.ts in loadOverviewData() prevInfo.type === ExplorationType.B_Overview -> entered in if part");
                    prevSourceRowData = prevData.sourceDataList.find(function (e) { return e.source === source.type; });
                    console.log("In ExplorationDataResolver.ts in loadOverviewData() prevSourceRowData fetched", prevSourceRowData);
                }
                else if (prevInfo.type === ExplorationInfo_1.ExplorationType.B_Range) {
                    var prevSource = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(prevInfo, ExplorationInfo_1.ParameterType.DataSource);
                    console.log("In ExplorationDataResolver.ts in loadOverviewData() in elseif part -> prevSource = ", prevSource);
                    if (prevSource === source.type) {
                        prevSourceRowData = prevData;
                    }
                }
            }
            return _this.loadBrowseRangeDataImpl(range, source.type, selectedService, prevSourceRowData);
        }))
            .then(function (dataPerSource) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = {
                            range: range,
                            sourceDataList: dataPerSource
                        };
                        if (!info.dataDrivenQuery) return [3 /*break*/, 2];
                        return [4 /*yield*/, selectedService.fetchFilteredDates(info.dataDrivenQuery, range[0], range[1])];
                    case 1:
                        _b = (_c.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        _b = undefined;
                        _c.label = 3;
                    case 3: return [2 /*return*/, (_a.highlightedDays = _b,
                            _a)];
                }
            });
        }); });
    };
    ExplorationDataResolver.prototype.loadIntraDayData = function (info, selectedServiceKey) {
        var selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
        var source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.IntraDayDataSource);
        var date = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Date);
        return selectedService.fetchIntraDayData(source, date);
    };
    ExplorationDataResolver.prototype.loadCyclicComparisonData = function (info, selectedServiceKey) {
        return __awaiter(this, void 0, Promise, function () {
            var selectedService, source, range, cycleType, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
                        source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.DataSource);
                        range = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range);
                        cycleType = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.CycleType);
                        return [4 /*yield*/, selectedService.fetchCyclicAggregatedData(source, range[0], range[1], cycleType)];
                    case 1:
                        data = _b.sent();
                        console.log("%%% In ExplorationDataResolver.ts in loadCyclicComparisonData() source = ", source);
                        console.log("%%% In ExplorationDataResolver.ts in loadCyclicComparisonData() range[0] = ", range[0]);
                        console.log("%%% In ExplorationDataResolver.ts in loadCyclicComparisonData() range[1] = ", range[1]);
                        console.log("%%% In ExplorationDataResolver.ts in loadCyclicComparisonData() cycleType = ", cycleType);
                        console.log("%%% In ExplorationDataResolver.ts in loadCyclicComparisonData() data = ", data);
                        _a = data;
                        return [4 /*yield*/, selectedService.getPreferredValueRange(source)];
                    case 2:
                        _a.preferredValueRange = _b.sent();
                        console.log("%%% In ExplorationDataResolver.ts in loadCyclicComparisonData() preferredValueRange = ", data.preferredValueRange);
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ExplorationDataResolver.prototype.loadCyclicRangeDetailData = function (info, selectedServiceKey) {
        return __awaiter(this, void 0, Promise, function () {
            var selectedService, source, range, cycleDimension, data, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
                        source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.DataSource);
                        range = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range);
                        cycleDimension = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.CycleDimension);
                        return [4 /*yield*/, selectedService.fetchCycleRangeDimensionData(source, range[0], range[1], cycleDimension)];
                    case 1:
                        data = _b.sent();
                        _a = data;
                        return [4 /*yield*/, selectedService.getPreferredValueRange(source)];
                    case 2:
                        _a.preferredValueRange = _b.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    ExplorationDataResolver.prototype.loadCyclicDailyDetailData = function (info, selectedServiceKey) {
        var selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
        var source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.DataSource);
        var range = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range);
        var cycleDimension = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.CycleDimension);
        return selectedService.fetchCycleDailyDimensionData(source, range[0], range[1], cycleDimension);
    };
    ExplorationDataResolver.prototype.loadTwoRangeComparisonData = function (info, selectedServiceKey) {
        return __awaiter(this, void 0, Promise, function () {
            var selectedService, source, rangeA, rangeB, dataA, dataB, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        selectedService = DataServiceManager_1.DataServiceManager.instance.getServiceByKey(selectedServiceKey);
                        source = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.DataSource);
                        rangeA = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range, ExplorationInfo_1.ParameterKey.RangeA);
                        rangeB = ExplorationInfoHelper_1.explorationInfoHelper.getParameterValue(info, ExplorationInfo_1.ParameterType.Range, ExplorationInfo_1.ParameterKey.RangeB);
                        return [4 /*yield*/, selectedService.fetchRangeAggregatedData(source, rangeA[0], rangeA[1])];
                    case 1:
                        dataA = _b.sent();
                        return [4 /*yield*/, selectedService.fetchRangeAggregatedData(source, rangeB[0], rangeB[1])];
                    case 2:
                        dataB = _b.sent();
                        _a = {
                            data: [
                                { range: rangeA, value: dataA },
                                { range: rangeB, value: dataB }
                            ]
                        };
                        return [4 /*yield*/, selectedService.getPreferredValueRange(source)];
                    case 3: return [2 /*return*/, (_a.preferredValueRange = _b.sent(),
                            _a)];
                }
            });
        });
    };
    return ExplorationDataResolver;
}());
var resolver = new ExplorationDataResolver();
exports.explorationDataResolver = resolver;
