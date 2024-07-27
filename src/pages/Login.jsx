import React, { createContext, useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { AuthContext } from "../components/AuthContext";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handlelogin = async () => {
    const islogin = await login(username, password);
    if (islogin) {
      navigate("/");
    }
  };
  useEffect(() => {
    if (authState.isAuthentication) {
      navigate("/");
    }
  });
  return (
    <div className=" grid place-items-center items-center rounded-lg">
      <h2 className=" text-center mt-10 text-3xl text-red-950 font-semibold">
        Login
      </h2>
      <div className=" mt-10 grid place-items-center w-[60%] shadow-lg pb-28">
        <div className=" mt-10 text-2xl sm:w-[80%] w-[100%] flex place-content-around">
          <label className=" mt-2" htmlFor="username">Username </label>
          <input
            className=" max-w-[50%] shadow appearance-none border rounded w-full py-2 px-3 border-green-600 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-red-600"
            type="text"
            required
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-4 text-2xl sm:w-[80%] w-[100%] flex place-content-around">
          <label className="mt-2" htmlFor={password}>Password</label>
          <input
            className=" max-w-[50%] shadow appearance-none border rounded w-full py-2 px-3 border-green-600 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-red-600"
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-6">
        <button
        onKeyDown={handlelogin}
          className=" mt-3  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-20 border-b-4 border-blue-600 hover:border-blue-500 rounded"
          onClick={handlelogin}
        >
          Log in
        </button>
      </div>
      </div>
    
    </div>
  );
};

export default Login;
