import { useState, useEffect, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import { useApiData } from '../../Contexts/ContextApi';

export const FilteredDataContext = createContext();

export const FilteredProvider = ({ children }) => {
  const apiData = useApiData();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let filtered = items;
    // if (searchByTitle !== "") {
    if (searchByTitle) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    if (category.length > 0) {
      filtered = filtered.filter(item =>
        category.includes(item.category)
      );
    }
    if (sortOrder === "asc") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
      setFilteredItems(filtered);
    }, [items, searchByTitle, sortOrder, category]);

    useEffect(() => {
        setItems(apiData);
      }, [apiData]);
  
    return (
      <FilteredDataContext.Provider 
        value={{
          filteredItems,
          setFilteredItems,
          items,
          setItems,
          searchByTitle,
          setSearchByTitle,
          sortOrder,
          setSortOrder,
          category,
          setCategory,
        }}
      >
        {children}
      </FilteredDataContext.Provider>
    );
  };
  
  FilteredProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export const useFilteredData = () => {
    return useContext(FilteredDataContext);
  };
  
  export default FilteredProvider;


 //Aqui condiciones para filtrar solo por titulo
    // if (searchByTitle !== "") {
    //     filtered = filtered.filter((item) =>
    //       item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    //     );
    //   }