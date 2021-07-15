import { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";

function Login(props) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // update(_, result) {
    //  destructured data from result^^
    //  destructured login from data
    //  gave login an alias: userData
    update(_, { data: { login: userData } }) {
      console.log("user login data: ", userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  // const [loginUser, { loading }] = useMutation(LOGIN_USER, {
  //   update(_, result) {
  //     console.log("res: ", result);
  //     console.log("login data: ", result.data.login);
  //     context.login(result.data.login);
  //     props.history.push("/");
  //   },
  //   onError(err) {
  //     setErrors(err.graphQLErrors[0].extensions.errors);
  //   },
  //   variables: values,
  // });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 className="form-h1">Login</h1>
        <Form.Input
          label="Username"
          placeholder="username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={onChange}
          type="text"
        />
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          type="password"
        />{" "}
        <div className="btn-wrapper login-btn-wrapper">
          <Button className="btn login-btn" type="submit" primary>
            Login
          </Button>
        </div>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Login;
