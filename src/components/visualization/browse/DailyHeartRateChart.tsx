import React, {useContext, useMemo} from 'react';
import {Circle, Line, Path, G} from 'react-native-svg';
import {
    CommonBrowsingChartStyles,
    ChartProps,
    getChartElementColor,
    getChartElementOpacity,
    DateRangeScaleContext,
} from './common';
import {AxisSvg} from '@components/visualization/axis';
import {Padding} from '@components/visualization/types';
import {DateBandAxis} from './DateBandAxis';
import {scaleLinear} from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Shape from 'd3-shape';
import Colors from '@style/Colors';
import {BandScaleChartTouchHandler} from './BandScaleChartTouchHandler';
import {
    coverValueInRange,
    clusterSortedNumbers,
} from '@data-at-hand/core/utils';
import {TodayContext} from '@components/pages/exploration/contexts';
import {PointFallbackCircle} from './PointFallbackCircle';

export const DailyHeartRateChart = React.memo((prop: ChartProps) => {
    const {
        shouldHighlightElements,
        highlightReference,
    } = CommonBrowsingChartStyles.makeHighlightInformation(
        prop,
        prop.dataSource,
    );

    console.log('highlightReference:', highlightReference);
    console.log('DAILY_HEART_CHART_PROP::::: ', prop);

    /* 
    {"data": [
    {"dayOfWeek": 1, "month": 1, "numberedDate": 20220131, "value": 55, "year": 2022}, 
    {"dayOfWeek": 2, "month": 2, "numberedDate": 20220201, "value": 55, "year": 2022}, 
    {"dayOfWeek": 3, "month": 2, "numberedDate": 20220202, "value": 55, "year": 2022}, 
    {"dayOfWeek": 4, "month": 2, "numberedDate": 20220203, "value": 56, "year": 2022}, 
    {"dayOfWeek": 5, "month": 2, "numberedDate": 20220204, "value": 55, "year": 2022}, 
    {"dayOfWeek": 6, "month": 2, "numberedDate": 20220205, "value": 56, "year": 2022}, 
    {"dayOfWeek": 0, "month": 2, "numberedDate": 20220206, "value": 56, "year": 2022}
    ], 
    "dataDrivenQuery": undefined, 
    "dataSource": "heart_rate", 
    "dateRange": [20220131, 20220206], 
    "goalValue": undefined, 
    "highlightedDays": undefined, 
    "preferredValueRange": [51, 63]
    }
    */
    const myData = [
        {
            dayOfWeek: 1,
            month: 1,
            numberedDate: 20220131,
            value: 120,
            year: 2022,
        },
        {
            dayOfWeek: 2,
            month: 2,
            numberedDate: 20220201,
            value: 126,
            year: 2022,
        },
        {
            dayOfWeek: 3,
            month: 2,
            numberedDate: 20220202,
            value: 134,
            year: 2022,
        },
        {dayOfWeek: 4, month: 2, numberedDate: 20220203, value: 97, year: 2022},
        {
            dayOfWeek: 5,
            month: 2,
            numberedDate: 20220204,
            value: 130,
            year: 2022,
        },
        {
            dayOfWeek: 6,
            month: 2,
            numberedDate: 20220205,
            value: 120,
            year: 2022,
        },
        {
            dayOfWeek: 0,
            month: 2,
            numberedDate: 20220206,
            value: 145,
            year: 2022,
        },
    ];

    prop.data = myData
    const myPreferredValueRange = [110, 125];
    const today = useContext(TodayContext);

    const chartArea = CommonBrowsingChartStyles.CHART_AREA;

    const scaleX =
        useContext(DateRangeScaleContext) ||
        CommonBrowsingChartStyles.makeDateScale(
            undefined,
            prop.dateRange[0],
            prop.dateRange[1],
        );

    const xTickFormat = CommonBrowsingChartStyles.dateTickFormat(today);

    const valueMin = Math.min(
        d3Array.min(myData, (d) => d.value)!,
        myPreferredValueRange[0] || Number.MAX_SAFE_INTEGER,
    );
    const valueMax = Math.max(
        d3Array.max(myData, (d) => d.value)!,
        myPreferredValueRange[1] || Number.MIN_SAFE_INTEGER,
    );

    const scaleY = scaleLinear()
        .domain(
            coverValueInRange([valueMin - 1, valueMax + 1], highlightReference),
        )
        .range([chartArea.height, 0])
        .nice();

    const line = d3Shape
        .line<{value: number; numberedDate: number}>()
        .x((d) => scaleX(d.numberedDate)! + scaleX.bandwidth() * 0.5)
        .y((d) => scaleY(d.value))
        .curve(d3Shape.curveCardinal);

    const avg = d3Array.mean(myData, (d) => d.value)!;

    const clusters = useMemo(() => {
        if (myData.length === scaleX.domain().length) {
            return [myData];
        } else {
            const clusteredIndices = clusterSortedNumbers(
                myData.map((d) => scaleX.domain().indexOf(d.numberedDate)),
            );

            let pointer = 0;
            const clusters = clusteredIndices.map((indexCluster) => {
                const cluster = indexCluster.map(
                    (index: number, order: number) => {
                        return myData[pointer + order];
                    },
                );
                pointer += indexCluster.length;
                return cluster;
            });
            return clusters;
        }
    }, [prop.dateRange, myData, scaleX]);

    return (
        <BandScaleChartTouchHandler
            chartContainerWidth={CommonBrowsingChartStyles.CHART_WIDTH}
            chartContainerHeight={CommonBrowsingChartStyles.CHART_HEIGHT}
            chartArea={chartArea}
            scaleX={scaleX}
            dataSource={prop.dataSource}
            getValueOfDate={(date) =>
                myData.find((d) => d.numberedDate === date)?.value
            }
            highlightedDays={
                prop.dataDrivenQuery != null ? prop.highlightedDays : undefined
            }>
            <DateBandAxis
                key="xAxis"
                scale={scaleX}
                dateSequence={scaleX.domain()}
                today={today}
                tickFormat={xTickFormat}
                chartArea={chartArea}
            />
            <AxisSvg
                key="yAxis"
                tickMargin={0}
                ticks={scaleY.ticks(5)}
                chartArea={chartArea}
                scale={scaleY}
                position={Padding.Left}
            />
            <G pointerEvents="none" {...chartArea}>
                {clusters.map((cluster, i) => {
                    return (
                        <Path
                            key={i.toString()}
                            d={line(cluster)!}
                            strokeWidth={2.5}
                            fill="transparent"
                            stroke={Colors.chartElementDefault}
                            opacity={0.3}
                        />
                    );
                })}
                {myData.map((d) => {
                    return (
                        <PointFallbackCircle
                            key={d.numberedDate}
                            x={
                                scaleX(d.numberedDate)! +
                                scaleX.bandwidth() * 0.5
                            }
                            y={scaleY(d.value)}
                            r={Math.min(scaleX.bandwidth(), 8) / 2}
                            strokeWidth={2}
                            fill={Colors.WHITE}
                            stroke={getChartElementColor(
                                shouldHighlightElements,
                                prop.highlightedDays
                                    ? prop.highlightedDays[d.numberedDate] ==
                                          true
                                    : false,
                                today === d.numberedDate,
                            )}
                            opacity={getChartElementOpacity(
                                today === d.numberedDate,
                            )}
                            thresholdRadius={1}
                        />
                    );
                })}
                {Number.isNaN(avg) === false && (
                    <Line
                        x1={0}
                        x2={chartArea.width}
                        y={scaleY(avg)}
                        stroke={Colors.chartAvgLineColor}
                        strokeWidth={
                            CommonBrowsingChartStyles.AVERAGE_LINE_WIDTH
                        }
                        strokeDasharray={'2'}
                    />
                )}
            </G>
        </BandScaleChartTouchHandler>
    );
});
