import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../components/AuthContext";
import MasterItemCanvas from "../components/MasterItemCanvas";
import apiService from "../api/apiService";

const MasterItem = () => {
  const [dataMasterItem, setDataMasterItem] = useState([]);
  const [searchMasteritem, setSearchMasterItem] = useState("");
  const TABLE_HEAD = [
    "Itemcode",
    "ItemName",
    "Type",
    "Maker",
    "MOQ",
    "Location",
    "Delete",
  ];
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this MasterItem?"
    );
    if (confirmDelete) {
      try {
        await apiService.delete(`/masteritem/delete/${id}`, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        // Update state to remove deleted item
        setDataMasterItem(dataMasterItem.filter((item) => item.id !== id));
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const { authState, logout, isTokenExpired } = useContext(AuthContext);

  useEffect(() => {
    const fetchMasterItem = async () => {
      try {
        const response = await apiService.get("/masteritem/get", {
          params: { NameCode: searchMasteritem },
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setDataMasterItem(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMasterItem();
  }, [authState.token, searchMasteritem]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className=" flex place-items-start ml-[5%]">
          <label className="mt-2" htmlFor="search">Search MasterItem </label>
          <input
            onChange={(e) => setSearchMasterItem(e.target.value)}
            type="text"
            id="search"
            className="ml-2 border-2 rounded-md p-2 border-red-950 sm:w-[30%] w-[70%]"
            placeholder=""
          />
        </div>
      <div className=" mt-2 overflow-y-auto">
        
        <div className="">
          <table className="w-full min-w-max table-auto text-left">
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
              {dataMasterItem.map(
                (
                  { id, itemCode, itemName, type, maker, moq, location },
                  index
                ) => {
                  const isLast = index === dataMasterItem.length;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-2 border-blue-200";
                  return (
                    <tr key={id}>
                      <td className={classes}>{itemCode}</td>
                      <td className={`${classes} bg-blue-gray-50/50`}>
                        {itemName}
                      </td>
                      <td className={classes}>{type}</td>
                      <td className={classes}>{maker}</td>
                      <td className={classes}>{moq}</td>
                      <td className={classes}>{location}</td>
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
      <div className="fixed flex justify-end bottom-3 right-3 w-full">
        <MasterItemCanvas />
      </div>
    </div>
  );
};

export default MasterItem;
