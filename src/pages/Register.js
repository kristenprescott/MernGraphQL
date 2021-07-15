import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log("res: ", result);
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const onChange = (e) => {
    console.log("change");

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="form-container"
      style={
        {
          // width: "100%",
          // height: "100vh",
        }
      }
    >
      <Form onSubmit={onSubmit} noValidate>
        <h1 className="form-h1">Register</h1>
        <Form.Input
          label="Username"
          placeholder="username"
          name="username"
          value={values.username}
          onChange={onChange}
          type="text"
        />
        <Form.Input
          label="Email"
          placeholder="email"
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
        />{" "}
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
        />{" "}
        <Form.Input
          label="Confirm Password"
          placeholder="confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <div className="reg-btn-wrapper">
          <Button className="reg-btn" type="submit" primary>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Register;
