//External Libraries
import React, {useMemo, useState} from 'react';
import classNames from 'classnames';
//Api Calls

//Utils
import { calculateSuccessRate, calculateAverageResponseTime, calculateErrorRate, abbreviateNumber } from './utils.ts';

//Hooks

//Components
import MetricCard from '@sharedComponents/MetricCard/MetricCard.tsx';
import Button from '@sharedComponents/Button/Button.tsx'
import TrendChart from '@sharedComponents/TrendChart/TrendChart.tsx'
import BarChart from '@sharedComponents/BarChart/BarChart.tsx';
import MessageList from '@sharedComponents/MessageList/MessageList.tsx';

//Types

//Constants
import data from '../../Data/mock-request-data.json'

//Styles
import styles from './HealthDashboard.module.scss'

//-----------------End Imports-----------------

const VIEWS = [
    {
        label: 'Time Range',
        value: 'time'
    },
    {
        label: 'Endpoint',
        value: 'endpoint'
    },
    {
        label: 'Status',
        value: 'status'
    },
]

type StatusSelect = '2xx' | '4xx' | '5xx' | null;
interface Props {
}

function HealthDashboard({}: Props) {
    const [statusSelect, setStatusSelect] = useState<StatusSelect>('5xx');

    
    const summarySec = [
        {
            label: "Success Rate",
            metric: `${calculateSuccessRate(data)}%`,
            color: 'green',
            info: "Success Rate = (Successful Requests / Total Requests) × 100"
        },
        {
            label: "Ave Response Time",
            metric: `${calculateAverageResponseTime(data)}ms`,
            color: 'blue',
            info: "Average Response Time = Total Response Time (ms) / Total Number of Requests"
        },
        {
            label: "Error Rate",
            metric: `${calculateErrorRate(data)}%`,
            color: 'red',
            info: "Error Rate = (Number of Error Responses / Total Requests) × 100. Error responses are any requests with status codes 400 or higher"
        },
        {
            label: "Total Requests",
            metric: `${abbreviateNumber(data?.length)}`,
            color: 'purple'
        },
    ]
    
    // Example usage:
    const sampleData = [
        {
            error: "",
            path: "/",
            response_time: 852,
            status_code: 201,
            timestamp: "2023-09-01T01:09:24.000Z"
        },
        {
            error: "ERR_HTTP2_ERROR",
            path: "/",
            response_time: 792,
            status_code: 500,
            timestamp: "2023-09-01T01:14:48.000Z"
        }
    ];
    
    const successRate = calculateSuccessRate(sampleData);
    console.log(`Success Rate: ${successRate}%`); // Output: Success Rate: 50%

    const messageList = useMemo(() => {
        if(!statusSelect) return data;
        return data.filter((curr) => {
            const statusCode = `${curr.status_code}`;
            return (statusCode.startsWith('2') && statusSelect === '2xx') ||
                   (statusCode.startsWith('4') && statusSelect === '4xx') ||
                   (statusCode.startsWith('5') && statusSelect === '5xx');
        });
    },[statusSelect])

    return (
        <div className={styles.healthDashboard}>
            <h1>API Health Dashboard</h1>
            <div className={classNames(styles.toggleContainer, 'generic-container')}>
                {VIEWS.map(({label, value}) => {
                    return <Button label={label} value={value} />
                })}
            </div>
            <div className={styles.summaryContainer}>
                {summarySec.map(({label, metric, color, info})=>{
                    return <MetricCard label={label} metric={metric} color={color} info={info}/>
                })}
            </div>
            <TrendChart />
            <div className={styles.bottomCharts}>
                <BarChart statusSelect={statusSelect} setStatusSelect={setStatusSelect}/>
                <MessageList messageList={messageList} />
            </div>
        </div>
    )
}

export default HealthDashboard