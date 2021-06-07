import Head from "next/head";
import React from "react";
import ProductList from "../components/ProductList";
import { getAllFilterKeys } from "../constants";
import useFuzzySearch from "../hooks/useFuzzySearch";
import {
  getAllPublishedProducts,
  getCustomSearchIndex,
} from "../services/fetchProducts";
import { Product } from "../types";

const Home = (props: any) => {
  const { filterdList, onSearch } = useFuzzySearch({
    collection: props.allProducts,
    keys: props.filterKeys,
    customSearchIndex: props.customSearchIndex,
  });

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_CORPORATE_TITLE}</title>
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_CORPORATE_DESCRIPTION}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto my-5 mb-20">
        <input
          type="search"
          minLength={4}
          className="w-full p-2 m-5 text-xl bg-gray-100 border-2 border-teal-500 rounded-md outline-none"
          name="q"
          placeholder="Search and filter products..."
          aria-label="Search and filter products..."
          onChange={onSearch}
        />
        {filterdList.length > 0 ? (
          <ProductList data={filterdList} />
        ) : (
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="ml-4">No Items found!</span>
              </p>
            </h2>
          </div>
        )}
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const filterKeys: string[] = getAllFilterKeys();
  const customSearchIndex: string | null = await getCustomSearchIndex();
  const allProducts: Product[] = await getAllPublishedProducts();

  return {
    props: {
      allProducts,
      filterKeys,
      customSearchIndex,
    },
  };
};

export default Home;
