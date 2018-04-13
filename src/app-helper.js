//import "whatwg-fetch";


const request = (url) => {
  return window.fetch(url)
    .then((response) => {
      return response.text()
        .then((body) => {
          return { body: body };
        });
    });
};

export { request };
