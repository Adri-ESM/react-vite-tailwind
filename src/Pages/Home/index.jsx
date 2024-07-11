import Layout from "../../Components/Layout";
import { useFilteredData } from '../../ContextFilter'; // Importa el contexto de filtro
import Card from "../../Components/Card";
import style from "./Home.module.css";
import ProductDetail from "../../Components/ProductDetail";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const { filteredItems, searchByTitle, setSearchByTitle, setSortOrder } = useFilteredData(); // Usa el contexto de filtro
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
    <Layout>
      <div className="sticky top-14 bg-white z-10 flex flex-col sm:flex-row justify-center items-center mb-4 sm:space-x-2 p-4">
        <input 
          type="text"
          placeholder="Search products..."
          value={searchByTitle}
          onChange={handleSearchChange}
          className="p-2 border rounded flex-grow sm:w-auto mb-2 sm:mb-0"
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
      <div className={`flex flex-wrap justify-center space-x-4 w-full p-10 ${style.homeCard}`}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Card
              key={item.id}
              data={item}
              className="flex justify-center items-center"
            />
          ))
        ) : (
          <div className="w-full text-center py-4 text-gray-500">
            You don&apos;t have any products that match your search. 🙄
          </div>
        )}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;



//GUARDADO RECIENTEMENTE 10 JULIO 2024
// import Layout from "../../Components/Layout";
// import { ShoppingCartContext } from '../../Context';
// import Card from "../../Components/Card";
// import style from "./Home.module.css";
// import ProductDetail from "../../Components/ProductDetail";
// import { useContext, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

// function Home() {
//   const { filteredItems, searchByTitle, setSearchByTitle, setSortOrder } = useContext(ShoppingCartContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleSearchChange = (event) => {
//     setSearchByTitle(event.target.value);
//   };

//   const handleSortOrderChange = (order) => {
//     setSortOrder(order);
//   }

//   const handleDropdownToggle = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <Layout>
//       <div className="sticky top-14 bg-white z-10 flex flex-col sm:flex-row justify-center items-center mb-4 sm:space-x-2 p-4">
//         <input 
//           type="text"
//           placeholder="Search products..."
//           value={searchByTitle}
//           onChange={handleSearchChange}
//           className="p-2 border rounded flex-grow sm:w-auto mb-2 sm:mb-0"
//         />
//         <div className="relative ">
//           <button
//             className="p-2 border rounded hidden sm:block"
//             onClick={handleDropdownToggle}
//           >
//             <FontAwesomeIcon icon={faDollarSign} />
//           </button>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               onClick={() => handleSortOrderChange("asc")}
//             >
//               Price: Low to High
//             </button>
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               onClick={() => handleSortOrderChange("desc")}
//             >
//               Price: High to Low
//             </button>
//           </div>
//           )}
//         </div>
//       </div>
//       <div className={`flex flex-wrap justify-center space-x-4 w-full p-10 ${style.homeCard}`}>
//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <Card
//               key={item.id}
//               data={item}
//               className="flex justify-center items-center"
//             />
//           ))
//         ) : (
//           <div className="w-full text-center py-4 text-gray-500">
//             We don&apos;t have any products that match your search. 🙄
//           </div>
//         )}
//       </div>
//       <ProductDetail />
//     </Layout>
//   );
// }

// export default Home;