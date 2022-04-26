import SQLite, { DatabaseParams } from 'react-native-sqlite-storage';
import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@style/Colors';
import { Sizes } from '@style/Sizes';
import { DataSourceType, MeasureUnitType } from '@data-at-hand/core/measure/DataSourceSpec';
import { DataSourceManager } from '@measure/DataSourceManager';
import { OverviewSourceRow, StatisticsType, WeightRangedData } from '@core/exploration/data/types';
import commaNumber from 'comma-number';
import { DateTimeHelper } from '@data-at-hand/core/utils/time';
import { startOfDay, addSeconds, format } from 'date-fns';
import { scaleLinear } from 'd3-scale';
import { DataDrivenQuery } from '@data-at-hand/core/exploration/ExplorationInfo';
import { DataSourceIcon } from '@components/common/DataSourceIcon';
import { DailyBarChart } from '@components/visualization/browse/DailyBarChart';
import { DailyHeartRateChart } from '@components/visualization/browse/DailyHeartRateChart';
import { DailySleepRangeChart } from '@components/visualization/browse/DailySleepRangeChart';
import { DailyWeightChart } from '@components/visualization/browse/DailyWeightChart';
import { StyleTemplates } from '@style/Styles';
import { useSelector } from 'react-redux';
import { ReduxAppState } from '@state/types';

SQLite.DEBUG(false);
SQLite.enablePromise(true);

const lightTextColor = "#8b8b8b"

export const HEADER_HEIGHT = 60
export const FOOTER_HEIGHT = 52

const containerStyle = {
    backgroundColor: Colors.WHITE,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.07
}

const styles = StyleSheet.create({
    containerStyle: containerStyle,
    containerStyleFlat: {
        ...containerStyle,
        shadowOffset: undefined,
        shadowColor: undefined,
        shadowRadius: undefined,
        shadowOpacity: undefined,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 6,
        paddingTop: 16
    },

    headerStyle: {
        height: HEADER_HEIGHT,
        flexDirection: "row",
        alignItems: 'center',
    },

    headerTitleStyle: {
        fontWeight: 'bold',
        color: Colors.textColorLight,
        fontSize: Sizes.normalFontSize,
        flex: 1
    },

    headerClickRegionWrapperStyle: { flex: 1, marginRight: 15 },

    headerClickRegionStyle: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', height: HEADER_HEIGHT },

    headerDescriptionTextStyle: {
        fontWeight: '500',
        color: lightTextColor,
        fontSize: 14
    },

    todayButtonStyle: {
        height: HEADER_HEIGHT * 0.7, justifyContent: 'center',
        paddingRight: Sizes.horizontalPadding, paddingLeft: Sizes.horizontalPadding
    },

    todayUnitStyle: {
        fontWeight: '300',
        color: '#9B9B9B'
    },

    todayValueStyle: {
        color: Colors.today,
        fontWeight: 'bold'
    },

    iconStyle: {
        marginLeft: Sizes.horizontalPadding,
        marginRight: 8,
    },

    chartAreaStyle: {
        padding: 0,
        aspectRatio: 3
    },

    footerStyle: {
        ...StyleTemplates.flexHorizontalCenteredListContainer,
        padding: Sizes.horizontalPadding,
        justifyContent: 'space-around',
        height: FOOTER_HEIGHT
    },

    statValueStyle: {
        fontSize: 14,
        fontWeight: '500',
        color: lightTextColor
    },

    statLabelStyle: {
        fontSize: Sizes.tinyFontSize,
        color: '#Bababa',
        fontWeight: 'normal'
    }
})

var lengthVar;
var range_start;
var range_end;
var sum;
var avg_value;

export interface TodayInfo {
    label: string;
    formatted: Array<{ text: string; type: 'unit' | 'value' }> | null;
}

function formatTodayValue(dataSource: DataSourceType, todayData: number | [number, number] | null, unitType: MeasureUnitType): TodayInfo {
    const info = {

    } as TodayInfo

    switch (dataSource) {

        default: info.label = "Today"
            break;
    }

    switch (dataSource) {
        case DataSourceType.StepCount:
            info.formatted = todayData != null ? [
                {
                    text: commaNumber(todayData as number),
                    type: 'value',
                },
                { text: ' mg/dL', type: 'unit' },
            ] : null


            break;
        case DataSourceType.BloodGlucose:
            info.formatted = todayData != null ? [
                {
                    text: commaNumber(todayData as number),
                    type: 'value',
                },
                { text: ' mg/dL', type: 'unit' },
            ] : null

            break;
    }
    //console.log("%%%%%%%%%%%%%%%%%%%%%5");
    //console.log(info);
    return info
}

function getStatisticsLabel(type: StatisticsType): string {
    switch (type) {
        case 'avg': return "Avg."
        case 'range': return 'Range'
        case 'total': return 'Total'
        case 'bedtime': return 'Avg. Bedtime'
        case 'waketime': return 'Avg. Wake Time'

    }
}

function formatStatistics(sourceType: DataSourceType, statisticsType: StatisticsType, measureUnitType: MeasureUnitType, value: any): string {
    switch (sourceType) {
        case DataSourceType.StepCount:
            switch (statisticsType) {
                case "avg": return commaNumber(Math.round(value));
                case "range": return commaNumber(value[0]) + " - " + commaNumber(value[1])
                case "total": return commaNumber(value)
            break;



            }
        case DataSourceType.BloodGlucose:
            switch (statisticsType) {
                case "avg": return commaNumber(Math.round(value));
                case "range": return commaNumber(value[0]) + " - " + commaNumber(value[1])
                case "total": return commaNumber(value)
                break;
            }
       }
}

function getChartView(sourceType: DataSourceType, data: OverviewSourceRow, query: DataDrivenQuery | undefined, highlightedDays: { [key: number]: boolean | undefined } | undefined): any {

    //console.log("************************************************ We are starting with DB operation ");
    //let dailyBarChart = <></>;
    const commonP= {
             preferredValueRange: data.preferredValueRange,
             dataDrivenQuery: query,
             highlightedDays: highlightedDays,
             dateRange: data.range,
             data: data.data,
             goalValue: data.goal
             }

    console.log("@@@@@@@@@@@@@@@@@@@@DataSourceChartFrame getChartView data.data ===== ",data.data);
    console.log("####################DataSourceChartFrame getChartView data.preferredValueRange ===== ",data.preferredValueRange);
    //var abc;
    /*const result2 = performDatabaseOperation().then(
        (result) => {
                // if (result != null){
                let finalResult = [];
                for (let i = 0; i < result.rows.length; i++)
                {
                    finalResult.push(result.rows.item(i));
                    //console.log(result.rows.item(i));
                }

                          data.data = finalResult;
//                         }
//                         else
//                             data.data = result;


                      //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

                      /*const commonP= {
                            preferredValueRange: data.preferredValueRange,
                            dataDrivenQuery: query,
                            highlightedDays: highlightedDays,
                            dateRange: data.range,
                            data: data.data,
                            goalValue: data.goal
                        }*/
                         //const data1 = commonP.data
                        //console.log(data1);
                        // console.log("Range : "+data.data);
                        /* lengthVar = data.data.length;
                        // console.log("Size 11111111111111111 : "+data.data.length);
                        sum=0;
                        for(let i=0;i<data.data.length;i++)
                        {
                           sum=sum+data.data[i].value;
                        }
                        // console.log("Total : "+sum);
                        // console.log("Avg: "+Math.round((sum/lengthVar)));

                       range_start = data.data[0].value;
                       range_end = data.data[lengthVar-1].value;
                       avg_value = Math.round(sum/lengthVar);
                       // console.log(range_start+" - "+range_end);
                       // console.log("avg : "+avg_value);*/
                    //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Returning from getChartView() ", result);
                    //console.log("DataSourceType =  ", sourceType);
                    /*switch (sourceType) {
                        case DataSourceType.StepCount:
                            //console.log("Returning final DailyBarChart");
                           /* abc =  <DailyBarChart
                                          {...commonP}
                                          dataSource={DataSourceType.StepCount}
                                          valueTickFormat={(tick: number) => { return (tick % 1000 === 0 && tick != 0) ? tick / 1000 + "k" : commaNumber(tick) }} />
                            //console.log(dailyBarChart);*/
                   /*         //return dailyBarChart;
                    }
            },
            (onRejected) => {
                    //console.log("DailChartFrrmae PerformDatabaseOperation() -> Promise rejected ", onRejected);
                }
    );*/
//     console.log("result returned from performDatabaseOperation() = ", result);
//     console.log("************************************************ Done with DB operation ");

    //console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++"+result2);



     /*return <DailyHeartRateChart
                     {...commonProps}
                     dataSource={DataSourceType.HeartRate}/>*/
     return <DailyBarChart
               {...commonP}
               dataSource={DataSourceType.BloodGlucose}
               valueTickFormat={(tick: number) => { return (tick % 1000 === 0 && tick != 0) ? tick / 1000 + "k" : commaNumber(tick) }} />


     // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
     // console.log(data.data);
    // console.log("############################3 Result2 = ", result2)

}

export const DataSourceChartFrame = React.memo((props: {
    data: OverviewSourceRow,
    filter: DataDrivenQuery,
    highlightedDays?: { [key: number]: boolean | undefined }
    showToday?: boolean
    flat?: boolean
    showHeader?: boolean
    onHeaderPressed?: (source: DataSourceType) => void
    onTodayPressed?: (source: DataSourceType) => void
}) => {

    const onHeaderPress = useCallback(() => props.onHeaderPressed && props.onHeaderPressed(props.data.source), [props.onHeaderPressed, props.data.source])
    const onTodayPress = useCallback(() => props.onTodayPressed && props.onTodayPressed(props.data.source), [props.onTodayPressed, props.data.source])


    const spec = DataSourceManager.instance.getSpec(props.data.source)
    console.log("~~~ In DataSourceChartFrame.tsx - props.data.source = ", props.data.source);
    console.log("~~~ In DataSourceChartFrame.tsx - spec = ", spec);

    const measureUnitType = useSelector((appState: ReduxAppState) => appState.settingsState.unit)

    const todayInfo = useMemo(() => formatTodayValue(props.data.source, props.data.today, measureUnitType),
        [props.data.source, props.data.today, measureUnitType])

    //console.log("((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))) ", getChartView(spec.type, props.data, props.filter, props.highlightedDays));

    console.log("&*&*&* In DataSourceChartFrame.tsx props.data.statistics = ", props.data.statistics);

    return <View style={props.flat === true ? styles.containerStyleFlat : styles.containerStyle}>
        {props.showHeader !== false ?
            <View style={styles.headerStyle}>
                <View style={styles.headerClickRegionWrapperStyle}>
                    <TouchableOpacity onPress={onHeaderPress} disabled={props.onHeaderPressed == null} activeOpacity={0.7} style={styles.headerClickRegionStyle}>
                        <DataSourceIcon style={styles.iconStyle} size={18} type={props.data.source} color={Colors.accent} />
                        <Text style={styles.headerTitleStyle}>{spec.name}</Text>
                    </TouchableOpacity>
                </View>

                {
                    props.showToday !== false && props.data.today != null ?
                        <TouchableOpacity style={styles.todayButtonStyle}
                            onPress={onTodayPress} disabled={props.onTodayPressed == null}><Text style={styles.headerDescriptionTextStyle}>
                                <Text>{todayInfo.label + ": "}</Text>
                                {
                                    todayInfo.formatted != null ? todayInfo.formatted.map((chunk, index) =>
                                        <Text key={index} style={chunk.type === 'unit' ? styles.todayUnitStyle : styles.todayValueStyle}>{chunk.text}</Text>)
                                        :
                                        (<Text style={styles.todayValueStyle}>no value</Text>)
                                }
                            </Text></TouchableOpacity> : <></>
                }
            </View> : null}
        {
            getChartView(spec.type, props.data, props.filter, props.highlightedDays)
        }
        <View style={styles.footerStyle}>{
            props.data.statistics && props.data.statistics.map(
            function(stat) {
                if (stat.type != "total")
                {
                    return <Text key={stat.type} style={styles.statValueStyle}>
                        <Text style={styles.statLabelStyle}>{getStatisticsLabel(stat.type) + " "}</Text>
                        <Text>{stat.value != null && (typeof stat.value == "number" || (stat.value[0] != null && stat.value[1] != null)) ? formatStatistics(props.data.source, stat.type, measureUnitType, stat.value) : "no value"}</Text>
                    </Text>
                }
            }
//             stat => {
//                 return <Text key={stat.type} style={styles.statValueStyle}>
//                     <Text style={styles.statLabelStyle}>{getStatisticsLabel(stat.type) + " "}</Text>
//                     <Text>{stat.value != null && (typeof stat.value == "number" || (stat.value[0] != null && stat.value[1] != null)) ? formatStatistics(props.data.source, stat.type, measureUnitType, stat.value) : "no value"}</Text>
//                 </Text>
//             }
)
        }
        </View>
    </View >
})