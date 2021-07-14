import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
// !IMPORTANT
// !Keep ./App.css import AFTER semantic-ui-css import
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      {/* <Container> */}
      <div className="ui container">
        <MenuBar />
        <Route exact path="/" component={Home} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/register" component={Register} />
        {/* </Container> */}
      </div>
    </Router>
  );
}

export default App;
