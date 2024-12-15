//External Libraries
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './BarChart.module.scss'

//-----------------End Imports-----------------

import data from '../../../Data/mock-request-data.json'

interface Props { }

function BarChart({}: Props) {

    const statusCounts = data.reduce((acc, curr) => {
        const statusCode = `${curr.status_code}`;
        if (statusCode.startsWith('2')) {
            acc['2xx'] += 1;
        } else if (statusCode.startsWith('4')) {
            acc['4xx'] += 1;
        } else if (statusCode.startsWith('5')) {
            acc['5xx'] += 1;
        }
        return acc;
    }, { '2xx': 0, '4xx': 0, '5xx': 0 }); 

    const options = {
        chart: {
            type: 'bar',
            height: 200 
        },
        credits: {
            enabled: false // Disable the credits
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false // Disable the legend
        },
        xAxis: {
            categories: ['2xx', '4xx', '5xx'], // Categories for the x-axis
            title: {
                text: null // No title for the y-axis
            },
            labels: {
                enabled: false // Hide y-axis labels
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null // No title for the y-axis
            },
            labels: {
                enabled: false // Hide y-axis labels
            }
        },
        series: [{
            data: [
                { y: statusCounts['2xx'], color: '#28a745' }, 
                { y: statusCounts['4xx'], color: '#ffc107' }, 
                { y: statusCounts['5xx'], color: '#dc3545' }  
            ]
            
        }]
    };

    return (
        <div className={'generic-container'}>
            <h4 className="sub-title">Status Code Distribution</h4>
            <div className={styles.barChartContainer}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </div>
    );
}

export default BarChart;