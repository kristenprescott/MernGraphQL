// https://youtu.be/n1mdAPFq2Os?t=8655 (timestamp: 2:23:15) for class component >> functional component rundown
// import React, { Component } from 'react'
import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";

// export default class MenuExampleSecondaryPointing extends Component {
export default function MenuBar() {
  // if active=true on Menu.Item, the Menu.Item with the name === activeItem will be highlighted
  //  ALSO, note: the name text will be rendered on the Menu.Item tab (w the first letter capitalized)
  const [activeItem, setActiveItem] = useState("");
  //   state = { activeItem: "home" };

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  //   handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //   render() {
  //   const { activeItem } = this.state;

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          // onClick={this.handleItemClick}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          // onClick={this.handleItemClick}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="friends"
          active={activeItem === "friends"}
          // onClick={this.handleItemClick}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            //   onClick={this.handleItemClick}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>

      <Segment>
        <img src="/images/wireframe/media-paragraph.png" />
      </Segment>
    </div>
  );
  //   }
}
