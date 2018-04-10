<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar
        v-model="url"
        placeholder="http://"
        @make-a-request="makeARequest($event)"
        @set-invalid-url-error-message="setErrorMessage(invalidUrlErrorMessage)"
      />
    </nav>

    <main role="main">
      <Code
        v-if="url !== ''"
        :language="language"
        :code="body"
        :wasResponseAnError="wasResponseAnError"
        :statusText="statusText" >
      </Code>
      <WelcomeBanner v-else />
    </main>
  </div>
</template>

<script>
  import Code from "./components/Code.vue";
  import UrlBar from "./components/UrlBar.vue";
  import WelcomeBanner from "./components/WelcomeBanner.vue";
  import { validateUri } from "./validator.js";

  const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];
  const noResponseErrorMessage = "ERROR: No response was returned. Please check the browser console.";
  const invalidUrlErrorMessage = "ERROR: Invalid URL entered.";

  export default {
    data: () => ({
      url: "",
      body: "",
      language: "",
      response: undefined,
      statusText: "",
      wasResponseAnError: false,
      noResponseErrorMessage: noResponseErrorMessage,
      invalidUrlErrorMessage: invalidUrlErrorMessage
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
        this.url = decodeURIComponent(encodedUrl);

        if (validateUri(this.url)) {
          this.request(this.url);
        } else {
          this.setErrorMessage(invalidUrlErrorMessage);
        }
      },
      request(url) {
        const vm = this;

        fetch(url, { headers: { Accept: "application/json" } })
          .then((response) => {
            vm.handleResponse(response);

            vm.response = response;
          })
          .catch(() => this.setErrorMessage(noResponseErrorMessage));
      },
      makeARequest(url) {
        this.request(url);
      },
      setErrorMessage(message) {
        this.body = message;
        this.language = "text";
        this.wasResponseAnError = false;
      },
      handleResponse(response) {
        const statusCode = response.status;

        this.wasResponseAnError = statusCode >= 400 && statusCode < 600;

        this.statusText = response.statusText;
      }
    },
    watch: {
      url(url) {
        window.location.hash = encodeURIComponent(url);
      },
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
