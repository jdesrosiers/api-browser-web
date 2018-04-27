import Ajv from "ajv";
import * as draft04 from 'ajv/lib/refs/json-schema-draft-04.json';
import * as draft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import * as HttpParser from "@/../lib/parse-http";


const ajv = new Ajv({ schemaId: "auto" });
ajv.addMetaSchema(draft04);
ajv.addMetaSchema(draft06);

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
    location = new URL(link.href, browser.location ? browser.location.href : undefined);
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

const isError = (browser) => browser.status >= 400;

const resolveUrl = (browser, relativeUrl) => {
  const context = browser.location ? browser.location.href : undefined;
  return new URL(relativeUrl, context).href;
};

const links = (browser) => {
  const link = browser.headers["link"];
  return link ? HttpParser.parseLink(link) : [];
};

const canEdit = (browser) => {
  const allow = browser.headers["allow"];
  return allow && HttpParser.parseAllow(allow).includes("put");
};

const canDelete = (browser) => {
  const allow = browser.headers["allow"];
  return allow && HttpParser.parseAllow(allow).includes("delete");
};

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

export { nil, follow, isError, links, canEdit, canDelete, isValid, resolveUrl };
