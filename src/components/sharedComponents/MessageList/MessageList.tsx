// External Libraries
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import styles for react-virtualized
import classNames from 'classnames';
//Components
import ThrobberLoader from '@sharedComponents/ThrobberLoader/ThrobberLoader.tsx'
// Styles
import styles from './MessageList.module.scss';

//-----------------End Imports-----------------

interface Props {
    messageList: {
        error: string;
        path: string;
        response_time: number;
        status_code: number;
        timestamp: string;
    }[];
}

function MessageList({ messageList, loading }: Props) {
    const listRef = useRef<HTMLDivElement>(null);
    const [listWidth, setListWidth] = useState(0);

    useEffect(() => {
        if (listRef.current) {
            setListWidth(listRef.current.offsetWidth); 
        }
    }, [listRef]);

    const formattedMessages = useMemo(() => {
        return messageList
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map(({ status_code, error, path, timestamp }) => {
                const formattedTimestamp = new Date(timestamp).toLocaleString();
                return { status_code, error, path, formattedTimestamp }; 
            }); 
    },[messageList]) 

    const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {

        if(loading){
            return (
                <div
                    key={key}
                    style={{
                        ...style,
                        border: '1px solid #ddd',
                        backgroundColor: rowIndex % 2 ? '#f9f9f9' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >   
                    <ThrobberLoader height={20} width={100} />
                </div>
            );
        }
        const message = formattedMessages[rowIndex];
        let cellContent;
        let textColor = 'black'; 
        let justifyContent = 'center'; 
    
        switch (columnIndex) {
            case 0:
                cellContent = message.path;
                textColor = '#2563eb'; 
                break;
            case 1:
                cellContent = message.error;
                textColor = '#dc2626'; 
                justifyContent = 'flex-start';
                break;
            case 2:
                cellContent = message.status_code;
                break;
            case 3:
                cellContent = message.formattedTimestamp;
                justifyContent = 'flex-end';
                break;
            default:
                cellContent = '';
        }
    
        return (
            <div
                key={key}
                style={{
                    ...style,
                    border: '1px solid #ddd',
                    backgroundColor: rowIndex % 2 ? '#f9f9f9' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: justifyContent,
                    color: textColor,
                }}
            >
                {cellContent}
            </div>
        );
    };

    const columnWidth = () => {
        const numberOfColumns = 4; 
        return Math.floor(listWidth / numberOfColumns); 
    };

    return (
        <div ref={listRef} className={classNames(styles.messageList ,'generic-container')} style={{ width: '100%', overflow: 'scroll' }}>
            <h4 className="sub-title">Recent Messages</h4>
            <div>
                <div className={styles.headerRow}>
                    <div className={styles.headerItem} style={{ width: columnWidth({ index: 0 }) }}>Path</div>
                    <div className={classNames(styles.headerItem, styles.errorCell)} style={{ width: columnWidth({ index: 1 }) }}>Error</div>
                    <div className={styles.headerItem} style={{ width: columnWidth({ index: 2 }) }}>Status Code</div>
                    <div className={classNames(styles.headerItem, styles.timestampCell)} style={{ width: columnWidth({ index: 3 }) }}>Timestamp
                        <i className="fa-duotone fa-solid fa-sort-down"></i>
                    </div>
                </div>
                <Grid
                    cellRenderer={cellRenderer}
                    columnCount={4} 
                    columnWidth={columnWidth} 
                    height={300} 
                    rowCount={loading ? 20 : formattedMessages.length} 
                    rowHeight={40} 
                    width={listWidth} 
                />
            </div>
        </div>
    );
}

export default MessageList;