import { useApiData } from "../../ContextApi/index";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";

function Jewelry() {
  const apiData = useApiData();


  const jewelryItems = apiData.filter(
    (item) =>
      item.category === "jewelery"
  );

  return (
    <Layout>
      <div
        className={`flex flex-wrap justify-center space-x-4 w-full p-10`}
      >
        {jewelryItems.map((item) => (
          <Card
            key={item.id}
            data={item}
            className="flex justify-center items-center"
          />
        ))}
      </div>
    </Layout>
  );
}

export default Jewelry;