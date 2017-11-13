import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import ChartView from 'react-native-highcharts';

export default class Floor extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            config: {
                chart: {
                    type: 'spline',
                    marginRight: 30
                },
                title: {
                    text: 'Real Time Position Tracking'
                },
                xAxis: {
                    title: {
                        enabled: true,
                        text: 'Width'
                    },
                    gridLineWidth: 1
                },
                yAxis: {
                    title: {
                        text: 'Height'
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'position: [{point.x} , {point.y}]'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                exporting: {
                    enabled: true
                },
                series: [{
                    name: 'Office Area1',
                    data: [[0, 0], [6, 0], [6, 48], [0, 48],[0,0]],
                    enableMouseTracking: false
                },{
                    name: 'Office Area2',
                    data: [[10, 0], [53, 0], [53, 6], [10, 6], [10, 0]],
                    enableMouseTracking: false
                },{
                    name: 'Office Area3',
                    data: [[10, 10], [22, 10], [22, 48], [10, 48],[10, 10]],
                    enableMouseTracking: false
                },{
                    name: 'Office Area4',
                    data: [[29, 10], [53, 10], [53, 94], [29, 94], [29, 10]],
                    enableMouseTracking: false
                },{
                    name: 'Office Area5',
                    data: [[0, 53], [22, 53], [22, 90],[15,90],[15,94], [0, 94], [0, 53]],
                    enableMouseTracking: false
                },{
                    name: 'Observations',
                }]
            }
        }
    }
    render() {
        return (
            <View>
                <ChartView style={{height:300}} config={this.state.config} ref="chart"></ChartView>
            </View>
        );
    }
}