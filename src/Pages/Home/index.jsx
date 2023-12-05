import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import style from "./Home.module.css";
import ProductDetail from "../../Components/ProductDetail";
import Cart from "../../Components/Cart";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setItems(data)); //data puede ser otro nombre por ej. json
  }, []);

  return (
    <Layout>
      <div
        className={`flex flex-wrap justify-center space-x-4 w-full p-10 ${style.homeCard}`}
      >
        {items?.map((item) => (
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
