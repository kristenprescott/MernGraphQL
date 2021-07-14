import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default function MenuBar() {
  // if active=true on Menu.Item, the Menu.Item with the name === activeItem will be highlighted
  //  ALSO, note: the name text will be rendered on the Menu.Item tab (w the first letter capitalized)
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  //   const [activeItem, setActiveItem] = useState("home");
  const [activeItem, setActiveItem] = useState(path);
  const [color, setColor] = useState("white");
  const [activeColor, setActiveColor] = useState("red");
  //   const [inactiveColor, setInactiveColor] = useState("white");
  //   const [activeColor, setActiveColor] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);

    // if (!activeColor) {
    //   setColor("white");
    // } else if (activeColor) {
    //   setColor("red");
    // }

    setActiveColor(!activeColor);

    if (color === activeColor) {
      setColor("red");
    } else {
      setColor("white");
    }
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
        <span style={{ color: `${color}` }}>
          <Icon name="home" />
          Home
        </span>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
          <span style={{ color: `${color}` }}>
            <Icon name="user plus" />
            Register
          </span>
        </Menu.Item>
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          <span style={{ color: `${color}` }}>
            <Icon name="user" />
            Login
          </span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  //   }
}
