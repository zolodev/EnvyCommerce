import Head from "next/head";
import React from "react";
import ProductList from "../components/ProductList";
import useFuzzySearch from "../hooks/useFuzzySearch";
import { getAllPublishedProducts } from "../services/fetchProducts";
import { Product } from "../types";

const Home = (props: any) => {
  const { filterdList, onSearch } = useFuzzySearch({
    collection: props.allProducts,
    keys: props.filterKeys,
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
        <ProductList data={filterdList} />
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const allProducts: Product[] = await getAllPublishedProducts();
  const filterKeys = process.env.NEXT_PUBLIC_FILTER_KEYS
    ? process.env.NEXT_PUBLIC_FILTER_KEYS?.split(",")
    : ["name"];

  return {
    props: {
      allProducts,
      filterKeys,
    },
  };
};

export default Home;
