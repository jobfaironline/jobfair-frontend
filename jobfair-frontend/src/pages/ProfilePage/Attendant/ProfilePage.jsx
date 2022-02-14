import React, {useState} from 'react';
import {Table, Tabs} from "antd";
import {DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import styles from "./ProfilePage.module.scss";
import {appliedColumns, appliedData, joinData, joinedColumns} from "./MockData";
import {useHistory} from "react-router-dom";
import {Paper} from '@mui/material';
import SkillPaper from "./SkillPaper/SkillPaper";
import BasicInfoPaper from "./BasicInfoPaper/BasicInfoPaper";
import AttendantInfoPaper from "./AttendantInfoPaper/AttendantInfoPaper";
import WorkHistoryPaper from "./WorkHistoryPaper/WorkHistoryPaper";
import ActivityPaper from "./ActivityPaper/ActivityPaper";
import CertificationPaper from "./CertificationPaper/CertificationPaper";
import EducationPaper from "./EducationPaper/EducationPaper";
import ReferencePaper from "./ReferencePaper/ReferencePaper";


const ProfilePage = props => {
    const history = useHistory();

    const sampleEducations = ['College', 'Undergraduate', 'Graduate']
    const {TabPane} = Tabs;

    //attendant

    const [isNewSkill, setIsNewSkill] = useState(false);
    const [numOfSkill, setNumOfSkill] = useState(0);

    const [isNewWork, setIsNewWork] = useState(false);
    const [numOfWork, setNumOfWork] = useState(0);

    const [isNewActivity, setIsNewActivity] = useState(false);
    const [numOfActivity, setNumOfActivity] = useState(0);

    const [isNewCert, setIsNewCert] = useState(false);
    const [numOfCert, setNumOfCert] = useState(0);

    const [isNewEducation, setIsNewEducation] = useState(false);
    const [numOfEducation, setNumOfEducation] = useState(0);

    const [isNewReference, setIsNewReference] = useState(false);
    const [numOfReference, setNumOfReference] = useState(0);
//function
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // const body = JSON.stringify({
        //     email: e.target.email.value.trim(),
        //     firstname: e.target.firstname.value.trim(),
        //     middlename: e.target.middlename.value.trim(),
        //     lastname: e.target.lastname.value.trim(),
        //     phone: e.target.phone.value.trim(),
        //     profileImage: e.target.profileImage.value.trim(),
        //     gender: e.target.gender.value
        // });
        //call API
        console.log("submit")
    }

    const onChangeAppliedAttendant = (pagination, filters, sorter, extra) => {
        console.log("Applied attendant table changed");
        console.log('params', pagination, filters, sorter, extra);
    }

    const handleAddNewSkill = async (e) => {
        await setNumOfSkill(numOfSkill + 1);
        setIsNewSkill(true);
    }

    const handleCancelNewSkill = async (e) => {
        if (numOfSkill > 0) {
            await setNumOfSkill(numOfSkill - 1);
        }
        setIsNewSkill(true);
    }

    const handleAddNewWork = async (e) => {
        await setNumOfWork(numOfWork + 1);
        setIsNewWork(true);
    }

    const handleCancelNewWork = async (e) => {
        if (numOfWork > 0) {
            await setNumOfWork(numOfWork - 1);
        }
        setIsNewWork(true);
    }

    const handleAddNewActivity = async (e) => {
        await setNumOfActivity(numOfActivity + 1);
        setIsNewActivity(true);
    }

    const handleCancelNewActivity = async (e) => {
        if (numOfActivity > 0) {
            await setNumOfActivity(numOfActivity - 1);
        }
        setIsNewActivity(true);
    }

    const handleAddNewCert = async (e) => {
        await setNumOfCert(numOfCert + 1);
        setIsNewCert(true);
    }

    const handleCancelNewCert = async (e) => {
        if (numOfCert > 0) {
            await setNumOfCert(numOfCert - 1);
        }
        setIsNewCert(true);
    }

    const handleAddNewEducation = async (e) => {
        await setNumOfEducation(numOfEducation + 1);
        setIsNewEducation(true);
    }

    const handleCancelNewEducation = async (e) => {
        if (numOfEducation > 0) {
            await setNumOfEducation(numOfEducation - 1);
        }
        setIsNewEducation(true);
    }

    const handleAddNewReference = async (e) => {
        await  setNumOfReference(numOfReference + 1);
        setIsNewReference(true);
    }

    const handleCancelNewReference = async (e) => {
        if (numOfReference > 0) {
            await setNumOfReference(numOfReference - 1);
        }
        setIsNewReference(true);
    }

    return (
        <div>
            <h1 className={styles.header}>This is Profile page</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="PROFILE" key="1">
                    <form onSubmit={e => handleOnSubmit(e)}>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            <BasicInfoPaper/>
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            <AttendantInfoPaper/>
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Skill
                            <PlusCircleOutlined onClick={e => handleAddNewSkill(e)}/>
                            <DeleteOutlined onClick={e => handleCancelNewSkill(e)}/>
                            {Array.from(Array(numOfSkill)).map((c, index) => <SkillPaper key={c} isShow={isNewSkill}
                                                                                         title={'Add new skill'}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Work History
                            <PlusCircleOutlined onClick={e => handleAddNewWork(e)}/>
                            <DeleteOutlined onClick={e => handleCancelNewWork(e)}/>
                            {Array.from(Array(numOfWork)).map((c, index) => <WorkHistoryPaper key={c} isShow={isNewWork}
                                                                                        title={'Add new work'}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Activity
                            <PlusCircleOutlined onClick={e => handleAddNewActivity(e)}/>
                            <DeleteOutlined onClick={e => handleCancelNewActivity(e)}/>
                            {Array.from(Array(numOfActivity)).map((c, index) => <ActivityPaper key={c} isShow={isNewActivity}
                                                                                              title={'Add new activity'}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Certification
                            <PlusCircleOutlined onClick={e => handleAddNewCert(e)}/>
                            <DeleteOutlined onClick={e => handleCancelNewCert(e)}/>
                            {Array.from(Array(numOfCert)).map((c, index) => <CertificationPaper key={c} isShow={isNewCert}
                                                                                               title={'Add new certification'}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Education
                            <PlusCircleOutlined onClick={e => handleAddNewEducation(e)}/>
                            <DeleteOutlined onClick={e => handleCancelNewEducation(e)}/>
                            {Array.from(Array(numOfEducation)).map((c, index) => <EducationPaper key={c} isShow={isNewEducation}
                                                                                                title={'Add new education'}/>)}
                        </Paper>
                        <Paper elevation={16} variant="outlined" className={styles.paper}>
                            Reference
                            <PlusCircleOutlined onClick={e => handleAddNewReference(e)}/>
                            <DeleteOutlined onClick={e => handleCancelNewReference(e)}/>
                            {Array.from(Array(numOfReference)).map((c, index) => <ReferencePaper key={c} isShow={isNewReference}
                                                                                                 title={'Add new reference'}/>)}
                        </Paper>
                        <input type="submit" value="Edit profile"/>
                    </form>
                </TabPane>
                <TabPane tab="APPLIED" key="2">
                    <h2>Applied attendants</h2>
                    <Table columns={appliedColumns} dataSource={appliedData} onChange={onChangeAppliedAttendant}
                           className={styles.table}/>
                </TabPane>
                <TabPane tab="JOINED" key="3">
                    <h2>Joined attendants</h2>
                    <Table columns={joinedColumns} dataSource={joinData} className={styles.table}/>
                </TabPane>
            </Tabs>
        </div>
    );
};

ProfilePage.propTypes = {};

export default ProfilePage;

