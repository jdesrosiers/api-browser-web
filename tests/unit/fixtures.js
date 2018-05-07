const browserFixture = (overrides = {}) => Object.assign({
  isError: () => false,
  statusText: () => "OK",
  canEdit: () => false,
  canDelete: () => false,
  links: () => [],
  resolveUrl: () => "",
  data: () => {},
  rootFormat: () => "json",
  follow: () => Promise.resolve(browserFixture()),
  isValid: () => Promise.resolve([true]),
  contentType: () => "application/json"
}, overrides);

export { browserFixture };
