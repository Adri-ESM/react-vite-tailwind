import { createContext, useContext, useState, useEffect } from "react";

const ApiDataContext = createContext();

export function ApiDataProvider({ children }) {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);

  return (
    <ApiDataContext.Provider value={apiData}>
      {children}
    </ApiDataContext.Provider>
  );
}

export function useApiData() {
  return useContext(ApiDataContext);
}