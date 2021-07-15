import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default function MenuBar() {
  // if active=true on Menu.Item, the Menu.Item with the name === activeItem will be highlighted
  //  ALSO, note: the name text will be rendered on the Menu.Item tab (w the first letter capitalized)
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu
      attached="top"
      tabular
      pointing
      secondary
      size="massive"
      color="red"
      style={{ backgroundColor: "#131313" }}
    >
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
        backgroundColor="white"
      >
        <Icon name="home" />
        <span style={{ color: "white" }}>Home</span>
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
          <span style={{ color: "white" }}>Register</span>
        </Menu.Item>
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          <Icon name="user" />
          <span style={{ color: "white" }}>Login</span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  //   }
}
