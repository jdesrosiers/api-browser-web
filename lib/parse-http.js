const format = (contentType) => {
  const matches = contentType.match(/.*\/([^;]*)(;.*)?/);
  return matches ? matches[1] : "";
};

const rootFormat = (contentType) => {
  const subtypeName = format(contentType);
  const matches = subtypeName.match(/(?:.*\+)?(.*)/);
  return matches ? matches[1] : "";
};

const parseLink = (links) => {
  return links.split(/\s*,\s*/)
    .map((link) => {
      const parsedLink = link.match(/^<(.*)>; rel="([^;]*)"(?:; title="(.*)")?$/);
      return { rel: parsedLink[2], href: parsedLink[1], title: parsedLink[3] };
    });
};

const parseAllow = (allow) => {
  return allow.split(/\s*,\s*/)
    .map((method) => method.toLowerCase());
};

export { format, parseAllow, parseLink, rootFormat, subtypeName };
