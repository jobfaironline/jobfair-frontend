import React, { useEffect, useState } from 'react'
import { Button, Form, notification, Typography } from 'antd'
import { CompanyProfileValidation } from '../../validate/CompanyProfileValidation'
import TextArea from 'antd/es/input/TextArea'
import PickJobPositionFormContainer from '../../containers/PickJobPositionForm/PickJobPositionForm.container'
import './JobfairRegistrationForm.styles.scss'
import { getLatestCompanyRegistration } from '../../services/company-registration-controller/CompanyRegistrationControllerService'

const { Text } = Typography

const JobfairRegistrationForm = ({ form, jobFairId }) => {
  const [adminMessage, setAdminMessage] = useState('')
  const fetchData = async () => {
    if (jobFairId !== undefined) {
      getLatestCompanyRegistration(jobFairId)
        .then(res => {
          console.log(res.data)
          setAdminMessage(res.data.adminMessage)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  {
    /* TODO: fetch latest company registration*/
  }
  // const fetchData = async () => {
  //   if (jobFairId !== undefined) {
  //     getLatestCompanyRegistration(jobFairId)
  //       .then(res => {
  //         const jobPositions = res.data.registrationJobPositions.map((item) => {
  //           console.log(item)
  //           return {
  //             ...item,
  //             numberOfPosition: item.numOfPosition,
  //             key: item.id
  //           }
  //         })
  //         form.setFieldsValue({
  //           ['description'] : res.data.description,
  //           ['jobPositions'] : jobPositions,
  //         })
  //       })
  //       .catch(err => {
  //         notification['error']({
  //           message: 'Not found the latest registration'
  //         })
  //       })
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <>
      {adminMessage?.length !== 0 ? (
        <div style={{ marginBottom: 20 }}>
          <Text strong>Admin request change content: </Text>
          <Text>{adminMessage}</Text>
        </div>
      ) : null}

      <Form
        form={form}
        layout="vertical"
        requiredMark="required"
        autoComplete="off"
        scrollToFirstError
        initialValues={{ description: undefined, jobPositions: [] }} //will go
      >
        <Form.Item
          label="Registration description"
          required
          tooltip="This description will be shown during the jobfair"
          rules={CompanyProfileValidation.description}
          name="description"
        >
          <TextArea autoSize={{ minRows: 5 }} showCount maxLength={3000} placeholder="Registration description" />
        </Form.Item>
        <PickJobPositionFormContainer form={form} />
      </Form>
    </>
  )
}

export default JobfairRegistrationForm
