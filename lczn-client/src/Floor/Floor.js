import React, { Component } from 'react';
import floor from '../svg/Floor_Plan.svg';
import './Floor.css';
import ReactHighcharts from 'react-highcharts';
// Highcharts more
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
// Highcharts exporting
var HighchartsExporting = require('highcharts-exporting');
HighchartsExporting(ReactHighcharts.Highcharts);

class Floor extends Component {

    componentWillReceiveProps(nextProps) {
        let chart = this.refs.chart.getChart();
        if(nextProps.delta) {
            chart.series[5].addPoint({x: nextProps.delta[0], y: nextProps.delta[1]});
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            chart: null,
            config: {
                title: {
                    text: 'Simulation of Radio Frequency Localization'
                },
                subtitle: {
                    text: 'Real Time Position Tracking'
                },
                xAxis: {
                    gridLineWidth: 1,
                    title: {
                        enabled: true,
                        text: 'Width'
                    },
                    startOnTick: true,
                    endOnTick: true,
                    showLastLabel: true
                },
                yAxis: {
                    title: {
                        text: 'Height'
                    }
                },
                plotOptions: {
                    series: {
                        lineWidth: 2,
                        lineColor:'#000000'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                series: [{
                    name: 'Office Area1',
                    type: 'polygon',
                    data: [[0, 0], [6, 0], [6, 48], [0, 48]],
                    color: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.5).get(),
                    enableMouseTracking: false
                }, {
                    name: 'Office Area2',
                    type: 'polygon',
                    data: [[10, 0], [53, 0], [53, 6], [10, 6]],
                    color: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.5).get(),
                    enableMouseTracking: false
                }, {
                    name: 'Office Area3',
                    type: 'polygon',
                    data: [[10, 10], [22, 10], [22, 48], [10, 48]],
                    color: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.5).get(),
                    enableMouseTracking: false
                }, {
                    name: 'Office Area4',
                    type: 'polygon',
                    data: [[29, 10], [53, 10], [53, 94], [29, 94]],
                    color: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.5).get(),
                    enableMouseTracking: false
                },{
                    name: 'Office Area5',
                    type: 'polygon',
                    data: [[0, 53], [22, 53], [22, 90],[15,90],[15,94], [0, 94]],
                    color: ReactHighcharts.Highcharts.Color(ReactHighcharts.Highcharts.getOptions().colors[0]).setOpacity(0.5).get(),
                    enableMouseTracking: false
                }, {
                    name: 'Observations',
                    type: 'scatter',
                    color: ReactHighcharts.Highcharts.getOptions().colors[1],
                    data: []
                }],
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'position: [{point.x} , {point.y}]'
                }
            }
        }
    }


    render() {
        return (
            <div className="Floor">
                <ReactHighcharts config = {this.state.config} ref="chart"> </ReactHighcharts>
            </div>
        );
    }
}

export default Floor;