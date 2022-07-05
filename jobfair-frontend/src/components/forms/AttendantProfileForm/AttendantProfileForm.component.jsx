import './AttendantProfileForm.scss';
import { ActivityList } from './ActivityList/ActivityList.component';
import { AttendantProfile } from './AttendantProfile.component';
import { BackTop, Button, Divider, Form, Typography } from 'antd';
import { CertificationList } from './CertificationList/CertificationList.component';
import { EducationList } from './EducationList/EducationList.component';
import { ReferenceList } from './ReferencesList/ReferencesList.component';
import { SkillList } from './SkillList/SkillList.component';
import { WorkHistoryList } from './WorkHistoryList/WorkHistoryList.component';
import AnchorComponent from '../../commons/Anchor/Achor.component';
import React from 'react';

const { Title, Text } = Typography;

const formTitles = [
  { title: 'Profile', href: '#profile' },
  { title: 'Skills', href: '#skills' },
  { title: 'Work history', href: '#work-histories' },
  { title: 'Education', href: '#educations' },
  { title: 'Certification', href: '#certifications' },
  { title: 'Reference', href: '#references' },
  { title: 'Activity', href: '#activities' }
];

const AttendantProfileFormComponent = ({ form, onFinish, data, onDeactivateAccount, onChangePassword }) => {
  form.setFieldsValue({ ...data });
  const email = form.getFieldValue('account')?.email;

  return (
    <div className={'attendant-profile-form'}>
      <Divider orientation='left'>
        <Title level={2} id={'account-profile'} style={{ scrollMarginTop: '126px' }}>
          Account profile
        </Title>
      </Divider>
      <div style={{ marginBottom: '1rem' }}>
        <Text>{email}</Text> -{' '}
        <a style={{ textDecoration: 'underline' }} onClick={onChangePassword}>
          <Text strong>Change password</Text>
        </a>{' '}
        -{' '}
        <a style={{ textDecoration: 'underline' }} onClick={onDeactivateAccount}>
          <Text strong>Deactivate account</Text>
        </a>
      </div>
      <div style={{ position: 'fixed', left: '10%' }}>
        <AnchorComponent listData={formTitles} href={'#account-profile'} title={'Attendant profile'} />
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark='required'
        autoComplete='off'
        layout={'vertical'}
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
        <AttendantProfile form={form} id={'profile'} />
        <SkillList id={'skills'} />
        <WorkHistoryList form={form} id={'work-histories'} />
        <EducationList form={form} id={'educations'} />
        <CertificationList form={form} id={'certifications'} />
        <ReferenceList form={form} id={'references'} />
        <ActivityList form={form} id={'activities'} />
        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <Button type='primary' htmlType='submit' className={'button'} style={{ marginLeft: 'auto' }}>
            Save
          </Button>
        </div>
      </Form>
      <BackTop />
    </div>
  );
};

export default AttendantProfileFormComponent;
