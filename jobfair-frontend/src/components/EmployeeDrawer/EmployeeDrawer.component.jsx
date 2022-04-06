import { Col, Divider, Drawer, Row } from 'antd'

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p
      className="site-description-item-profile-p-label"
      style={{ display: 'inline' }}
    >
      {title}:
    </p>
    <span>{' ' + content}</span>
  </div>
)

const mappingRole = {
  COMPANY_EMPLOYEE: 'Company employee',
  COMPANY_MANAGER: 'Company manager'
}

const mappingGender = {
  FEMALE: 'Female',
  MALE: 'Male'
}

const EmployeeDrawer = ({ visible, onClose, data }) => {
  if (!data || Object.keys(data).length === 0) {
    return null
  }

  const { firstname, middlename, lastname } = data.account
  const fullName =
    firstname + ' ' + (middlename ? middlename + ' ' : '') + lastname

  return (
    <>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p
          className="site-description-item-profile-p"
          style={{ marginBottom: 24 }}
        >
          User Profile
        </p>
        <p className="site-description-item-profile-p">Account</p>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Full Name" content={`${fullName}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Status" content={data.account.status} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Account" content={data.account.email} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Gender"
              content={mappingGender[data.account.gender]}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Role"
              content={mappingRole[data.account.role]}
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={data.companyDTO.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Phone" content={data.companyDTO.phone} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Address"
              content={data.companyDTO.address}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Description"
              content={data.companyDTO.companyDescription}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default EmployeeDrawer
