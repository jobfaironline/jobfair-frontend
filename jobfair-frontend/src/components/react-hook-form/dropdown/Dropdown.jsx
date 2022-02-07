import React, {useState} from 'react';
import styles from "../../../pages/ProfilePage/Attendant/ProfilePage.module.scss"
const Dropdown = ({options, currentValue}) => {
    const [selectedOption, setSelectedOption] = useState(currentValue);
    return (
        <div>
            <select
                value={selectedOption}
                onChange={e => {
                    setSelectedOption(e.target.value);
                }}
                className={styles.dropdown}
            >
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
        </div>

    );
};

export default Dropdown;