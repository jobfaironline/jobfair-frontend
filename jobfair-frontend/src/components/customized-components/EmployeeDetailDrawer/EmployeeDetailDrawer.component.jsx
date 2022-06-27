import { Col, Divider, Drawer, Row, Tag, Typography } from 'antd';

const handleTagStatusRender = (status) => {
  switch (status) {
    case 'VERIFIED':
      return <Tag color={'green'}>{status}</Tag>;
    case 'INACTIVE':
      return <Tag color={'red'}>{status}</Tag>;
    default:
      return <Tag color={'blue'}>{status}</Tag>;
  }
};

const DescriptionItem = ({ title, content, isEnum = false }) => (
  <div className='site-description-item-profile-wrapper'>
    <p
      className='site-description-item-profile-p-label'
      style={{ display: 'inline', fontWeight: 'bold', marginRight: '0.5rem' }}>
      {title}:
    </p>
    {isEnum ? handleTagStatusRender(content) : <span>{` ${content}`}</span>}
  </div>
);

const mappingRole = {
  COMPANY_EMPLOYEE: 'Company employee',
  COMPANY_MANAGER: 'Company manager'
};

const mappingGender = {
  FEMALE: 'Female',
  MALE: 'Male'
};

const EmployeeDrawer = ({ visible, onClose, data }) => {
  if (!data || Object.keys(data).length === 0) return null;
  const { Text, Title } = Typography;

  const { firstname, middlename, lastname } = data.account;
  const fullName = `${firstname} ${middlename ? `${middlename} ` : ''}${lastname}`;

  return (
    <>
      <Drawer width={640} placement='right' closable={false} onClose={onClose} visible={visible}>
        <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
          <Title level={3}>User Profile</Title>
        </p>
        <p className='site-description-item-profile-p'>
          <Text strong italic>
            Account information
          </Text>
        </p>
        <Row>
          <Col span={24}>
            <DescriptionItem title='Full Name' content={`${fullName}`} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Status' content={data.account.status} isEnum={true} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Account' content={data.account.email} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Gender' content={mappingGender[data.account.gender]} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Role' content={mappingRole[data.account.role]} isEnum={true} />
          </Col>
        </Row>
        <Divider />
        <p className='site-description-item-profile-p'>
          <Text strong italic>
            Company
          </Text>
        </p>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Name' content={data.companyDTO.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Phone' content={data.companyDTO.phone} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Address' content={data.companyDTO.address} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Description' content={data.companyDTO.companyDescription} />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default EmployeeDrawer;
