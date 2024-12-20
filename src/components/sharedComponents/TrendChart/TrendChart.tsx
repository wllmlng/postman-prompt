//External Libraries
import React, { useEffect, useRef} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import classNames from 'classnames';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

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

interface Props { 
    loading?: boolean;
}

const TrendChart = ({data, loading}: Props) => {
    const sortedData = data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current.chart;
            if (loading) {
                chart.showLoading('Loading data...');
            } else {
                chart.hideLoading();
            }
        }
    }, [loading]);

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
        tooltip: {
            shared: true, 
            useHTML: true, 
            formatter: function () {
                console.log(this)
                const points = this.points; 
                let tooltipHtml = `<strong>${this?.category}</strong><br/>`;
                points.forEach(point => {
                    tooltipHtml += `Response Rate: <strong>${point.y} ms</strong><br/>`; 
                });
                return tooltipHtml; 
            }
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
                    return new Date(this.value).toLocaleDateString(); 
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
            selected: 1, 
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
                        ref={chartRef}
                        highcharts={Highcharts} 
                        options={options} 
                    />
                </div>
            </div>
        </div>
    );
  };

export default TrendChart