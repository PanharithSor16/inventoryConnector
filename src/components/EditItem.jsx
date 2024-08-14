import { useContext, useEffect, useState } from "react";
import apiService from "../api/apiService";
import { AuthContext } from "./AuthContext";

const EditItem = ({ isOpenEdit, closeDialogEdit, id }) => {
  const { authState } = useContext(AuthContext);
  const [getItemCode, setGetItemCode] = useState();
  const [getItemName, setGetItemName] = useState();
  const [getIemLocation, setLocation] = useState();
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    const fatchItem = async () => {
      try {
        const result = await apiService.get(`masteritem/get/${id}`, {
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setGetItemCode(result.data.itemCode);
        setGetItemName(result.data.itemName);
        setLocation(result.data.location);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (isOpenEdit) {
      fatchItem();
    }
  }, [id, isOpenEdit]);

  const updateLocation = async () => {
    try {
      const update = await apiService.put(
        `masteritem/update/${id}`,
        { location: newLocation },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
      
      closeDialogEdit()
    } catch (error) {
      console.log(error);
    }
  };
  //   if (!isOpenEdit) return null;
  if (isOpenEdit)
    return (
      <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-700 bg-opacity-40 ">
        <div className=" mt-5 flex place-content-center">
          <div className=" bg-warning-50 p-10 space-y-2 rounded-md">
            <h2>
              ItemCode:{" "}
              <span className=" text-green-400 font-bold">{getItemCode}</span>{" "}
            </h2>
            <h2>
              ItemName:{" "}
              <span className=" text-green-400 font-bold">{getItemName}</span>
            </h2>
            <div className=" flex flex-col">
              <div >
                old Location:{" "}
                <span className=" text-green-400 font-bold">
                  {getIemLocation}
                </span>
              </div>
              <input
                className="p-2 w-96 border-2 border-yellow-400 rounded-lg"
                type="text"
                id="locationNew"
                placeholder="New Location"
                onChange={(e) => setNewLocation(e.target.value)}
              />
            </div>
            <div className=" flex place-content-between mt-2">
              <button
                className=" bg-red-500 p-2 rounded-lg"
                onClick={closeDialogEdit}
              >
                Close
              </button>
              <button
                className=" bg-green-500 p-2 rounded-lg"
                onClick={updateLocation}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};
export default EditItem;
