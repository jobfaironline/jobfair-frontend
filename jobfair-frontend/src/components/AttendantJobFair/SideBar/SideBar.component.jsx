import {Tabs, Typography} from 'antd'
import {CompanyInformation} from './CompanyInformation.component'
import {CloseOutlined, MenuOutlined} from '@ant-design/icons'
import styles from './SideBar.module.scss'
import React from 'react'
import {CompanyJobPositionTab} from "./CompanyJobPositionTab.component";

const {Text} = Typography;


const SideBar = (props) => {

  const {companyInformation, jobPositions, isShow, handleOpenDetail, activeKey} = props;
  console.log(companyInformation.name)
  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <span>
            {isShow ? <CloseOutlined onClick={() => handleOpenDetail(false, activeKey)} className={styles.icon}/> : <MenuOutlined onClick={() => handleOpenDetail(true, activeKey)} className={styles.icon}/>}
        </span>
        <Text strong className={styles.title}>
          {companyInformation.name}
        </Text>
      </div>


      <Tabs tabPosition="left" activeKey={activeKey} onTabClick={key => {
        handleOpenDetail(true, key)
      }}>

        {isShow ? (
          <>
            <Tabs.TabPane tab="Tab 1" key="0">
              <div className={styles.aboutCompany}>
                <Typography variant="button">About Company</Typography>
                <CompanyInformation data={companyInformation}/>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="1">
              <CompanyJobPositionTab jobPositions={jobPositions}/>
            </Tabs.TabPane>

          </>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  )
}
export default SideBar
