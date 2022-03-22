import React from 'react'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import { Redirect } from 'react-router-dom'
import { PATH } from '../../constants/Paths/Path'
class ErrorHandlerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch(error, info) {
    window.location.href = `${PATH.FINAL_ERROR_PAGE}`
  }

  render() {
    if (this.state.hasError) {
      //can not handle error in here
    }
    return this.props.children
  }
}
export default ErrorHandlerComponent
