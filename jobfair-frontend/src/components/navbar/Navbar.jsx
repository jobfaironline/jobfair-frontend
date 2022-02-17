import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="container-fluid">
      <div className="Navbar">
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">
              <div className="logo">LOGO</div>
            </Link>
          </Menu.Item>
          <Menu.Item key="jobfair">
            <Link to="/JobFairPack">Job Fair Park</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/contracts">Contact</Link>
          </Menu.Item>
          <Menu.Item key="faq">
            <Link to="/faq">FAQ</Link>
          </Menu.Item>
          <Menu.Item key="reg">
            <Link to="/auth/register">Register</Link>
          </Menu.Item>
          <Menu.Item key="login">
            <Link to="/auth/login">Log In</Link>
          </Menu.Item>
          <Menu.Item key="attendant-profile">
            <Link to="/attendant/profile">Attendant Profile</Link>
          </Menu.Item>
          <Menu.Item key="changepassword">
            <Link to="/accounts/changepassword">Change Password</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default NavigationBar;
