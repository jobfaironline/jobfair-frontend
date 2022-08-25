import { Col, Drawer, Row, Tag, Typography } from 'antd';

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
  COMPANY_EMPLOYEE: 'Company account',
  COMPANY_MANAGER: 'Company manager',
  ATTENDANT: 'Attendant'
};

const mappingGender = {
  FEMALE: 'Female',
  MALE: 'Male'
};

const AccountDrawer = ({ visible, onClose, data }) => {
  if (!data || Object.keys(data).length === 0) return null;
  const { Text, Title } = Typography;

  const { firstname, middlename, lastname } = data;
  const fullName = `${firstname} ${middlename ? `${middlename} ` : ''}${lastname}`;

  return (
    <>
      <Drawer width={640} placement='right' closable={false} onClose={onClose} visible={visible}>
        <p className='site-description-item-profile-p' style={{ marginBottom: 24 }}>
          <Title level={3}>User Profile</Title>
        </p>
        <p className='site-description-item-profile-p'>
          <Text strong italic style={{ whiteSpace: 'pre-line' }}>
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
            <DescriptionItem title='Status' content={data.status} isEnum={true} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Account' content={data.email} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title='Gender' content={mappingGender[data.gender]} />
          </Col>
          <Col span={12}>
            <DescriptionItem title='Role' content={mappingRole[data.role]} isEnum={true} />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default AccountDrawer;
