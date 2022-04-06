import React from 'react'
import { Tag } from 'antd'

const SkillListComponent = props => {
  const { listData } = props
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {listData.map(data => (
        <div>
          <Tag color="blue">{data.name}</Tag>
        </div>
      ))}
    </div>
  )
}
export default SkillListComponent
