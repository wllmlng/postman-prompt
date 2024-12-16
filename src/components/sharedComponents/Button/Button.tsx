import React, { useState } from 'react';
import styles from './Button.module.scss';
import useOnClickOut from '@hooks/useOnClickOut.tsx';

const Button = ({ label, options, disabled }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label); // Default to the label

    const handleToggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false); 
    };
    const ref = useOnClickOut({ onClickOut: () => setIsDropdownOpen(false) });
    return (
        <div ref={ref} className={styles.dropdownContainer}>
            <button 
                disabled={disabled}
                className={`${styles.button} ${isDropdownOpen ? styles.toggled : ''} font-light`} 
                onClick={handleToggleDropdown}
            >
                {selectedOption}
            </button>
            {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                    {options.map((option, index) => (
                        <div 
                            key={index} 
                            className={styles.dropdownItem} 
                            onClick={() => handleOptionSelect(option.label)} // Assuming option has a label property
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Button;