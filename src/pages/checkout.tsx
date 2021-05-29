import CartItemList from "../components/CartItemList";
import ProcessPaymentButton from "../components/ProcessPaymentButton";
import useCart from "../hooks/useCart";

const CheckoutPage = () => {
  const { cart } = useCart();
  return (
    <div className="container flex flex-col w-2/4 mx-auto mt-10 border-2">
      <h2 className="m-8 text-3xl font-semibold ">Checkout</h2>

      <CartItemList />

      <div className="flex justify-end m-4 mt-10">
        <div className="w-48">
          {cart.length > 0 && <ProcessPaymentButton />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
