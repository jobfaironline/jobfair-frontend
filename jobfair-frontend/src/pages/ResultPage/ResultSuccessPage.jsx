import {Button, Result} from 'antd'
import {useHistory, useLocation} from 'react-router-dom'
import {PATH} from '../../constants/Paths/Path'

export const ResultSuccessPage = () => {
  const location = useLocation()
  const history = useHistory()
  // const {title, subTitle} = location.state;

  return (
    <Result
      status="success"
      title="Submitted successfully"
      subTitle="Your action has been submitted"
      extra={[
        <Button type="primary" key="console" onClick={() => history.push(PATH.JOB_FAIRS_PAGE)}>
          Back to home page
        </Button>
      ]}
    />
  )
}
