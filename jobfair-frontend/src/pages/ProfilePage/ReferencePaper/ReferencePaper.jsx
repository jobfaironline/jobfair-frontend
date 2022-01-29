import React, {useState} from 'react';
import {Card, CardHeader} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";

const ReferencePaper = ({isShow, title}) => {
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");

    const handleFormChange = (e, key) => {
        switch (key) {
            case "company":
                setCompany(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "fullname":
                setFullname(e.target.value);
                break;
            case "phone":
                setPhone(e.target.value);
                break;
            case "position":
                setPosition(e.target.value);
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
                                <label htmlFor="email">Email: </label> <br/>
                                <Input name="email"
                                       value={email}
                                       type="text"
                                       onChange={e => handleFormChange(e, "email")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="fullname">Full Name: </label> <br/>
                                <Input name="fullname" type="date"
                                       value={fullname}
                                       onChange={e => handleFormChange(e, "fullname")}
                                       className={styles.input}/>
                            </div>
                        </Col>
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
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="phone">Phone: </label> <br/>
                                <Input name="phone"
                                       type="text"
                                       value={phone}
                                       onChange={e => handleFormChange(e, "phone")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card> : null
    );
};



export default ReferencePaper;