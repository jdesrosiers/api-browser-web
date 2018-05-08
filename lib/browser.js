import Ajv from "ajv";
import * as draft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import * as draft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import * as HttpParser from "@/../lib/parse-http";


const ajv = new Ajv({ schemaId: "auto" });
ajv.addMetaSchema(draft04);
ajv.addMetaSchema(draft06);

const accept = (acceptable) => acceptable.join(",");

const data = (browser) => {
  if (rootFormat(browser) === "json") {
    return JSON.parse(browser.body);
  } else {
    return browser.body;
  }
};

const canDelete = (browser) => {
  const allow = browser.headers["allow"];
  return allow && HttpParser.parseAllow(allow).includes("delete");
};

const canEdit = (browser) => {
  const allow = browser.headers["allow"];
  return allow && HttpParser.parseAllow(allow).includes("put");
};

const contentType = (browser) => browser.headers["content-type"];

const follow = (browser, link) => {
  let location;
  let status;
  let statusText;
  const headers = {};

  try {
    const context = browser.location ? browser.location.href : undefined;
    const href = link.href || context;
    location = new URL(href, context);
  } catch (err) {
    return Promise.reject(err);
  }

  const options = {
    method: link.method,
    headers: Object.assign({ Accept: accept(browser.acceptable) }, link.headers),
    body: link.body
  };

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

const format = (browser) => {
  return HttpParser.format(contentType(browser) || "");
};

const isError = (browser) => browser.status >= 400;

const isValid = (browser, subject) => {
  const describedby = links(browser).find((link) => link.rel === "describedby");
  if (describedby) {
    return follow(browser, describedby)
      .then((browser) => {
        const schema = JSON.parse(browser.body);
        const validate = ajv.compile(schema);
        const data = JSON.parse(subject);
        return [validate(data), ajv.errorsText(validate.errors)];
      });
  } else {
    return Promise.resolve([true]);
  }
};

const links = (browser) => {
  const link = browser.headers["link"];
  return link ? HttpParser.parseLink(link) : [];
};

const nil = Object.freeze({
  location: undefined,
  acceptable: ["application/json"],
  status: undefined,
  statusText: undefined,
  headers: {}
});

const resolveUrl = (browser, relativeUrl) => {
  const context = browser.location ? browser.location.href : undefined;
  return new URL(relativeUrl, context).href;
};

const statusText = (browser) => browser.statusText;

const rootFormat = (browser) => {
  return HttpParser.rootFormat(contentType(browser) || "");
};

export {
  canDelete,
  canEdit,
  contentType,
  data,
  follow,
  format,
  isError,
  isValid,
  links,
  nil,
  resolveUrl,
  rootFormat,
  statusText
};
