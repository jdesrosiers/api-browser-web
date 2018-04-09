const constructLink = (url) => "#" + encodeURIComponent(url);
const setLocation = (href) => window.location.hash = constructLink(href);
const getLocation = () => {
  const encodedUrl = window.location.hash.substring(1);
  return decodeURIComponent(encodedUrl);
}

export { constructLink, getLocation, setLocation }
