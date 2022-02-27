import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, Modal, notification, Spin} from "antd";
import CompanyRegistrationDetailModalComponent from "./CompanyRegistrationDetailModal.component";
import {getCompanyProfileAPI} from "../../../services/userService";

const CompanyRegistrationDetailModalContainer = ({...modalProps}) => {

    const [registrationDetail, setRegistrationDetail] = useState({});
    const [companyName, setCompanyName] = useState('');
    const registrationId = modalProps?.registrationId;

    const fetchData = async () => {
        const registration = modalProps?.registrationList?.find(item => item.id === registrationId);
        setRegistrationDetail(registration)
        const companyId = registration?.companyId;
        getCompanyProfileAPI(companyId)
            .then(res => {
                setCompanyName(res.data.name);
            })
            .catch(() => {
                //
            })
    }

    const onOk = () => {
        modalProps.setModalVisible(false);
    }

    const onCancel = () => {
        modalProps.setModalVisible(false);
    }

    useEffect(() => {
        fetchData();
    }, [registrationId])

    const componentProps = {
        data: {
            id: registrationDetail?.id,
            createDate: registrationDetail?.createDate,
            description: registrationDetail?.description,
            companyName: companyName,
            registrationJobPositions: () => {
                if (registrationDetail !== undefined && registrationDetail.registrationJobPositions !== undefined) {
                    return [...registrationDetail.registrationJobPositions]
                }
                else {
                    return []
                }
            },
        },
        visible: modalProps.visible,
        onOk: onOk,
        onCancel: onCancel
    }

    return (
        <>
            <CompanyRegistrationDetailModalComponent
                {...componentProps}
            />
        </>
    );
};

export default CompanyRegistrationDetailModalContainer;