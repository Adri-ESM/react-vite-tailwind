// src/Components/FilterBar.jsx
import { useState } from 'react';
import { useFilteredData } from '../../ContextFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const FilterBar = () => {
  const { searchByTitle, setSearchByTitle, setSortOrder } = useFilteredData();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchByTitle(event.target.value);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setDropdownOpen(false); // Close the dropdown immediately after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="sticky top-14 bg-white z-10 flex flex-col sm:flex-row justify-center items-center mb-4 sm:space-x-2 p-4">
      <input 
        type="text"
        placeholder="Search products..."
        value={searchByTitle}
        onChange={handleSearchChange}
        className="p-2 border rounded flex-grow sm:w-auto mb-2 sm:mb-0 focus:outline-none focus:ring-0"
      />
      <div className="relative">
        <button
          className="p-2 border rounded hidden sm:block"
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon icon={faDollarSign} />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSortOrderChange("asc")}
            >
              Price: Low to High
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => handleSortOrderChange("desc")}
            >
              Price: High to Low
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
