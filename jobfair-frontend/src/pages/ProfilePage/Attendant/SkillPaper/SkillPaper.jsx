import React, {useEffect, useState} from 'react';
import {Paper, Card, CardHeader, Typography, CardContent, Rating, CardActions, Collapse} from "@mui/material";
import styles from "../ProfilePage.module.scss";
import {Col, Container, Row} from "react-grid-system";
import {Input} from "antd";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {ExpandMore} from "../../../../utils/common";


const SkillPaper = ({isShow, title, initData}) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [proficiency, setProficiency] = useState(0);
    const [skill, setSkill] = useState(initData);
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        handleSetValues(skill)
    }, [initData])

    function handleSetValues(skill) {
        if (skill !== undefined) {
            setId(skill.id);
            setName(skill.name);
            setProficiency(skill.proficiency);
        }
    }

    const handleDelete = (e) => {
        let confirmMsg = "Are you sure to remove?";
        if (window.confirm(confirmMsg)) {
            setEnable(!isShow);
        }
    }

    return (
        enable === true ?
            <Card sx={{maxWidth: 1500}}>
                <CardHeader title={title}/>
                <CardContent>
                    <Input name="id"
                           type="hidden"
                           value={id}
                           className={styles.input}
                    />
                    <Typography>
                        Skill name: {name}
                    </Typography>
                    <Typography>
                        Proficiency:
                        <Rating
                            name="read-only-proficiency"
                            value={proficiency}
                            readOnly/>
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
                                <label htmlFor="name" className={styles.label}>Name: </label> <br/>
                                <Input name="name"
                                       type="text"
                                       value={name}
                                       onChange={(e, value) => {
                                           setName(e.target.value);
                                           // setName(value) ???
                                       }}
                                       className={styles.input}/>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className={styles.element_form}>
                                <label htmlFor="name" className={styles.label}>Proficiency: </label> <br/>
                                <Rating
                                    name="proficiency"
                                    value={proficiency}
                                    onChange={(event, newValue) => {
                                        setProficiency(newValue);
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
                </Collapse>
            </Card> : null
    );
};


export default SkillPaper;