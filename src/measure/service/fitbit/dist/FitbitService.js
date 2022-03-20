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
var DataService_1 = require("../DataService");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var FitbitDailyStepMeasure_1 = require("./FitbitDailyStepMeasure");
var time_1 = require("@data-at-hand/core/utils/time");
//import { FitbitSleepMeasure } from './FitbitSleepMeasure';
var FitbitIntraDayStepMeasure_1 = require("./FitbitIntraDayStepMeasure");
var FitbitIntraDayHeartRateMeasure_1 = require("./FitbitIntraDayHeartRateMeasure");
var database_1 = require("./sqlite/database");
var ExplorationInfo_1 = require("@data-at-hand/core/exploration/ExplorationInfo");
var FitbitService = /** @class */ (function (_super) {
    __extends(FitbitService, _super);
    function FitbitService(core) {
        var _this = _super.call(this) || this;
        _this._core = core;
        _this.key = core.keyOverride || 'fitbit';
        _this.name = core.nameOverride || 'Fitbit';
        _this.description = core.descriptionOverride || 'Fitbit Fitness Tracker';
        _this.thumbnail = core.thumbnailOverride || require('@assets/images/services/service_fitbit.jpg');
        _this.dailyStepMeasure = new FitbitDailyStepMeasure_1.FitbitDailyStepMeasure(core);
        // this.dailyHeartRateMeasure = new FitbitDailyHeartRateMeasure(core);
        // this.weightLogMeasure = new FitbitWeightMeasure(core);
        //this.sleepMeasure = new FitbitSleepMeasure(core);
        _this.intradayStepMeasure = new FitbitIntraDayStepMeasure_1.FitbitIntraDayStepMeasure(core);
        _this.intradayHeartRateMeasure = new FitbitIntraDayHeartRateMeasure_1.FitbitIntraDayHeartRateMeasure(core);
        _this.preloadableMeasures = [
            _this.dailyStepMeasure,
            // this.dailyHeartRateMeasure,
            // this.weightLogMeasure,
            //this.sleepMeasure,
            _this.intradayStepMeasure,
            _this.intradayHeartRateMeasure
        ];
        return _this;
    }
    Object.defineProperty(FitbitService.prototype, "core", {
        get: function () {
            return this._core;
        },
        enumerable: false,
        configurable: true
    });
    FitbitService.prototype.isDataSourceSupported = function (dataSource) {
        return true;
    };
    FitbitService.prototype.getPreferredValueRange = function (dataSource) {
        return __awaiter(this, void 0, Promise, function () {
            var boxPlotInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataSource;
                        switch (_a) {
                            case DataSourceSpec_1.DataSourceType.StepCount: return [3 /*break*/, 1];
                            case DataSourceSpec_1.DataSourceType.BloodGlucose: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dailyStepMeasure.getBoxPlotInfoOfDataset()];
                    case 2:
                        boxPlotInfo = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.dailyStepMeasure.getBoxPlotInfoOfDataset()];
                    case 4:
                        boxPlotInfo = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, [boxPlotInfo.minWithoutOutlier, boxPlotInfo.maxWithoutOutlier]];
                }
            });
        });
    };
    FitbitService.prototype.fetchFilteredDates = function (filter, start, end) {
        return __awaiter(this, void 0, Promise, function () {
            var tableName, valueColumnName, selectClause, whereClause, query, queryResult, result_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        valueColumnName = 'value';
                        selectClause = 'SELECT numberedDate';
                        whereClause = null;
                        switch (filter.dataSource) {
                            case DataSourceSpec_1.DataSourceType.StepCount:
                                tableName = database_1.FitbitLocalTableName.StepCount;
                                break;
                            case DataSourceSpec_1.DataSourceType.BloodGlucose:
                                tableName = database_1.FitbitLocalTableName.BloodGlucose;
                                break;
                            case DataSourceSpec_1.DataSourceType.HeartRate:
                                tableName = database_1.FitbitLocalTableName.RestingHeartRate;
                                break;
                            case DataSourceSpec_1.DataSourceType.Weight:
                                tableName = database_1.FitbitLocalTableName.WeightTrend;
                                break;
                            /*case DataSourceType.HoursSlept:
                              tableName = FitbitLocalTableName.SleepLog
                              valueColumnName = 'lengthInSeconds'
                              break;
                            case DataSourceType.SleepRange:
                              tableName = FitbitLocalTableName.SleepLog
                              switch (filter.propertyKey) {
                                case 'waketime':
                                  valueColumnName = 'wakeTimeDiffSeconds'
                                  break;
                                case 'bedtime':
                                  valueColumnName = 'bedTimeDiffSeconds'
                                  break;
                              }
                              break;*/
                        }
                        switch (filter.type) {
                            case ExplorationInfo_1.NumericConditionType.Less:
                                whereClause = valueColumnName + " <= " + filter.ref;
                                break;
                            case ExplorationInfo_1.NumericConditionType.More:
                                whereClause = valueColumnName + " >= " + filter.ref;
                                break;
                            case ExplorationInfo_1.NumericConditionType.Max:
                                selectClause = "SELECT numberedDate, max(" + valueColumnName + ")";
                                break;
                            case ExplorationInfo_1.NumericConditionType.Min:
                                selectClause = "SELECT numberedDate, min(" + valueColumnName + ")";
                                break;
                        }
                        query = selectClause + " from " + tableName + " where " + (whereClause != null ? whereClause + " AND " : "") + " numberedDate BETWEEN " + start + " AND " + end;
                        return [4 /*yield*/, this.core.fitbitLocalDbManager.selectQuery(query)];
                    case 1:
                        queryResult = _a.sent();
                        if (queryResult.length > 0) {
                            result_1 = {};
                            queryResult.forEach(function (v) { return result_1[v["numberedDate"]] = true; });
                            return [2 /*return*/, result_1];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.fetchDataImpl = function (dataSource, start, end, includeStatistics, includeToday) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataSource;
                        switch (_a) {
                            case DataSourceSpec_1.DataSourceType.StepCount: return [3 /*break*/, 1];
                            case DataSourceSpec_1.DataSourceType.BloodGlucose: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        console.log("In FitbitService.ts fetchDataImpl() function - DataSourceType.StepCount case of the switch - calling dailyStepMeasure.fetchData");
                        return [4 /*yield*/, this.dailyStepMeasure.fetchData(start, end, includeStatistics, includeToday)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        console.log("In FitbitService.ts fetchDataImpl() function - DataSourceType.BloodGlucose case of the switch - calling dailyStepMeasure.fetchData");
                        return [4 /*yield*/, this.dailyStepMeasure.fetchData(start, end, includeStatistics, includeToday)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.fetchIntraDayData = function (intraDayDataSource, date) {
        return __awaiter(this, void 0, Promise, function () {
            var now, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = time_1.DateTimeHelper.toNumberedDateFromDate(this.core.getToday());
                        if (!(date <= now)) return [3 /*break*/, 5];
                        _a = intraDayDataSource;
                        switch (_a) {
                            case DataSourceSpec_1.IntraDayDataSourceType.StepCount: return [3 /*break*/, 1];
                            case DataSourceSpec_1.IntraDayDataSourceType.HeartRate: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV In FitbitService.ts fetchIntraDayData() function - in switch - in case of IntraDayDataSourceType.StepCount - calling this.intradayStepMeasure.fetchData(date)");
                        return [4 /*yield*/, this.intradayStepMeasure.fetchData(date)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.intradayHeartRateMeasure.fetchData(date)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [2 /*return*/, null];
                }
            });
        });
    };
    FitbitService.prototype.fetchCyclicAggregatedData = function (dataSource, start, end, cycle) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataSource;
                        switch (_a) {
                            case DataSourceSpec_1.DataSourceType.StepCount: return [3 /*break*/, 1];
                            case DataSourceSpec_1.DataSourceType.BloodGlucose: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, this.dailyStepMeasure.fetchCyclicGroupedData(start, end, cycle)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.dailyStepMeasure.fetchCyclicGroupedData(start, end, cycle)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.fetchRangeAggregatedData = function (dataSource, start, end) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataSource;
                        switch (_a) {
                            case DataSourceSpec_1.DataSourceType.StepCount: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.dailyStepMeasure.fetchRangeGroupedData(start, end)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.fetchCycleRangeDimensionDataImpl = function (dataSource, start, end, cycleDimension) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataSource;
                        switch (_a) {
                            case DataSourceSpec_1.DataSourceType.StepCount: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.dailyStepMeasure.fetchCycleRangeDimensionData(start, end, cycleDimension)
                        // case DataSourceType.HeartRate:
                        //   return await this.dailyHeartRateMeasure.fetchCycleRangeDimensionData(start, end, cycleDimension)
                        // case DataSourceType.Weight:
                        //   return await this.weightLogMeasure.fetchCycleRangeDimensionData(start, end, cycleDimension)
                        /*case DataSourceType.HoursSlept:
                          return await this.sleepMeasure.fetchHoursSleptRangeDimensionData(start, end, cycleDimension)
                        case DataSourceType.SleepRange:
                          return await this.sleepMeasure.fetchSleepRangeCycleRangeDimensionData(start, end, cycleDimension)*/
                    ];
                    case 2: return [2 /*return*/, _b.sent()
                        // case DataSourceType.HeartRate:
                        //   return await this.dailyHeartRateMeasure.fetchCycleRangeDimensionData(start, end, cycleDimension)
                        // case DataSourceType.Weight:
                        //   return await this.weightLogMeasure.fetchCycleRangeDimensionData(start, end, cycleDimension)
                        /*case DataSourceType.HoursSlept:
                          return await this.sleepMeasure.fetchHoursSleptRangeDimensionData(start, end, cycleDimension)
                        case DataSourceType.SleepRange:
                          return await this.sleepMeasure.fetchSleepRangeCycleRangeDimensionData(start, end, cycleDimension)*/
                    ];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.fetchCycleDailyDimensionData = function (dataSource, start, end, cycleDimension) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = dataSource;
                        switch (_a) {
                            case DataSourceSpec_1.DataSourceType.StepCount: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.dailyStepMeasure.fetchCycleDailyDimensionData(start, end, cycleDimension)
                        // case DataSourceType.HeartRate:
                        //   return await this.dailyHeartRateMeasure.fetchCycleDailyDimensionData(start, end, cycleDimension)
                        // case DataSourceType.Weight:
                        //   return await this.weightLogMeasure.fetchCycleDailyDimensionData(start, end, cycleDimension)
                        /*case DataSourceType.HoursSlept:
                        case DataSourceType.SleepRange:
                          return await this.sleepMeasure.fetchCycleDailyDimensionData(dataSource, start, end, cycleDimension)*/
                    ];
                    case 2: return [2 /*return*/, _b.sent()
                        // case DataSourceType.HeartRate:
                        //   return await this.dailyHeartRateMeasure.fetchCycleDailyDimensionData(start, end, cycleDimension)
                        // case DataSourceType.Weight:
                        //   return await this.weightLogMeasure.fetchCycleDailyDimensionData(start, end, cycleDimension)
                        /*case DataSourceType.HoursSlept:
                        case DataSourceType.SleepRange:
                          return await this.sleepMeasure.fetchCycleDailyDimensionData(dataSource, start, end, cycleDimension)*/
                    ];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.getGoalValue = function (dataSource) {
        switch (dataSource) {
            case DataSourceSpec_1.DataSourceType.StepCount:
                return this.core.fetchStepCountGoal();
            case DataSourceSpec_1.DataSourceType.BloodGlucose:
                return this.core.fetchStepCountGoal();
            //case DataSourceType.HoursSlept:
            //return this.core.fetchMinSleepDurationGoal()
            case DataSourceSpec_1.DataSourceType.Weight:
                return this.core.fetchWeightGoal();
            default: return Promise.resolve(undefined);
        }
    };
    /***
     * return: Access token
     */
    FitbitService.prototype.authenticate = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.core.authenticate()];
            });
        });
    };
    FitbitService.prototype.signOut = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.signOut()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.core.fitbitLocalDbManager.close()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.core.fitbitLocalDbManager.deleteDatabase()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.refreshDataToReflectRecentInfo = function () {
        return __awaiter(this, void 0, Promise, function () {
            var now, _i, _a, measure;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        now = time_1.DateTimeHelper.toNumberedDateFromDate(this.core.getToday());
                        _i = 0, _a = this.preloadableMeasures;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        measure = _a[_i];
                        return [4 /*yield*/, measure.cacheServerData(now)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.activateInSystem = function (progressHandler) {
        return __awaiter(this, void 0, Promise, function () {
            var accessToken, now, _i, _a, measure, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        console.log("start Fitbit activation...");
                        progressHandler({
                            progress: 0,
                            message: "Authenticating your Fitbit account..."
                        });
                        return [4 /*yield*/, this.authenticate()];
                    case 1:
                        accessToken = _b.sent();
                        if (!(accessToken != null)) return [3 /*break*/, 6];
                        now = time_1.DateTimeHelper.toNumberedDateFromDate(this.core.getToday());
                        _i = 0, _a = this.preloadableMeasures;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        measure = _a[_i];
                        progressHandler({
                            progress: 0,
                            message: "Fetching " + measure.displayName + " data..."
                        });
                        return [4 /*yield*/, measure.cacheServerData(now)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, {
                            success: true
                        }];
                    case 6: return [2 /*return*/, {
                            success: false
                        }];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        ex_1 = _b.sent();
                        console.log("activation error:");
                        console.log(ex_1);
                        return [2 /*return*/, { success: false, error: ex_1 }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.deactivatedInSystem = function () {
        return __awaiter(this, void 0, Promise, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.signOut()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.onSystemExit = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.core.fitbitLocalDbManager.close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.getMembershipStartDate = function () {
        return this.core.getMembershipStartDate();
    };
    FitbitService.prototype.getDataInitialDate = function () {
        return this.getMembershipStartDate();
    };
    FitbitService.prototype.onCheckSupportedInSystem = function () {
        return this.core.onCheckSupportedInSystem();
    };
    FitbitService.prototype.clearAllCache = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(this.preloadableMeasures.map(function (measure) { return measure.clearLocalCache(); }).concat(this.core.fitbitLocalDbManager.deleteDatabase()))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitService.prototype.exportToCsv = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.core.fitbitLocalDbManager.exportToCsv()];
            });
        });
    };
    Object.defineProperty(FitbitService.prototype, "getToday", {
        get: function () {
            return this.core.getToday;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FitbitService.prototype, "isQuotaLimited", {
        get: function () {
            return this.core.isQuotaLimited;
        },
        enumerable: false,
        configurable: true
    });
    FitbitService.prototype.getLeftQuota = function () {
        return this.core.getLeftQuota();
    };
    FitbitService.prototype.getQuotaResetEpoch = function () {
        return this.core.getQuotaResetEpoch();
    };
    return FitbitService;
}(DataService_1.DataService));
exports["default"] = FitbitService;
