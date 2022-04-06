import React from 'react'
import { Image } from 'antd'

const JobFairListManagementImageComponent = props => {
  const { urlImage } = props
  return (
    <>
      <Image src={urlImage} height={260} width={450} />
    </>
  )
}
export default JobFairListManagementImageComponent
