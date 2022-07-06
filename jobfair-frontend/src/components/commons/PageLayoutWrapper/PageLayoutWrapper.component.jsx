import AssignmentPageBreadcumb from '../../../containers/AssignmentPageBreadcumb/AssignmentPageBreadcumb.container';
import React from 'react';

const PageLayoutWrapper = (props) => {
  const { children, ...otherProps } = props;

  return (
    <>
      <div {...otherProps}>
        <AssignmentPageBreadcumb />
        {children}
      </div>
    </>
  );
};

export default PageLayoutWrapper;
