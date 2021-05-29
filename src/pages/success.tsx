import { useEffect } from "react";
import useCart from "../hooks/useCart";

const SuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container flex flex-col w-2/4 p-8 mx-auto mt-10 border-2">
      <h2 className="text-3xl font-semibold ">
        <p className="flex items-center justify-center text-teal-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="ml-4">Payment successful</span>
        </p>
        <p className="flex justify-center mt-5 text-xl">
          Thank you for your purchase!
        </p>
      </h2>
    </div>
  );
};

export default SuccessPage;
