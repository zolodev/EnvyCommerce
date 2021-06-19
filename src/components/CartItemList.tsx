import React from "react";
import useCart from "../hooks/useCart";
import { CartItem } from "../types";
import { convertPrice } from "../utils/converter";

const CartItemList = () => {
  const { cart, totalSumOfCart, addItemToCart, removeItemFromCart } = useCart();

  const handleAddOneToCart = (cartItem: CartItem) =>
    addItemToCart(cartItem.product, cartItem.quantity + 1);

  const handleRemoveOneFromCart = (cartItem: CartItem) => {
    if (cartItem.quantity - 1 > 0) {
      addItemToCart(cartItem.product, cartItem.quantity - 1);
    } else {
      removeItemFromCart(cartItem.product);
    }
  };

  const handleCustomValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    cartItem: CartItem
  ) => {
    if (Number.parseInt(e.target.value, 10) > 0) {
      addItemToCart(cartItem.product, Number.parseInt(e.target.value, 10));
    } else {
      removeItemFromCart(cartItem.product);
    }
  };

  const handleRemoveItem = (cartItem: CartItem) => {
    removeItemFromCart(cartItem.product);
  };
  return (
    <section className="flex flex-col m-8">
      {cart.length > 0 ? (
        <>
          <ul className="">
            {cart.map((cartItem) => (
              <li
                key={cartItem.product.id}
                className="flex flex-row w-full mb-1 text-lg border-b-2 border-gray-300 border-dashed last:border-b-0"
              >
                <span className="flex justify-start max-h-8">
                  <button
                    type="button"
                    className="w-8 h-8 font-semibold text-white bg-teal-700 hover:bg-teal-800"
                    onClick={() => handleRemoveOneFromCart(cartItem)}
                  >
                    -
                  </button>
                  <input
                    name={cartItem.product.id}
                    className="w-10 text-center "
                    value={cartItem.quantity}
                    maxLength={3}
                    onChange={(e) => handleCustomValue(e, cartItem)}
                  />
                  <button
                    type="button"
                    className="w-8 h-8 font-semibold text-white bg-teal-700 hover:bg-teal-800"
                    onClick={() => handleAddOneToCart(cartItem)}
                  >
                    +
                  </button>
                </span>
                <span className="ml-2">{cartItem.product.name}</span>

                <span className="flex-grow" />
                <span>{convertPrice(cartItem.product.price)}</span>
                <span className="">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(cartItem)}
                    className="ml-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <p className="flex justify-between mt-10 text-2xl border-t-2 border-gray-600">
            <span>Total</span>
            <span>{convertPrice(totalSumOfCart())}</span>
          </p>
        </>
      ) : (
        <span className="flex justify-center flex-1 m-5 text-3xl">
          Your cart is empty
        </span>
      )}
    </section>
  );
};

export default CartItemList;
