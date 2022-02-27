import React from 'react';
import {Breadcrumb, Divider} from "antd";
import JobFairListContainer from "../../containers/JobFairList/JobFairList.container";
import {HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";

const JobFairListPage = () => {
    const role = useSelector(state => state.authentication?.user?.roles);

    return (
        <>
            <Divider>
                Job Fair List
            </Divider>
            <JobFairListContainer/>
        </>
    );
};

export default JobFairListPage;