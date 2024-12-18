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
import AiAnalyzer from '../AiAnalyzer/AiAnalyzer.tsx'
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
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusdropdown, setStatusdropdown] = useState(null);
    const [timedropdown, setTimedropdown] = useState(null);
    const [pathdropdown, setPathdropdown] = useState(null);
    const [statusSelect, setStatusSelect] = useState<StatusSelect>('5xx');

    useEffect(() =>{
        setLoading(true);

        setTimeout(() => {
            setData(mockData);
            setLoading(false)
        },3000)
    },[])

    useEffect(()=>{
        const filtered = mockData.filter(item => {
            const matchesTime = timedropdown ? item.timestamp === timedropdown : true;

            const matchesStatus = statusdropdown ? item.status_code.toString().charAt(0) + 'xx' === statusdropdown : true;

            const matchesPath = pathdropdown ? item.path === pathdropdown : true;

            return matchesTime && matchesStatus && matchesPath;
        });

        if(timedropdown || statusdropdown || pathdropdown){
            setStatusSelect(null)
        }
        setData(filtered); 
    }, [timedropdown, statusdropdown, pathdropdown]) 

    const dropdownOptions = useMemo(() => {
        const timeOptions = [
            ...new Set(mockData.map(item => item.timestamp))
        ].map(value => ({ 
            label: new Date(value).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
            , value })); 

        const endpointOptions = [...new Set(mockData.map(item => item.path))] 
            .map(value => ({ value, label: value }));

        const statusOptions = [...new Set(mockData.map(item => item.status_code.toString().charAt(0) + 'xx'))] 
            .map(value => ({ value, label: value }));
    
        return [
            {
                label: 'Time Range',
                value: 'time',
                options: [{label: 'No Filter', value: null}, ...timeOptions], 
                includeSearch: true,
                change: setTimedropdown,
                selected: timedropdown
            },
            {
                label: 'Endpoint',
                value: 'endpoint',
                options: [{label: 'No Filter', value: null}, ...endpointOptions], 
                change: setPathdropdown,
                selected: pathdropdown
            },
            {
                label: 'Status',
                value: 'status',
                options: [{label: 'No Filter', value: null}, ...statusOptions], 
                change: setStatusdropdown,
                selected: statusdropdown
            },
        ];
    }, [pathdropdown, statusdropdown, timedropdown]); 

    const summarySec = useMemo(()=>{
        return [
            {
                label: "Success Rate",
                metric: data.length > 0 ? `${calculateSuccessRate(data)}%` : 'N/A',
                color: 'green',
                info: "Success Rate = (Successful Requests / Total Requests) × 100"
            },
            {
                label: "Ave Response Time",
                metric: data.length > 0 ? `${calculateAverageResponseTime(data)}ms` : 'N/A',
                color: 'blue',
                info: "Average Response Time = Total Response Time (ms) / Total Number of Requests"
            },
            {
                label: "Error Rate",
                metric: data.length > 0 ? `${calculateErrorRate(data)}%` : 'N/A',
                color: 'red',
                info: "Error Rate = (Number of Error Responses / Total Requests) × 100. Error responses are any requests with status codes 400 or higher"
            },
            {
                label: "Total Requests",
                metric: data.length > 0 ? `${abbreviateNumber(data?.length)}` : 'N/A',
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
                <div className={styles.dropdownContainer}>
                    {dropdownOptions.map(({label, value, options, includeSearch, change, selected}) => {
                        return <Button options={options} label={label} value={value} disabled={loading} includeSearch={includeSearch} change={change} selected={selected}/>
                    })}
                </div>
                <div>
                    <AiAnalyzer setLoading={setLoading} />
                </div>
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