import React from 'react';
import './SideBar.styles.scss';

const SideBarComponent = (props) => {
  return <div className='side-bar'>{props.children}</div>;
};

export default SideBarComponent;