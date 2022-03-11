import React from 'react'
import PolicyComponent from '../../components/Policy/Policy.component'

const FAQPage = () => {
  return (
    <div
      className="page"
      style={{
        padding: '10rem',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, -10%)',
        marginTop: '20rem'
      }}
    >
      <PolicyComponent />
    </div>
  )
}

export default FAQPage
