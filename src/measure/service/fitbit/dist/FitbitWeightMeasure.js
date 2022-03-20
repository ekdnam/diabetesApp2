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
exports.FitbitWeightMeasure = void 0;
var FitbitServiceMeasure_1 = require("./FitbitServiceMeasure");
var FitbitSummaryLogMeasure_1 = require("./FitbitSummaryLogMeasure");
var api_1 = require("./api");
var FitbitRangeMeasure_1 = require("./FitbitRangeMeasure");
var time_1 = require("@data-at-hand/core/utils/time");
var date_fns_1 = require("date-fns");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var database_1 = require("./sqlite/database");
var FitbitWeightMeasure = /** @class */ (function (_super) {
    __extends(FitbitWeightMeasure, _super);
    function FitbitWeightMeasure(core) {
        var _this = _super.call(this, core) || this;
        _this.key = 'weight';
        _this.displayName = "Weight";
        _this.trendMeasure = new FitbitWeightTrendMeasure(core);
        _this.logMeasure = new FitbitWeightLogMeasure(core);
        return _this;
    }
    FitbitWeightMeasure.prototype.getBoxPlotInfoOfDatasetFromDb = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA returning from getBoxPlotInfoOfDatasetFromDb() from FitbitWeightMeasure.ts ");
                return [2 /*return*/, this.core.fitbitLocalDbManager.getBoxplotInfo(database_1.FitbitLocalTableName.WeightTrend)];
            });
        });
    };
    FitbitWeightMeasure.prototype.cacheServerData = function (endDate) {
        return __awaiter(this, void 0, Promise, function () {
            var trendResult, logResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trendMeasure.cacheServerData(endDate)];
                    case 1:
                        trendResult = _a.sent();
                        return [4 /*yield*/, this.logMeasure.cacheServerData(endDate)];
                    case 2:
                        logResult = _a.sent();
                        return [2 /*return*/, {
                                success: trendResult.success === true && logResult.success === true,
                                skipped: trendResult.skipped === true || logResult.skipped === true
                            }];
                }
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchAndCacheFitbitData = function (startDate, endDate) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/]; // noop
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchData = function (startDate, endDate, includeStatistics, includeToday) {
        return __awaiter(this, void 0, Promise, function () {
            var trendData, logData, latestLog, futureNearestLog, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.trendMeasure.fetchPreliminaryData(startDate, endDate, includeStatistics)];
                    case 1:
                        trendData = _c.sent();
                        return [4 /*yield*/, this.logMeasure.fetchData(startDate, endDate)];
                    case 2:
                        logData = _c.sent();
                        return [4 /*yield*/, this.logMeasure.fetchLatestLog(startDate)];
                    case 3:
                        latestLog = _c.sent();
                        return [4 /*yield*/, this.logMeasure.fetchFutureNearestLog(endDate)];
                    case 4:
                        futureNearestLog = _c.sent();
                        _a = {
                            source: DataSourceSpec_1.DataSourceType.Weight,
                            range: [startDate, endDate],
                            data: {
                                trend: trendData.list,
                                logs: logData,
                                pastNearestLog: latestLog,
                                futureNearestLog: futureNearestLog
                            }
                        };
                        if (!(includeToday === true)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.fetchTodayValue()];
                    case 5:
                        _b = _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        _b = null;
                        _c.label = 7;
                    case 7: return [2 /*return*/, (_a.today = _b,
                            _a.statistics = [
                                { type: 'avg', value: trendData.avg },
                                { type: 'range', value: [trendData.min, trendData.max] },
                            ],
                            _a)];
                }
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchTodayValue = function () {
        return __awaiter(this, void 0, Promise, function () {
            var sorted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.fitbitLocalDbManager.fetchData(database_1.FitbitLocalTableName.WeightLog, "1 ORDER BY `numberedDate` DESC, `secondsOfDay` DESC LIMIT 1", [])];
                    case 1:
                        sorted = _a.sent();
                        return [2 /*return*/, sorted.length > 0 ? sorted[0].value : null];
                }
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchCyclicGroupedData = function (start, end, cycleType) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.trendMeasure.fetchCyclicGroupedData(start, end, cycleType)];
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchRangeGroupedData = function (start, end) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.trendMeasure.fetchRangeGroupedData(start, end)];
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchCycleRangeDimensionData = function (start, end, cycleDimension) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.trendMeasure.fetchCycleRangeDimensionData(start, end, cycleDimension)];
            });
        });
    };
    FitbitWeightMeasure.prototype.fetchCycleDailyDimensionData = function (start, end, cycleDimension) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.trendMeasure.fetchCycleDailyDimensionData(start, end, cycleDimension)];
                    case 1:
                        data = _a.sent();
                        data.type = 'point';
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return FitbitWeightMeasure;
}(FitbitServiceMeasure_1.FitbitServiceMeasure));
exports.FitbitWeightMeasure = FitbitWeightMeasure;
var FitbitWeightTrendMeasure = /** @class */ (function (_super) {
    __extends(FitbitWeightTrendMeasure, _super);
    function FitbitWeightTrendMeasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = 'weight_trend';
        _this.displayName = "Weight Trend";
        _this.dbTableName = database_1.FitbitLocalTableName.WeightTrend;
        _this.resourcePropertyKey = 'body-weight';
        return _this;
    }
    FitbitWeightTrendMeasure.prototype.queryFunc = function (startDate, endDate, prefetchMode) {
        return this.core.fetchWeightTrend(startDate, endDate, prefetchMode);
    };
    FitbitWeightTrendMeasure.prototype.makeQueryUrl = function (startDate, endDate) {
        return api_1.makeFitbitWeightTrendApiUrl(startDate, endDate);
    };
    FitbitWeightTrendMeasure.prototype.getQueryResultEntryValue = function (queryResultEntry) {
        return Number.parseFloat(queryResultEntry.value);
    };
    FitbitWeightTrendMeasure.prototype.fetchData = function (startDate, endDate) {
        return null; //noop
    };
    return FitbitWeightTrendMeasure;
}(FitbitSummaryLogMeasure_1.FitbitSummaryLogMeasure));
var FitbitWeightLogMeasure = /** @class */ (function (_super) {
    __extends(FitbitWeightLogMeasure, _super);
    function FitbitWeightLogMeasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = 'weight_log';
        _this.displayName = "Weight Log";
        _this.resourcePropertyKey = 'weight';
        _this.maxQueryRangeLength = 32;
        return _this;
    }
    FitbitWeightLogMeasure.prototype.getBoxPlotInfoOfDatasetFromDb = function () {
        return null;
    };
    FitbitWeightLogMeasure.prototype.queryFunc = function (startDate, endDate, prefetchMode) {
        return this.core.fetchWeightLogs(startDate, endDate, prefetchMode);
    };
    FitbitWeightLogMeasure.prototype.handleQueryResultEntry = function (entries, now) {
        var entriesReady = entries.map(function (entry) {
            if (entry.weight != null) {
                var numberedDate = time_1.DateTimeHelper.fromFormattedString(entry.date);
                var date = date_fns_1.parse(entry.date, api_1.FITBIT_DATE_FORMAT, now);
                var timeSplit = entry.time.split(':');
                var hour = Number.parseInt(timeSplit[0]);
                var minute = Number.parseInt(timeSplit[1]);
                var second = Number.parseInt(timeSplit[2]);
                return {
                    id: entry.date + 'T' + entry.time,
                    value: entry.weight,
                    source: entry.source,
                    numberedDate: numberedDate,
                    secondsOfDay: hour * 3600 + minute * 60 + second,
                    year: time_1.DateTimeHelper.getYear(numberedDate),
                    month: time_1.DateTimeHelper.getMonth(numberedDate),
                    dayOfWeek: date_fns_1.getDay(date)
                };
            }
            else
                null;
        }).filter(function (e) { return e != null; });
        return this.core.fitbitLocalDbManager.insert(database_1.FitbitLocalTableName.WeightLog, entriesReady);
    };
    FitbitWeightLogMeasure.prototype.fetchData = function (startDate, endDate) {
        return this.core.fitbitLocalDbManager
            .fetchData(database_1.FitbitLocalTableName.WeightLog, "`numberedDate` BETWEEN ? AND ? ORDER BY `numberedDate` ASC, `secondsOfDay` ASC", [startDate, endDate]);
    };
    FitbitWeightLogMeasure.prototype.fetchLatestLog = function (before) {
        return __awaiter(this, void 0, Promise, function () {
            var filtered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.fitbitLocalDbManager.fetchData(database_1.FitbitLocalTableName.WeightLog, "`numberedDate` < ? ORDER BY `numberedDate` DESC, `secondsOfDay` DESC LIMIT 1", [before])];
                    case 1:
                        filtered = _a.sent();
                        if (filtered.length > 0) {
                            return [2 /*return*/, filtered[0]];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitWeightLogMeasure.prototype.fetchFutureNearestLog = function (after) {
        return __awaiter(this, void 0, Promise, function () {
            var filtered;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.fitbitLocalDbManager.fetchData(database_1.FitbitLocalTableName.WeightLog, "`numberedDate` > ? ORDER BY `numberedDate` ASC, `secondsOfDay` ASC LIMIT 1", [after])];
                    case 1:
                        filtered = _a.sent();
                        if (filtered.length > 0) {
                            return [2 /*return*/, filtered[0]];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    return FitbitWeightLogMeasure;
}(FitbitRangeMeasure_1.FitbitRangeMeasure));
