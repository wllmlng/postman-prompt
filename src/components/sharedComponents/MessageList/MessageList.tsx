//External Libraries
import React, { useState, useEffect, useRef } from 'react';
import { List } from 'react-virtualized';
//Api Calls

//Utils

//Hooks

//Components

//Types

//Constants

//Styles
import styles from './MessageList.module.scss'

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

    const formattedMessages = messageList
    .map(({ status_code, error, path, timestamp }) => {
        const formattedTimestamp = new Date(timestamp).toLocaleString();
        return { status_code, error, path, formattedTimestamp, timestamp }; 
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); 

    const rowRenderer = ({ key, index, style }) => {
        const message = formattedMessages[index];
        return (
            <div key={key} style={style} className={styles.gridItem}>
                <div className={styles.statusCode}>{message.status_code}</div>
                <div className={styles.path}>{message.path}</div>
                <div className={styles.error}>{message.error}</div>
                <div className={styles.timestamp}>{message.formattedTimestamp}</div>
            </div>
        );
    };

    return (
        <div ref={listRef} className={'generic-container'} style={{ width: '100%' }}>
            <h4 className="sub-title">Recent Messages</h4>
            <div style={{ padding: '12px' }}>
                <List
                    width={listWidth-25}
                    height={300} 
                    rowCount={formattedMessages.length}
                    rowHeight={40} 
                    rowRenderer={rowRenderer}
                    overscanRowCount={5}
                />
            </div>
        </div>
    );
}

export default MessageList;