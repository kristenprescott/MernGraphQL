import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  const redirectHome = () => {
    window.location.href = "/";
  };

  const onSubmit = (e) => {
    e.preventDefault();

    callback();

    redirectHome();
    // refreshPage();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
