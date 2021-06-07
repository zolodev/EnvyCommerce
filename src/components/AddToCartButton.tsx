import React from "react";
import useCart from "../hooks/useCart";
import { Product } from "../types";
import { getAddToCartButtonText } from "../utils/constants";

type Props = {
  product: Product;
};
const AddToCartButton = ({ product }: Props) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => addItemToCart(product);
  return (
    <>
      <button
        onClick={handleAddToCart}
        className="w-full p-2 font-semibold text-white bg-teal-700 rounded hover:bg-teal-900"
      >
        {getAddToCartButtonText()}
      </button>
    </>
  );
};

export default AddToCartButton;
