import React, { useEffect, useState } from 'react'
import { notification, Space, Tooltip, Input } from 'antd'
import { MoreOutlined, EyeOutlined } from '@ant-design/icons'
import ApplicationTable from '../../../components/ApplicationView/ApplicationTable.component'

const { Search } = Input

const CompanyApplicationView = ({ tabStatus, ...otherProps }) => {
  const [applicationData, setApplicationData] = useState([])

  //TODO: there will be a switch case here to make dynamic fetch data function
  const fetchData = async () => {
    const testStatus = filterStatus(tabStatus)
    try {
      const res = await fetch('https://61bb1f8fe943920017784c8f.mockapi.io/api/application', {
        method: 'GET'
      })

      const resData = await res.json()

      if (res) {
        setApplicationData(resData.map((item, index) => ({ ...item, no: index + 1, status: testStatus })))
        //TODO: will change mapping status when have API
      }
    } catch (err) {
      notification['error']({
        message: `Fetch data failed`,
        description: `Error detail: ${err}`
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div>
        <Space style={{ marginBottom: '1rem' }}>
          <Search placeholder="Search by jobfair name" onSearch={() => {}} style={{ width: 200 }} />
          <Search placeholder="Search by job position" onSearch={() => {}} style={{ width: 200 }} />
        </Space>
        <ApplicationTable
          applicationData={applicationData}
          extra={[
            {
              title: 'Actions',
              key: 'action',
              width: '6rem',
              render: (text, record) => {
                return (
                  <Space size="middle">
                    <Tooltip placement="top" title="View detail">
                      <a onClick={() => {}}>
                        <EyeOutlined />
                      </a>
                    </Tooltip>
                  </Space>
                )
              }
            }
          ]}
        />
      </div>
    </div>
  )
}

const filterStatus = key => {
  switch (key) {
    case '1':
      return 'PENDING'
    case '3':
      return 'APPROVE'
    default:
      return 'REJECTED'
  }
}

export default CompanyApplicationView
