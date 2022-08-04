import { Card, Checkbox, Modal, Typography } from 'antd';
import { Field, Form } from 'react-final-form';
import { PATH } from '../../../constants/Paths/Path';
import { formatCVC, formatCreditCardNumber, formatExpirationDate, formatName } from './CardUtil';
import {
  getInvoiceAPI,
  getInvoiceData,
  purchaseSubscriptionAPI
} from '../../../services/jobhub-api/SubscriptionControllerService';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import ResultFailedComponent from '../../commons/Result/ResultFailed.component';
import VisaCard from './Card';

const CheckoutFormComponent = ({ subscriptionId }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const history = useHistory();
  const [agree, setIsAgree] = useState(false);

  const onSubmit = async (values) => {
    await sleep(300);
    const body = {
      card: {
        cvc: values.cvc,
        exp_month: values.expiry.split('/')[0],
        exp_year: values.expiry.split('/')[1],
        number: values.number
      },
      subscriptionId
    };
    try {
      const res = await purchaseSubscriptionAPI(body);
      const invoiceUrl = await getInvoiceAPI(res.data.id);
      const invoiceData = await getInvoiceData(res.data.id);
      console.log(invoiceData.data);

      if (res.status === 200) {
        history.push(PATH.RESULT_SUCCESS_PAGE, {
          invoiceURL: invoiceUrl.data,
          invoiceData: invoiceData.data
        });
      }
    } catch (err) {
      Modal.error({
        title: 'Your card is invalid',
        width: '30rem',
        height: '40rem',
        closable: true,
        maskClosable: true,
        content: (
          <>
            <ResultFailedComponent />
          </>
        )
      });
    }
  };

  //validations
  const requiredValidator = (value) =>
    value ? undefined : (
      <div style={{ marginLeft: '1rem' }}>
        <Typography.Text type={'danger'}>Required</Typography.Text>
      </div>
    );
  // const mustBeNumberValidator = (value) => (isNaN(value) ? 'Must be a number' : undefined);
  // const nameMaxLengthValidator = (value) => (value.length > 100 ? 'Name length maximum is 100 character.' : undefined);
  //
  // const composeValidator =
  //   (...validators) =>
  //   (value) =>
  //     validators.reduce((error, validator) => error || validator(value), undefined);

  return (
    <>
      <Card
        style={{
          boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)'
        }}
        headStyle={{ backgroundColor: 'white', border: 0 }}
        bodyStyle={{ backgroundColor: 'white', border: 0, height: '43rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values, active }) => (
              <form onSubmit={handleSubmit}>
                <div
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <VisaCard
                      number={values.number || ''}
                      name={values.name || ''}
                      expiry={values.expiry || ''}
                      cvc={values.cvc || ''}
                      focused={active}
                    />
                  </div>
                  <div style={{ marginTop: '3rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                          <Typography.Text>Card number:</Typography.Text>
                          <Typography.Text type='danger'>*</Typography.Text>
                        </div>
                        <Field
                          name='number'
                          pattern='[\d| ]{16,22}'
                          format={formatCreditCardNumber}
                          validate={requiredValidator}>
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type='text'
                                placeholder='Number'
                                style={{
                                  borderStyle: 'solid',
                                  borderWidth: '1px',
                                  borderRadius: '5px'
                                }}
                              />
                              {(meta.error || meta.submitError) && meta.touched && (
                                <span>{meta.error || meta.submitError}</span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                          <Typography.Text>Name:</Typography.Text>
                          <Typography.Text type='danger'>*</Typography.Text>
                        </div>
                        <Field
                          name='name'
                          component='input'
                          type='text'
                          validate={requiredValidator}
                          format={formatName}>
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type='text'
                                placeholder='Card owner name'
                                style={{
                                  borderStyle: 'solid',
                                  borderWidth: '1px',
                                  borderRadius: '5px'
                                }}
                              />
                              {(meta.error || meta.submitError) && meta.touched && (
                                <span>{meta.error || meta.submitError}</span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                          <Typography.Text>Expired date:</Typography.Text>
                          <Typography.Text type='danger'>*</Typography.Text>
                        </div>
                        <Field
                          name='expiry'
                          pattern='\d\d/\d\d'
                          format={formatExpirationDate}
                          validate={requiredValidator}>
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type='text'
                                placeholder='MM/YY'
                                style={{
                                  borderStyle: 'solid',
                                  borderWidth: '1px',
                                  borderRadius: '5px'
                                }}
                              />
                              {(meta.error || meta.submitError) && meta.touched && (
                                <span>{meta.error || meta.submitError}</span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                          <Typography.Text>CVC:</Typography.Text>
                          <Typography.Text type='danger'>*</Typography.Text>
                        </div>
                        <Field name='cvc' pattern='\d{3,4}' format={formatCVC} validate={requiredValidator}>
                          {({ input, meta }) => (
                            <div>
                              <input
                                {...input}
                                type='text'
                                placeholder='xxx'
                                style={{
                                  borderStyle: 'solid',
                                  borderWidth: '1px',
                                  borderRadius: '5px'
                                }}
                              />
                              {(meta.error || meta.submitError) && meta.touched && (
                                <span>{meta.error || meta.submitError}</span>
                              )}
                            </div>
                          )}
                        </Field>
                      </div>
                    </div>
                    <Checkbox onChange={(e) => setIsAgree(e.target.checked)}>
                      <p style={{ fontSize: '1rem', width: '20rem' }}>
                        By clicking this checkbox, you confirm that only subscription has available job fair can be
                        requested to refund
                      </p>
                    </Checkbox>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '1rem',
                        padding: '0 2px'
                      }}>
                      {agree && (
                        <button
                          type='submit'
                          disabled={submitting}
                          style={{
                            backgroundColor: '#04AA6D',
                            border: 'none',
                            color: 'white',
                            padding: '10px',
                            width: 'fit-content',
                            textAlign: 'center',
                            textDecoration: 'none',
                            display: 'inline-block',
                            fontSize: '16px',
                            margin: '4px 2px',
                            cursor: 'pointer',
                            borderRadius: '12px'
                          }}>
                          Checkout
                        </button>
                      )}
                      <button
                        type='button'
                        onClick={form.reset}
                        disabled={submitting || pristine}
                        style={{
                          backgroundColor: '#F5B862',
                          border: 'none',
                          color: 'white',
                          padding: '10px',
                          width: '5rem',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '16px',
                          margin: '4px 2px',
                          cursor: 'pointer',
                          borderRadius: '12px'
                        }}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </Card>
    </>
  );
};

export default CheckoutFormComponent;
