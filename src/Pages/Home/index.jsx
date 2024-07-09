import Layout from "../../Components/Layout";
import { ShoppingCartContext } from '../../Context';
import Card from "../../Components/Card";
import style from "./Home.module.css";
import ProductDetail from "../../Components/ProductDetail";
import Cart from "../../Components/Cart";
import { useContext } from "react";


function Home() {

  const { filteredItems, searchByTitle, setSearchByTitle, sortOrder, setSortOrder } = useContext(ShoppingCartContext);

  const handleSearchChange = (event) => {
    setSearchByTitle(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  }

  return (
    <Layout>
      <h1 className="text-2xl text-center mb-10 mt-10">Exclusive Products</h1>
      <div className="flex justify-center">
      <input 
        type="text"
        placeholder="Search products..."
        value={searchByTitle}
        onChange={handleSearchChange}
        className="p-2 mb-4 border rounded w-1/2 mx-auto text-left"
      />
      <select value={sortOrder} onChange={handleSortOrderChange} className="p-2 border rounded">
          <option value="none">No sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div
        className={`flex flex-wrap justify-center space-x-4 w-full p-10 ${style.homeCard}`}
      >
        {filteredItems?.map((item) => (
          <Card
            key={item.id}
            data={item}
            className="flex justify-center items-center"
          />
        ))}
      </div>
      <ProductDetail />
      <Cart />
    </Layout>
  );
}

export default Home;

// GUARDADO RECIENTEMENTE 8 DE JULIO 2024
// import { useState, useEffect } from "react";
// import Layout from "../../Components/Layout";
// import Card from "../../Components/Card";
// import style from "./Home.module.css";
// import ProductDetail from "../../Components/ProductDetail";
// import Cart from "../../Components/Cart";

// function Home() {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => res.json())
//       .then((data) => setItems(data)); //data puede ser otro nombre por ej. json
//   }, []);

//   return (
//     <Layout>
//       <div
//         className={`flex flex-wrap justify-center space-x-4 w-full p-10 ${style.homeCard}`}
//       >
//         {items?.map((item) => (
//           <Card
//             key={item.id}
//             data={item}
//             className="flex justify-center items-center"
//           />
//         ))}
//       </div>
//       <ProductDetail />
//       <Cart />
//     </Layout>
//   );
// }

// export default Home;
