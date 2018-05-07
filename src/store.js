export default (Browser) => ({
  state: {
    browser: Browser.nil,
    error: undefined,
    loading: false
  },
  getters: {
    canDelete: (state) => Browser.canDelete(state.browser),
    canEdit: (state) => Browser.canEdit(state.browser),
    contentType: (state) => Browser.contentType(state.browser),
    data: (state) => Browser.data(state.browser),
    isError: (state) => Browser.isError(state.browser),
    isValid: (state) => (body) => Browser.isValid(state.browser, body),
    links: (state) => Browser.links(state.browser),
    statusText: (state) => Browser.statusText(state.browser),
    resolveUrl: (state) => (href) => Browser.resolveUrl(state.browser, href),
    rootFormat: (state) => Browser.rootFormat(state.browser)
  },
  actions: {
    follow(store, link) {
      const browser = store.state.browser;

      store.state.browser = Browser.nil;
      store.state.error = undefined;
      store.state.loading = true;

      Browser.follow(browser, link)
        .then((browser) => {
          store.state.browser = browser;
          store.state.loading = false;
        })
        .catch((err) => store.state.error = err.toString());
    },
    delete(store) {
      store.dispatch("follow", { method: "DELETE" });
    },
    save(store, body) {
      store.dispatch("follow", {
        method: "PUT",
        headers: { "Content-Type": store.getters.contentType },
        body: body
      });
    }
  }
});
