"use strict";
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
var react_native_app_auth_1 = require("react-native-app-auth");
var api_1 = require("../api");
var AsyncStorageHelper_1 = require("@utils/AsyncStorageHelper");
var DataService_1 = require("../../DataService");
var time_1 = require("@data-at-hand/core/utils/time");
var database_1 = require("../sqlite/database");
var date_fns_1 = require("date-fns");
var ErrorReportingService_1 = require("@core/logging/ErrorReportingService");
var react_native_path_1 = require("react-native-path");
var STORAGE_KEY_AUTH_STATE = DataService_1.DataService.STORAGE_PREFIX + 'fitbit:state';
var STORAGE_KEY_USER_TIMEZONE = DataService_1.DataService.STORAGE_PREFIX + 'fitbit:user_timezone';
var STORAGE_KEY_USER_ID = DataService_1.DataService.STORAGE_PREFIX + "fitbit:user_id";
var STORAGE_KEY_USER_MEMBER_SINCE = DataService_1.DataService.STORAGE_PREFIX + 'fitbit:user_memberSince';
var STORAGE_KEY_LEFT_QUOTA = DataService_1.DataService.STORAGE_PREFIX + 'fitbit:left_quota';
var STORAGE_KEY_QUOTA_RESET_AT = DataService_1.DataService.STORAGE_PREFIX + 'fitbit:quota_reset_at';
var STORAGE_KEY_GOAL_STEP = DataService_1.DataService.STORAGE_PREFIX + "fitbit:goal:step:daily";
var STORAGE_KEY_GOAL_WEIGHT = DataService_1.DataService.STORAGE_PREFIX + "fitbit:goal:weight";
//const STORAGE_KEY_GOAL_SLEEP_DURATION = DataService.STORAGE_PREFIX + "fitbit:goal:sleep:duration";
var FitbitOfficialServiceCore = /** @class */ (function () {
    function FitbitOfficialServiceCore() {
        this.isQuotaLimited = true;
        this._credential = null;
        this._authConfig = null;
        this._fitbitLocalDbManager = null;
        this._asyncStorage = null;
        this._authenticationFlow = undefined;
        this.getToday = function () {
            return new Date();
        };
        this._lastSyncTimePromise = null;
        this._lastSyncTimeInvokedAt = null;
    }
    FitbitOfficialServiceCore.prototype.isPrefetchAvailable = function () {
        var _a;
        return ((_a = this._credential) === null || _a === void 0 ? void 0 : _a.prefetch_backend_uri) != null;
    };
    FitbitOfficialServiceCore.prototype.getLeftQuota = function () {
        return this.localAsyncStorage.getInt(STORAGE_KEY_LEFT_QUOTA);
    };
    FitbitOfficialServiceCore.prototype.getQuotaResetEpoch = function () {
        return this.localAsyncStorage.getLong(STORAGE_KEY_QUOTA_RESET_AT);
    };
    Object.defineProperty(FitbitOfficialServiceCore.prototype, "fitbitLocalDbManager", {
        get: function () {
            if (this._fitbitLocalDbManager == null) {
                this._fitbitLocalDbManager = new database_1.FitbitLocalDbManager({
                    name: 'fitbit-local-cache.sqlite',
                    location: 'default'
                });
            }
            return this._fitbitLocalDbManager;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FitbitOfficialServiceCore.prototype, "localAsyncStorage", {
        get: function () {
            if (this._asyncStorage == null) {
                this._asyncStorage = new AsyncStorageHelper_1.LocalAsyncStorageHelper("fitbit:official");
            }
            return this._asyncStorage;
        },
        enumerable: false,
        configurable: true
    });
    FitbitOfficialServiceCore.prototype.updateUserProfile = function () {
        return __awaiter(this, void 0, Promise, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchFitbitQuery(api_1.FITBIT_PROFILE_URL)];
                    case 1:
                        profile = _a.sent();
                        if (!(profile != null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_USER_TIMEZONE, profile.user.timezone)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_USER_MEMBER_SINCE, time_1.DateTimeHelper.fromFormattedString(profile.user.memberSince))];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_USER_ID, profile.user.encodedId)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5: return [2 /*return*/, false];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.authenticate = function () {
        var _this = this;
        if (this._authenticationFlow == null) {
            this._authenticationFlow = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var state, newState, e_1, newState, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.localAsyncStorage.getObject(STORAGE_KEY_AUTH_STATE)];
                        case 1:
                            state = _a.sent();
                            if (!state) return [3 /*break*/, 9];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 8, , 9]);
                            console.log("refresh token found. try refreshing it with token...");
                            return [4 /*yield*/, react_native_app_auth_1.refresh(this._authConfig, {
                                    refreshToken: state.refreshToken
                                })];
                        case 3:
                            newState = _a.sent();
                            if (!newState) return [3 /*break*/, 7];
                            console.log("token refresh succeeded.", JSON.stringify(newState));
                            return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_AUTH_STATE, newState)];
                        case 4:
                            _a.sent();
                            if (!(newState.additionalParameters.user_id != null)) return [3 /*break*/, 6];
                            console.log("fitbit id:", newState.additionalParameters.user_id);
                            return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_USER_ID, newState.additionalParameters.user_id)];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6:
                            resolve(newState.accessToken);
                            return [2 /*return*/];
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            e_1 = _a.sent();
                            console.log("token refresh failed. try re-authorize.");
                            console.log(e_1);
                            return [3 /*break*/, 9];
                        case 9:
                            _a.trys.push([9, 14, , 15]);
                            console.log("try re-authorization.");
                            return [4 /*yield*/, react_native_app_auth_1.authorize(this._authConfig)];
                        case 10:
                            newState = _a.sent();
                            return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_AUTH_STATE, newState)];
                        case 11:
                            _a.sent();
                            if (!(newState.tokenAdditionalParameters.user_id != null)) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.localAsyncStorage.set(STORAGE_KEY_USER_ID, newState.tokenAdditionalParameters.user_id)];
                        case 12:
                            _a.sent();
                            _a.label = 13;
                        case 13:
                            resolve(newState.accessToken);
                            return [3 /*break*/, 15];
                        case 14:
                            e_2 = _a.sent();
                            console.log("Authorization failed.");
                            console.log(e_2, JSON.stringify(e_2));
                            ErrorReportingService_1.notifyError(e_2, function (report) {
                                report.context = "Fitbit sign in";
                            });
                            resolve(null);
                            return [3 /*break*/, 15];
                        case 15: return [2 /*return*/];
                    }
                });
            }); }).then(function (res) {
                _this._authenticationFlow = null;
                return res;
            });
        }
        return this._authenticationFlow;
    };
    FitbitOfficialServiceCore.prototype.onCheckSupportedInSystem = function () {
        try {
            this._credential = require('@credentials/fitbit.json');
            this._authConfig = {
                issuer: '',
                scopes: ['profile', 'activity', 'weight', 'sleep', 'heartrate', 'settings'],
                clientId: this._credential.client_id,
                clientSecret: this._credential.client_secret,
                redirectUrl: this._credential.redirect_uri,
                serviceConfiguration: {
                    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
                    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
                    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
                },
                additionalParameters: {
                    expires_in: "31536000",
                    prompt: "none"
                }
            };
            return Promise.resolve({ supported: true });
        }
        catch (e) {
            console.log(e);
            return Promise.resolve({
                supported: false,
                reason: DataService_1.UnSupportedReason.Credential
            });
        }
    };
    FitbitOfficialServiceCore.prototype.signOut = function () {
        return __awaiter(this, void 0, Promise, function () {
            var state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('try fitbit sign out');
                        return [4 /*yield*/, this.localAsyncStorage.getObject(STORAGE_KEY_AUTH_STATE)];
                    case 1:
                        state = _a.sent();
                        if (!state) return [3 /*break*/, 7];
                        return [4 /*yield*/, react_native_app_auth_1.revoke(this._authConfig, {
                                tokenToRevoke: state.refreshToken,
                                includeBasicAuth: true
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.localAsyncStorage.remove(STORAGE_KEY_AUTH_STATE)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.localAsyncStorage.remove(STORAGE_KEY_USER_TIMEZONE)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.localAsyncStorage.remove(STORAGE_KEY_USER_MEMBER_SINCE)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.localAsyncStorage.remove(STORAGE_KEY_USER_ID)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.getFitbitUserId = function () {
        return __awaiter(this, void 0, Promise, function () {
            var cached;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.localAsyncStorage.getString(STORAGE_KEY_USER_ID)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, cached];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.getMembershipStartDate = function () {
        return __awaiter(this, void 0, Promise, function () {
            var cached, updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('get membership start date');
                        return [4 /*yield*/, this.localAsyncStorage.getLong(STORAGE_KEY_USER_MEMBER_SINCE)];
                    case 1:
                        cached = _a.sent();
                        if (!cached) return [3 /*break*/, 2];
                        console.log("use cached membership start date");
                        return [2 /*return*/, cached];
                    case 2:
                        console.log("no cached membership info. update profile.");
                        return [4 /*yield*/, this.updateUserProfile()];
                    case 3:
                        updated = _a.sent();
                        if (updated === true) {
                            return [2 /*return*/, this.getMembershipStartDate()];
                        }
                        else
                            return [2 /*return*/, null];
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchFitbitQuery = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                console.log("@@@ COMMENTED CODE FOR FETCHFITBITQUERY @@@");
                console.log('fetch query for ', url);
                return [2 /*return*/];
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchDataFromPrefetchBackend = function (dataSourceTableType, start, end) {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var fitbitId, fetchResult, _b, crawlLog, data, prefetchedBy, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        if (!(((_a = this._credential) === null || _a === void 0 ? void 0 : _a.prefetch_backend_uri) != null)) return [3 /*break*/, 6];
                        console.log("Try getting prefetched data from server");
                        return [4 /*yield*/, this.getFitbitUserId()];
                    case 1:
                        fitbitId = _c.sent();
                        if (fitbitId == null)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, fetch(react_native_path_1["default"].resolve(this._credential.prefetch_backend_uri, fitbitId, dataSourceTableType) + ("?start=" + start + "&end=" + end), {
                                method: "GET"
                            })];
                    case 2:
                        fetchResult = _c.sent();
                        if (!(fetchResult.status === 200)) return [3 /*break*/, 4];
                        return [4 /*yield*/, fetchResult.json()];
                    case 3:
                        _b = _c.sent(), crawlLog = _b.crawlLog, data = _b.data;
                        prefetchedBy = crawlLog.queried_by_numbered_date;
                        return [2 /*return*/, {
                                queryEndDate: prefetchedBy,
                                queriedAt: crawlLog.queried_at,
                                result: data
                            }];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, null];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_1 = _c.sent();
                        console.log("error while using prefetch server:", err_1);
                        return [2 /*return*/, null];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchImpl = function (dataSourceTableType, start, end, propertyName) {
        return __awaiter(this, void 0, Promise, function () {
            var prefetched;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.fetchDataFromPrefetchBackend(dataSourceTableType, start, end)];
                    case 1:
                        prefetched = _b.sent();
                        console.log("queried ", start, end);
                        if (prefetched) {
                            console.log("prefetched til", prefetched.queryEndDate);
                            //mind the gap between the prefetched server and the queried date
                            return [2 /*return*/, (_a = {}, _a[propertyName] = prefetched.result, _a.queryEndDate = prefetched.queryEndDate, _a)];
                        }
                        else
                            return [2 /*return*/, null];
                        return [2 /*return*/];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchHeartRateDailySummary = function (start, end, prefetchMode) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (prefetchMode) {
                    return [2 /*return*/, this.fetchImpl("heartrate_daily", start, end, "activities-heart")];
                }
                else
                    return [2 /*return*/, this.fetchFitbitQuery(api_1.makeFitbitDayLevelActivityLogsUrl('activities/heart', start, end))];
                return [2 /*return*/];
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchStepDailySummary = function (start, end, prefetchMode) {
        if (prefetchMode) {
            return this.fetchImpl("step_daily", start, end, "activities-steps");
        }
        else
            return this.fetchFitbitQuery(api_1.makeFitbitDayLevelActivityLogsUrl("activities/steps", start, end));
    };
    FitbitOfficialServiceCore.prototype.fetchWeightTrend = function (start, end, prefetchMode) {
        if (prefetchMode) {
            return this.fetchImpl("weight_trend", start, end, "body-weight");
        }
        else
            return this.fetchFitbitQuery(api_1.makeFitbitWeightTrendApiUrl(start, end));
    };
    FitbitOfficialServiceCore.prototype.fetchWeightLogs = function (start, end, prefetchMode) {
        if (prefetchMode) {
            return this.fetchImpl("weight_log", start, end, "weight");
        }
        else
            return this.fetchFitbitQuery(api_1.makeFitbitWeightLogApiUrl(start, end));
    };
    /*fetchSleepLogs(start: number, end: number, prefetchMode: boolean): Promise<FitbitSleepQueryResult> {
        if (prefetchMode) {
            return this.fetchImpl<FitbitSleepQueryResult>("sleep", start, end, "sleep")
        } else return this.fetchFitbitQuery(makeFitbitSleepApiUrl(start, end))
    }*/
    FitbitOfficialServiceCore.prototype.fetchIntradayStepCount = function (date) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchFitbitQuery(api_1.makeFitbitIntradayActivityApiUrl("activities/steps", date))];
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchIntradayHeartRate = function (date) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchFitbitQuery(api_1.makeFitbitHeartRateIntraDayLogApiUrl(date))];
            });
        });
    };
    FitbitOfficialServiceCore.prototype.prefetchIntradayStepCount = function (start, end) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.fetchDataFromPrefetchBackend("step_intraday", start, end)];
            });
        });
    };
    FitbitOfficialServiceCore.prototype.prefetchIntradayHeartRate = function (start, end) {
        return this.fetchDataFromPrefetchBackend("heartrate_intraday", start, end);
    };
    FitbitOfficialServiceCore.prototype.fetchGoalValueImpl = function (storageKey, url, propertyName) {
        return __awaiter(this, void 0, Promise, function () {
            var stored, split, value, queriedAt, queryResult, value, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX In FitbitOfficialServiceCore.ts fetchGoalValueImpl() funation ");
                        return [4 /*yield*/, this.localAsyncStorage.getString(storageKey)];
                    case 1:
                        stored = _a.sent();
                        if (stored != null) {
                            split = stored.split(database_1.INTRADAY_SEPARATOR_BETWEEN);
                            value = Number.parseFloat(split[0]);
                            queriedAt = Number.parseInt(split[1]);
                            if (Date.now() - queriedAt < 36000000) {
                                //people seldom change their goals
                                return [2 /*return*/, value];
                            }
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, this.fetchFitbitQuery(url)];
                    case 3:
                        queryResult = _a.sent();
                        value = void 0;
                        if (queryResult.goal) {
                            value = Number.parseFloat(queryResult.goal[propertyName]);
                        }
                        else if (queryResult.goals) {
                            value = Number.parseFloat(queryResult.goals[propertyName]);
                        }
                        return [4 /*yield*/, this.localAsyncStorage.set(storageKey, value + "|" + Date.now())];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, value];
                    case 5:
                        err_2 = _a.sent();
                        console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX In FitbitOfficialServiceCore.ts fetchGoalValueImpl() function throwing exception", err_2);
                        return [2 /*return*/, undefined];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FitbitOfficialServiceCore.prototype.fetchStepCountGoal = function () {
        console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW In FitbitOfficialServiceCore.ts fetchStepCountGoal() calling fetchGoalValueImpl() ");
        return this.fetchGoalValueImpl(STORAGE_KEY_GOAL_STEP, api_1.FITBIT_DAILY_STEP_GOAL_URL, "steps");
    };
    /*async fetchMinSleepDurationGoal(): Promise<number | undefined> {
        const value = await this.fetchGoalValueImpl(STORAGE_KEY_GOAL_SLEEP_DURATION, FITBIT_SLEEP_GOAL_URL, "minDuration")
        if (value != null) {
            return value * 60
        } else return value
    }*/
    FitbitOfficialServiceCore.prototype.fetchWeightGoal = function () {
        return this.fetchGoalValueImpl(STORAGE_KEY_GOAL_WEIGHT, api_1.FITBIT_WEIGHT_GOAL_URL, "weight");
    };
    FitbitOfficialServiceCore.prototype.fetchLastSyncTime = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (this._lastSyncTimePromise == null || (Date.now() - this._lastSyncTimeInvokedAt) > 5 * 60 * 1000) {
                    this._lastSyncTimePromise = this.getLastSyncTimeImpl();
                    this._lastSyncTimeInvokedAt = Date.now();
                }
                return [2 /*return*/, this._lastSyncTimePromise];
            });
        });
    };
    FitbitOfficialServiceCore.prototype.getLastSyncTimeImpl = function () {
        return __awaiter(this, void 0, Promise, function () {
            var devices, trackerTimes, scaleTimes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchFitbitQuery(api_1.FITBIT_DEVICES_URL)];
                    case 1:
                        devices = _a.sent();
                        trackerTimes = devices.filter(function (d) { return d.type === 'TRACKER'; }).map(function (d) { return date_fns_1.parseISO(d.lastSyncTime); });
                        scaleTimes = devices.filter(function (d) { return d.type === 'SCALE'; }).map(function (d) { return date_fns_1.parseISO(d.lastSyncTime); });
                        return [2 /*return*/, {
                                tracker: date_fns_1.max(trackerTimes),
                                scale: date_fns_1.max(scaleTimes)
                            }];
                }
            });
        });
    };
    return FitbitOfficialServiceCore;
}());
exports["default"] = FitbitOfficialServiceCore;
