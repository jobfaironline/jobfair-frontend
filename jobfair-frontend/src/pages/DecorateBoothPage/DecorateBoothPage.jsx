import { DecorateBoothContainer } from '../../containers/DecorateBoothContainer/DecorateBooth.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const DecorateBoothPage = () => (
  <PageLayoutWrapper className={'page fullscreen-page'} style={{ overflowY: 'hidden' }}>
    <DecorateBoothContainer />
  </PageLayoutWrapper>
);

export default DecorateBoothPage;
