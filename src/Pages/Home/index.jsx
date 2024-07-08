import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import style from "./Home.module.css";
import ProductDetail from "../../Components/ProductDetail";
import Cart from "../../Components/Cart";
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center space-x-4 w-full p-10">
        <h1 className="text-xl font-bold text-center">Exclusive Products</h1>
      </div>
      <input 
      type="text" 
      placeholder="Search a Product"
      className="w-1/2 p-2 m-2 border border-gray-300 rounded-lg focus:outline-none"
       />
      <div
        className={`flex flex-wrap justify-center space-x-4 w-full p-10 ${style.homeCard}`}
      >
        {context.items?.map((item) => (
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
