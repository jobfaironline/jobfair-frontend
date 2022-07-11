import { Modal } from 'antd';
import { disable3DPath } from './disable_path';
import { getCurrentUserAgent } from '../../../utils/common';
import { matchPath, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const UserAgentModal = () => {
  const browser = getCurrentUserAgent();
  const location = useLocation();
  const pathname = location.pathname;

  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const isThisPageDisable = disable3DPath.some((pathLink) =>
      matchPath(pathname, {
        path: pathLink,
        exact: true,
        strict: false
      })
    );
    const isDisable =
      (browser.name !== 'Chrome' || (browser.name === 'Chrome' && browser.version < 102)) && isThisPageDisable;
    setVisibility(isDisable);
  }, [location]);

  return (
    <Modal
      visible={visibility}
      title='Incompatible browser'
      onCancel={() => setVisibility(false)}
      onOk={() => setVisibility(false)}>
      <p>
        We current do not support {browser.name} version {browser.version}. Please use Chrome with version 102 or
        higher.
      </p>
      <p>Use at your own risk</p>
    </Modal>
  );
};
