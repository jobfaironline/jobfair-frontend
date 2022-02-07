import React, {useEffect, useState} from 'react';
import {Card, CardActions, CardContent, CardHeader, Collapse, Typography} from "@mui/material";
import {Col, Container, Row} from "react-grid-system";
import styles from "../ProfilePage.module.scss";
import {Input} from "antd";
import {ExpandMore} from "../../../../utils/common";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Link} from "react-router-dom";
import ExternalRedirect from "../../ExternalRedirect";

const CertificationPaper = ({isShow, title, initData}) => {
    const [certLink, setCertLink] = useState("");
    const [institution, setInstitution] = useState("");
    const [name, setName] = useState("");
    const [year, setYear] = useState(0);
    const [id, setId] = useState("");
    const [certificate, setCertificate] = useState(initData);
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        handleSetValues(certificate);
    }, [initData])

    const handleSetValues = (data) => {
        if (data !== undefined) {
            setId(data.id);
            setCertLink(data.certificationLink);
            setInstitution(data.institution);
            setName(data.name);
            setYear(data.year);
        }
    }

    const handleDelete = (e) => {
        let confirmMsg = "Are you sure to remove?";
        if (window.confirm(confirmMsg)) {
            setEnable(!isShow);
        }
    }

    return (
        enable ?
            <Card sx={{maxWidth: 1500}}>
                <CardHeader title={title}/>
                <CardContent>
                    <Input name="id"
                           type="hidden"
                           value={id}
                           className={styles.input}
                    />
                    <Typography>
                        Name: {name}
                    </Typography>
                    <Typography>
                        <ExternalRedirect location={certLink}/>
                    </Typography>
                    <Typography>
                        Year: {year}
                    </Typography>
                    <Typography>
                        Institution: {institution}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <DeleteOutlinedIcon onClick={e => handleDelete(e)}/>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="certificationLink" className={styles.label}>Certification Link: </label> <br/>
                                    <Input name="certificationLink"
                                           type="text"
                                           value={certLink}
                                           onChange={e => {
                                               setCertLink(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="institution" className={styles.label}>Institution: </label> <br/>
                                    <Input name="institution"
                                           value={institution}
                                           type="text"
                                           onChange={e => {
                                               setInstitution(e.target.value);
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="name" className={styles.label}>Name: </label> <br/>
                                    <Input name="name" type="text"
                                           value={name}
                                           onChange={e => {
                                               setName(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div className={styles.element_form}>
                                    <label htmlFor="year" className={styles.label}>Year: </label> <br/>
                                    <Input name="year"
                                           value={year}
                                           type="text"
                                           onChange={e => {
                                               setYear(e.target.value)
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Collapse>
            </Card> : null
    );
};


export default CertificationPaper;