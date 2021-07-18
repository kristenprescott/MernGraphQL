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
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtoken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });

    console.log("LOGIN:");
    console.log("token: ", userData.token);
    console.log("userData: ", userData);
  }

  function logout() {
    localStorage.removeItem("jwtoken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
