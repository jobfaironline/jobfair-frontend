import React from 'react';
import AssignmentPageBreadcumb from '../../../containers/AssignmentPageBreadcumb/AssignmentPageBreadcumb.container';

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
