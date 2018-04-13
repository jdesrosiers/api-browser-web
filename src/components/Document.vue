<template>
  <Card :class="{ 'border-danger': statusText }">
    <CardHeader v-if="statusText" class="bg-danger">
      {{ statusText }}
    </CardHeader>
    <Code :browser="browser" />
    <Link v-for="(link, index) in links" :key="index" :browser="browser" :link="link" />
  </Card>
</template>

<script>
  import * as HttpParser from "../../lib/parse-http";
  import Card from "@/components/Card.vue";
  import CardHeader from "@/components/CardHeader.vue";
  import Code from "@/components/Code.vue";
  import Link from "@/components/Link.vue";

  export default {
    name: "Document",
    props: ["browser"],
    components: { Card, CardHeader, Code, Link },
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
</style>
