<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar v-model="url" placeholder="http://" @keyup.enter="go" />
    </nav>

    <main role="main">
      <WelcomeBanner v-if="!location" />
      <Code v-else-if="body !== undefined" :language="language" :code="body" />
    </main>
  </div>
</template>

<script>
  import Code from "./components/Code.vue";
  import UrlBar from "./components/UrlBar.vue";
  import WelcomeBanner from "./components/WelcomeBanner.vue";
  import Ajv from "ajv";

  const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];

  const ajv = new Ajv();
  const validateUrl = ajv.compile({ "type": "string", "format": "uri" });

  export default {
    data: () => ({
      url: "",
      location: "",
      body: undefined,
      language: undefined,
      response: undefined
    }),
    components: { Code, UrlBar, WelcomeBanner },
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
        this.language = undefined;
        this.body = undefined;

        if (validateUrl(this.location)) {
          this.request(this.location);
        } else {
          console.log("INVALID URL");
        }
      },
      request(url) {
        fetch(url, { headers: { Accept: "application/json" } })
          .then((response) => this.response = response);
      },
      go(event) {
        const url = event.target.value;
        window.location.hash = encodeURIComponent(url);
      }
    },
    watch: {
      response(response) {
        response.text()
          .then((body) => {
            this.language = subtypeName(this.response.headers.get("content-type"));
            this.body = body;
          });
      }
    }
  };
</script>

<style>
  body {
    padding-top: 5rem;
  }
</style>
