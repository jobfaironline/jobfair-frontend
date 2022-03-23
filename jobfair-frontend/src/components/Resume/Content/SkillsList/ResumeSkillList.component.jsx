import React from 'react'
import {Tag, Typography} from 'antd'
import { BulbTwoTone } from '@ant-design/icons'
const SkillListComponent = props => {
  const { Text } = Typography
  const { listData } = props
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {listData.map(data => (
        <div>
          <Tag color='blue'>
            {data.name}
          </Tag>
        </div>
      ))}
    </div>
  )
}
export default SkillListComponent
