import Head from "next/head";
import React from "react";
import slugify from "slugify";
import { ImageInfo } from "../types";

type Props = {
  image: ImageInfo;
};
const HeroImage = ({ image }: Props) => {
  const imageSlug = slugify(image.src, { lower: true, strict: true });
  const heroName = `hero-${imageSlug}`;
  return (
    <>
      <Head>
        <style
          key={imageSlug}
        >{`.${heroName} {background-image: url(${image.src})}`}
        </style>
      </Head>

      <div
        className={`w-full mx-auto bg-center bg-no-repeat bg-cover h-72 ${heroName}`}
        role="img"
        aria-label={image.alt}
        tabIndex={-1}
      />
    </>
  );
};

export default HeroImage;
