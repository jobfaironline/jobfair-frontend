import { Select } from 'antd'
import React from 'react'

const { Option } = Select

export const ViewSelect = props => {
  const { onChange } = props
  return (
    <Select
      labelInValue
      defaultValue={{ value: 'Third' }}
      style={{ width: 120, position: 'absolute', zIndex: 10, right: 100 }}
      onChange={onChange}
    >
      <Option value={'First'}>First</Option>
      <Option value={'Third'}>Third</Option>
    </Select>
  )
}
