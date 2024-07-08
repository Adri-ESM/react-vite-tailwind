import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ShoppingCartContext } from '../../Context';

function ProductItem({ product }) {
  const { addProductToCart, isProductInOrders } = useContext(ShoppingCartContext);

  const handleAddToCart = () => {
    if (isProductInOrders(product.id)) {
      alert('This product is already in an order and cannot be added again.');
      return;
    }
    addProductToCart(product);
  };

  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
