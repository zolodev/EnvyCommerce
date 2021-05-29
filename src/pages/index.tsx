import Head from "next/head";
import ProductList from "../components/ProductList";
import { getAllPublishedProducts } from "../services/fetchProducts";
import { Product } from "../types";

const Home = (props: any) => {
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
        <ProductList data={props.allProducts} />
      </main>
    </>
  );
};

export const getStaticProps = async () => {
  const allProducts: Product[] = await getAllPublishedProducts();
  return {
    props: {
      allProducts,
    },
  };
};

export default Home;
