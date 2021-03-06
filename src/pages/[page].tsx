import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import HeroImage from "../components/HeroImage";
import { getAllPages } from "../services/fetchPages";
import { Page } from "../types";

const ProductPage = (page: Page) => {
  const { name, hero, content } = page;
  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_CORPORATE_TITLE} - {name}
        </title>
      </Head>

      {!hero.isDefaultImage && <HeroImage image={hero} />}
      <div className="container mx-auto my-5 mb-20 px-96">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const allPages: Page[] = await getAllPages();

  const paths = allPages.map((page: Page) => ({
    params: {
      page: page.slug,
    },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const allPages: Page[] = await getAllPages();
  const page = allPages.find((p) => p.slug === context.params.page) as Page;

  return {
    props: {
      ...page,
    },
  };
};

export default ProductPage;
