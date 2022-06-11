import { Button, Descriptions, Image, Tag, Typography } from 'antd';
import { SizeConst, SubCategories } from '../../../constants/CompanyProfileConstant';

const { Title } = Typography;

export const CompanyProfile = (props) => {
  const { data, isReadOnly = false } = props;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Image height={'10rem'} src={data.companyLogoURL} />
        {isReadOnly ? null : (
          <Button style={{ marginLeft: 'auto', marginRight: '5rem' }} className={'button'}>
            Edit
          </Button>
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Descriptions
          title={
            <Title style={{ marginBottom: 0, fontWeight: '700' }} level={3}>
              {data.name}
            </Title>
          }
          column={1}>
          <Descriptions.Item label={'Address'}>{data.address}</Descriptions.Item>
          <Descriptions.Item label={'Website'}>{data.url}</Descriptions.Item>
          <Descriptions.Item label={'Size'}>
            {SizeConst.find((item) => item.value === data.sizeId)?.label}
          </Descriptions.Item>
          <Descriptions.Item label={'Company industry'}>
            {data.subCategoriesIds.map((categoryId) => (
              <Tag>{SubCategories.find((item) => item.value === categoryId)?.label}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label={'Company description'}>{data.companyDescription}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};
