import react from "react";
import PropTypes from 'prop-types';
import { useApiData } from '../ContextApi';

export const FilteredDataContext = react.createContext();

export const FilteredProvider = ({ children }) => {
  const apiData = useApiData();
  const [items, setItems] = react.useState([]);
  const [filteredItems, setFilteredItems] = react.useState([]);
  const [searchByTitle, setSearchByTitle] = react.useState("");
  const [sortOrder, setSortOrder] = react.useState("none");

  react.useEffect(() => {
    let filtered = items;
    if (searchByTitle !== "") {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }
    if (items !== "") {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );
    }
    if (sortOrder === "asc") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
      setFilteredItems(filtered);
    }, [items, searchByTitle, sortOrder]);
  
    react.useEffect(() => {
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
    return react.useContext(FilteredDataContext);
  };
  
  export default FilteredProvider;


 //Aqui condiciones para filtrar solo por titulo
    // if (searchByTitle !== "") {
    //     filtered = filtered.filter((item) =>
    //       item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    //     );
    //   }