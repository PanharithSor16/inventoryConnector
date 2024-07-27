import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import apiService from "../api/apiService";
import { AuthContext } from "../components/AuthContext";
import TransferCanvas from "../components/TransferCanvas";
import { DownloadTableExcel } from "react-export-table-to-excel";

const Transfer = () => {
  const [dataTransfer, setDataTransfer] = useState([]);
  const [searchTransfer, setSearchTransfer] = useState("");
  const { authState } = useContext(AuthContext);

  const TABLE_HEAD = [
    "ItemCode",
    "ItemName",
    "ReceiveQty",
    "IssuedQty",
    "Location",
    "RegisterBy",
    "RegisterDate",
    // "StockValue",
    "Delete",
  ];

  useEffect(() => {
    const fetchTransfer = async () => {
      try {
        const response = await apiService.get("transfer/getByUser", {
          params: { NameCode: searchTransfer },
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setDataTransfer(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTransfer();
  }, [authState.token, searchTransfer]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Transfer?"
    );
    if (confirmDelete) {
      try {
        await apiService.delete(`/transfer/delete/${id}`, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        // Update state to remove deleted item
        setDataTransfer(dataTransfer.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const TransferTable = useRef(null);
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className=" flex w-full">
        <div className=" flex place-items-start ml-[5%] w-full">
          <label className="mt-2" htmlFor="search">
            Search Transfer
          </label>
          <input
            onChange={(e) => setSearchTransfer(e.target.value)}
            type="text"
            id="search"
            className="ml-2 border-2 rounded-md p-2 border-red-950 sm:w-[30%] w-[70%]"
            placeholder=""
          />
        </div>
        <div className=" fixed right-5">
          <DownloadTableExcel
            filename="Transfer"
            sheet="Transfer"
            currentTableRef={TransferTable.current}
          >
            <button className="bg-blue-200 p-2 rounded-md">Export Excel</button>
          </DownloadTableExcel>
        </div>
      </div>
      <div className="overflow-y-auto mt-2">
        <div className="">
          <table className="w-full min-w-max table-auto text-left"  ref={TransferTable}>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className=" sticky top-0 font-medium border-2 rounded-lg bg-blue-200 p-4 border-blue-300 "
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTransfer.map(
                (
                  {
                    id,
                    itemCode,
                    itemName,
                    location,
                    issuedQty,
                    stockValue,
                    registerDate,
                    registerBy,
                    receivedQty,
                  },
                  index
                ) => {
                  const isLast = index === dataTransfer.length;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-2 border-blue-200";
                  return (
                    <tr key={id}>
                      <td className={classes}>{itemCode}</td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        {itemName}
                      </td>

                      <td className={classes}>{receivedQty}</td>
                      <td className={classes}>{issuedQty}</td>
                      <td className={classes}>{location}</td>
                      <td className={classes}>{registerBy}</td>
                      <td className={classes}>{registerDate}</td>
                      {/* <td className={classes}>{stockValue}</td> */}
                      <td
                        className={`text-red-600 p-4 border-2 border-blue-200 cursor-pointer`}
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed flex justify-end bottom-3 right-3 w-auto">
        <TransferCanvas />
      </div>
    </div>
  );
};

export default Transfer;
