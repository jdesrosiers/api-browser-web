//import "whatwg-fetch";


const request = (url) => {
  return window.fetch(url)
    .then((response) => {
      return {
        body: response._bodyText,
        statusText: response.statusText
      };
    });
};

export { request };
