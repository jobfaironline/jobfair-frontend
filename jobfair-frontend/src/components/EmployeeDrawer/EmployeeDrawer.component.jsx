import { Drawer, List, Avatar, Divider, Col, Row } from 'antd'

const EmployeeDrawer = ({ drawerVisibility, setDrawerVisibility, data }) => {
  const onClose = () => {
    setDrawerVisibility(false)
  }

  console.log(data)

  return (
    <>
      <Drawer width={640} placement="right" closable={false} onClose={onClose} visible={drawerVisibility}>
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          User Profile
        </p>
        <p>{JSON.stringify(data)}</p>
      </Drawer>
    </>
  )
}

export default EmployeeDrawer
