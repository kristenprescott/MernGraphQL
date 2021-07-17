import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
// !IMPORTANT
// !Keep ./App.css import AFTER semantic-ui-css import
import "./App.css";

import { AuthProvider } from "./context/auth";
import { AuthRoute } from "./utils/AuthRoute";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import PostForm from "./components/PostForm";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <div className="ui container">
            <MenuBar />
            <Route exact path="/" component={Home} />

            <Route exact path="/newpost" component={PostForm} />

            <AuthRoute exact path="/login" component={Login} />
            {/* <Route exact path="/login" component={Login} /> */}

            <AuthRoute exact path="/register" component={Register} />
            {/* <Route exact path="/register" component={Register} /> */}
          </div>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
