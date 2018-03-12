<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <a class="navbar-brand" href="/">API Browser</a>
      <UrlBar v-model="url" placeholder="http://" />
    </nav>

    <main role="main">
      <div class="welcome-banner">
        <h1>Welcome to the API Broswer web client</h1>
        <p class="lead">Enter the URI to your API's homepage in the URL bar to start browsing.</p>
      </div>
    </main>
  </div>
</template>

<script>
  import UrlBar from "./components/UrlBar.vue";

  const data = {
    url: ""
  };

  export default {
    name: "app",
    data: () => data,
    components: {
      UrlBar
    }
  };
</script>

<style>
  body {
    padding-top: 5rem;
  }
  .welcome-banner {
    padding: 3rem 1.5rem;
    text-align: center;
  }
</style>
