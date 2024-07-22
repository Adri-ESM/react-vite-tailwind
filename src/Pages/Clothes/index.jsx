import { useEffect } from 'react';
import { useFilteredData } from '../../Contexts/ContextFilter';
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import Cart from "../../Components/Cart";
import ProductDetail from "../../Components/ProductDetail";
import Filters from '../../Components/Filters';  // Asegúrate de que la ruta de importación es correcta

function Clothes() {
  const { filteredItems, setCategory } = useFilteredData();  // Usar items ya filtrados desde el contexto

  useEffect(() => {
    // Establece las categorías específicas al montar el componente
    setCategory("men's clothing");
    setCategory("women's clothing");
  }, [setCategory]);

  return (
    <Layout>
      <Filters />
      <div className={`flex flex-wrap justify-center space-x-4 w-full p-10`}>
        {filteredItems.map((item) => (
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
