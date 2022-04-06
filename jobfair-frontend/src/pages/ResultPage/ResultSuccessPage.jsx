import { Button, Result, Typography } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { PATH } from '../../constants/Paths/Path'
import { useSelector } from 'react-redux'
import React from 'react'

const { Paragraph, Text } = Typography

export const ResultSuccessPage = () => {
  const history = useHistory()
  // const {title, subTitle} = location.state;
  const email = useSelector(state => state.authentication?.user?.email)

  return (
    <div className="page">
      <Result status="success" title="Register successfully">
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16
              }}
            >
              Thank you for your registration!
            </Text>
          </Paragraph>
          <Paragraph>
            We will look over your registration and get back to you by 3-5 days.
            After that, we will send you at this email address:{' '}
            <a href={`mailto:${email}`}>{email}</a> to inform the result.
          </Paragraph>
          <Paragraph>
            In the meantime, you can check the{' '}
            <Link to={PATH.FAQ_PAGE}>FAQ Section</Link> or{' '}
            <Link to={PATH.PUBLICIZED_JOB_FAIR_LIST_PAGE}>Job Fair Page</Link>{' '}
            to check other job fairs !
          </Paragraph>
          <Button
            type="primary"
            key="console"
            onClick={() => history.push(PATH.INDEX)}
          >
            Back to home page
          </Button>
        </div>
      </Result>
    </div>
  )
}
