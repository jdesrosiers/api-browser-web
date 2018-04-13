import "whatwg-fetch";

const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];

const request = (url) => {
  return window.fetch(url)
    .then((response) => {
      const statusCode = response.status;
      const wasResponseAnError = statusCode >= 400 && statusCode < 600;
      const language = subtypeName(response.headers.get("content-type"));

      return {
        body: response._bodyText,
        statusText: response.statusText,
        wasResponseAnError: wasResponseAnError,
        language: language
      };
    });
};

export { request };
