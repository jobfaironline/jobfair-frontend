import React from 'react'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
class ErrorHandler extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  componentDidCatch(error, info) {
    console.log(error)
    this.setState({ hasError: true })
    logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />
    }
    return this.props.children
  }
}
export default ErrorHandler
