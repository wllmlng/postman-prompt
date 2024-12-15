//External Libraries
import React from 'react';
import classNames from 'classnames';
//Api Calls

//Utils

//Hooks

//Components
import MetricCard from '@sharedComponents/MetricCard/MetricCard.tsx';
import Button from '@sharedComponents/Button/Button.tsx'
import TrendChart from '@sharedComponents/TrendChart/TrendChart.tsx'
import BarChart from '@sharedComponents/BarChart/BarChart.tsx';
//Types

//Constants

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

interface Props { }

function HealthDashboard({}: Props) {

    const summarySec = [
        {
            label: "Success Rate",
            metric: "98.2%",
            color: 'green'
        },
        {
            label: "Ave Response Time",
            metric: "245ms",
            color: 'blue'
        },
        {
            label: "Error Rate",
            metric: "1.8%",
            color: 'red'
        },
        {
            label: "Total Requests",
            metric: "12.5K",
            color: 'purple'
        },
    ]
    return (
        <div className={styles.healthDashboard}>
            <h1>API Health Dashboard</h1>
            <div className={classNames(styles.toggleContainer, 'generic-container')}>
                {VIEWS.map(({label, value}) => {
                    return <Button label={label} value={value} />
                })}
            </div>
            <div className={styles.summaryContainer}>
                {summarySec.map(({label, metric, color})=>{
                    return <MetricCard label={label} metric={metric} color={color}/>
                })}
            </div>
            <TrendChart />
            <div className={styles.bottomCharts}>
                <BarChart />
                <BarChart />
            </div>
        </div>
    )
}

export default HealthDashboard