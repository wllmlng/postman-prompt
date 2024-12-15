//External Libraries
import React from 'react';
import classNames from 'classnames'
//Api Calls

//Utils

//Hooks

//Components
import HoverInfo from '@sharedComponents/HoverInfo/HoverInfo.tsx'

//Types

//Constants

//Styles
import styles from './MetricCard.module.scss'

//-----------------End Imports-----------------

interface Props { 
    label: string;
    metric: string;
    color: string;
    info?: string;
}

function MetricCard({label, metric, color, info}: Props) {

    return (
        <div className={classNames(styles.container, 'generic-container')}>
            <span>
                {label}
                {info && 
                    <HoverInfo text={info}>
                        <i className="fa-solid fa-circle-info"></i>
                    </HoverInfo>
                }
            </span>
            <div className={styles.metricContainer} style={{color: color}}>
                {metric}
            </div>
        </div>
    )
}

export default MetricCard