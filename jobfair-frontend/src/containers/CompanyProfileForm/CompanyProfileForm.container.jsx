import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Affix, Button, Form, notification, Spin } from 'antd'
import {
  getCompanyProfileAPI,
  updateCompanyProfileAPI
} from '../../services/company-controller/CompanyControllerService'
import CompanyProfileForm from '../../components/CompanyProfileForm/CompanyProfileForm.component'

const CompanyProfileFormContainer = () => {
  const [form] = Form.useForm()
  const companyId = useSelector(state => state.authentication.user.companyId)
  const [data, setData] = useState({})

  const onFinish = values => {
    const body = {
      address: values.address,
      benefits: values.benefits,
      companyDescription: values.companyDescription,
      email: values.email,
      mediaUrls: values.mediaUrls,
      name: values.name,
      phone: values.phone,
      sizeId: values.sizeId,
      subCategoriesIds: values.subCategoriesIds,
      taxId: values.taxId,
      url: values.url
    }
    updateCompanyProfileAPI(body, companyId)
      .then(() => {
        notification['success']({
          message: `Update company profile successfully`,
          description: `For company with ${companyId}`
        })
        fetchData()
      })
      .catch(() => {
        notification['error']({
          message: `Update company profile failed`,
          description: `There is problem while updating, try again later`
        })
      })
  }

  const fetchData = async () => {
    getCompanyProfileAPI(companyId)
      .then(res => {
        setData({
          ...res.data,
          benefits: res.data.companyBenefitDTOS.map(item => {
            return {
              ...item,
              id: item.benefitDTO.id,
              description: item.benefitDTO.description
            }
          }),
          mediaUrls: res.data.mediaDTOS,
          subCategoriesIds: res.data.subCategoryDTOs.map(item => item.id),
          url: res.data.websiteUrl
        })
      })
      .catch(() => {
        notification['error']({
          message: `Fetch company profile failed`,
          description: `Failed for company with ${companyId}`
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  form.setFieldsValue({ ...data })

  return (
    <>
      {data === undefined || data === null || Object.keys(data).length === 0 ? (
        <Spin size="large" />
      ) : (
        <Form form={form} onFinish={onFinish} requiredMark="required" autoComplete="off" scrollToFirstError={true}>
          <CompanyProfileForm urlValue={data.url} />
          <Form.Item>
            <Affix offsetBottom={10}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Affix>
          </Form.Item>
        </Form>
      )}
    </>
  )
}

export default CompanyProfileFormContainer
