<template>
  <div id="app">
    <NavBar title="API Browser">
      <UrlBar :value="url" placeholder="http://" @keyup.enter="go" />
    </NavBar>

    <main role="main">
      <WelcomeBanner v-if="!hasHashLocation()" />
      <Error v-else-if="error">{{ error }}</Error>
      <Document v-else-if="!loading" />
    </main>
  </div>
</template>

<script>
  import * as Application from "../lib/application.js";
  import Document from "@/components/Document/Document.vue";
  import Error from "@/components/Error.vue";
  import NavBar from "@/components/NavBar.vue";
  import UrlBar from "@/components/UrlBar.vue";
  import WelcomeBanner from "@/components/WelcomeBanner.vue";

  export default {
    data: () => ({ url: "" }),
    components: { Document, Error, NavBar, UrlBar, WelcomeBanner },
    mounted() {
      window.addEventListener("hashchange", this.handleHashChange);
      if (Application.getLocation()) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      }
    },
    beforeDestroy() {
      window.removeEventListener("hashchange", this.handleHashChange);
    },
    computed: {
      loading() {
        return this.$store.state.loading;
      },
      error() {
        return this.$store.state.error;
      }
    },
    methods: {
      hasHashLocation() {
        return !!Application.getLocation();
      },
      handleHashChange() {
        this.url = Application.getLocation();
        this.$store.dispatch("follow", { href: this.url });
      },
      go(event) {
        Application.setLocation(event.target.value);
      }
    }
  };
</script>

<style>
  html {
    height: 100%;
  }

  body {
    padding-top: 5rem;
    height: 100%;
  }

  .full-height {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #app {
    height: 100%;
    display: flex;
  }

  main {
    width: 100%;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
  }
</style>
