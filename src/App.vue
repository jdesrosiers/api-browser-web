<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar v-model="url" placeholder="http://" @keyup.enter="go" />
    </nav>

    <main role="main">
      <WelcomeBanner v-if="!location" />
      <Error v-else-if="error">{{ error }}</Error>
      <Document v-else-if="response" :response="response" />
    </main>
  </div>
</template>

<script>
  import Document from "./components/Document.vue";
  import Error from "./components/Error.vue";
  import UrlBar from "./components/UrlBar.vue";
  import WelcomeBanner from "./components/WelcomeBanner.vue";
  import Ajv from "ajv";

  const ajv = new Ajv();
  const validateUrl = ajv.compile({ "type": "string", "format": "uri" });

  export default {
    data: () => ({
      url: "",
      location: "",
      error: undefined,
      response: undefined
    }),
    components: { Error, Document, UrlBar, WelcomeBanner },
    mounted() {
      window.addEventListener("hashchange", this.handleHashChange);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    },
    beforeDestroy() {
      window.removeEventListener("hashchange", this.handleHashChange);
    },
    methods: {
      handleHashChange() {
        const encodedUrl = window.location.hash.substring(1);
        this.location = decodeURIComponent(encodedUrl);
        this.url = this.location;
        this.error = undefined;
        this.response = undefined;

        if (validateUrl(this.location)) {
          this.request(this.location);
        } else {
          this.doError("Invalid URL. Try again.");
        }
      },
      request(url) {
        fetch(url, { headers: { Accept: "application/json" } })
          .then((response) => this.response = response)
          .catch(() => this.doError());
      },
      go(event) {
        const url = event.target.value;
        window.location.hash = encodeURIComponent(url);
      },
      doError(error) {
        this.error = error || "Hmmm, something when wrong. Check the browser console for clues.";
      }
    }
  };
</script>

<style>
  body {
    padding-top: 5rem;
  }
</style>
