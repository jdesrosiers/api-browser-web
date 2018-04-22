const nil = Object.freeze({
  location: undefined,
  acceptable: ["application/json"],
  status: undefined,
  statusText: undefined,
  headers: {}
});

const accept = (acceptable) => acceptable.join(",");

const follow = (browser, link) => {
  let location;
  let status;
  let statusText;
  const headers = {};

  try {
    location = new URL(link.href, browser.href);
  } catch (err) {
    return Promise.reject(err);
  }

  const options = {
    method: link.method,
    headers: { Accept: accept(browser.acceptable) }
  };

  if (link.body) {
    options.body = link.body;
    options.headers["Content-Type"] = "application/json";
  }

  return fetch(location.href, options)
    .then((response) => {
      status = response.status;
      statusText = response.statusText;

      for (let [name, value] of response.headers.entries()) {
        headers[name] = value;
      }

      return response.text();
    })
    .then((body) => {
      const result = Object.assign({}, browser, {
        location,
        status,
        statusText,
        headers: Object.freeze(headers),
        body
      });

      return Promise.resolve(Object.freeze(result));
    });
};

const resolveUrl = (browser, relativeUrl) => {
  const context = browser.location ? browser.location.href : undefined;
  return new URL(relativeUrl, context).href;
};

export { nil, follow, resolveUrl };
