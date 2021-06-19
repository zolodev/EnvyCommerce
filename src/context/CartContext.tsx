import { createContext, useEffect, useState } from "react";
import { Cart, CartItem, Product } from "../types";

type Props = {
  children: any;
};

export const CartContext = createContext({} as Cart);

const CartContextProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const getCart = localStorage.getItem("cart");
    if (getCart) {
      const initCart = JSON.parse(getCart);
      if (initCart) {
        setCart(initCart);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addItemToCart = (product: Product, quantity: number = 0) => {
    const item = cart.find((i) => i.product.id === product.id);

    if (item) {
      const countQuantity = quantity === 0 ? item.quantity + 1 : quantity;
      if (countQuantity >= 0 && countQuantity < 1000) {
        item.quantity = countQuantity;
        setCart([...cart]);
      }
    } else {
      setCart([
        ...cart,
        {
          product,
          quantity: 1,
        },
      ]);
    }
  };

  const removeItemFromCart = (product: Product) =>
    setCart(cart.filter((ci) => ci.product.id !== product.id));

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalNumberOfItemsInCart = (): number =>
    cart
      .flatMap((i) => i.quantity)
      .reduce((a, b) => a + b, 0);

  const totalSumOfCart = (): number =>
    cart
      .flatMap((i) => i.quantity * i.product.price)
      .reduce((a, b) => a + b, 0);

  const exposed: Cart = {
    cart,
    addItemToCart,
    removeItemFromCart,
    openCart,
    closeCart,
    isCartOpen,
    totalSumOfCart,
    totalNumberOfItemsInCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={exposed}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
