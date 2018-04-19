<template>
  <div id="app">
    <NavBar title="API Browser">
      <UrlBar :value="url" placeholder="http://" @keyup.enter="go" />
    </NavBar>

    <main role="main">
      <WelcomeBanner v-if="!hasHashLocation" />
      <Error v-else-if="error">{{ error }}</Error>
      <Document v-else-if="browser.location" :browser="browser" @delete="handleRequest" />
    </main>
  </div>
</template>

<script>
  import * as Application from "../lib/application.js";
  import * as Browser from "../lib/browser.js";
  import Document from "@/components/Document.vue";
  import Error from "@/components/Error.vue";
  import NavBar from "@/components/NavBar.vue";
  import UrlBar from "@/components/UrlBar.vue";
  import WelcomeBanner from "@/components/WelcomeBanner.vue";

  export default {
    data: () => ({
      url: "",
      error: undefined,
      browser: Browser.nil
    }),
    components: { Document, Error, NavBar, UrlBar, WelcomeBanner },
    mounted() {
      window.addEventListener("hashchange", this.handleHashChange);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    },
    beforeDestroy() {
      window.removeEventListener("hashchange", this.handleHashChange);
    },
    computed: {
      hasHashLocation() {
        return !!this.url;
      }
    },
    methods: {
      handleHashChange() {
        this.url = Application.getLocation();
        this.handleRequest({ href: this.url });
      },
      handleRequest(link) {
        this.browser = Browser.nil;
        this.error = undefined;

        const response = this.request(link);
        this.handleResponse(response);
      },
      request(link) {
        return Browser.follow(this.browser, link);
      },
      handleResponse(response) {
        response
          .then((browser) => this.browser = browser)
          .catch((err) => this.error = err.toString());
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

  main {
    padding-left: 1em;
    padding-right: 1em;
  }
</style>
