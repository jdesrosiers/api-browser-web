<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar v-model="url" placeholder="http://" @keyup.enter="go" />
    </nav>

    <main role="main">
      <WelcomeBanner v-if="!hasHashLocation" />
      <Error v-else-if="error">{{ error }}</Error>
      <Document v-else-if="browser.location" :browser="browser" />
    </main>
  </div>
</template>

<script>
  import * as Application from "../lib/application.js";
  import * as Browser from "../lib/browser.js";
  import Document from "@/components/Document.vue";
  import Error from "@/components/Error.vue";
  import UrlBar from "@/components/UrlBar.vue";
  import WelcomeBanner from "@/components/WelcomeBanner.vue";

  export default {
    data: () => ({
      url: "",
      hasHashLocation: false,
      error: undefined,
      browser: Browser.nil
    }),
    components: { Document, Error, UrlBar, WelcomeBanner },
    mounted() {
      window.addEventListener("hashchange", this.handleHashChange);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    },
    beforeDestroy() {
      window.removeEventListener("hashchange", this.handleHashChange);
    },
    methods: {
      handleHashChange() {
        this.url = Application.getLocation();
        this.hasHashLocation = !!this.url;
        this.browser = Browser.nil;
        this.error = undefined;

        this.request()
          .then((browser) => this.browser = browser)
          .catch((err) => this.error = err.toString());
      },
      request() {
        return Browser.follow(this.browser, { href: this.url });
      },
      go(event) {
        Application.setLocation(event.target.value);
      }
    }
  };
</script>

<style>
  body {
    padding-top: 5rem;
  }
</style>
