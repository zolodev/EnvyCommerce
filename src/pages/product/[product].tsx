import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddToCartButton from "../../components/AddToCartButton";
import YouTubeVideo from "../../components/YouTubeVideo";
import { getAllProducts } from "../../services/fetchProducts";
import { Product } from "../../types";
import { convertLocalDateTime, convertPrice } from "../../utils/converter";

type ProductProps = {
  product: Product;
};
const ProductPage = ({ product }: ProductProps) => {
  const licenseText = process.env.NEXT_PUBLIC_GENERAL_LICENSE;

  const productPublishedDateTime = !!product.published
    ? convertLocalDateTime({
        stringDateToConvert: product.published,
      })
    : undefined;

  const productUnpublishedDateTime = !!product.unpublish
    ? convertLocalDateTime({
        stringDateToConvert: product.unpublish,
      })
    : undefined;

  const isDraft = !productPublishedDateTime;

  return (
    <>
      <Head>
        {productPublishedDateTime && (
          <meta
            property="article:published_time"
            content={productPublishedDateTime}
          ></meta>
        )}
      </Head>

      <div
        key={product.id}
        className="flex flex-col max-w-5xl mx-auto mt-8 mb-32 border-2 product"
      >
        <main className="flex">
          <header className="p-4">
            <h1 className="text-4xl text-gray-600">{product.name}</h1>
            <h2 className="text-2xl text-gray-400">{product.description}</h2>
            <div className="flex space-x-4">
              {productPublishedDateTime && (
                <time
                  dateTime={productPublishedDateTime}
                  className="text-gray-400"
                >
                  {process.env.NEXT_PUBLIC_PRODUCT_PUBLISH_DATE_DISPLAY_TEXT ??
                    "Published"}{" "}
                  {productPublishedDateTime}
                </time>
              )}

              {productUnpublishedDateTime && (
                <time
                  dateTime={productUnpublishedDateTime}
                  className="text-red-400"
                >
                  {process.env
                    .NEXT_PUBLIC_PRODUCT_UNPUBLISH_DATE_DISPLAY_TEXT ??
                    "Unpublished"}{" "}
                  {productUnpublishedDateTime}
                </time>
              )}
            </div>
            {isDraft && (
              <h3 className="text-2xl text-indigo-600 uppercase">
                Draft &mdash; Not published
              </h3>
            )}

            <img
              src={product.image.src}
              alt={product.image.alt}
              className="flex flex-col max-w-lg mt-8"
            />
          </header>
          <aside className="m-auto mr-5 bg-gray-300">
            <div className="flex m-5">
              <p className="mr-6 text-3xl font-bold text-gray-700 ">
                {convertPrice(product.price)}
              </p>
              {licenseText && (
                <div className="w-48 pl-4 border-l license">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {licenseText}
                  </ReactMarkdown>
                </div>
              )}
            </div>
            {product.promotion && (
              <p className="mx-5 font-semibold">{product.promotion}</p>
            )}
            <div className="flex justify-center m-5">
              <AddToCartButton product={product} />
            </div>
          </aside>
        </main>
        <section className="p-4 border-t-2 description">
          <h3 className="my-4 text-3xl ">
            {process.env.NEXT_PUBLIC_PRODUCT_DESCRIPTION_TITLE ??
              "Product Description"}
          </h3>
          <hr className="w-12 border-4 border-blue-500" />
          <div className="max-w-xl mt-5 text-justify ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {product.content}
            </ReactMarkdown>

            {product.YouTubeUrl && <YouTubeVideo url={product.YouTubeUrl} />}
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const allProducts: Product[] = await getAllProducts();

  const paths = allProducts.map((product: Product) => {
    return {
      params: {
        product: product.slug,
      },
    };
  });

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const allProducts: Product[] = await getAllProducts();
  const product = allProducts.find(
    (p) => p.slug === context.params.product
  ) as Product;

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
