import './BoothInformationTab.styles.scss';
import { Avatar, Typography } from 'antd';

export const CompanyInformation = (props) => {
  const { data } = props;
  return (
    <div className='tab-container'>
      <Avatar shape='square' size={100} src={data.companyLogoURL} />
      <Typography.Title level={3}>{data.name}</Typography.Title>
      <Typography.Title level={4}>Company information</Typography.Title>
      <Typography.Paragraph></Typography.Paragraph>
      <Typography.Title level={4}>Company bio</Typography.Title>
      <Typography.Paragraph>
        <blockquote>{data.companyDescription}</blockquote>
      </Typography.Paragraph>
    </div>
  );
};
