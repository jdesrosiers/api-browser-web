<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar
        v-model="url"
        placeholder="http://"
        @make-a-get-request="makeAGetRequest($event)"
        @handle-no-response="handleNoResponse(invalidUrlErrorMessage)"
      />
    </nav>

    <main role="main">
      <button @click="makeADeleteRequest" class="btn btn-danger" v-if="allowDelete">
        Delete
      </button>
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
  const deleteMethod = "DELETE";

  export default {
    data: () => ({
      url: "",
      body: "",
      language: "",
      response: undefined,
      statusText: "",
      wasResponseAnError: false,
      allowDelete: false,
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
          this.handleNoResponse(invalidUrlErrorMessage);
        }
      },
      request(url, method) {
        fetch(url, {
          headers: { Accept: "application/json" },
          method: method
        })
          .then((response) => {
            const statusCode = response.status;
            const allowHeaderValue = response.headers.get("Allow");

            if (statusCode >= 400 && statusCode < 600) {
              this.handleErrorResponse(response);
            } else {
              if (allowHeaderValue) {
                this.setAllowDelete(allowHeaderValue);
              }

              this.handleSuccessfulResponse(response);
            }

            this.response = response;
          })
          .catch(() => {
            this.handleNoResponse(noResponseErrorMessage);
          });
      },
      makeAGetRequest(url) {
        this.request(url, "GET");
      },
      makeADeleteRequest() {
        this.request(this.url, "DELETE");
      },
      handleErrorResponse(response) {
        this.statusText = response.statusText;
        this.wasResponseAnError = true;
        this.allowDelete = false;
      },
      handleSuccessfulResponse(response) {
        this.statusText = response.statusText;
        this.wasResponseAnError = false;

        if (response.status == 204) {
          this.allowDelete = false;
        }
      },
      handleNoResponse(message) {
        this.body = message;
        this.language = "text";
        this.wasResponseAnError = false;
        this.allowDelete = false;
      },
      setAllowDelete(allowHeaderValue) {
        this.allowDelete = allowHeaderValue.includes(deleteMethod);
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
