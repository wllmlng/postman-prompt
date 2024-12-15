// External Libraries
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Grid } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Import styles for react-virtualized
import classNames from 'classnames';
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

function MessageList({ messageList }: Props) {
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
        const message = formattedMessages[rowIndex];
        let cellContent;

        switch (columnIndex) {
            case 0:
                cellContent = message.status_code;
                break;
            case 1:
                cellContent = message.path;
                break;
            case 2:
                cellContent = message.error;
                break;
            case 3:
                cellContent = message.formattedTimestamp;
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
                    justifyContent: 'center'
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
                    <div className={styles.headerItem} style={{ width: columnWidth({ index: 0 }) }}>Status Code</div>
                    <div className={styles.headerItem} style={{ width: columnWidth({ index: 1 }) }}>Path</div>
                    <div className={styles.headerItem} style={{ width: columnWidth({ index: 2 }) }}>Error</div>
                    <div className={styles.headerItem} style={{ width: columnWidth({ index: 3 }) }}>Timestamp</div>
                </div>
                <Grid
                    cellRenderer={cellRenderer}
                    columnCount={4} 
                    columnWidth={columnWidth} 
                    height={300} 
                    rowCount={formattedMessages.length} 
                    rowHeight={40} 
                    width={listWidth} 
                />
            </div>
        </div>
    );
}

export default MessageList;