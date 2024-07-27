import React, { useContext, useState } from 'react'
import apiService from '../api/apiService';
import { AuthContext } from './AuthContext';

const SearchItem = ({ searchTerm, itemSearch }) => {
    const [itemSearch, setItemSearch] = useState(null);
    const {authState} = useContext(AuthContext);
  
    const getItem = async (Id) => {
      try {
        const response = await apiService.get(`masteritem/get/${Id}`,{
                headers: { Authorization: `Bearer ${authState.token}` }
        }  
        );
        setItemSearch(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
  
    if (searchTerm.result === null) {
      return null;
    }
  
    return (
      <div className="bg-white my-2 rounded-lg shadow-lg">
        {searchTerm.result.map((place) => (
          <div key={place.id}>
            <button
              onClick={() => getItem(place.id)}
              className="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left"
            >
              {place.name}, {place.region}, {place.country}
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default SearchItem;