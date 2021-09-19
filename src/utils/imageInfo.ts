import { ImageInfo } from "../types";

const getImageData = (
  productImageUrl?: string,
  imageDescription?: string,
  defualtImagePath?: string,
): ImageInfo => {
  const defaultImagePath = productImageUrl ?? defualtImagePath ?? "/images/DefaultNoImage.webp";

  return {
    src: defaultImagePath,
    alt:
      imageDescription
      ?? `No image description available for ${defaultImagePath}`,
    isDefaultImage: !productImageUrl,
  };
};

export default getImageData;
