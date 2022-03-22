import React from 'react'
import { Typography } from 'antd'
import { BulbTwoTone } from '@ant-design/icons'
const SkillListComponent = props => {
  const { Text } = Typography
  const { listData } = props
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {listData.map(data => (
        <div>
          <BulbTwoTone />
          <Text type="secondary">{data.name}</Text>
        </div>
      ))}
    </div>
  )
}
export default SkillListComponent
