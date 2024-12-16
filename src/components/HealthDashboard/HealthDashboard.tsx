//External Libraries
import React, {useMemo, useEffect, useState} from 'react';
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
import mockData from '../../Data/mock-request-data.json'

//Styles
import styles from './HealthDashboard.module.scss'

//-----------------End Imports-----------------


type StatusSelect = '2xx' | '4xx' | '5xx' | null;
interface Props {
}

function HealthDashboard({}: Props) {
    const [statusSelect, setStatusSelect] = useState<StatusSelect>('5xx');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);

        //Simulating api requests
        setTimeout(() => {
            setData(mockData);
            setLoading(false)
        },3000)
    },[])

    const dropdownOptions = useMemo(() => {
        const timeOptions = [
            ...new Set(mockData.map(item => {
                return new Date(item.timestamp).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });
            }))
        ]; 
        const endpointOptions = [...new Set(mockData.map(item => item.path))]; 
        const statusOptions = [...new Set(mockData.map(item => item.status_code.toString().charAt(0) + 'xx'))]; 
    
        return [
            {
                label: 'Time Range',
                value: 'time',
                options: timeOptions.map(time => ({ label: time, value: time })), 
                includeSearch: true
            },
            {
                label: 'Endpoint',
                value: 'endpoint',
                options: endpointOptions.map(endpoint => ({ label: endpoint, value: endpoint })), 
            },
            {
                label: 'Status',
                value: 'status',
                options: statusOptions.map(status => ({ label: status, value: status })), 
            },
        ];
    }, []);

    const summarySec = useMemo(()=>{
        return [
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
    },[data]) 

    const messageList = useMemo(() => {
        if(!statusSelect) return data;
        return data.filter((curr) => {
            const statusCode = `${curr.status_code}`;
            return (statusCode.startsWith('2') && statusSelect === '2xx') ||
                   (statusCode.startsWith('4') && statusSelect === '4xx') ||
                   (statusCode.startsWith('5') && statusSelect === '5xx');
        });
    },[statusSelect, data])

    return (
        <div className={styles.healthDashboard}>
            <h1>API Health Dashboard</h1>
            <div className={classNames(styles.toggleContainer, 'generic-container')}>
                {dropdownOptions.map(({label, value, options, includeSearch}) => {
                    return <Button options={options} label={label} value={value} disabled={loading} includeSearch={includeSearch}/>
                })}
            </div>
            <div className={styles.summaryContainer}>
                {summarySec.map(({label, metric, color, info})=>{
                    return <MetricCard label={label} metric={metric} color={color} info={info} data={data} loading={loading}/>
                })}
            </div>
            <TrendChart data={data} loading={loading}/>
            <div className={styles.bottomCharts}>
                <BarChart statusSelect={statusSelect} setStatusSelect={setStatusSelect}  data={data} loading={loading}/>
                <MessageList messageList={messageList} loading={loading}/>
            </div>
        </div>
    )
}

export default HealthDashboard