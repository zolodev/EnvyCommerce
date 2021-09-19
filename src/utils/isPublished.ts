const isPublished = (
  publishDate?: string | Date,
  unpublishDate?: string | Date
): Boolean => {
  const DateNow = new Date().getTime();

  const isPublished =
    !!publishDate && new Date(publishDate.toString()).getTime() <= DateNow;

  const isNotUnpublished =
    !unpublishDate || DateNow <= new Date(unpublishDate.toString()).getTime();

  return isPublished && isNotUnpublished;
};

export default isPublished;
