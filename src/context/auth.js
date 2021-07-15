import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

// check if user is still logged in
if (localStorage.getItem("jwtoken")) {
  // decode token:
  const decodedToken = jwtDecode(localStorage.getItem("jwtoken"));

  // if expiry date is < now (expired):
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtoken");
  } else {
    // set user to decoded token data:
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  // removed deconstructed user state to its own variable at the top (to use in login/logout)
  // const [state, dispatch] = useReducer(authReducer, { user: null });
  const [state, dispatch] = useReducer(authReducer, initialState);
  const login = (userData) => {
    // add user token to localStorage:
    localStorage.setItem("jwtoken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    // remove user token to localStorage:
    localStorage.removeItem("jwtoken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
