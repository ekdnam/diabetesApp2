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
exports.FitbitDailyHeartRateMeasure = void 0;
var FitbitSummaryLogMeasure_1 = require("./FitbitSummaryLogMeasure");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var database_1 = require("./sqlite/database");
var FitbitDailyHeartRateMeasure = /** @class */ (function (_super) {
    __extends(FitbitDailyHeartRateMeasure, _super);
    function FitbitDailyHeartRateMeasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.displayName = "Resting Heart Rate";
        _this.dbTableName = database_1.FitbitLocalTableName.RestingHeartRate;
        _this.resourcePropertyKey = 'activities-heart';
        _this.key = 'resting_heart_rate';
        return _this;
    }
    FitbitDailyHeartRateMeasure.prototype.queryFunc = function (startDate, endDate, prefetchMode) {
        return this.core.fetchHeartRateDailySummary(startDate, endDate, prefetchMode);
    };
    FitbitDailyHeartRateMeasure.prototype.getQueryResultEntryValue = function (queryResultEntry) {
        return queryResultEntry.value.restingHeartRate;
    };
    FitbitDailyHeartRateMeasure.prototype.fetchData = function (startDate, endDate, includeStatistics, includeToday) {
        return __awaiter(this, void 0, Promise, function () {
            var rangedData, base, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _super.prototype.fetchPreliminaryData.call(this, startDate, endDate, includeStatistics)];
                    case 1:
                        rangedData = _c.sent();
                        _a = {
                            source: DataSourceSpec_1.DataSourceType.HeartRate,
                            data: rangedData.list,
                            range: [startDate, endDate]
                        };
                        if (!(includeToday === true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fetchTodayValue()];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = null;
                        _c.label = 4;
                    case 4:
                        base = (_a.today = _b,
                            _a.statistics = [
                                {
                                    type: 'avg',
                                    value: rangedData.avg
                                },
                                {
                                    type: 'range',
                                    value: [rangedData.min, rangedData.max]
                                }
                            ],
                            _a);
                        return [2 /*return*/, base];
                }
            });
        });
    };
    FitbitDailyHeartRateMeasure.prototype.fetchCycleDailyDimensionData = function (start, end, cycleDimension) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.fetchCycleDailyDimensionData.call(this, start, end, cycleDimension)];
                    case 1:
                        data = _a.sent();
                        data.type = 'point';
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return FitbitDailyHeartRateMeasure;
}(FitbitSummaryLogMeasure_1.FitbitSummaryLogMeasure));
exports.FitbitDailyHeartRateMeasure = FitbitDailyHeartRateMeasure;
