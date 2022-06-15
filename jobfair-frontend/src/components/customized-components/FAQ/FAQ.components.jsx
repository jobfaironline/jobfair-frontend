import './FAQ.styles.scss';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Typography } from 'antd';
import React from 'react';

const { Panel } = Collapse;
const { Paragraph, Text } = Typography;

export const FAQComponent = () => (
  <div className='faq'>
    <div className='left-side'>FAQ</div>
    <div className='right-side'>
      <Collapse
        ghost={true}
        expandIconPosition='right'
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 0 : 90} style={{ color: '#FF7866', fontSize: '30px' }} />
        )}>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>01</div>
              <Text strong>How long will it take me to go through the career fair?</Text>
            </div>
          }
          key='1'>
          <Paragraph style={{ margin: '0 2rem' }}>
            That depends on how many employers you plan to visit and how long the lines are to see those employers.
            Career fairs are typically very large events attended by hundreds of people. Don't become overwhelmed; just
            focus on your list of employers you intend to visit. You may want to prioritize your list by creating a "Top
            5" selection just in case you don't have time to visit with every company you planned to see. Very popular
            companies tend to have very long lines, so you may want to visit other employers on your list and come back
            to that line later.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>02</div>
              <Text strong>Where can in edit my address?</Text>
            </div>
          }
          key='2'>
          <Paragraph style={{ margin: '0 2rem' }}>
            If you created a new account after or while ordering you can edit both addresses (for billing and shipping)
            in your customer account.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>03</div>
              <Text strong>Are you on Twitter, Facebook and other social media platforms?</Text>
            </div>
          }
          key='3'>
          <Paragraph style={{ margin: '0 2rem' }}>
            Yes, you can find us on the following social media platforms: Twitter, Facebook, Pinterest and Instagram.
            News about all of our magazines, as well as reading tips and special offers, can also be found in our
            newsletter, which we send out several times a month.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>04</div>
              <Text strong>What are your payment methods?</Text>
            </div>
          }
          key='4'>
          <Paragraph style={{ margin: '0 2rem' }}>
            Currently you can pay using your credit card (Visa, Mastercard and Amexco) via Stripe. We also accept
            payments via PayPal, TWINT and Apple Pay or you can transfer the amount to our bank account via direct bank
            transfer (advance payment). On your credit card statement, you will find your purchase listed as sent to
            “LOREM NOT IPSUM MAGS” (statement descriptor). Please take a look on the payments section for more details.
            Note: Additional fees may be charged by your bank when choosing direct bank transfer (advance payment).
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>05</div>
              <Text strong>I’m ordering from abroad. Do I have to pay VAT?</Text>
            </div>
          }
          key='5'>
          <Paragraph style={{ margin: '0 2rem' }}>
            If you’re ordering from abroad, you generally don’t have to pay Swiss VAT. Swiss VAT is deducted during the
            order process in our online shop. For orders within Switzerland, however, the reduced VAT rate of 2.5% is
            charged. All orders with a shipping destination outside Switzerland or the Principality of Liechtenstein are
            charged without value added tax (VAT). Depending on the country, taxes and/or import fees may apply during
            the import, which are levied by the national post office or the courier company. Taxes and/or import fees
            may vary from country to country and must be paid by the buyer.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>06</div>
              <Text strong>Where can I find your disclaimer and data privacy?</Text>
            </div>
          }
          key='6'>
          <Paragraph style={{ margin: '0 2rem' }}>
            All data will be treated as strictly confidential and will not be disclosed to third parties. Take a look on
            our disclaimer and Privacy Policy.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>07</div>
              <Text strong>Can I find internships at a career fair?</Text>
            </div>
          }
          key='7'>
          <Paragraph style={{ margin: '0 2rem' }}>
            Yes! Frequently, many employers attend career fairs to recruit for full-time positions and internships. Some
            fairs are dedicated solely to internship opportunities. For instance, the Regional Internship Center
            collaborates with local universities to host internship fairs.
          </Paragraph>
        </Panel>
        <Panel
          header={
            <div className='panel-header'>
              <div className='number'>08</div>
              <Text strong>How can I find out which employers will be attending?</Text>
            </div>
          }
          key='8'>
          <Paragraph style={{ margin: '0 2rem' }}>
            Visit the career fair's website for a list of employers who are registered for the event. Continue to check
            the site for updated employer registration information. If the fair runs for multiple days, be sure to note
            which date(s) the employer is registered to attend. Most sites will allow you to search for employers by
            name, keyword, industry area, or major.
          </Paragraph>
        </Panel>
      </Collapse>
    </div>
  </div>
);
