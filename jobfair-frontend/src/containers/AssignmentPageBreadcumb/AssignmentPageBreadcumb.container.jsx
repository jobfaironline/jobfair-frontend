import { Breadcrumb } from 'antd';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import React from 'react';
import breadcumbItemsList from './BreadcumbItemsList';

const breadcrumbNameMap = breadcumbItemsList.reduce((previousValue, currentValue) => {
  previousValue[`${currentValue.path}`] = currentValue.title;
  return previousValue;
}, {});

const AssignmentPageBreadcumb = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const extraBreadcrumbItems = () => {
    const pathList = Object.keys(breadcrumbNameMap);
    const mappedBreadcumbItems = pathList
      .filter((pathLink) => {
        const match = matchPath(pathname, {
          path: pathLink,
          exact: true,
          strict: false
        });

        return match?.isExact;
      })
      .map((pathLink) => {
        const match = matchPath(pathname, {
          path: pathLink,
          exact: true,
          strict: false
        });

        return breadcrumbNameMap[match?.path];
      });

    if (mappedBreadcumbItems?.length <= 0) return null;

    return (
      <>
        <Breadcrumb.Item key='detail' style={{ fontWeight: 'bold' }}>
          {mappedBreadcumbItems[0]}
        </Breadcrumb.Item>
      </>
    );
  };
  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link to={PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE}>My Assignment</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems());

  return (
    <>
      {extraBreadcrumbItems() ? (
        <Breadcrumb
          style={{
            position: 'relative',
            top: '0',
            borderBottom: '1px solid #d9d9d9',
            padding: `${
              matchPath(pathname, {
                path: PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE,
                exact: true,
                strict: false
              })?.isExact
                ? '1.5rem 1rem 1rem 1rem'
                : '1.5rem 0rem 1rem 0rem'
            }`,
            fontSize: '1.1rem'
          }}>
          {breadcrumbItems}
        </Breadcrumb>
      ) : null}
    </>
  );
};

export default AssignmentPageBreadcumb;
