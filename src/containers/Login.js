import React, { useState } from "react";

const Login = () => {
  // let [fields, setFields] = useState({
  //   email: {
  //     value: "",
  //     shouldValidate: true,
  //     touched: false,
  //     config: {
  //       placeholder: "Your email",
  //       type: "email"
  //     }
  //   },
  //   password: {
  //     value: "",
  //     shouldValidate: true,
  //     touched: false,
  //     config: {
  //       type: "password"
  //     }
  //   }
  // });

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [isValid, setIsValid] = useState(false);

  // const inputChange = (e, inputName) => {
  //   let value = e.target.value;
  // };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
