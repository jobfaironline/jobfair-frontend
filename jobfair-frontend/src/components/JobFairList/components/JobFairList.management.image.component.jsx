import React from 'react'
import {Image} from 'antd'

const JobFairListManagementImageComponent = props => {
  const {urlImage} = props
  return (
    <>
      <Image width={300} src={urlImage}/>
    </>
  )
}
export default JobFairListManagementImageComponent
