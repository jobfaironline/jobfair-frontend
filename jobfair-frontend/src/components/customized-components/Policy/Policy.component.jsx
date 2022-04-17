import { Button, Card, Space, Typography } from 'antd';
import React from 'react';

const PolicyComponent = ({ onHandleNext, agreeStatus, onHandlePrev }) => {
  const { Title, Text } = Typography;
  return (
    <div style={{ textAlign: 'justify' }}>
      <Card title={<Title level={4}>TERMS OF USE OF THE SERVICE WITH CANDIDATES</Title>} bordered={true}>
        <Title level={3}>1. GENERAL TERMS</Title>
        <Text>
          By accessing or using the JobHub.vn website, the services, or any application provided by JobHub.,JSC
          ("JobHub") (collectively, the "Services"), whether accessed by you agree to be bound by these terms of use
          ("Terms of Use").The Service is owned or controlled by JobHub.These Terms of Use affect legal rights and
          obligations. If you do not agree to be bound by all of these Terms of Use, you do not access or use the
          Service.If You have any questions regarding these Terms, please contact Contact us at email: legal@JobHub.vn.
          We may update these Terms from time to time for legal or regulatory reasons or to enable the proper operation
          of the JobHub.vn website. Any changes will be communicated to you by an appropriate notice on our website.
          These changes will apply to the use of the JobHub.vn website. After we have notified you, If you do not wish
          to accept the new Terms, you should not continue to use the JobHub.vn website. If you continue to use the
          JobHub.vn website from the effective date of the change, your use of the JobHub.vn website represents your
          agreement to be bound by the new Terms.
        </Text>
        <Title level={3}>2. DEFINITIONS AND EXPLANATIONS</Title>
        <Text>
          1. {<Text strong>“JobHub.vn Database” </Text>}or {<Text strong>“JobHub.vn Databases”</Text>} includes all job
          advertisements posted on JobHub.vn websites and or all information of candidates and or employers registered
          with JobHub.vn. <br />
          2. {<Text strong>“JobHub.vn Profile Database” </Text>}or {<Text strong>“Profile Databases”</Text>} is the
          candidate profile created and/or posted in JobHub.vn databases. <br />
          3. {<Text strong>“JobHub.vn Service” </Text>} means any service provided by JobHub. <br />
          4. {<Text strong>“Personal Profile” </Text>} means personal information and CV created by the User.
          <br />
          5. {<Text strong>“Text” </Text>}includes all text on every page of the JobHub.vn website, whether
          authoritative material, search-oriented content or instructional information. <br />
          6. {<Text strong>“User” </Text>} refers to any person or entity that uses any aspect of the JobHub.vn website
          and/or JobHub.vn Services.
          <br />
          7. {<Text strong>User Content” </Text>} means all information, data, text, software, music, sound, images,
          graphics, video, advertisements, messages or other materials submitted, posted or indicated by the User on or
          through the JobHub.vn website.
          <br />
        </Text>
        <Title level={3}> 3. REGISTER</Title>
        <Text>
          To use the Service, you must create an account as required by JobHub, you commit that the use of the account
          must comply with JobHub's regulations, and all the information you provide us is correct. , accurate, complete
          with at the time requested. All your rights and obligations will be based on the account information you have
          registered, so if there is any false information we will not be responsible in the event that such information
          affects or limits you. your rights.
        </Text>
        <Title level={3}>4. PASSWORD AND SECURITY</Title>
        <Text>
          1.When you register to use the JobHub.vn website, you will be asked to create a password. To avoid fraud, you
          must keep this password confidential and must not disclose or share it with anyone. If you know or suspect
          someone else knows your password, you should notify us immediately. immediately by contacting us at email
          hotro@JobHub.vn <br />
          2.If JobHub.vn has reason to believe that there is a possibility of a breach of security or improper use of
          the JobHub.vn website, we may require you to change your password or we may may suspend your account. <br />
          3. In case you lose your Password or improperly use JobHub.vn website:
          <br /> - You bear all loss or damage incurred; and You are responsible for fully indemnifying
          <br /> - JobHub in the event that JobHub has any loss or damage.
        </Text>
        <Title level={3}>5. RIGHTS TO ACCESS AND COLLECT INFORMATION</Title>
        <Text>
          1. When using the JobHub.vn website, you acknowledge that we have the right to collect the following
          information about you: <br />
          2. Personal information: includes the information you provide us to create a profile such as name, phone
          number, email address;… <br />
          3. General information: such as information about work experience, career orientation, job goals; capacity
          level; income;… <br />
          4. You acknowledge and agree to be solely responsible for the form, content and authenticity of any records or
          documents posted by you on the JobHub.vn website, and agree to bear the responsibility alone. responsible for
          any consequences arising from this posting. <br />
          5. JobHub reserves the right to recommend to you third-party services and products based on the relevant items
          you identify during registration and any time thereafter or when you have agreed to receive, such proposals.
          This export will be done by JobHub or third parties.
          <br /> 6. JobHub reserves the right, in its sole discretion, to comply with legal requests, requests from law
          enforcement or regulatory authorities, even if such compliance may include the disclosure of certain
          information. Certain users. In addition, third parties are permitted to retain archived copies of User
          information. <br />
          7. You understand and acknowledge that all information provided by you, your Personal Information, profile
          and/or account information, will be disclosed to potential Employers on JobHub. <br />
          8. JobHub absolutely respects the candidate's right to privacy.
          <br /> 9. If you do not want your personal profile to be public, please turn off the job search feature & the
          feature that allows recruiters to see your profile to avoid being disturbed. <br />
          10. You understand and acknowledge that you have no ownership rights in your account and that if you cancel
          your account on the JobHub.vn website or your account is terminated, all of your account information You on
          the JobHub.vn website, including your resume, Personal Information, cover letter, saved jobs, will be marked
          as deleted and possibly deleted from the JobHub Database and will be deleted. be removed from any public area
          on the JobHub.vn website. Information may continue to be displayed for a period of time because of obstacles
          in transmitting the delete signal through JobHub.vn's servers or at the request of relevant authorities. In
          addition, third parties are allowed to retain copies of your information.
          <br /> 11. JobHub reserves the right to delete your account and all information after a long period of
          inactivity.
        </Text>
        <Title level={3}>6. STATEMENT OF INTELLECTUAL PROPERTY RIGHTS</Title>
        <Text>
          1. You represent and warrant that: (i) you own the Content you post to or through the Service or, in other
          words, you have the right to grant the rights and licenses set forth in the Terms of Use this; (ii) the
          posting and use of Content on or through the Service does not infringe, appropriate or otherwise infringe the
          rights of any third party, including but not limited to privacy, publicity, copyright, trademark and/or other
          intellectual property rights; (iii) you agree to pay all royalties, fees and any other amounts owed as a
          result of Content you post to or through the Service; and (iv) you have the legal right and capacity to enter
          into these Terms of Use in your jurisdiction. <br />
          2. The Service contains content owned or licensed by JobHub ("JobHub Content"). JobHub Content is protected by
          copyright, trademark, patent, trade secret and other laws, and between you and JobHub, JobHub owns and holds
          all rights to <br />
          3. Services and JobHub Content. You may not remove, alter or conceal any copyright, trademark, service mark or
          other proprietary rights notices associated with or accompanying the JobHub Content and you may not copy,
          modify, adapt, prepare derivative works based on, perform, display, publish, distribute, transmit, broadcast,
          sell, license or otherwise exploit the JobHub Content. <br />
          4. JobHub logo and name are trademarks of JobHub and may not be copied, forged or used in whole or in part
          without the prior written permission of JobHub. In addition, all page headers, custom graphics, button icons,
          and scripts are service marks, trademarks and/or commercial packaging of JobHub and may not be copied, forged
          or used in whole or in part without the prior written permission of JobHub.
          <br /> 5. While JobHub's purpose is to provide the Service as much as possible, there will be instances where
          the Service may be interrupted, including but not limited to interruptions for scheduled maintenance or
          upgrades, for emergency repair or for failure of equipment and/or telecommunications links. In addition,
          JobHub reserves the right to remove any Content from the Service for any reason that, in its sole discretion,
          is a violation of these Terms, a violation of law, rule or regulation, of an insulting nature. insult,
          disrupt, offend or otherwise illegal, or violate rights, or harm or threaten the safety of Users of any
          JobHub.vn website. JobHub reserves the right to expel users and prevent their subsequent access to the
          JobHub.vn website and/or use of JobHub services in violation of these Terms or in violation of laws, rules or
          regulations. JobHub is authorized to take any action in relation to User Content as it deems necessary or
          appropriate if JobHub believes that User Content could create liability for JobHub, causing damage to its
          brand. JobHub brand or public image, or lead to JobHub losing users. Content removed from the Service may
          continue to be stored by JobHub, including but not limited to, for compliance with certain legal obligations,
          but may not be retrievable without a valid order. of the court. JobHub will not be liable to you for any
          modification, suspension or discontinuance of the Service or loss of any Content. You also acknowledge that
          the Internet may not be secure and that the submission of Content or other information may not be. <br />
          6. JobHub will not be responsible for any information posted by any third party, regardless of reason, by any
          organization that posts content on JobHub. However, JobHub will try to use all control measures and minimize
          the cases of fraudulent recruitment news, incorrect information....to protect Users. <br />
          7. JobHub does not represent or warrant the truthfulness, accuracy, or reliability of User Content, derivative
          works of User Content, or any other communications posted by Users. nor endorse any opinions expressed by the
          User. You acknowledge that any reliance on material posted by other Users is at your own risk.
        </Text>
        <Title level={3}>7. US DISCLAIMER</Title>
        <Text>
          1. JobHub makes no representations or warranties that the service will be error free or uninterrupted; that
          errors will be rectified; or that the service or the server providing it is not infected with any harmful
          components, including but not limited to viruses. JobHub does not make any representations or warranties that
          the information (including any instructions) about the service is accurate, complete or useful. You
          acknowledge that you use the service at your own risk. JobHub does not warrant that your use of the service is
          legal in any particular jurisdiction and JobHub specifically disclaims such warranties. Some jurisdictions
          limit or do not allow disclaimers of implied warranties or other warranties, so the above disclaimer may not
          apply to you to the extent of the law. of the jurisdiction that applies to you and these terms of use.
          <br /> 2. By accessing or using the service, you represent and warrant that your activity is legal in all
          jurisdictions in which you access or use the service. <br />
          3. JobHub does not endorse the content and specifically disclaims any responsibility or liability to any
          person or entity for any loss, damage (whether actual, consequential, punitive or otherwise), injury, claim,
          liability or other cause of any kind or character based on or resulting from any content.
        </Text>
        <Title level={3}>8. LIMITATION OF LIABILITY</Title>
        <Text>
          Under no circumstances will JobHub be liable to you for any loss or damage of any kind (including but not
          limited to any direct, indirect, economic loss or damage). economic, warning, special, punitive, incidental or
          consequential) that are directly or indirectly related to: (a) the service; (b) JobHub content; (c) user
          content; (d) your use, inability to use or effectiveness of the Service; (e) any action taken in connection
          with an investigation by JobHub or law enforcement into your or any other party's use of the service; (f) any
          action taken in relation to the owner of a copyright or other intellectual property right; (g) any errors or
          omissions in the operation of the service; or (h) any damage to any user's computer, mobile device, device or
          other technology, including but not limited to damage resulting from any breach of security or from any any
          virus, bug, tampering, fraud, error, omission, interruption, defect, delay in operation or transmission,
          network or computer failure, any other technical problem or malfunction others, including but not limited to
          damages resulting from loss of profits, loss of trust, loss of data, outages, accuracy of results or computer
          errors or malfunctions, even if predictable or JobHub was advised or ought to have known of the possibility of
          such damages, whether by contract, negligence, strict liability or tort (including, but not limited to, caused
          in whole or in part by negligence, natural disaster, telecommunications failure, theft or service
          destruction). Under no circumstances shall JobHub be liable to you or anyone else for loss, damage or injury,
          including but not limited to personal injury or death.
        </Text>
        <Title level={3}>9. DISPUTE SETTLEMENT</Title>
        <Text>
          1. Any dispute arising in the process of using JobHub's services will be resolved in accordance with the
          current law of the Socialist Republic of Vietnam.
          <br /> 2. Any complaints arising during the use of the product must be sent to JobHub immediately after the
          event giving rise to the complaint: Contact address: JobHub office, 19th floor, 169 Nguyen Ngoc Vu, Trung Hoa,
          Cau Giay, Hanoi Phone: 024 6680 5588 Email: legal@JobHub.vn <br />
          3. JobHub will base on each specific case to have an appropriate solution. When exercising the right to make a
          complaint, the complainant is obliged to provide papers, evidences and grounds related to the complaint and
          must take responsibility for the complaint contents, papers, evidences and grounds. provided by us in
          accordance with the law.
          <br /> 4. JobHub only supports and resolves User's complaints and denunciations in case you have fully,
          honestly and accurately recorded information when registering for an account. <br />
          5. For disputes between Users, or disputes with Third Parties, it is possible that JobHub will send contact
          information to the disputing objects for the parties to resolve themselves or JobHub will base on the actual
          situation. economy to solve. Accordingly, JobHub will protect the maximum possible rights for legitimate and
          legitimate Users.
          <br /> 6. The User agrees to defend, indemnify and exclude JobHub from all legal obligations, proceedings,
          losses and expenses including but not limited to court fees, attorneys' fees, and related consultants. in
          connection with the settlement of or arising from the User's violation during the use of the product.
          <br /> 7. If the dispute is not resolved within sixty (60) days from the date on which one Party notifies the
          other Party in writing of the arising of the dispute, one of the Parties has the right to bring the case to
          settlement. At a competent court in Hanoi as prescribed by law, the losing party will have to bear all the
          costs of court proceedings.
        </Text>
        <Title level={3}>10. VALIDITY OF THE CONTRACT</Title>
        <Text>
          1. The terms specified in these Terms of Use may be updated and modified at any time without prior notice to
          the user. JobHub will clearly announce on the Website, about those changes and additions.
          <br /> 2. In the event that one or several provisions of these Terms of Use conflict with the provisions of
          the law and are declared invalid by the Court, that provision will be amended to conform to the current law
          provisions. operating, and the remainder of the Terms of Use will remain in full force and effect.
          <br /> 3. This Agreement has the same validity as the Contract. The User understands that this is an
          electronic contract, The legal value of an electronic contract cannot be denied just because the contract is
          expressed in the form of a data message according to the Law on Electronic Transactions. By clicking on the “I
          agree” button, the User fully agrees and understands the terms of this Agreement and the Agreement effective
          from this point on. If you violate these Terms, you agree to take full responsibility and compensate for
          damages (If any) with JobHub.
        </Text>
      </Card>
      <Space>
        <Button type='primary' onClick={onHandleNext} disabled={!agreeStatus}>
          Next
        </Button>
        <Button type='primary' onClick={onHandlePrev}>
          Previous
        </Button>
      </Space>
    </div>
  );
};
export default PolicyComponent;
