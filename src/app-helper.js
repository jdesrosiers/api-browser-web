const myFetch = (url) => {
  return window.fetch(url)
    .then((response) => {
      return response.text()
        .then((body) => {
          return body;
        });
    });
};

export { myFetch };
