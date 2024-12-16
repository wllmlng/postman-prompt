//External Libraries
import React from 'react';
import classNames from 'classnames'
//Api Calls

//Utils

//Hooks

//Components
import HoverInfo from '@sharedComponents/HoverInfo/HoverInfo.tsx'
import ThrobberLoader from '@sharedComponents/ThrobberLoader/ThrobberLoader.tsx'

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
    loading?: boolean;
}

function MetricCard({label, metric, color, info, data, loading}: Props) {

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
            {loading ? 
                <ThrobberLoader />
            :
                <div className={styles.metricContainer} style={{color: color}}>
                    {metric}
                </div>
            }
        </div>
    )
}

export default MetricCard