import { useApiData } from "../../ContextApi/index";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";

function Electronics() {
  const apiData = useApiData();


  const electronicItems = apiData.filter(
    (item) =>
      item.category === "electronics"
  );

  return (
    <Layout>
      <div
        className={`flex flex-wrap justify-center space-x-4 w-full p-10`}
      >
        {electronicItems.map((item) => (
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

export default Electronics;