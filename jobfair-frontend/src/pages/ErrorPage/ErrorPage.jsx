import React, { useMemo } from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { PATH } from '../../constants/Paths/Path'
const ErrorPage = ({ code = 404 }) => {
  const history = useHistory()
  const subTitlte = useMemo(() => {
    switch (code) {
      case 403:
        return 'Sorry, You can not access this page.'
      case 404:
        return 'Sorry, The page you visit does not exist.'
      default:
        return 'Sorry, something went wrong.'
    }
  }, [code])
  return (
    <>
      <Result
        status={code}
        title={code}
        subTitle={subTitlte}
        extra={
          <Button
            className="main-button"
            onClick={() => {
              history.push(PATH.HOME)
            }}
            type="primary"
          >
            Back to Home
          </Button>
        }
      />
    </>
  )
}
export default ErrorPage
