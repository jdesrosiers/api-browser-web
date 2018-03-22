<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar v-model="url" placeholder="http://" />
    </nav>

    <main role="main">
      <Code v-if="body" :language="language" :code="body"></Code>
      <WelcomeBanner v-else />
    </main>
  </div>
</template>

<script>
  import Code from "./components/Code.vue";
  import UrlBar from "./components/UrlBar.vue";
  import WelcomeBanner from "./components/WelcomeBanner.vue";

  const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];

  export default {
    data: () => ({
      url: "",
      body: "",
      language: "",
      response: undefined
    }),
    components: { Code, UrlBar, WelcomeBanner },
    watch: {
      url(url) {
        fetch(url, { headers: { Accept: "application/json" } })
          .then((response) => this.response = response);
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
