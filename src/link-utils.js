const parseRawLinks = (rawLinks) => {
  if (typeof rawLinks !== "string") {
    return [];
  }

  let links = [];
  const splitLinks = rawLinks.split(",");

  splitLinks.forEach((splitLink) => {
    let link = {};
    const splitParts = splitLink.split(";");

    link.href = splitParts[0].replace(/<(.*)>/, "$1").trim();
    link.rel = splitParts[1].replace(/rel="(.*)"/, "$1").trim();
    link.title = splitParts[2].replace(/title="(.*)"/, "$1").trim();

    links.push(link);
  });

  return links;
};

const resolveUrls = (links, baseUrl) => {
  const linksCopy = links.slice(0);

  linksCopy.forEach((link) => {
    const fullUrl = new URL(link.href, baseUrl);
    const encodedHref = encodeURIComponent(fullUrl.href);
    link.href = "#" + encodedHref;
  });

  return linksCopy;
};

export { parseRawLinks, resolveUrls };
