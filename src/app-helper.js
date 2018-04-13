//import "whatwg-fetch";


const request = (url) => {
  return window.fetch(url)
    .then((response) => {
      const statusCode = response.status;
      const wasResponseAnError = statusCode >= 400 && statusCode < 600;

      return {
        body: response._bodyText,
        statusText: response.statusText,
        wasResponseAnError: wasResponseAnError
      };
    });
};

export { request };
