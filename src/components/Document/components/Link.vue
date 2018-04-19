<template>
  <div class="card-header">
    <a ref="link" :href="appHref" class="text-primary">{{ title }}</a>
    <span ref="rel" class="badge badge-pill badge-primary">{{ link.rel }}</span>
  </div>
</template>

<script>
  import * as Application from "@/../lib/application.js";
  import * as Browser from "@/../lib/browser.js";

  export default {
    name: "Link",
    props: ["browser", "link"],
    computed: {
      appHref() {
        const fullUrl = Browser.resolveUrl(this.browser, this.link.href);
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
