<template>
  <div class="card" :class="{ 'border-danger': statusText }">
    <div class="card-header" :class="{ 'bg-danger': statusText }" v-if="statusText">
      {{ statusText }}
    </div>
    <Code :browser="browser" />
    <Link v-for="(link, index) in links" :key="index" :browser="browser" :link="link" />
  </div>
</template>

<script>
  import * as HttpParser from "../../lib/parse-http";
  import Code from "@/components/Code.vue";
  import Link from "@/components/Link.vue";

  export default {
    name: "Document",
    props: ["browser"],
    components: { Code, Link },
    computed: {
      statusText() {
        const status = this.browser.status;
        return status >= 400 && status < 600 ? this.browser.statusText : undefined;
      },
      links() {
        const link = this.browser.headers["link"];
        return link ? HttpParser.parseLink(link) : [];
      }
    }
  };
</script>

<style scoped>
  .card {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>
