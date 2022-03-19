import { Tabs } from 'antd'
import { useState } from 'react'
import { Typography } from '@mui/material'
import CompanyInfor from './CompanyInfor.component'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import styles from './SideBar.module.scss'
const { TabPane } = Tabs
const SideBar = () => {
  const [isShow, setIsShow] = useState(false)
  const [currentKey, setCurrentKey] = useState()
  const [companyInfor, setCompanyInfor] =
    useState(`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`)
  const handleOpenDetail = status => {
    setIsShow(status)
  }

  return (
    <div className={styles.container} accessKey={currentKey}>
      <Tabs tabPosition="left">
        <TabPane defaultActiveKey={1}
          tab={
            <span>
              {isShow ? (
                <CloseOutlined onClick={() => handleOpenDetail(false)} className={styles.icon} />
              ) : (
                <MenuOutlined onClick={() => handleOpenDetail(true)} className={styles.icon} />
              )}
            </span>
          }
          key="1"
          disabled
        >123</TabPane>
        {isShow ? (
          <>
            <TabPane tab="Tab 1" key="2">
              <div className={styles.aboutCompany}>
                <Typography variant="button">About Company</Typography>
                <CompanyInfor companyInfor={companyInfor} />
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="3">
              <Typography variant="button">Detail one</Typography>
            </TabPane>
            <TabPane tab="Tab 3" key="4">
              <Typography variant="button">Detail two</Typography>
            </TabPane>
          </>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  )
}
export default SideBar
