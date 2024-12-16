import React, { useState } from 'react';
import styles from './Button.module.scss';
import useOnClickOut from '@hooks/useOnClickOut.tsx';

const Button = ({ label, options, disabled, includeSearch=false }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false); 
        setSearchTerm(''); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); 
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    {includeSearch &&
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles.searchInput} 
                        />
                    }
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <div 
                                key={index} 
                                className={styles.dropdownItem} 
                                onClick={() => handleOptionSelect(option.label)} 
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className={styles.noResults}>No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Button;