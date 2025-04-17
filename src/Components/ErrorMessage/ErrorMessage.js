import { Component } from 'react';
import { Alert } from 'antd';

export default class ErrorMessage extends Component {
  render() {
    const { isOnline } = this.props;
    const errorMessages = {
      title: 'Something went wrong',
      description: 'We are already fixing the problem, please try back a little later.',
    };

    if (!isOnline) {
      errorMessages.title = 'No internet connection';
      errorMessages.description = 'Please check your internet connection';
    }

    return <Alert message={errorMessages.title} description={errorMessages.description} type="error" />;
  }
}
