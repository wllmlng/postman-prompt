import React, { useState } from 'react';
import styles from './Button.module.scss';

const Button = ({label, metric}) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(prevState => !prevState);
    };

    return (
        <button 
            className={`${styles.button} ${isToggled ? styles.toggled : ''} font-light`} 
            onClick={handleToggle}
        >
            {label}
        </button>
    );
};

export default Button;