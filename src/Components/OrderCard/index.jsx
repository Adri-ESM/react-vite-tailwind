import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./styles.css";

export default function OrderCard(props) {
  const { id, title, image, price, showDeleteIcon = true,  showOutstandingLabel, showDeleteOrder = true } = props;
  const context = useContext(ShoppingCartContext);

  const handleRemoveItem = () => {
    context.removeProductFromCart(id);
  };

  const handleRemoveOrder = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      context.deleteOrder(id);
    }
  };

  return (
    <div className="order-card-items relative border p-4 rounded-lg shadow-lg">
      {showOutstandingLabel && (
        <>
          <span className="absolute top-0 left-0 bg-yellow-500 text-white font-bold text-xs px-2 py-1 rounded-br-lg">
            Outstanding
          </span>
          <FontAwesomeIcon
            className="absolute top-0 right-0 text-xl cursor-pointer text-red-600 px-2 py-1"
            icon={faTimes}
            onClick={handleRemoveOrder}
          />
        </>
      )}
      <div className="order-card-container">
        <div className="flex justify-between mb-2">
          {showDeleteIcon && (
            <FontAwesomeIcon
              className="text-xl cursor-pointer ml-auto text-red-600"
              icon={faTimes}
              onClick={handleRemoveItem}
            />
          )}
        </div>
        <div className="order-card-item">
        {showDeleteOrder && (
          <figure className="w-20 h-20 relative group">
            <img
              className="order-image w-full h-full object-cover rounded-lg transition-transform transform cursor-pointer hover:scale-150"
              src={image}
              alt={title}
            />
          </figure>
        )}
          <p className="align-center text-sm pl-5 pr-5">{title}</p>
          <h3 className="align-center text-base font-semibold">${price}</h3>
        </div>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  showDeleteIcon: PropTypes.bool,
  showOutstandingLabel: PropTypes.bool,
  showDeleteOrder: PropTypes.bool,
};


// GUARDADO RECIENTEMENTE miercoles 26 JUNIO
// import { useContext } from "react";
// import { ShoppingCartContext } from "../../Context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import PropTypes from "prop-types";
// import "./styles.css";

// export default function OrderCard(props) {
//   const { id, title, image, price, showDeleteIcon = true,  showOutstandingLabel, showDeleteOrder = true } = props;
//   const context = useContext(ShoppingCartContext);

//   const handleRemoveItem = () => {
//     context.removeProductFromCart(id);
//   };

//   const handleRemoveOrder = () => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       context.deleteOrder(id);
//     }
//   };

//   return (
//     <div className="order-card-items relative border p-4 rounded-lg shadow-lg">
//       {showOutstandingLabel && (
//         <>
//           <span className="absolute top-0 left-0 bg-yellow-500 text-white font-bold text-xs px-2 py-1 rounded-br-lg">
//             Outstanding
//           </span>
//           <FontAwesomeIcon
//             className="absolute top-0 right-0 text-xl cursor-pointer text-red-600 px-2 py-1"
//             icon={faTimes}
//             onClick={handleRemoveOrder}
//           />
//         </>
//       )}
//       <div className="order-card-container">
//         <div className="flex justify-between mb-2">
//           {showDeleteIcon && (
//             <FontAwesomeIcon
//               className="text-xl cursor-pointer ml-auto text-red-600"
//               icon={faTimes}
//               onClick={handleRemoveItem}
//             />
//           )}
//         </div>
//         <div className="order-card-item">
//         {showDeleteOrder && (
//           <figure className="w-20 h-20 relative group">
//             <img
//               className="order-image w-full h-full object-cover rounded-lg transition-transform transform cursor-pointer hover:scale-150"
//               src={image}
//               alt={title}
//             />
//           </figure>
//         )}
//           <p className="align-center text-sm pl-5 pr-5">{title}</p>
//           <h3 className="align-center text-base font-semibold">${price}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// OrderCard.propTypes = {
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   showDeleteIcon: PropTypes.bool,
//   showOutstandingLabel: PropTypes.bool,
//   showDeleteOrder: PropTypes.bool,
// };
