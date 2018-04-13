//import "whatwg-fetch";


const request = (url) => {
  return window.fetch(url)
    .then((response) => {
      console.log(response);
      return response;
    });
};

export { request };
