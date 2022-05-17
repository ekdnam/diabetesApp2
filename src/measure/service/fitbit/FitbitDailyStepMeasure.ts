import { FitbitDailyActivityStepsQueryResult } from "./types";
import { FitbitSummaryLogMeasure } from "./FitbitSummaryLogMeasure";
import { StepCountRangedData } from "../../../core/exploration/data/types";
import { DataSourceType } from "@data-at-hand/core/measure/DataSourceSpec";
import { FitbitLocalTableName } from "./sqlite/database";
import { DataSourceChartFrame } from "../../../components/exploration/DataSourceChartFrame";
import SQLite, { DatabaseParams } from 'react-native-sqlite-storage';
import React, { useCallback, useMemo } from 'react';

SQLite.DEBUG(false);
SQLite.enablePromise(true);


export class FitbitDailyStepMeasure extends FitbitSummaryLogMeasure<FitbitDailyActivityStepsQueryResult> {

  // protected dbTableName = FitbitLocalTableName.StepCount;
  protected dbTableName = FitbitLocalTableName.BloodGlucose;

  key = 'daily_step'
  displayName = "Step Count"

  protected resourcePropertyKey: string = "activities-steps"

  protected queryFunc(startDate: number, endDate: number, prefetchMode: boolean): Promise<FitbitDailyActivityStepsQueryResult> {
    return this.core.fetchStepDailySummary(startDate, endDate, prefetchMode)
  }

  protected shouldReject(rowValue: number): boolean {
    return rowValue === 0
  }

  protected getLocalRangeQueryCondition(startDate: number, endDate: number): string {
    return super.getLocalRangeQueryCondition(startDate, endDate) + ' AND value > 25'
  }

  protected getQueryResultEntryValue(queryResultEntry: any) {
    return Number.parseInt(queryResultEntry.value)
  }


open(): Promise<SQLite.SQLiteDatabase> {

    console.log("try open the database:", );

    _dbInitPromise = SQLite.openDatabase({ name: 'fitbit-local-cache.sqlite' })
      .then(db => {
        console.log("db opened.")
        return db
          .transaction(tx => {
          }).then(tx => db)
      })
    return _dbInitPromise
  }

async createTableAndInsertRows(): any {

     // await (await this.open()).executeSql('DROP TABLE IF EXISTS blood_glucose_level', []);

     console.log("-------------------------------------- In createTableAndInsertRows() method");

       await (await this.open()).executeSql('CREATE TABLE IF NOT EXISTS blood_glucose_level(dayOfWeek INTEGER, month INTEGER, numberedDate DATE, value INTEGER, year INTEGER)', []);
      // await (await this.open()).executeSql('delete from blood_glucose_level', []);
       //console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ In FitbitDailyStepMeasure.ts all dbrpws deleted ");
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA In FitbitDailyStepMeasure.ts - createTableAndInsertRows() - fetching data from StepCount Table");
        const [resultStepCount] = await (await this.open()).executeSql('select * from StepCount limit 10', []);
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA In FitbitDailyStepMeasure.ts - createTableAndInsertRows() - fetching data from StepCount Table, data = ", resultStepCount.rows.item(0));

         /* row 0 of StepCount data */
         // {"dayOfWeek": 0, "month": 8, "numberedDate": 20120819, "value": 2176, "year": 2012}



//         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA In FitbitDailyStepMeasure.ts - createTableAndInsertRows() - fetching data from StepCountIntraDay Table");
//         const [resultStepCount] = await (await this.open()).executeSql('select * from StepCountIntraDay limit 10', []);
//         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA In FitbitDailyStepMeasure.ts - createTableAndInsertRows() - fetching data from StepCountIntraDay Table, data = ", resultStepCount.rows.item(0));

        /* row 0 of StepCount data */
        // {"hourlySteps": "0|19|0|0|0|12|263|1034|837|124|349|56|299|6|1774|43|206|2722|31|145|122|24|2036|0", "numberedDate": 20220121}

        const [result] = await (await this.open()).executeSql('select dayOfWeek, month, numberedDate, value, year from blood_glucose_level', []);

        if (result.rows.length <= 0)
        {
            console.log("-------------------------------------- 0 rows found in the blood_glucose_level table so inserting dummy rows -> createTableAndInsertRows() ");

            // New dummy data insertion queries
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20210101, 112, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20210102, 83, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20210103, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20210104, 76, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20210105, 141, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20210106, 129, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20210107, 147, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20210108, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20210109, 77, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20210110, 88, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20210111, 107, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20210112, 62, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20210113, 79, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20210114, 117, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20210115, 77, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20210116, 99, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20210117, 65, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20210118, 71, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20210119, 143, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20210120, 62, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20210121, 110, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20210122, 66, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20210123, 83, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20210124, 127, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20210125, 111, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20210126, 147, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20210127, 76, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20210128, 66, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20210129, 63, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20210130, 125, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20210131, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20210201, 119, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20210202, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20210203, 89, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20210204, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20210205, 100, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20210206, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20210207, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20210208, 74, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20210209, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20210210, 61, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20210211, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20210212, 115, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20210213, 60, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20210214, 108, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20210215, 76, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20210216, 121, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20210217, 130, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20210218, 116, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20210219, 128, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20210220, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20210221, 100, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20210222, 134, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20210223, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20210224, 110, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20210225, 143, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20210226, 119, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20210227, 116, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20210228, 107, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20210301, 84, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20210302, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20210303, 82, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20210304, 136, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 3, 20210305, 74, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 3, 20210306, 149, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 3, 20210307, 104, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20210308, 136, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20210309, 141, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20210310, 123, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20210311, 101, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 3, 20210312, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 3, 20210313, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 3, 20210314, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20210315, 88, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20210316, 114, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20210317, 73, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20210318, 77, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 3, 20210319, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 3, 20210320, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 3, 20210321, 146, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20210322, 86, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20210323, 75, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20210324, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20210325, 73, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 3, 20210326, 131, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 3, 20210327, 136, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 3, 20210328, 113, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20210329, 143, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20210330, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20210331, 107, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 4, 20210401, 94, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 4, 20210402, 86, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 4, 20210403, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 4, 20210404, 115, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 4, 20210405, 114, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 4, 20210406, 91, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 4, 20210407, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 4, 20210408, 67, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 4, 20210409, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 4, 20210410, 105, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 4, 20210411, 74, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 4, 20210412, 96, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 4, 20210413, 115, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 4, 20210414, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 4, 20210415, 77, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 4, 20210416, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 4, 20210417, 85, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 4, 20210418, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 4, 20210419, 145, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 4, 20210420, 91, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 4, 20210421, 70, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 4, 20210422, 134, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 4, 20210423, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 4, 20210424, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 4, 20210425, 143, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 4, 20210426, 72, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 4, 20210427, 62, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 4, 20210428, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 4, 20210429, 71, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 4, 20210430, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 5, 20210501, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 5, 20210502, 73, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 5, 20210503, 80, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 5, 20210504, 134, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 5, 20210505, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 5, 20210506, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 5, 20210507, 61, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 5, 20210508, 107, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 5, 20210509, 128, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 5, 20210510, 89, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 5, 20210511, 72, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 5, 20210512, 91, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 5, 20210513, 74, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 5, 20210514, 118, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 5, 20210515, 63, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 5, 20210516, 146, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 5, 20210517, 133, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 5, 20210518, 124, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 5, 20210519, 119, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 5, 20210520, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 5, 20210521, 87, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 5, 20210522, 66, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 5, 20210523, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 5, 20210524, 64, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 5, 20210525, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 5, 20210526, 143, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 5, 20210527, 148, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 5, 20210528, 136, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 5, 20210529, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 5, 20210530, 142, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 5, 20210531, 71, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 6, 20210601, 71, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 6, 20210602, 138, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 6, 20210603, 96, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 6, 20210604, 99, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 6, 20210605, 86, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 6, 20210606, 76, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 6, 20210607, 97, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 6, 20210608, 116, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 6, 20210609, 117, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 6, 20210610, 101, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 6, 20210611, 110, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 6, 20210612, 123, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 6, 20210613, 137, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 6, 20210614, 61, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 6, 20210615, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 6, 20210616, 109, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 6, 20210617, 63, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 6, 20210618, 131, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 6, 20210619, 119, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 6, 20210620, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 6, 20210621, 105, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 6, 20210622, 89, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 6, 20210623, 66, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 6, 20210624, 111, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 6, 20210625, 108, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 6, 20210626, 77, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 6, 20210627, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 6, 20210628, 84, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 6, 20210629, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 6, 20210630, 97, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 7, 20210701, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 7, 20210702, 98, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 7, 20210703, 67, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 7, 20210704, 134, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 7, 20210705, 104, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 7, 20210706, 129, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 7, 20210707, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 7, 20210708, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 7, 20210709, 118, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 7, 20210710, 81, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 7, 20210711, 72, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 7, 20210712, 80, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 7, 20210713, 79, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 7, 20210714, 146, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 7, 20210715, 124, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 7, 20210716, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 7, 20210717, 77, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 7, 20210718, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 7, 20210719, 112, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 7, 20210720, 117, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 7, 20210721, 133, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 7, 20210722, 113, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 7, 20210723, 145, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 7, 20210724, 71, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 7, 20210725, 62, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 7, 20210726, 99, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 7, 20210727, 123, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 7, 20210728, 131, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 7, 20210729, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 7, 20210730, 67, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 7, 20210731, 101, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 8, 20210801, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 8, 20210802, 116, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 8, 20210803, 122, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 8, 20210804, 122, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 8, 20210805, 121, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 8, 20210806, 87, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 8, 20210807, 118, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 8, 20210808, 83, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 8, 20210809, 145, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 8, 20210810, 142, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 8, 20210811, 136, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 8, 20210812, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 8, 20210813, 127, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 8, 20210814, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 8, 20210815, 61, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 8, 20210816, 73, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 8, 20210817, 102, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 8, 20210818, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 8, 20210819, 131, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 8, 20210820, 73, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 8, 20210821, 75, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 8, 20210822, 133, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 8, 20210823, 86, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 8, 20210824, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 8, 20210825, 78, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 8, 20210826, 146, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 8, 20210827, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 8, 20210828, 79, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 8, 20210829, 83, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 8, 20210830, 91, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 8, 20210831, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 9, 20210901, 102, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 9, 20210902, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 9, 20210903, 100, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 9, 20210904, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 9, 20210905, 63, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 9, 20210906, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 9, 20210907, 127, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 9, 20210908, 147, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 9, 20210909, 69, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 9, 20210910, 79, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 9, 20210911, 121, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 9, 20210912, 60, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 9, 20210913, 97, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 9, 20210914, 70, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 9, 20210915, 128, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 9, 20210916, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 9, 20210917, 134, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 9, 20210918, 142, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 9, 20210919, 139, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 9, 20210920, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 9, 20210921, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 9, 20210922, 138, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 9, 20210923, 99, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 9, 20210924, 118, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 9, 20210925, 145, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 9, 20210926, 109, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 9, 20210927, 83, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 9, 20210928, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 9, 20210929, 85, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 9, 20210930, 65, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 10, 20211001, 113, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 10, 20211002, 115, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 10, 20211003, 60, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 10, 20211004, 122, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 10, 20211005, 100, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 10, 20211006, 107, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 10, 20211007, 123, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 10, 20211008, 89, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 10, 20211009, 112, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 10, 20211010, 116, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 10, 20211011, 88, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 10, 20211012, 93, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 10, 20211013, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 10, 20211014, 149, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 10, 20211015, 81, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 10, 20211016, 86, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 10, 20211017, 74, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 10, 20211018, 130, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 10, 20211019, 146, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 10, 20211020, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 10, 20211021, 141, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 10, 20211022, 88, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 10, 20211023, 112, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 10, 20211024, 113, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 10, 20211025, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 10, 20211026, 115, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 10, 20211027, 133, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 10, 20211028, 129, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 10, 20211029, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 10, 20211030, 138, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 10, 20211031, 128, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 11, 20211101, 148, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 11, 20211102, 128, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 11, 20211103, 89, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 11, 20211104, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 11, 20211105, 83, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 11, 20211106, 138, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 11, 20211107, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 11, 20211108, 102, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 11, 20211109, 150, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 11, 20211110, 135, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 11, 20211111, 127, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 11, 20211112, 100, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 11, 20211113, 109, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 11, 20211114, 121, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 11, 20211115, 119, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 11, 20211116, 111, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 11, 20211117, 130, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 11, 20211118, 63, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 11, 20211119, 102, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 11, 20211120, 118, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 11, 20211121, 91, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 11, 20211122, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 11, 20211123, 87, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 11, 20211124, 95, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 11, 20211125, 70, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 11, 20211126, 78, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 11, 20211127, 130, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 11, 20211128, 129, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 11, 20211129, 110, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 11, 20211130, 60, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 12, 20211201, 68, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 12, 20211202, 103, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 12, 20211203, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 12, 20211204, 131, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 12, 20211205, 136, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 12, 20211206, 111, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 12, 20211207, 94, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 12, 20211208, 101, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 12, 20211209, 132, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 12, 20211210, 100, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 12, 20211211, 92, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 12, 20211212, 126, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 12, 20211213, 60, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 12, 20211214, 114, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 12, 20211215, 92, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 12, 20211216, 106, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 12, 20211217, 147, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 12, 20211218, 90, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 12, 20211219, 147, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 12, 20211220, 128, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 12, 20211221, 79, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 12, 20211222, 74, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 12, 20211223, 120, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 12, 20211224, 123, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 12, 20211225, 71, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 12, 20211226, 112, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 12, 20211227, 103, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 12, 20211228, 75, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 12, 20211229, 127, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 12, 20211230, 121, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 12, 20211231, 76, 2021]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20220101, 93, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20220102, 147, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20220103, 71, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20220104, 128, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20220105, 125, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20220106, 88, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20220107, 64, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20220108, 138, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20220109, 147, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20220110, 149, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20220111, 124, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20220112, 148, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20220113, 134, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20220114, 133, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20220115, 116, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20220116, 60, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20220117, 116, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20220118, 73, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20220119, 90, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20220120, 123, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20220121, 92, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20220122, 109, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20220123, 72, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20220124, 137, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 1, 20220125, 73, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 1, 20220126, 142, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 1, 20220127, 96, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 1, 20220128, 60, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 1, 20220129, 93, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 1, 20220130, 136, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 1, 20220131, 109, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20220201, 89, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20220202, 133, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20220203, 132, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20220204, 110, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20220205, 128, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220206, 114, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20220207, 95, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20220208, 120, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20220209, 70, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20220210, 130, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20220211, 98, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20220212, 138, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220213, 77, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20220214, 122, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20220215, 127, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20220216, 89, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20220217, 149, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20220218, 133, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20220219, 115, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220220, 91, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20220221, 102, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 2, 20220222, 111, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 2, 20220223, 125, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 2, 20220224, 110, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 2, 20220225, 79, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 2, 20220226, 80, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 2, 20220227, 86, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 2, 20220228, 149, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20220301, 88, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20220302, 78, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20220303, 67, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 3, 20220304, 117, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 3, 20220305, 68, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 3, 20220306, 128, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20220307, 108, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20220308, 190, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20220309, 195, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20220310, 190, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 3, 20220311, 145, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 3, 20220312, 210, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 3, 20220313, 172, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 3, 20220314, 160, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 3, 20220315, 186, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 3, 20220316, 170, 2022]);
//             await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 3, 20220317, 135, 2022]);

// inserting data for 10thMay - 17th May
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 5, 20220510, 120, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 3, 5, 20220511, 120, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 4, 5, 20220512, 120, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 5, 5, 20220513, 117, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 6, 5, 20220514, 110, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 0, 5, 20220515, 128, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 1, 5, 20220516, 108, 2022]);
            await (await this.open()).executeSql('INSERT INTO blood_glucose_level ( dayOfWeek, month, numberedDate, value, year) VALUES (?,?,?,?,?)', [ 2, 5, 20220517, 190, 2022]);


        }
        else
        {
            console.log("-------------------------------------- 0 rows found in the blood_glucose_level table so inserting dummy rows -> createTableAndInsertRows() ");
        }
}

async performDatabaseOperation(startDate: number, endDate: number) : any {

      this.createTableAndInsertRows();

      console.log("-------------------------------------- Fetching data from table performDatabaseOperation()");

      const [result] = await (await this.open()).executeSql('select dayOfWeek, month, numberedDate, value, year from blood_glucose_level where numberedDate BETWEEN ? and ?',
                                                                                [startDate,endDate]);
      //const dbnames= await (await this.open()).executeSql('SELECT * FROM StepCount',[]);

      //console.log("%%%%%%%%%%%%%%%% database names",dbnames);


      console.log("*********************** 0th row = ", result.rows.item(0));
      //console.log("********************************** RESULT = ", result);
      console.log("********************************** RESULT size = ", result.rows.length);
      return result;
}



  async fetchData(startDate: number, endDate: number, includeStatistics: boolean, includeToday: boolean): Promise<StepCountRangedData> {
    //const rangedData = await super.fetchPreliminaryData(startDate, endDate, includeStatistics)

    let finalResult2 = await this.performDatabaseOperation(startDate, endDate);

    const rangedData = await super.fetchPreliminaryBloodGlucoseData(startDate, endDate, includeStatistics)

       console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv",startDate);
        console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVv",endDate);

     /* let finalResult = [];
     console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",finalResult2);
    const result2 = this.performDatabaseOperation().then(
            (result) => {
                    // if (result != null){

                    for (let i = 0; i < result.rows.length; i++)
                    {
                        finalResult.push(result.rows.item(i));
                        //console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVV",result.rows.item(i));
                    }
                   },
                              (onRejected) => {
                                      console.log("PerformDatabaseOperation() -> Promise rejected ", onRejected);
                                  }
             );*/

    let temp = [];
    for (let i = 0; i < finalResult2.rows.length; i++)
         {
              temp.push(finalResult2.rows.item(i));
//               console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVV",result.rows.item(i));
         }

    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ In FitbitDailyStepMeasure.ts - fetchData() finalResult2 = ",finalResult2);
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ",finalResult2);
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",finalResult2.rows.item(0));




    const base = {
      source: DataSourceType.BloodGlucose,
      data: temp,
      range: [startDate, endDate],
      today: includeToday === true ? await this.fetchTodayValue() : null,
      statistics: [
        { type: 'avg', value: rangedData.avg },
        { type: 'total', value: rangedData.sum },
        { type: 'range', value: [rangedData.min, rangedData.max] }
        /*
        {label: STATISTICS_LABEL_AVERAGE + " ", valueText: commaNumber(Math.round(rangedData.avg))},
        {label: STATISTICS_LABEL_TOTAL + " ", valueText: commaNumber(rangedData.sum)},
        {label: STATISTICS_LABEL_RANGE+ " ", valueText: commaNumber(rangedData.min) + " - " + commaNumber(rangedData.max)}*/
      ]
    } as StepCountRangedData

    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZH In FitbitDailyStepMeasure.ts - fetchData() statistics = ", base.statistics);
    console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",base);

    // console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII",base);
    return base
  }
}
