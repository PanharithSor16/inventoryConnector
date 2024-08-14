import React, { useContext, useEffect, useState } from "react";
import { Offcanvas, Ripple, initTWE } from "tw-elements";
import apiService from "../api/apiService";
import { AuthContext } from "./AuthContext";

const TransferCanvas = () => {
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    location: "",
    receivedQty: "",
    issuedQty: "",
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    initTWE({ Offcanvas, Ripple });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemCode) newErrors.itemCode = "Item code is required";
    if (!formData.itemName) newErrors.itemName = "Item name is required";
    if (!formData.receivedQty) newErrors.receivedQty = "Receive stock is required";
    if (!formData.issuedQty) newErrors.issuedQty = "Issue stock is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await apiService.post("transfer/create", formData, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      console.log("Transfer created successfully:", response.data);
      setFormData({
        itemCode: "",
        itemName: "",
        location: "",
        receivedQty: "",
        issuedQty: "",
      });
      setErrors({});
    } catch (error) {
      alert("Balance មិនអាចតូចជាង0")
      console.error("Error creating transfer:", error.message);
    }
  };

  const handleSearchChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      try {
        const response = await apiService.get("/masteritem/get", {
          params: { NameCode: e.target.value },
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setResultSearch(response.data);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      setResultSearch([]);
    }
  };

  const handleResultClick = async (id) => {
    try {
      const response = await apiService.get(`masteritem/get/${id}`, {
        headers: { Authorization: `Bearer ${authState.token}` },
      });
      const item = response.data;
      setFormData({
        itemCode: item.itemCode || "",
        itemName: item.itemName || "",
        location: item.location || "",
        receivedQty: item.receivedQty || "0",
        issuedQty: item.issuedQty || "0",
      });
      setErrors({});
      setResultSearch([]);
      setSearch("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <>
      <button
        className="me-1.5 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
        type="button"
        data-twe-offcanvas-toggle
        data-twe-target="#offcanvasTop"
        aria-controls="offcanvasTop"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        Make Transfer
      </button>
      <div
        className="invisible fixed bottom-0 left-0 right-0 top-0 z-[1045] flex h-2/5 max-h-full max-w-full -translate-y-full flex-col border-none bg-white bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark:text-white"
        tabIndex="-1"
        id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel"
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
        <div className="flex place-content-around">
          <div className="flex flex-col">
            <div className="flex-col place-content-between m-2">
              <div>
                <label className="mt-1" htmlFor="Search">
                  Search Masteritem:
                </label>
                <input
                  id="Search"
                  type="text"
                  placeholder="Itemcode ItemName"
                  required
                  className="ml-2 p-1 border-2 rounded-lg border-red-950"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className=" absolute bg-blue-400 my-2 rounded-lg shadow-lg ">
                {resultSearch.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleResultClick(item.id)}
                      className="px-3 my-2 hover:text-indigo-600 hover:font-bold w-auto text-left"
                    >
                      {item.itemCode}, {item.itemName}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {["itemCode", "itemName"].map((field) => (
              <div className="flex place-content-between m-2" key={field}>
                <label className="mt-1" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  id={field}
                  type="text"
                  disabled
                  className="ml-2 p-1 border-2 rounded-lg border-red-950"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={errors[field]}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {["location", "receivedQty", "issuedQty"].map((field) => (
              <div className="flex place-content-between m-2" key={field}>
                <label className="mt-1" htmlFor={field}>
                  {field === "location"
                    ? "Location"
                    : field === "receivedQty"
                    ? "Receive stock"
                    : "Issue stock"}:
                </label>
                <input
                  id={field}
                  type="text"
                  required
                  className="ml-2 p-1 border-2 rounded-lg border-red-950 text-gray-400"
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={errors[field]}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            className="p-2 rounded-md bg-green-900 text-white"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default TransferCanvas;
