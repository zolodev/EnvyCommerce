import Link from "next/link";
import useCart from "../hooks/useCart";

const Navigation = () => {
  const { openCart, totalNumberOfItemsInCart } = useCart();
  const handleOpenCart = () => openCart();

  return (
    <>
      <header className="sticky top-0 z-10 w-full p-4 bg-white shadow-lg">
        <div className="container flex justify-center p-4 mx-auto">
          <div className="flex">
            <Link href="/">
              <h1 className="text-3xl font-semibold cursor-pointer md:text-4xl">
                {process.env.NEXT_PUBLIC_CORPORATE_NAME}
              </h1>
            </Link>
          </div>
          <div className="flex items-center justify-center flex-1">
            <nav className="flex mx-12 space-x-4">
              <Link href="/about">About</Link>
              <Link href="/customer-service">Customer service</Link>
            </nav>
          </div>
          <div className="flex flex-grow"></div>
          <div className="flex items-center justify-center flex-1">
            <button
              className="relative flex"
              onClick={handleOpenCart}
              aria-label="Open Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mt-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {totalNumberOfItemsInCart() > 0 && (
                <span className="absolute px-3 py-1 ml-5 font-semibold text-white bg-teal-700 rounded-full">
                  {totalNumberOfItemsInCart()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;
