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
exports.FitbitDailyStepMeasure = void 0;
var FitbitSummaryLogMeasure_1 = require("./FitbitSummaryLogMeasure");
var DataSourceSpec_1 = require("@data-at-hand/core/measure/DataSourceSpec");
var database_1 = require("./sqlite/database");
var react_native_sqlite_storage_1 = require("react-native-sqlite-storage");
react_native_sqlite_storage_1["default"].DEBUG(false);
react_native_sqlite_storage_1["default"].enablePromise(true);
var FitbitDailyStepMeasure = /** @class */ (function (_super) {
    __extends(FitbitDailyStepMeasure, _super);
    function FitbitDailyStepMeasure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // protected dbTableName = FitbitLocalTableName.StepCount;
        _this.dbTableName = database_1.FitbitLocalTableName.BloodGlucose;
        _this.key = 'daily_step';
        _this.displayName = "Step Count";
        _this.resourcePropertyKey = "activities-steps";
        return _this;
    }
    FitbitDailyStepMeasure.prototype.queryFunc = function (startDate, endDate, prefetchMode) {
        return this.core.fetchStepDailySummary(startDate, endDate, prefetchMode);
    };
    FitbitDailyStepMeasure.prototype.shouldReject = function (rowValue) {
        return rowValue === 0;
    };
    FitbitDailyStepMeasure.prototype.getLocalRangeQueryCondition = function (startDate, endDate) {
        return _super.prototype.getLocalRangeQueryCondition.call(this, startDate, endDate) + ' AND value > 25';
    };
    FitbitDailyStepMeasure.prototype.getQueryResultEntryValue = function (queryResultEntry) {
        return Number.parseInt(queryResultEntry.value);
    };
    FitbitDailyStepMeasure.prototype.open = function () {
        console.log("try open the database:");
        _dbInitPromise = react_native_sqlite_storage_1["default"].openDatabase({ name: 'fitbit-local-cache.sqlite' })
            .then(function (db) {
            console.log("db opened.");
            return db
                .transaction(function (tx) {
            }).then(function (tx) { return db; });
        });
        return _dbInitPromise;
    };
    FitbitDailyStepMeasure.prototype.createTableAndInsertRows = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resultStepCount, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // await (await this.open()).executeSql('DROP TABLE IF EXISTS blood_glucose_level', []);
                        console.log("-------------------------------------- In createTableAndInsertRows() method");
                        return [4 /*yield*/, this.open()];
                    case 1: return [4 /*yield*/, (_a.sent()).executeSql('CREATE TABLE IF NOT EXISTS blood_glucose_level(dayOfWeek INTEGER, month INTEGER, numberedDate DATE, value INTEGER, year INTEGER)', [])];
                    case 2:
                        _a.sent();
                        //await (await this.open()).executeSql('delete from blood_glucose_level', []);
                        //console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ In FitbitDailyStepMeasure.ts all dbrpws deleted ");
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA In FitbitDailyStepMeasure.ts - createTableAndInsertRows() - fetching data from StepCount Table");
                        return [4 /*yield*/, this.open()];
                    case 3: return [4 /*yield*/, (_a.sent()).executeSql('select * from StepCount limit 10', [])];
                    case 4:
                        resultStepCount = (_a.sent())[0];
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA In FitbitDailyStepMeasure.ts - createTableAndInsertRows() - fetching data from StepCount Table, data = ", resultStepCount.rows.item(0));
                        return [4 /*yield*/, this.open()];
                    case 5: return [4 /*yield*/, (_a.sent()).executeSql('select dayOfWeek, month, numberedDate, value, year from blood_glucose_level', [])];
                    case 6:
                        result = (_a.sent())[0];
                        if (!(result.rows.length <= 0)) return [3 /*break*/, 867];
                        console.log("-------------------------------------- 0 rows found in the blood_glucose_level table so inserting dummy rows -> createTableAndInsertRows() ");
                        return [4 /*yield*/, this.open()];
                    case 7: 
                    // New dummy data insertion queries
                    return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20210101, 112, 2021])];
                    case 8:
                        // New dummy data insertion queries
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 9: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20210102, 83, 2021])];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 11: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20210103, 93, 2021])];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 13: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20210104, 76, 2021])];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 15: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20210105, 141, 2021])];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 17: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20210106, 129, 2021])];
                    case 18:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 19: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20210107, 147, 2021])];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 21: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20210108, 106, 2021])];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 23: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20210109, 77, 2021])];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 25: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20210110, 88, 2021])];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 27: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20210111, 107, 2021])];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 29: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20210112, 62, 2021])];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 31: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20210113, 79, 2021])];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 33: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20210114, 117, 2021])];
                    case 34:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 35: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20210115, 77, 2021])];
                    case 36:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 37: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20210116, 99, 2021])];
                    case 38:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 39: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20210117, 65, 2021])];
                    case 40:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 41: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20210118, 71, 2021])];
                    case 42:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 43: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20210119, 143, 2021])];
                    case 44:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 45: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20210120, 62, 2021])];
                    case 46:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 47: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20210121, 110, 2021])];
                    case 48:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 49: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20210122, 66, 2021])];
                    case 50:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 51: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20210123, 83, 2021])];
                    case 52:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 53: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20210124, 127, 2021])];
                    case 54:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 55: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20210125, 111, 2021])];
                    case 56:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 57: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20210126, 147, 2021])];
                    case 58:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 59: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20210127, 76, 2021])];
                    case 60:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 61: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20210128, 66, 2021])];
                    case 62:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 63: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20210129, 63, 2021])];
                    case 64:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 65: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20210130, 125, 2021])];
                    case 66:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 67: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20210131, 135, 2021])];
                    case 68:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 69: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20210201, 119, 2021])];
                    case 70:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 71: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20210202, 106, 2021])];
                    case 72:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 73: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20210203, 89, 2021])];
                    case 74:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 75: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20210204, 93, 2021])];
                    case 76:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 77: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20210205, 100, 2021])];
                    case 78:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 79: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20210206, 106, 2021])];
                    case 80:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 81: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20210207, 68, 2021])];
                    case 82:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 83: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20210208, 74, 2021])];
                    case 84:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 85: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20210209, 132, 2021])];
                    case 86:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 87: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20210210, 61, 2021])];
                    case 88:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 89: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20210211, 95, 2021])];
                    case 90:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 91: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20210212, 115, 2021])];
                    case 92:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 93: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20210213, 60, 2021])];
                    case 94:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 95: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20210214, 108, 2021])];
                    case 96:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 97: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20210215, 76, 2021])];
                    case 98:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 99: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20210216, 121, 2021])];
                    case 100:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 101: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20210217, 130, 2021])];
                    case 102:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 103: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20210218, 116, 2021])];
                    case 104:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 105: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20210219, 128, 2021])];
                    case 106:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 107: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20210220, 150, 2021])];
                    case 108:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 109: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20210221, 100, 2021])];
                    case 110:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 111: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20210222, 134, 2021])];
                    case 112:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 113: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20210223, 95, 2021])];
                    case 114:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 115: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20210224, 110, 2021])];
                    case 116:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 117: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20210225, 143, 2021])];
                    case 118:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 119: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20210226, 119, 2021])];
                    case 120:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 121: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20210227, 116, 2021])];
                    case 122:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 123: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20210228, 107, 2021])];
                    case 124:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 125: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 3, 20210301, 84, 2021])];
                    case 126:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 127: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 3, 20210302, 95, 2021])];
                    case 128:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 129: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 3, 20210303, 82, 2021])];
                    case 130:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 131: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 3, 20210304, 136, 2021])];
                    case 132:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 133: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 3, 20210305, 74, 2021])];
                    case 134:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 135: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 3, 20210306, 149, 2021])];
                    case 136:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 137: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 3, 20210307, 104, 2021])];
                    case 138:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 139: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 3, 20210308, 136, 2021])];
                    case 140:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 141: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 3, 20210309, 141, 2021])];
                    case 142:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 143: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 3, 20210310, 123, 2021])];
                    case 144:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 145: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 3, 20210311, 101, 2021])];
                    case 146:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 147: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 3, 20210312, 135, 2021])];
                    case 148:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 149: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 3, 20210313, 132, 2021])];
                    case 150:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 151: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 3, 20210314, 106, 2021])];
                    case 152:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 153: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 3, 20210315, 88, 2021])];
                    case 154:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 155: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 3, 20210316, 114, 2021])];
                    case 156:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 157: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 3, 20210317, 73, 2021])];
                    case 158:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 159: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 3, 20210318, 77, 2021])];
                    case 160:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 161: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 3, 20210319, 68, 2021])];
                    case 162:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 163: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 3, 20210320, 69, 2021])];
                    case 164:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 165: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 3, 20210321, 146, 2021])];
                    case 166:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 167: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 3, 20210322, 86, 2021])];
                    case 168:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 169: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 3, 20210323, 75, 2021])];
                    case 170:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 171: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 3, 20210324, 93, 2021])];
                    case 172:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 173: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 3, 20210325, 73, 2021])];
                    case 174:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 175: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 3, 20210326, 131, 2021])];
                    case 176:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 177: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 3, 20210327, 136, 2021])];
                    case 178:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 179: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 3, 20210328, 113, 2021])];
                    case 180:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 181: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 3, 20210329, 143, 2021])];
                    case 182:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 183: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 3, 20210330, 90, 2021])];
                    case 184:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 185: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 3, 20210331, 107, 2021])];
                    case 186:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 187: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 4, 20210401, 94, 2021])];
                    case 188:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 189: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 4, 20210402, 86, 2021])];
                    case 190:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 191: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 4, 20210403, 69, 2021])];
                    case 192:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 193: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 4, 20210404, 115, 2021])];
                    case 194:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 195: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 4, 20210405, 114, 2021])];
                    case 196:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 197: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 4, 20210406, 91, 2021])];
                    case 198:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 199: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 4, 20210407, 68, 2021])];
                    case 200:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 201: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 4, 20210408, 67, 2021])];
                    case 202:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 203: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 4, 20210409, 93, 2021])];
                    case 204:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 205: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 4, 20210410, 105, 2021])];
                    case 206:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 207: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 4, 20210411, 74, 2021])];
                    case 208:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 209: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 4, 20210412, 96, 2021])];
                    case 210:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 211: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 4, 20210413, 115, 2021])];
                    case 212:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 213: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 4, 20210414, 150, 2021])];
                    case 214:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 215: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 4, 20210415, 77, 2021])];
                    case 216:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 217: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 4, 20210416, 93, 2021])];
                    case 218:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 219: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 4, 20210417, 85, 2021])];
                    case 220:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 221: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 4, 20210418, 135, 2021])];
                    case 222:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 223: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 4, 20210419, 145, 2021])];
                    case 224:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 225: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 4, 20210420, 91, 2021])];
                    case 226:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 227: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 4, 20210421, 70, 2021])];
                    case 228:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 229: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 4, 20210422, 134, 2021])];
                    case 230:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 231: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 4, 20210423, 69, 2021])];
                    case 232:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 233: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 4, 20210424, 90, 2021])];
                    case 234:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 235: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 4, 20210425, 143, 2021])];
                    case 236:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 237: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 4, 20210426, 72, 2021])];
                    case 238:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 239: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 4, 20210427, 62, 2021])];
                    case 240:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 241: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 4, 20210428, 150, 2021])];
                    case 242:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 243: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 4, 20210429, 71, 2021])];
                    case 244:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 245: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 4, 20210430, 150, 2021])];
                    case 246:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 247: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 5, 20210501, 90, 2021])];
                    case 248:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 249: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 5, 20210502, 73, 2021])];
                    case 250:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 251: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 5, 20210503, 80, 2021])];
                    case 252:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 253: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 5, 20210504, 134, 2021])];
                    case 254:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 255: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 5, 20210505, 95, 2021])];
                    case 256:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 257: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 5, 20210506, 69, 2021])];
                    case 258:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 259: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 5, 20210507, 61, 2021])];
                    case 260:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 261: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 5, 20210508, 107, 2021])];
                    case 262:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 263: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 5, 20210509, 128, 2021])];
                    case 264:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 265: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 5, 20210510, 89, 2021])];
                    case 266:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 267: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 5, 20210511, 72, 2021])];
                    case 268:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 269: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 5, 20210512, 91, 2021])];
                    case 270:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 271: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 5, 20210513, 74, 2021])];
                    case 272:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 273: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 5, 20210514, 118, 2021])];
                    case 274:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 275: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 5, 20210515, 63, 2021])];
                    case 276:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 277: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 5, 20210516, 146, 2021])];
                    case 278:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 279: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 5, 20210517, 133, 2021])];
                    case 280:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 281: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 5, 20210518, 124, 2021])];
                    case 282:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 283: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 5, 20210519, 119, 2021])];
                    case 284:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 285: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 5, 20210520, 135, 2021])];
                    case 286:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 287: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 5, 20210521, 87, 2021])];
                    case 288:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 289: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 5, 20210522, 66, 2021])];
                    case 290:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 291: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 5, 20210523, 90, 2021])];
                    case 292:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 293: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 5, 20210524, 64, 2021])];
                    case 294:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 295: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 5, 20210525, 150, 2021])];
                    case 296:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 297: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 5, 20210526, 143, 2021])];
                    case 298:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 299: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 5, 20210527, 148, 2021])];
                    case 300:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 301: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 5, 20210528, 136, 2021])];
                    case 302:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 303: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 5, 20210529, 126, 2021])];
                    case 304:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 305: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 5, 20210530, 142, 2021])];
                    case 306:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 307: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 5, 20210531, 71, 2021])];
                    case 308:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 309: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 6, 20210601, 71, 2021])];
                    case 310:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 311: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 6, 20210602, 138, 2021])];
                    case 312:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 313: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 6, 20210603, 96, 2021])];
                    case 314:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 315: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 6, 20210604, 99, 2021])];
                    case 316:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 317: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 6, 20210605, 86, 2021])];
                    case 318:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 319: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 6, 20210606, 76, 2021])];
                    case 320:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 321: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 6, 20210607, 97, 2021])];
                    case 322:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 323: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 6, 20210608, 116, 2021])];
                    case 324:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 325: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 6, 20210609, 117, 2021])];
                    case 326:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 327: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 6, 20210610, 101, 2021])];
                    case 328:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 329: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 6, 20210611, 110, 2021])];
                    case 330:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 331: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 6, 20210612, 123, 2021])];
                    case 332:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 333: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 6, 20210613, 137, 2021])];
                    case 334:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 335: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 6, 20210614, 61, 2021])];
                    case 336:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 337: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 6, 20210615, 135, 2021])];
                    case 338:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 339: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 6, 20210616, 109, 2021])];
                    case 340:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 341: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 6, 20210617, 63, 2021])];
                    case 342:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 343: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 6, 20210618, 131, 2021])];
                    case 344:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 345: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 6, 20210619, 119, 2021])];
                    case 346:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 347: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 6, 20210620, 93, 2021])];
                    case 348:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 349: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 6, 20210621, 105, 2021])];
                    case 350:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 351: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 6, 20210622, 89, 2021])];
                    case 352:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 353: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 6, 20210623, 66, 2021])];
                    case 354:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 355: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 6, 20210624, 111, 2021])];
                    case 356:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 357: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 6, 20210625, 108, 2021])];
                    case 358:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 359: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 6, 20210626, 77, 2021])];
                    case 360:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 361: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 6, 20210627, 132, 2021])];
                    case 362:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 363: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 6, 20210628, 84, 2021])];
                    case 364:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 365: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 6, 20210629, 95, 2021])];
                    case 366:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 367: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 6, 20210630, 97, 2021])];
                    case 368:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 369: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 7, 20210701, 126, 2021])];
                    case 370:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 371: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 7, 20210702, 98, 2021])];
                    case 372:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 373: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 7, 20210703, 67, 2021])];
                    case 374:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 375: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 7, 20210704, 134, 2021])];
                    case 376:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 377: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 7, 20210705, 104, 2021])];
                    case 378:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 379: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 7, 20210706, 129, 2021])];
                    case 380:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 381: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 7, 20210707, 135, 2021])];
                    case 382:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 383: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 7, 20210708, 132, 2021])];
                    case 384:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 385: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 7, 20210709, 118, 2021])];
                    case 386:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 387: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 7, 20210710, 81, 2021])];
                    case 388:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 389: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 7, 20210711, 72, 2021])];
                    case 390:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 391: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 7, 20210712, 80, 2021])];
                    case 392:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 393: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 7, 20210713, 79, 2021])];
                    case 394:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 395: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 7, 20210714, 146, 2021])];
                    case 396:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 397: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 7, 20210715, 124, 2021])];
                    case 398:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 399: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 7, 20210716, 95, 2021])];
                    case 400:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 401: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 7, 20210717, 77, 2021])];
                    case 402:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 403: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 7, 20210718, 95, 2021])];
                    case 404:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 405: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 7, 20210719, 112, 2021])];
                    case 406:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 407: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 7, 20210720, 117, 2021])];
                    case 408:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 409: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 7, 20210721, 133, 2021])];
                    case 410:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 411: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 7, 20210722, 113, 2021])];
                    case 412:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 413: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 7, 20210723, 145, 2021])];
                    case 414:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 415: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 7, 20210724, 71, 2021])];
                    case 416:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 417: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 7, 20210725, 62, 2021])];
                    case 418:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 419: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 7, 20210726, 99, 2021])];
                    case 420:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 421: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 7, 20210727, 123, 2021])];
                    case 422:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 423: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 7, 20210728, 131, 2021])];
                    case 424:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 425: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 7, 20210729, 132, 2021])];
                    case 426:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 427: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 7, 20210730, 67, 2021])];
                    case 428:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 429: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 7, 20210731, 101, 2021])];
                    case 430:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 431: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 8, 20210801, 135, 2021])];
                    case 432:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 433: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 8, 20210802, 116, 2021])];
                    case 434:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 435: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 8, 20210803, 122, 2021])];
                    case 436:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 437: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 8, 20210804, 122, 2021])];
                    case 438:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 439: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 8, 20210805, 121, 2021])];
                    case 440:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 441: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 8, 20210806, 87, 2021])];
                    case 442:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 443: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 8, 20210807, 118, 2021])];
                    case 444:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 445: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 8, 20210808, 83, 2021])];
                    case 446:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 447: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 8, 20210809, 145, 2021])];
                    case 448:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 449: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 8, 20210810, 142, 2021])];
                    case 450:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 451: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 8, 20210811, 136, 2021])];
                    case 452:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 453: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 8, 20210812, 126, 2021])];
                    case 454:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 455: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 8, 20210813, 127, 2021])];
                    case 456:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 457: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 8, 20210814, 132, 2021])];
                    case 458:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 459: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 8, 20210815, 61, 2021])];
                    case 460:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 461: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 8, 20210816, 73, 2021])];
                    case 462:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 463: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 8, 20210817, 102, 2021])];
                    case 464:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 465: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 8, 20210818, 68, 2021])];
                    case 466:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 467: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 8, 20210819, 131, 2021])];
                    case 468:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 469: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 8, 20210820, 73, 2021])];
                    case 470:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 471: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 8, 20210821, 75, 2021])];
                    case 472:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 473: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 8, 20210822, 133, 2021])];
                    case 474:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 475: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 8, 20210823, 86, 2021])];
                    case 476:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 477: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 8, 20210824, 135, 2021])];
                    case 478:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 479: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 8, 20210825, 78, 2021])];
                    case 480:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 481: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 8, 20210826, 146, 2021])];
                    case 482:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 483: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 8, 20210827, 126, 2021])];
                    case 484:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 485: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 8, 20210828, 79, 2021])];
                    case 486:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 487: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 8, 20210829, 83, 2021])];
                    case 488:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 489: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 8, 20210830, 91, 2021])];
                    case 490:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 491: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 8, 20210831, 69, 2021])];
                    case 492:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 493: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 9, 20210901, 102, 2021])];
                    case 494:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 495: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 9, 20210902, 126, 2021])];
                    case 496:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 497: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 9, 20210903, 100, 2021])];
                    case 498:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 499: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 9, 20210904, 69, 2021])];
                    case 500:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 501: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 9, 20210905, 63, 2021])];
                    case 502:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 503: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 9, 20210906, 90, 2021])];
                    case 504:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 505: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 9, 20210907, 127, 2021])];
                    case 506:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 507: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 9, 20210908, 147, 2021])];
                    case 508:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 509: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 9, 20210909, 69, 2021])];
                    case 510:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 511: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 9, 20210910, 79, 2021])];
                    case 512:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 513: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 9, 20210911, 121, 2021])];
                    case 514:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 515: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 9, 20210912, 60, 2021])];
                    case 516:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 517: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 9, 20210913, 97, 2021])];
                    case 518:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 519: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 9, 20210914, 70, 2021])];
                    case 520:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 521: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 9, 20210915, 128, 2021])];
                    case 522:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 523: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 9, 20210916, 90, 2021])];
                    case 524:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 525: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 9, 20210917, 134, 2021])];
                    case 526:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 527: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 9, 20210918, 142, 2021])];
                    case 528:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 529: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 9, 20210919, 139, 2021])];
                    case 530:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 531: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 9, 20210920, 150, 2021])];
                    case 532:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 533: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 9, 20210921, 126, 2021])];
                    case 534:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 535: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 9, 20210922, 138, 2021])];
                    case 536:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 537: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 9, 20210923, 99, 2021])];
                    case 538:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 539: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 9, 20210924, 118, 2021])];
                    case 540:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 541: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 9, 20210925, 145, 2021])];
                    case 542:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 543: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 9, 20210926, 109, 2021])];
                    case 544:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 545: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 9, 20210927, 83, 2021])];
                    case 546:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 547: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 9, 20210928, 93, 2021])];
                    case 548:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 549: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 9, 20210929, 85, 2021])];
                    case 550:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 551: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 9, 20210930, 65, 2021])];
                    case 552:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 553: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 10, 20211001, 113, 2021])];
                    case 554:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 555: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 10, 20211002, 115, 2021])];
                    case 556:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 557: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 10, 20211003, 60, 2021])];
                    case 558:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 559: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 10, 20211004, 122, 2021])];
                    case 560:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 561: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 10, 20211005, 100, 2021])];
                    case 562:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 563: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 10, 20211006, 107, 2021])];
                    case 564:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 565: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 10, 20211007, 123, 2021])];
                    case 566:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 567: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 10, 20211008, 89, 2021])];
                    case 568:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 569: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 10, 20211009, 112, 2021])];
                    case 570:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 571: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 10, 20211010, 116, 2021])];
                    case 572:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 573: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 10, 20211011, 88, 2021])];
                    case 574:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 575: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 10, 20211012, 93, 2021])];
                    case 576:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 577: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 10, 20211013, 132, 2021])];
                    case 578:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 579: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 10, 20211014, 149, 2021])];
                    case 580:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 581: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 10, 20211015, 81, 2021])];
                    case 582:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 583: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 10, 20211016, 86, 2021])];
                    case 584:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 585: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 10, 20211017, 74, 2021])];
                    case 586:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 587: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 10, 20211018, 130, 2021])];
                    case 588:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 589: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 10, 20211019, 146, 2021])];
                    case 590:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 591: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 10, 20211020, 150, 2021])];
                    case 592:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 593: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 10, 20211021, 141, 2021])];
                    case 594:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 595: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 10, 20211022, 88, 2021])];
                    case 596:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 597: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 10, 20211023, 112, 2021])];
                    case 598:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 599: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 10, 20211024, 113, 2021])];
                    case 600:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 601: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 10, 20211025, 68, 2021])];
                    case 602:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 603: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 10, 20211026, 115, 2021])];
                    case 604:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 605: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 10, 20211027, 133, 2021])];
                    case 606:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 607: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 10, 20211028, 129, 2021])];
                    case 608:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 609: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 10, 20211029, 135, 2021])];
                    case 610:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 611: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 10, 20211030, 138, 2021])];
                    case 612:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 613: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 10, 20211031, 128, 2021])];
                    case 614:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 615: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 11, 20211101, 148, 2021])];
                    case 616:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 617: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 11, 20211102, 128, 2021])];
                    case 618:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 619: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 11, 20211103, 89, 2021])];
                    case 620:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 621: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 11, 20211104, 68, 2021])];
                    case 622:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 623: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 11, 20211105, 83, 2021])];
                    case 624:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 625: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 11, 20211106, 138, 2021])];
                    case 626:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 627: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 11, 20211107, 150, 2021])];
                    case 628:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 629: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 11, 20211108, 102, 2021])];
                    case 630:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 631: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 11, 20211109, 150, 2021])];
                    case 632:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 633: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 11, 20211110, 135, 2021])];
                    case 634:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 635: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 11, 20211111, 127, 2021])];
                    case 636:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 637: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 11, 20211112, 100, 2021])];
                    case 638:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 639: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 11, 20211113, 109, 2021])];
                    case 640:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 641: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 11, 20211114, 121, 2021])];
                    case 642:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 643: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 11, 20211115, 119, 2021])];
                    case 644:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 645: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 11, 20211116, 111, 2021])];
                    case 646:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 647: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 11, 20211117, 130, 2021])];
                    case 648:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 649: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 11, 20211118, 63, 2021])];
                    case 650:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 651: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 11, 20211119, 102, 2021])];
                    case 652:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 653: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 11, 20211120, 118, 2021])];
                    case 654:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 655: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 11, 20211121, 91, 2021])];
                    case 656:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 657: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 11, 20211122, 106, 2021])];
                    case 658:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 659: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 11, 20211123, 87, 2021])];
                    case 660:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 661: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 11, 20211124, 95, 2021])];
                    case 662:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 663: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 11, 20211125, 70, 2021])];
                    case 664:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 665: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 11, 20211126, 78, 2021])];
                    case 666:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 667: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 11, 20211127, 130, 2021])];
                    case 668:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 669: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 11, 20211128, 129, 2021])];
                    case 670:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 671: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 11, 20211129, 110, 2021])];
                    case 672:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 673: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 11, 20211130, 60, 2021])];
                    case 674:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 675: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 12, 20211201, 68, 2021])];
                    case 676:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 677: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 12, 20211202, 103, 2021])];
                    case 678:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 679: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 12, 20211203, 106, 2021])];
                    case 680:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 681: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 12, 20211204, 131, 2021])];
                    case 682:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 683: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 12, 20211205, 136, 2021])];
                    case 684:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 685: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 12, 20211206, 111, 2021])];
                    case 686:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 687: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 12, 20211207, 94, 2021])];
                    case 688:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 689: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 12, 20211208, 101, 2021])];
                    case 690:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 691: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 12, 20211209, 132, 2021])];
                    case 692:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 693: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 12, 20211210, 100, 2021])];
                    case 694:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 695: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 12, 20211211, 92, 2021])];
                    case 696:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 697: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 12, 20211212, 126, 2021])];
                    case 698:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 699: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 12, 20211213, 60, 2021])];
                    case 700:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 701: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 12, 20211214, 114, 2021])];
                    case 702:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 703: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 12, 20211215, 92, 2021])];
                    case 704:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 705: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 12, 20211216, 106, 2021])];
                    case 706:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 707: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 12, 20211217, 147, 2021])];
                    case 708:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 709: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 12, 20211218, 90, 2021])];
                    case 710:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 711: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 12, 20211219, 147, 2021])];
                    case 712:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 713: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 12, 20211220, 128, 2021])];
                    case 714:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 715: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 12, 20211221, 79, 2021])];
                    case 716:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 717: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 12, 20211222, 74, 2021])];
                    case 718:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 719: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 12, 20211223, 120, 2021])];
                    case 720:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 721: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 12, 20211224, 123, 2021])];
                    case 722:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 723: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 12, 20211225, 71, 2021])];
                    case 724:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 725: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 12, 20211226, 112, 2021])];
                    case 726:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 727: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 12, 20211227, 103, 2021])];
                    case 728:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 729: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 12, 20211228, 75, 2021])];
                    case 730:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 731: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 12, 20211229, 127, 2021])];
                    case 732:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 733: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 12, 20211230, 121, 2021])];
                    case 734:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 735: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 12, 20211231, 76, 2021])];
                    case 736:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 737: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20220101, 93, 2022])];
                    case 738:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 739: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20220102, 147, 2022])];
                    case 740:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 741: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20220103, 71, 2022])];
                    case 742:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 743: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20220104, 128, 2022])];
                    case 744:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 745: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20220105, 125, 2022])];
                    case 746:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 747: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20220106, 88, 2022])];
                    case 748:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 749: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20220107, 64, 2022])];
                    case 750:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 751: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20220108, 138, 2022])];
                    case 752:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 753: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20220109, 147, 2022])];
                    case 754:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 755: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20220110, 149, 2022])];
                    case 756:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 757: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20220111, 124, 2022])];
                    case 758:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 759: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20220112, 148, 2022])];
                    case 760:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 761: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20220113, 134, 2022])];
                    case 762:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 763: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20220114, 133, 2022])];
                    case 764:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 765: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20220115, 116, 2022])];
                    case 766:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 767: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20220116, 60, 2022])];
                    case 768:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 769: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20220117, 116, 2022])];
                    case 770:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 771: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20220118, 73, 2022])];
                    case 772:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 773: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20220119, 90, 2022])];
                    case 774:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 775: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20220120, 123, 2022])];
                    case 776:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 777: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20220121, 92, 2022])];
                    case 778:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 779: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20220122, 109, 2022])];
                    case 780:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 781: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20220123, 72, 2022])];
                    case 782:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 783: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20220124, 137, 2022])];
                    case 784:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 785: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 1, 20220125, 73, 2022])];
                    case 786:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 787: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 1, 20220126, 142, 2022])];
                    case 788:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 789: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 1, 20220127, 96, 2022])];
                    case 790:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 791: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 1, 20220128, 60, 2022])];
                    case 792:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 793: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 1, 20220129, 93, 2022])];
                    case 794:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 795: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 1, 20220130, 136, 2022])];
                    case 796:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 797: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 1, 20220131, 109, 2022])];
                    case 798:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 799: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20220201, 89, 2022])];
                    case 800:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 801: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20220202, 133, 2022])];
                    case 802:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 803: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20220203, 132, 2022])];
                    case 804:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 805: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20220204, 110, 2022])];
                    case 806:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 807: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20220205, 128, 2022])];
                    case 808:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 809: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20220206, 114, 2022])];
                    case 810:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 811: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20220207, 95, 2022])];
                    case 812:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 813: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20220208, 120, 2022])];
                    case 814:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 815: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20220209, 70, 2022])];
                    case 816:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 817: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20220210, 130, 2022])];
                    case 818:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 819: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20220211, 98, 2022])];
                    case 820:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 821: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20220212, 138, 2022])];
                    case 822:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 823: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20220213, 77, 2022])];
                    case 824:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 825: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20220214, 122, 2022])];
                    case 826:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 827: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20220215, 127, 2022])];
                    case 828:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 829: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20220216, 89, 2022])];
                    case 830:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 831: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20220217, 149, 2022])];
                    case 832:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 833: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20220218, 133, 2022])];
                    case 834:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 835: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20220219, 115, 2022])];
                    case 836:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 837: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20220220, 91, 2022])];
                    case 838:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 839: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20220221, 102, 2022])];
                    case 840:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 841: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 2, 20220222, 111, 2022])];
                    case 842:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 843: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 2, 20220223, 125, 2022])];
                    case 844:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 845: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 2, 20220224, 110, 2022])];
                    case 846:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 847: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 2, 20220225, 79, 2022])];
                    case 848:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 849: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 2, 20220226, 80, 2022])];
                    case 850:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 851: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 2, 20220227, 86, 2022])];
                    case 852:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 853: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [1, 2, 20220228, 149, 2022])];
                    case 854:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 855: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [2, 3, 20220301, 88, 2022])];
                    case 856:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 857: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [3, 3, 20220302, 78, 2022])];
                    case 858:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 859: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [4, 3, 20220303, 67, 2022])];
                    case 860:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 861: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [5, 3, 20220304, 117, 2022])];
                    case 862:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 863: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [6, 3, 20220305, 68, 2022])];
                    case 864:
                        _a.sent();
                        return [4 /*yield*/, this.open()];
                    case 865: return [4 /*yield*/, (_a.sent()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [0, 3, 20220306, 128, 2022])];
                    case 866:
                        _a.sent();
                        return [3 /*break*/, 868];
                    case 867:
                        console.log("-------------------------------------- 0 rows found in the blood_glucose_level table so inserting dummy rows -> createTableAndInsertRows() ");
                        _a.label = 868;
                    case 868: return [2 /*return*/];
                }
            });
        });
    };
    FitbitDailyStepMeasure.prototype.performDatabaseOperation = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.createTableAndInsertRows();
                        console.log("-------------------------------------- Fetching data from table performDatabaseOperation()");
                        return [4 /*yield*/, this.open()];
                    case 1: return [4 /*yield*/, (_a.sent()).executeSql('select dayOfWeek, month, numberedDate, value, year from blood_glucose_level where numberedDate BETWEEN ? and ?', [startDate, endDate])];
                    case 2:
                        result = (_a.sent())[0];
                        //const dbnames= await (await this.open()).executeSql('SELECT * FROM StepCount',[]);
                        //console.log("%%%%%%%%%%%%%%%% database names",dbnames);
                        console.log("*********************** 0th row = ", result.rows.item(0));
                        //console.log("********************************** RESULT = ", result);
                        console.log("********************************** RESULT size = ", result.rows.length);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    FitbitDailyStepMeasure.prototype.fetchData = function (startDate, endDate, includeStatistics, includeToday) {
        return __awaiter(this, void 0, Promise, function () {
            var finalResult2, rangedData, temp, i, base, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.performDatabaseOperation(startDate, endDate)];
                    case 1:
                        finalResult2 = _c.sent();
                        return [4 /*yield*/, _super.prototype.fetchPreliminaryBloodGlucoseData.call(this, startDate, endDate, includeStatistics)];
                    case 2:
                        rangedData = _c.sent();
                        console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv", startDate);
                        console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv", endDate);
                        temp = [];
                        for (i = 0; i < finalResult2.rows.length; i++) {
                            temp.push(finalResult2.rows.item(i));
                            //               console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVV",result.rows.item(i));
                        }
                        console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ", finalResult2);
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", finalResult2.rows.item(0));
                        _a = {
                            source: DataSourceSpec_1.DataSourceType.BloodGlucose,
                            data: temp,
                            range: [startDate, endDate]
                        };
                        if (!(includeToday === true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fetchTodayValue()];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _b = null;
                        _c.label = 5;
                    case 5:
                        base = (_a.today = _b,
                            _a.statistics = [
                                { type: 'avg', value: rangedData.avg },
                                { type: 'total', value: rangedData.sum },
                                { type: 'range', value: [rangedData.min, rangedData.max] }
                                /*
                                {label: STATISTICS_LABEL_AVERAGE + " ", valueText: commaNumber(Math.round(rangedData.avg))},
                                {label: STATISTICS_LABEL_TOTAL + " ", valueText: commaNumber(rangedData.sum)},
                                {label: STATISTICS_LABEL_RANGE+ " ", valueText: commaNumber(rangedData.min) + " - " + commaNumber(rangedData.max)}*/
                            ],
                            _a);
                        // console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",base);
                        return [2 /*return*/, base];
                }
            });
        });
    };
    return FitbitDailyStepMeasure;
}(FitbitSummaryLogMeasure_1.FitbitSummaryLogMeasure));
exports.FitbitDailyStepMeasure = FitbitDailyStepMeasure;
