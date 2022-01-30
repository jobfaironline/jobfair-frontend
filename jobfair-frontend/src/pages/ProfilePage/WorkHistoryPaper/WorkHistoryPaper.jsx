import React, {useState} from 'react';
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Avatar, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Card, CardHeader} from "@mui/material";

const WorkHistoryPaper = ({title, isShow}) => {
    const [company, setCompany] = useState();
    const [description, setDescription] = useState("");
    const [fromDate, setFromDate] = useState(0);
    const [isCurrentJob, setIsCurrentJob] = useState(false);
    const [position, setPosition] = useState("");
    const [toDate, setToDate] = useState(0);

    const handleFormChange = (e, key) => {
        switch (key) {
            case "company" :
                setCompany(e.target.value);
                console.log('company: ', e.target.value)
                break;
            case "description" :
                setDescription(e.target.value);
                console.log('description: ', e.target.value)
                break;
            case "fromDate" :
                setFromDate(e.target.value);
                console.log('fromDate: ', e.target.value)
                break;
            case "toDate":
                setToDate(e.target.value);
                console.log('toDate: ', e.target.value)
                break;
            case "position":
                setPosition(e.target.value);
                console.log('position: ', e.target.value)
                break;
            case "isCurrentJob":
                setIsCurrentJob(e.target.value);
                console.log('isCurrentJob: ', e.target.value)
                break;
        }
    }

    return (
        isShow ?
            <Card sx={{maxWidth: 1500}}>
                <CardHeader title={title}/>
                <Container>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="company">Company: </label> <br/>
                                <Input name="company"
                                       type="text"
                                       value={company}
                                       onChange={e => handleFormChange(e, "company")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="description">Description: </label> <br/>
                                <Input name="description"
                                       value={description}
                                       type="text"
                                       onChange={e => handleFormChange(e, "description")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="fromDate">From date: </label> <br/>
                                <Input name="fromDate" type="date"
                                       value={fromDate}
                                       onChange={e => handleFormChange(e, "fromDate")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="toDate">To date: </label> <br/>
                                <Input name="toDate"
                                       value={toDate}
                                       type="date"
                                       onChange={e => handleFormChange(e, "toDate")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="position">Position: </label> <br/>
                                <Input name="position"
                                       value={position}
                                       type="text"
                                       onChange={e => handleFormChange(e, "position")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="isCurrentJob">Is current job?: </label> <br/>
                                <select id="isCurrentJob"
                                        onChange={e => handleFormChange(e, "isCurrentJob")}
                                        className={styles.gender_select}>
                                    <option value="true" selected={isCurrentJob === true}>
                                        Yes
                                    </option>
                                    <option value="false" selected={isCurrentJob === false}>
                                        No
                                    </option>
                                </select>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card> : null
    );
};


export default WorkHistoryPaper;