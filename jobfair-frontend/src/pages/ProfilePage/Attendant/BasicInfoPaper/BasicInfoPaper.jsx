import React, {useEffect, useState} from 'react';
import styles from "../ProfilePage.module.scss";
import {Avatar, Input} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {genderConst} from "../../../../constants/AppConst";
import Dropdown from "../../../../components/react-hook-form/dropdown/Dropdown";
import {Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Typography} from "@mui/material";
import {ExpandMore} from "../../../../utils/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BasicInfoPaper = ({initData, isShow, header}) => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");

    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [enable, setEnable] = useState(isShow);
    const [expanded, setExpanded] = useState(false);

    //life cycle
    useEffect(() => {
        handleSetValue(initData);
    }, [initData])
    //function
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleSetValue = (values) => {
        setEmail(values.account.email);
        setFirstname(values.account.firstname);
        setMiddlename(values.account.middlename);
        setLastname(values.account.lastname);
        setPhone(values.account.phone);
        setGender(values.account.gender);
        setProfileImage(values.account.profileImageUrl);
    }

    return (
        enable === true ?
            <Card sx={{maxWidth: 1 / 1, display: 'flex'}}>
                {/*Information box*/}
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <CardHeader title={header} sx={{ml: 5}}/>
                        <CardContent sx={{ml: 20}}>
                            <Typography>
                                First name: {firstname}
                            </Typography>
                            <Typography>
                                Middle name: {middlename}
                            </Typography>
                            <Typography>
                                Last name: {lastname}
                            </Typography>
                            <Typography>
                                Email: {email}
                            </Typography>
                            <Typography>
                                Phone: {phone}
                            </Typography>
                            <Typography>
                                Gender: {gender}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx={{width: 151, height: 150, mt: 2, ml: 20}}
                            image={profileImage}
                        />
                        <CardActions disableSpacing sx={{mt: 15, ml: 50}}>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon/>
                            </ExpandMore>
                        </CardActions>
                    </Box>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            {/*Email - firstname box*/}
                            <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <div className={styles.element_form}>
                                    <label htmlFor="email" className={styles.label}>Email: </label> <br/>
                                    <Input name="email"
                                           type="text"
                                           value={email}
                                           onChange={e => {
                                               setEmail(e.target.value.trim());
                                           }}
                                           className={styles.input}/>
                                </div>
                                <div className={styles.element_form}>
                                    <label htmlFor="firstname" className={styles.label}>First Name: </label> <br/>
                                    <Input name="firstname"
                                           value={firstname}
                                           type="text"
                                           onChange={e => {
                                               setFirstname(e.target.value.trim())
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <div className={styles.element_form}>
                                    <label htmlFor="middlename" className={styles.label}>Middle Name: </label> <br/>
                                    <Input name="middlename" type="text"
                                           value={middlename}
                                           onChange={e => {
                                               setMiddlename(e.target.value.trim())
                                           }}
                                           className={styles.input}/>
                                </div>
                                <div className={styles.element_form}>
                                    <label htmlFor="lastname" className={styles.label}>Last Name: </label> <br/>
                                    <Input name="lastname"
                                           value={lastname}
                                           type="text"
                                           onChange={e => {
                                               setLastname(e.target.value.trim())
                                           }}
                                           className={styles.input}/>
                                </div>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <div className={styles.element_form}>
                                    <label htmlFor="phone" className={styles.label}>Phone: </label> <br/>
                                    <Input name="phone"
                                           value={phone}
                                           type="text"
                                           onChange={e => {
                                               setPhone(e.target.value.trim())
                                           }}
                                           className={styles.input}/>
                                </div>
                                <div className={styles.element_form}>
                                    <label htmlFor="gender" className={styles.label}>Gender: </label> <br/>
                                    <Dropdown options={genderConst} currentValue={gender}/>
                                </div>
                            </Box>

                        </Box>
                        <div className={styles.avatar}>
                            <div className={styles.father_div}>
                                <Avatar
                                    shape="square"
                                    size="large"
                                    icon={<UserOutlined/>}
                                    src={profileImage}
                                    className={styles.image}
                                />
                            </div>
                            <div>
                                <input type="file" onChange={e => {
                                    setProfileImage(e.target.value)
                                }}
                                       className={styles.upload_button}/>
                            </div>
                        </div>
                        </Box>
                    </Collapse>
                </Box>
                {/*end information box*/}
            </Card>
            : null);
};

export default BasicInfoPaper;