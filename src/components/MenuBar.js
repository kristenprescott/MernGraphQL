import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import InvertedPopup from "../utils/InvertedPopup";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  // return (
  const menuBar = user ? (
    // <>
    <Menu attached="top" tabular pointing secondary size="massive" color="red">
      <InvertedPopup content="go to homepage">
        <Menu.Item as={Link} to="/">
          <Icon name="home" />
          <h6>Home</h6>
        </Menu.Item>
      </InvertedPopup>

      <Menu.Menu position="right">
        <InvertedPopup content="make a new post">
          <Menu.Item name="newpost" as={Link} to="/newpost" name="newpost">
            <Icon name="edit" />
            <h6>New Post</h6>
          </Menu.Item>
        </InvertedPopup>

        {/* TODO: link to user profile once Profile component is made */}
        {user && (
          <InvertedPopup content="go to your profile page">
            <Menu.Item name={user.username} as={Link} to="/">
              <Icon name="user" />
              <h6>{user.username}</h6>
            </Menu.Item>
          </InvertedPopup>
        )}

        <InvertedPopup content="logout">
          <Menu.Item name="logout" onClick={logout}>
            <Icon name="arrow alternate circle right" />
            <h6>Logout</h6>
          </Menu.Item>
        </InvertedPopup>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu attached="top" tabular pointing secondary size="massive" color="red">
      <InvertedPopup content="go to homepage">
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
      </InvertedPopup>

      <Menu.Menu position="right">
        <InvertedPopup content="">
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
        </InvertedPopup>

        <InvertedPopup content="login">
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
        </InvertedPopup>
      </Menu.Menu>
    </Menu>
  );
  {
    /* </> */
  }

  // );
  return menuBar;
}

export default MenuBar;
