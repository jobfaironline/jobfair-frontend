import { PATH } from '../../../constants/Paths/Path';
import React from 'react';

class ErrorHandlerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  componentDidCatch(error, info) {
    window.location.href = `${PATH.FINAL_ERROR_PAGE}`;
  }

  render() {
    if (this.state.hasError) {
      //can not handle error in here
    }
    return this.props.children;
  }
}

export default ErrorHandlerComponent;
