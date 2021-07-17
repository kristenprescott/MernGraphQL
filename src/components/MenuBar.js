import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    console.log("target", e.target.value);
    setActiveItem(name);
  };

  const menuBar = user ? (
    <Menu attached="top" tabular pointing secondary size="massive" color="red">
      <Menu.Item name={user.username} as={Link} to="/">
        <Icon name="user" />
        <h6>{user.username}</h6>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item as={Link} to="/newpost" name="newpost">
          <Icon name="edit" />
          {/* <Icon name="add" /> */}
          <h6>New Post</h6>
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout}>
          <Icon name="user" />
          <h6>Logout</h6>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu attached="top" tabular pointing secondary size="massive" color="red">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        <Icon name="home" />
        <h6>Home</h6>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
          <Icon name="user plus" />
          <h6>Register</h6>
        </Menu.Item>
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          <Icon name="user" />
          <h6>Login</h6>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}
