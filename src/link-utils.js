const parseRawLinks = (rawLinks) => {
  if (typeof rawLinks !== "string") {
    return [];
  }

  let links = [];
  const splitLinks = rawLinks.split(",");

  for (var i = 0; i < splitLinks.length; i++) {
    let link = {};
    const splitParts = splitLinks[i].split(";");

    link.href = splitParts[0].replace(/<(.*)>/, "$1").trim();
    link.rel = splitParts[1].replace(/rel="(.*)"/, "$1").trim();
    link.title = splitParts[2].replace(/title="(.*)"/, "$1").trim();

    links.push(link);
  }

  return links;
};

const resolveUrls = (links, baseUrl) => {
  const linksCopy = links.slice(0);

  for (let link of linksCopy) {
    const fullUrl = new URL(link.href, baseUrl);
    const encodedHref = encodeURIComponent(fullUrl.href);
    link.href = "#" + encodedHref;
  }

  return linksCopy;
};

export { parseRawLinks, resolveUrls };
