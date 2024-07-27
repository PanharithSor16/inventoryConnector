import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../components/AuthContext";
import apiService from "../api/apiService";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { authState } = useContext(AuthContext);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "FullName is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await apiService.post("create", formData, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      alert(
        "You have beed created the username " +
          formData.username +
          " and password is " +
          formData.password
      );
      setFormData({
        fullName: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.log("Error Creating Masteritem: ", error.message);
      if (error.message == "Request failed with status code 400") {
        alert("Aready has this name");
      }
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <>
      <Navbar />
      <header className=" font-medium text-center mb-3 text-2xl text-pink-800">
        CREATE USER
      </header>
      <div className="flex place-content-around mt-10">
        <div className=" flex flex-col place-content-around space-y-3 w-[50%] pb-10 shadow-xl">
          <div className=" flex place-content-around">
            <label className="text-xl mt-2" htmlFor="fullName">
              FullName
            </label>
            <input
              className=" border-2 p-2 rounded-md border-red-800 w-[40%]"
              type="text"
              onChange={handleChange}
              value={formData.fullName || ""}
              id="fullName"
              placeholder={errors[formData]}
            />
          </div>
          <div className=" flex place-content-around ">
            <label className=" text-xl mt-2" htmlFor="username">
              Username
            </label>
            <input
              className=" border-2 p-2 rounded-md border-red-800 w-[40%]"
              type="text"
              onChange={handleChange}
              value={formData.username}
              id="username"
              placeholder={errors[formData.username]}
            />
          </div>
          <div className=" flex place-content-around ">
            <label className="mt-2 text-xl" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 p-2 rounded-md border-red-800 ml-2 w-[40%]"
              type="text"
              onChange={handleChange}
              value={formData.password}
              id="password"
              placeholder={errors[formData.password]}
            />
          </div>
          <div className=" text-center mt-5" id="submit">
            <button
              onClick={handleSubmit}
              className="p-2 rounded-md bg-blue-600 text-white hover:font-bold mt-3"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
