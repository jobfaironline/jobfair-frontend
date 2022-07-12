import { Breadcrumb } from 'antd';
import { Link, generatePath, matchPath, useLocation, useParams } from 'react-router-dom';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import React from 'react';
import breadcrumbItemsList from './BreadcrumbItemsList';

const breadcrumbNameMap = breadcrumbItemsList.reduce((previousValue, currentValue) => {
  previousValue[`${currentValue.path}`] = currentValue;
  return previousValue;
}, {});

const BreadcrumbContainer = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const params = useParams();
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

    let url = mappedBreadcumbItems[0].parentPath;
    if (mappedBreadcumbItems[0].hasParam) {
      const paramObj = mappedBreadcumbItems[0].paramNames.reduce((prev, current) => {
        prev[current] = params[current];
        return prev;
      }, {});
      url = generatePath(mappedBreadcumbItems[0].parentPath, paramObj);
    }
    return (
      <>
        <Breadcrumb.Item key='home'>
          <Link to={url}>{mappedBreadcumbItems[0].parentTitle}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item key='detail' style={{ fontWeight: 'bold' }}>
          {mappedBreadcumbItems[0].title}
        </Breadcrumb.Item>
      </>
    );
  };
  const breadcrumbItems = extraBreadcrumbItems();

  return (
    <>
      {breadcrumbItems ? (
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

export default BreadcrumbContainer;
