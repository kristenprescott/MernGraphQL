import { useState } from "react";
import { Form, Button } from "semantic-ui-react";
// import { useMutation } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const Register = () => {
  const [errors, setErrors] = useState({});
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
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
      // console.log("CODE:", err.graphQLErrors[0].extensions.code);
      // console.log("ERROR: ", err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();

    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const onChange = (e) => {
    console.log("change");

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 className="form-h1">Register</h1>
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
          label="Email"
          placeholder="email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
          onChange={onChange}
          type="email"
        />{" "}
        <Form.Input
          label="Password"
          placeholder="password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
          type="password"
        />{" "}
        <Form.Input
          label="Confirm Password"
          placeholder="confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={onChange}
          type="password"
        />
        <div className="reg-btn-wrapper">
          <Button className="reg-btn" type="submit" primary>
            Submit
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
