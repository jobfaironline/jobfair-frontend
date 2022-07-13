import { DecorateBoothContainer } from '../../containers/DecorateBoothContainer/DecorateBooth.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const DecorateBoothPage = () => (
  <PageLayoutWrapper className={'page fullscreen-page'}>
    <DecorateBoothContainer />
  </PageLayoutWrapper>
);

export default DecorateBoothPage;
