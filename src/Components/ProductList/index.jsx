import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';

function ProductList() {
  const { products, addProductToCart, isProductInOrders } = useContext(ShoppingCartContext);

  const handleAddToCart = (product) => {
    if (isProductInOrders(product.id)) {
      alert('This product is already in an order and cannot be added again.');
      return;
    }
    addProductToCart(product);
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>{product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
