import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function ProductDetail() {
  const context = useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } product-detail scrollable-cards flex-col fixed right-0 border border-black rounded-lg bg-white $`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div className="">
          <FontAwesomeIcon
            className="text-2xl cursor-pointer"
            icon={faTimes}
            onClick={context.closeProductDetail}
          />
        </div>
      </div>
      <figure className="image-container">
        <img
          className=" h-36 mt-10 object-cover rounded-lg m-auto image"
          src={context.productShowing.image}
          alt={context.productShowing.title}
        />
      </figure>
      <p className="p-5">
        <span className="font-bold">${context.productShowing.price}</span>
        <br />
        <br />
        <span className="font-medium text-indigo-700 rounded-md">
          {context.productShowing.title}
        </span>

        <br />
        <br />
        <span>{context.productShowing.description}</span>
      </p>
      <div className="flex items-center justify-between w-full py-3 px-5">
        {/* <span className="text-lg font-bold text-gray-800">$129.99</span> */}
        <button
          className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded"
          onClick={() => context.setCount(context.count + 1)}
        >
          Add to Cart
        </button>
      </div>
    </aside>
  );
}
