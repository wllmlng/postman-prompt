//External Libraries
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants
import data from '../../../Data/mock-request-data.json'

//Styles
import styles from './TrendChart.module.scss'



//-----------------End Imports-----------------

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

interface Props { }

const TrendChart = () => {
    const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


    const options = {
        chart: {
            zoomType: 'x' 
        },
        credits: {
            enabled: false 
        },
        legend: {
            enabled: false 
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: ''
            },
            categories: sortedData.map(({ timestamp }) => new Date(timestamp).toLocaleDateString()),
            tickInterval: 5,
            labels: {
                formatter: function () {
                    return new Date(this.value).toLocaleDateString(); // Format the tick labels
                },
      
            }
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: '',
            data: sortedData.map(({ response_time }) => response_time)
        }],
        rangeSelector: {
            selected: 1, // Default to the second button (1 month)
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d'
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'all',
                text: 'All'
            }]
        },
        exporting: {
            enabled: true,
            buttons: {
                contextButton: {
                    // Customize which download options to show
                    menuItems: [
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadCSV'
                    ]
                }
            }
        }
    };
    
      return (
        <div className={classNames('generic-container', styles.trendChart)}>
            <h4 className="sub-title">Response Trend</h4>
            <div className={styles.chartContainer} >
                <div style={{width:'95%'}}>
                    <HighchartsReact 
                        highcharts={Highcharts} 
                        options={options} 
                    />
                </div>
            </div>
        </div>
    );
  };

export default TrendChart