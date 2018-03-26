import Ajv from "ajv";

const ajv = new Ajv();
const schema = {
  "type": "string",
  "format": "uri"
};

const validateUri = (uri) => {
  return ajv.validate(schema, uri);
};

export { validateUri };
