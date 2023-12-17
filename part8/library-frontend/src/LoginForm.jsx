import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./queries";

const LoginForm = ({ setError, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setPage("authors");
    }
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      login({ variables: { username, password } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center overflow-auto">
      <div className="lg:w-[600px]">
        <h2 className="text-2xl font-black underline">Login</h2>
        <form onSubmit={submit} className=" ">
          <div className="">
            <label className="text-lg" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="h-10 p-4 w-full"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input
              className="h-10 p-4"
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
