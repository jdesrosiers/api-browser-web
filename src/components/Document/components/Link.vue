<template>
  <div class="card-header">
    <a ref="link" :href="appHref" class="text-primary">{{ title }}</a>
    <span ref="rel" class="badge badge-pill badge-primary">{{ link.rel }}</span>
  </div>
</template>

<script>
  import * as Application from "@/../lib/application.js";

  export default {
    name: "Link",
    props: ["link"],
    computed: {
      browser() {
        return this.$store.state.browser;
      },
      appHref() {
        const fullUrl = this.$store.getters.resolveUrl(this.link.href);
        return Application.constructLink(fullUrl);
      },
      title() {
        return this.link.title || this.link.href;
      }
    }
  };
</script>

<style scoped>
  .badge {
    margin-left: 1em;
  }
</style>
