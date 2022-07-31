import { Col, Image, Row, Tag, Typography } from 'antd';

export const CompanyInformation = (props) => {
  const { data } = props;
  return (
    <div>
      <Image width={100} src={data.companyLogoURL} />
      <Typography.Title level={3}>{data?.name}</Typography.Title>
      <Typography.Title level={4}>Company information</Typography.Title>
      <Typography.Paragraph>
        <Row>
          <Col>
            <Typography.Text strong>Address: </Typography.Text>
            <Typography.Text>{data?.address}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography.Text strong>Website: </Typography.Text>
            <Typography.Text>{data?.websiteUrl}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography.Text strong>Business type: </Typography.Text>
            {data?.subCategoryDTOs.map((subCategory) => (
              <Tag color='blue'>{subCategory.name}</Tag>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography.Text strong>Employee size: </Typography.Text>
            <Typography.Text>{data?.employeeMaxNum} personals</Typography.Text>
          </Col>
        </Row>
      </Typography.Paragraph>
      <Typography.Title level={4}>Company bio</Typography.Title>
      <Typography.Paragraph>
        <blockquote>{data?.companyDescription}</blockquote>
      </Typography.Paragraph>
    </div>
  );
};
