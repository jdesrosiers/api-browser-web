const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];

const parseLink = (links) => {
  return links.split(/\s*,\s*/)
    .map((link) => {
      const parsedLink = link.match(/^<(.*)>; rel="(.*)"; title="(.*)"$/);
      return { rel: parsedLink[2], href: parsedLink[1], title: parsedLink[3] };
    });
};

export { subtypeName, parseLink };
