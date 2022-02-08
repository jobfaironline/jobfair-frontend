import React, {useEffect, useState} from 'react';
import {Col, Row} from "react-grid-system";
import styles from "./ProfilePage.module.scss";
import {Input} from "antd";
import {convertToDateString, convertToDateValue} from "../../../utils/common";

const FromToDate = ({fromDate, toDate}) => {
    const [fromDateData, setFromDateData] = useState(0);
    const [toDateData, setToDateData] = useState(0);

    useEffect(() => {
        handleSetValues(fromDate, toDate);
    }, [fromDate, toDate])

    const handleSetValues = (fromDate, toDate) => {
        setFromDateData(fromDate);
        setToDateData(toDate);
    }

    const handleOnChange = (e, key) => {
        switch (key) {
            case "fromDate":
                if (!!e.target.value) {
                    let dateValue = convertToDateValue(e.target.value);
                    setFromDateData(dateValue);
                }
                else {
                    setFromDateData(0);
                }
                break;
            case "toDate":
                if (!!e.target.value) {
                    let dateValue = convertToDateValue(e.target.value);
                    setToDateData(dateValue);
                }
                else {
                    setToDateData(0);
                }
                break;
        }
    }

    return (
        <Row>
            <Col sm={6}>
                <div className={styles.element_form}>
                    <label htmlFor="fromDate" className={styles.label}>From date: </label> <br/>
                    <Input name="fromDate" type="date"
                           value={convertToDateString(fromDateData)}
                           onChange={(e) => handleOnChange(e, "fromDate")}
                           className={styles.input}/>
                </div>
            </Col>
            <Col sm={6}>
                <div className={styles.element_form}>
                    <label htmlFor="toDate" className={styles.label}>To date: </label> <br/>
                    <Input name="toDate"
                           value={convertToDateString(toDateData)}
                           type="date"
                           onChange={(e) => handleOnChange(e, "toDate")}
                           className={styles.input}/>
                </div>
            </Col>
        </Row>
    );
};


export default FromToDate;