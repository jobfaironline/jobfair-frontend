import { DecorateBoothContainer } from '../../containers/DecorateBoothContainer/DecorateBooth.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const DecorateBoothPage = () => (
  <PageLayoutWrapper className={'page fullscreen-page'}>
    <DecorateBoothContainer />
  </PageLayoutWrapper>
);

export default DecorateBoothPage;
