import { useApiData } from "../../ContextApi/index";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import Cart from "../../Components/Cart";
import ProductDetail from "../../Components/ProductDetail";

function Clothes() {
  const apiData = useApiData();


  const clothingItems = apiData.filter(
    (item) =>
      item.category === "men's clothing" || item.category === "women's clothing"
  );

  return (
    <Layout>
      <div
        className={`flex flex-wrap justify-center space-x-4 w-full p-10`}
      >
        {clothingItems.map((item) => (
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

export default Clothes;