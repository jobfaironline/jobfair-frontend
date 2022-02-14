import React, {useState} from 'react';
import {Card, CardHeader} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";

const CertificationPaper = ({isShow, title}) => {
    const [certLink, setCertLink] = useState("");
    const [institution, setInstitution] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    //id..

    const handleFormChange = (e, key) => {
        switch (key) {
            case "certLink":
                setCertLink(e.target.value)
                break;
            case "institution":
                setInstitution(e.target.value);
                break;
            case "name":
                setName(e.target.value);
                break;
            case "year":
                setYear(e.target.value)
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
                                <label htmlFor="certificationLink">Certification Link: </label> <br/>
                                <Input name="certificationLink"
                                       type="text"
                                       value={certLink}
                                       onChange={e => handleFormChange(e, "certLink")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="institution">Institution: </label> <br/>
                                <Input name="institution"
                                       value={institution}
                                       type="text"
                                       onChange={e => handleFormChange(e, "institution")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="name">Name: </label> <br/>
                                <Input name="name" type="text"
                                       value={name}
                                       onChange={e => handleFormChange(e, "name")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="year">Year: </label> <br/>
                                <Input name="year"
                                       value={year}
                                       type="text"
                                       onChange={e => handleFormChange(e, "year")}
                                       className={styles.input}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Card> : null
    );
};


export default CertificationPaper;