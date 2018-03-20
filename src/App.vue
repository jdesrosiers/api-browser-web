<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar v-model="url" placeholder="http://" />
    </nav>

    <main role="main">
      <Code v-if="body">{{ body }}</Code>
      <WelcomeBanner v-else />
    </main>
  </div>
</template>

<script>
  import Code from "./components/Code.vue";
  import UrlBar from "./components/UrlBar.vue";
  import WelcomeBanner from "./components/WelcomeBanner.vue";

  export default {
    data: () => ({ url: "", body: "" }),
    components: { Code, UrlBar, WelcomeBanner },
    watch: {
      url(url) {
        fetch(url, { headers: { Accept: "application/json" } })
          .then((response) => response.text())
          .then((body) => this.body = body);
      }
    }
  };
</script>

<style>
  body {
    padding-top: 5rem;
  }
</style>
