import React from 'react'
import {Divider, Tabs, Typography} from 'antd'
import {useSelector} from 'react-redux'
import JobFairOccurredContainer from "../../containers/JobFairList/JobFairOccurred.container";
import JobFairHappeningContainer from "../../containers/JobFairList/JobFairHappening.container";
import JobFairIncomingContainer from "../../containers/JobFairList/JobFairIncoming.container";


const {TabPane} = Tabs;
const {Text} = Typography;
const JobFairListPage = () => {
    const role = useSelector(state => state.authentication?.user?.roles)

    return (
        <div className="page" style={{marginTop: 80}}>
            <Divider>
                <Text strong>Job fair list</Text>
            </Divider>
            <Tabs defaultActiveKey="2" centered>
                <TabPane tab="Taken place" key="1">
                    <JobFairOccurredContainer/>
                </TabPane>
                <TabPane tab="Happening" key="2">
                    <JobFairHappeningContainer/>
                </TabPane>
                <TabPane tab="Coming soon" key="3">
                    <JobFairIncomingContainer/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default JobFairListPage
