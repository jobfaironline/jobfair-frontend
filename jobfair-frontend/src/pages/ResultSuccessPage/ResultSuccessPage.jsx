import { Result, Typography } from 'antd';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const { Paragraph, Text } = Typography;

class ResultSuccessPage extends React.Component {
  componentDidMount() {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, document.title, window.location.href);
    });
  }

  render() {
    return (
      <PageLayoutWrapper className='page'>
        <Result status='success' title='Payment successfully'>
          <div className='desc'>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                  color: 'green'
                }}>
                You're Premium now.
              </Text>
            </Paragraph>
            <Paragraph>Your purchase is completed. Thank you!</Paragraph>
          </div>
        </Result>
      </PageLayoutWrapper>
    );
  }
}

export default ResultSuccessPage;
