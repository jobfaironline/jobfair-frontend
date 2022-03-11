import React from 'react'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'

class ErrorHandlerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage/>
    }
    return this.props.children
  }
}

export default ErrorHandlerComponent
