import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../components/AuthContext";
import apiService from "../api/apiService";
import { DownloadTableExcel } from "react-export-table-to-excel";

const SearchTransition = () => {
  const TABLE_HEAD = [
    "Code",
    "Name",
    "Receive QTY",
    "Issue QTY",
    "Register Date",
    "Register By",
    "Location",
  ];

  const [searchTransition, setSearchTransition] = useState("");
  const [transitionItems, setTransitionItems] = useState([]);
  const { authState, logout, isTokenExpired } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!authState.isAuthentication || isTokenExpired(authState.token)) {
          logout();
          return;
        }
        const response = await apiService.get("transfer/get", {
          params: { NameCode: searchTransition },
          headers: { Authorization: `Bearer ${authState.token}` },
        });

        setTransitionItems(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPosts();
  }, [authState, logout, searchTransition]);
  const TransitionTable = useRef(null);
  return (
    <div className=" h-screen flex flex-col">
      <Navbar />
      <div className=" flex w-full">
        <div className=" flex place-items-start ml-[5%] w-full">
          <label className="mt-2" htmlFor="search">
            Search Transition
          </label>
          <input
            onChange={(e) => setSearchTransition(e.target.value)}
            type="text"
            id="search"
            className="ml-2 border-2 rounded-md p-2 border-red-950 sm:w-[30%] w-[70%]"
            placeholder=""
          />
        </div>
        <div className=" fixed right-5">
          <DownloadTableExcel
            filename="Transition"
            sheet="Transition"
            currentTableRef={TransitionTable.current}
          >
            <button className="bg-blue-200 p-2 rounded-md">Export Excel</button>
          </DownloadTableExcel>
        </div>
      </div>
      <div className=" mt-2 overflow-y-auto">
        <div className="">
          <table className="w-full min-w-max table-auto text-left "  ref={TransitionTable}>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className=" sticky top-0 border rounded-lg bg-blue-200  p-4 border-blue-300"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transitionItems.map(
                (
                  {
                    id,
                    itemCode,
                    itemName,
                    receivedQty,
                    issuedQty,
                    stockValue,
                    registerBy,
                    registerDate,
                    location,
                  },
                  index
                ) => {
                  const isLast = index === transitionItems.length;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-2 border-blue-200";

                  return (
                    <tr key={id}>
                      <td className={classes}>{itemCode}</td>
                      <td className={`${classes}`}>
                        {itemName}
                      </td>
                      <td className={classes}>{receivedQty}</td>
                      <td className={classes}>{issuedQty}</td>
                      <td className={classes}>{registerDate}</td>
                      <td className={classes}>{registerBy}</td>
                      <td className={classes}>{location}</td>
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

export default SearchTransition;
