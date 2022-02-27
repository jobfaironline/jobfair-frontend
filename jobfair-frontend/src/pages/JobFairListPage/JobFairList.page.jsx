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
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined/>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <UnorderedListOutlined/>
                    <span>Job fair list</span>
                </Breadcrumb.Item>
                {
                    role === 'ADMIN' ?
                        <Breadcrumb.Item href='/admin/approval-registration'>
                            <span>Evaluate company registration</span>
                        </Breadcrumb.Item>
                        : null
                }
                {
                    role === 'STAFF' ?
                        <Breadcrumb.Item href='/staff/approval-registration'>
                            <span>Evaluate company registration</span>
                        </Breadcrumb.Item>
                        : null
                }

            </Breadcrumb>,
            <JobFairListContainer/>
        </>
    );
};

export default JobFairListPage;