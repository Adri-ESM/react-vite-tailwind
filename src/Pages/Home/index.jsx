import { useEffect } from 'react';
import Layout from "../../Components/Layout";
import { useFilteredData } from '../../Contexts/ContextFilter'; 
import Card from "../../Components/Card";
import style from "./Home.module.css";
import ProductDetail from "../../Components/ProductDetail";
import Filters from '../../Components/Filters';

function Home() {
  const { filteredItems, setCategory } = useFilteredData();
 
  useEffect(() => {
    setCategory("");
  }, [setCategory]);

  return (
    <Layout>
      <Filters />
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




//GUARDADO RECIENTEMENTE  2024
// import { useEffect } from 'react';
// import Layout from "../../Components/Layout";
// import { useFilteredData } from '../../Contexts/ContextFilter'; // Importa el contexto de filtro
// import Card from "../../Components/Card";
// import style from "./Home.module.css";
// import ProductDetail from "../../Components/ProductDetail";
// //import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// //import { faDollarSign, faBroom } from "@fortawesome/free-solid-svg-icons";
// import Filters from '../../Components/Filters'; // Importa el componente de filtros

// function Home() {
//   const { filteredItems, setCategory } = useFilteredData(); // Usa el contexto de filtro
//   //const [dropdownOpen, setDropdownOpen] = useState(false);

//   useEffect(() => {
//     // Restablece la categoría a vacío al montar el componente
//     setCategory("");
//   }, [setCategory]);

//   // const handleSearchChange = (event) => {
//   //   setSearchByTitle(event.target.value);
//   // };

//   // const handleSortOrderChange = (order) => {
//   //   setSortOrder(order);
//   //   setDropdownOpen(false); // Close the dropdown immediately after selection
//   // };

//   // const handleClearFilters = () => {
//   //   setSearchByTitle("");
//   //   setSortOrder("none");
//   // }

//   // const toggleDropdown = () => {
//   //   setDropdownOpen(!dropdownOpen);
//   // };

//   return (
//     <Layout>
//       <Filters />
//       {/*<div className="sticky top-14 bg-white z-10 flex flex-col sm:flex-row justify-center items-center mb-4 sm:space-x-2 p-4">
//          <input 
//           type="text"
//           placeholder="Search products..."
//           value={searchByTitle}
//           onChange={handleSearchChange}
//           className="p-2 border rounded flex-grow sm:w-auto mb-2 sm:mb-0"
//         />
//         <div className="relative">
//           <div className="flex space-x-2">
//           <button
//             className="p-2 border rounded hidden sm:block"
//             onClick={toggleDropdown}
//           >
//             <FontAwesomeIcon icon={faDollarSign} />
//           </button>
//           <button
//         className="p-2 border rounded hidden sm:block"
//         onClick={handleClearFilters}
//       >
//         <FontAwesomeIcon icon={faBroom} />
//       </button>
//       </div>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleSortOrderChange("asc")}
//               >
//                 Price: Low to High
//               </button>
//               <button
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => handleSortOrderChange("desc")}
//               >
//                 Price: High to Low
//               </button>
//             </div>
//           )}
//         </div>
//       </div> */}
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
//             You don&apos;t have any products that match your search. 🙄
//           </div>
//         )}
//       </div>
//       <ProductDetail />
//     </Layout>
//   );
// }

// export default Home;