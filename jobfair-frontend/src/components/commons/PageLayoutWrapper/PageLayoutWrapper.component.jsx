import BreadcrumbContainer from '../../../containers/Breadcrumb/Breadcrumb.container';
import React from 'react';

const PageLayoutWrapper = (props) => {
  const { children, ...otherProps } = props;

  return (
    <>
      <div {...otherProps}>
        <BreadcrumbContainer />
        {children}
      </div>
    </>
  );
};

export default PageLayoutWrapper;
