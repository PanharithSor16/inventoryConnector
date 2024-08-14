import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import apiService from "../api/apiService";
import { AuthContext } from "../components/AuthContext";
import { DownloadTableExcel } from "react-export-table-to-excel";

const Balance = () => {
  const { authState, logout, isTokenExpired } = useContext(AuthContext);
  const [balanceItem, setBalance] = useState([]);
  const [searchBalance, setSearchBalance] = useState("");
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await apiService.get("transfer/balance/get", {
          params: { NameCode: searchBalance },
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setBalance(response.data);
      } catch (error) {}
    };
    fetchBalance();
  }, [authState.token, logout, searchBalance]);
  const TABLE_HEAD = [ "ItemCode", "ItemName","Type","Maker","MOQ","Location","Balance"];
  const tableRef = useRef(null);
  return (
    <div className=" h-screen flex flex-col">
      <Navbar />
      <div className=" flex w-full">
        <div className=" flex place-items-start ml-[5%] w-full">
          <label className="mt-2" htmlFor="search">
            Search Balance
          </label>
          <input
            onChange={(e) => setSearchBalance(e.target.value)}
            type="text"
            id="search"
            className="ml-2 border-2 rounded-md p-2 border-red-950 sm:w-[30%] w-[70%]"
            placeholder=""
          />
        </div>
        <div className=" fixed right-5">
          <DownloadTableExcel
            filename="Balance.xlsx"
            sheet="Balance"
            
            currentTableRef={tableRef.current}
          >
            <button className="bg-blue-200 p-2 rounded-md">Export Excel</button>
          </DownloadTableExcel>
        </div>
      </div>
      <div className="overflow-y-auto mt-1">
        <div className="">
          <table
            className="w-full min-w-max table-auto text-left"
            ref={tableRef}
          >
            <thead>
              <tr className=" border-r-amber-900">
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
              {balanceItem.map(
                (
                  { itemCode, itemName, maker, type, moq, balance, location },
                  index
                ) => {
                  const isLast = index === balanceItem.length;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-2 border-blue-200";

                  return (
                    <tr key={itemCode + maker}>
                      <td className={classes}>{itemCode}</td>
                      <td className={` p-4 border-2 border-blue-200 w-auto bg-blue-gray-50/50`}>
                        {itemName}
                      </td>
                      <td className={classes}>{type}</td>
                      <td className={classes}>{maker}</td>
                      <td className={classes}>{moq}</td>
                      <td className={classes}>{location}</td>
                      <td className={classes}>{balance}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Balance;
