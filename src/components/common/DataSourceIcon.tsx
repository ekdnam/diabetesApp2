import React from 'react'
import Svg, { Path, Rect } from "react-native-svg"
import { DataSourceType } from '@data-at-hand/core/measure/DataSourceSpec'
import { ViewStyle } from 'react-native'


export const DataSourceIcon = (props: { type: DataSourceType, color: string, size?: number, style?: ViewStyle }) => {
    const size = props.size || 24
    switch (props.type) {

        default:
        case DataSourceType.StepCount:
            return <Svg style={props.style} width={size} height={size} viewBox="0 0 41.83 56.57">
                <Path fill={props.color} d="M16.33,11C16.56,9.44,15.65-1.58,7.19.19-5.24,2.8,1.86,25.41,3.52,28.25l11-2.07C13.7,20.55,15.5,16.4,16.33,11Z" />
                <Path fill={props.color} d="M4,31.56c.92,4,1.31,11.48,8.53,10.06,8-1.57,3.43-9.11,2.72-12.31Z" />
                <Path fill={props.color} d="M34.64,15c-8.46-1.77-9.38,9.25-9.14,10.77.82,5.44,2.63,9.59,1.85,15.22l11,2.07C40,40.18,47.07,17.57,34.64,15Z" />
                <Path fill={props.color} d="M29.31,56.39c7.22,1.42,7.61-6.08,8.52-10.06L26.59,44.08C25.88,47.28,21.29,54.82,29.31,56.39Z" />
            </Svg>

    }
}