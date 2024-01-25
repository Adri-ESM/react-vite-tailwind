import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { generateUniqueKey } from "../utils/index.js";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);
  const activeStyle = "underline underline-thickness-thin underline-offset-4";

  const openProductModal = () => {
    context.openCart();
  };

  // const handleRemoveItem = () => {
  //   context.removeProductFromCart(id);
  // };

  return (
    <nav className="flex justify-between bg-white items-center top-0 fixed z-10 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">Kris&apos;s  Shop</NavLink>
        </li>
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
            to="/furniture"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furniture
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">
        <li className="text-black/60">adrievelyn@gmail.com</li>
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
            All My Orders
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
        <li>
          {/* <NavLink to="/cart" className="flex items-center gap-1"> */}
          <FontAwesomeIcon
             icon={faShoppingCart}
             className="w-6 h-6 text-gray-500"
             onClick={() => {
              openProductModal();
            }}
          />
           {context.count}
        {context.cartProducts.map((product) => (
          <div
          key={product.cartItemId || generateUniqueKey()}  
          onClick={() => {
            context.removeProductFromCart(product.id);
          }}
          >
            
          </div>
        ))}
         
          {/* </NavLink> */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
