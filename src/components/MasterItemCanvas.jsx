import React, { useContext, useEffect, useState } from "react";
import { Offcanvas, Ripple, initTWE } from "tw-elements";
import apiService from "../api/apiService";
import { AuthContext } from "./AuthContext";

const MasterItemCanvas = () => {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    type: "",
    maker: "",
    moq: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const { authState } = useContext(AuthContext);
  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemCode) newErrors.itemCode = "Item code is required";
    if (!formData.itemName) newErrors.itemName = "Item name is required";
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await apiService.post("masteritem/create", formData, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      setFormData({
        itemCode: "",
        itemName: "",
        type: "",
        maker: "",
        moq: "",
        location: "",
      });
    } catch (error) {
      console.log("Error Creating Masteritem: ", error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  useEffect(() => {
    initTWE({ Offcanvas, Ripple });
  }, []);

  return (
    <>
      <button
        className="me-1.5 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="button"
        data-twe-offcanvas-toggle
        data-twe-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        CREATE ITEM
      </button>
      <div
        className="invisible fixed bottom-0 left-0 right-0 z-[1045] flex h-2/5 max-h-full max-w-full translate-y-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
        tabIndex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
        data-twe-offcanvas-init
      >
        <div className="flex items-center justify-end p-4">
          <button
            type="button"
            className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            data-twe-offcanvas-dismiss
            aria-label="Close"
          >
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="text-center items-center">
          <div className="grid grid-rows-4 md:flex md:place-content-evenly sm:grid-rows-2">
            {["itemCode", "itemName", "type", "maker"].map((field) => (
              <div className="flex place-content-between m-2" key={field}>
                <label className="text-start mt-1" htmlFor={field}>
                  {field.toUpperCase()}
                </label>
                <input
                  onChange={handleChange}
                  className="border-2 p-2 rounded-md border-red-950 ml-2"
                  id={field}
                  type="text"
                  value={formData[field] || ""}
                  placeholder={errors[field]}
                />
              </div>
            ))}
          </div>
          <div className="flex place-content-around mt-2 mb-2">
          {["moq", "location"].map((field) => (
              <div className="flex place-content-between m-2" key={field}>
                <label className="text-start mt-1" htmlFor={field}>
                  {field.toUpperCase()}
                </label>
                <input
                  onChange={handleChange}
                  className="border-2 p-2 rounded-md border-red-950 ml-2"
                  id={field}
                  type="text"
                  value={formData[field] || ""}
                  placeholder=""
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            className="bg-green-200 p-2 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MasterItemCanvas;
