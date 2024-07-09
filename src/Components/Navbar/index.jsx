import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
//import { generateUniqueKey } from "../utils/index.js";

const Navbar = () => {
  const { openCart } = useContext(ShoppingCartContext);
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-thickness-thin underline-offset-4";
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // Función para actualizar el contador al eliminar productos
  const updateCountOnRemove = () => {
    let totalCount = 0;
    context.cartProducts.forEach(product => {
      totalCount += product.quantity;
    });
    return totalCount;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between bg-white items-center top-0 fixed z-10 w-full py-5 px-8 text-sm font-light">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none md:hidden" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
        </button>
        <NavLink to="/" className="font-semibold text-lg ml-4">Adri&apos;s Shop</NavLink>
      </div>
      
      <ul className={`flex-col md:flex-row md:flex md:items-center gap-3 ${isMenuOpen ? 'flex' : 'hidden'} md:gap-0 md:static absolute top-16 left-0 w-full md:w-auto bg-white md:bg-transparent`}>
        <div className={`md:hidden p-4 border border-gray-300 rounded-lg shadow-lg ${isMenuOpen ? 'flex flex-col' : 'hidden'}`}>
          <li className="ml-4 my-2">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              All
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/clothes"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              Clothes
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/electronics"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              Electronics
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/jewelry"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              Jewelry
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/my-order"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              My Order
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              My Orders
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              My Account
            </NavLink>
          </li>
          <li className="ml-4 my-2">
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMenu}
            >
              Sign In
            </NavLink>
          </li>
          <li className="flex items-center mt-2 md:mt-0 ml-4">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={openCart}
            />
            <span>{context.count}</span>
          </li>
        </div>
        <div className="hidden md:flex md:items-center gap-3">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clothes"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Clothes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/electronics"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/jewelry"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Jewelry
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-order"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Sign In
            </NavLink>
          </li>
        </div>
      </ul>
      
      <li className="flex items-center mt-2 md:mt-0">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={openCart}
            />
            <span>{context.count}</span>
          
       
        {context.cartProducts.map((product, index) => (
          <div
            //key={product.cartItemId || generateUniqueKey()}  
            key={product.id + '-' + index}
            onClick={() => {
              context.removeProductFromCart(product.id);
              const newCount = updateCountOnRemove();
              context.setCount(newCount);
            }}
          >
          </div>
        ))}
        </li>
    </nav>
  );
};

export default Navbar;