import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, password }) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-700 bg-opacity-40 ">
      <div className=" mt-5 flex place-content-center">
        <div className=" bg-warning-50 p-10 space-y-2 rounded-md">
          <h2>Enter Password to Access This Page</h2>
          <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
            <input
            className=" border-2 border-yellow-600 p-2 rounded-lg "
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            <button className=" rounded-lg bg-green-400 p-2" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
