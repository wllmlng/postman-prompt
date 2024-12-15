//External Libraries
import React from 'react';
import classNames from 'classnames'
//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './MetricCard.module.scss'

//-----------------End Imports-----------------

interface Props { 
    label: string;
    metric: string;
    color: string;
}

function MetricCard({label, metric, color}: Props) {

    return (
        <div className={classNames(styles.container, 'generic-container')}>
            <span>
                {label}
            </span>
            <div style={{color: color}}>
                {metric}
            </div>
        </div>
    )
}

export default MetricCard