import React, { useReducer, createContext } from "react";

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// Reducer:
//      * get familiar w the patterns of Redux
//      * receives an action w a type & a payload,
//        then determines what to do with those
//        (depending on the functionality of your app)
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        // login, get some userD
        // set user in state w this data
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        // clear user login data from state
        user: null,
      };
    default:
      return state;
  }
}

// Use that reducer in our AuthProvider here
function AuthProvider(props) {
  // useReducer takes a reducer, returns state & dispatch
  // useReducer params: reducer(authReducer), initial state(user: null)
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // we can use dispatch to take any action and attach to it a type & a payload
  // when dispatched, our reducer will listen to it and do what it do
  const login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      // value is passed to children of AuthProvider
      value={{ user: state.user, login, logout }}
      // spread props in case
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
