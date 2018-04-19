<template>
  <Card :class="{ 'border-danger': isError }">
    <CardHeader v-if="title" :class="{ 'bg-danger': isError }">
      {{ title }}
    </CardHeader>
    <div style="position: relative">
      <div class="methods">
        <Delete v-if="canDelete" @click="onDelete" />
      </div>
      <Code :browser="browser" />
    </div>
    <Link v-for="(link, index) in links" :key="index" :browser="browser" :link="link" />
  </Card>
</template>

<script>
  import * as HttpParser from "@/../lib/parse-http";
  import Card from "@/bootstrap/Card.vue";
  import CardHeader from "@/bootstrap/CardHeader.vue";
  import Code from "@/components/Document/components/Code.vue";
  import Delete from "@/components/Document/components/Delete.vue";
  import Link from "@/components/Document/components/Link.vue";

  export default {
    name: "Document",
    props: ["browser"],
    components: { Card, CardHeader, Code, Delete, Link },
    methods: {
      onDelete() {
        const link = { href: this.browser.location.href, method: "DELETE" };
        this.$emit("delete", link);
      }
    },
    computed: {
      title() {
        return this.isError ? this.browser.statusText : undefined;
      },
      isError() {
        return this.browser.status >= 400;
      },
      links() {
        const link = this.browser.headers["link"];
        return link ? HttpParser.parseLink(link) : [];
      },
      allow() {
        const allow = this.browser.headers["allow"];
        return allow ? HttpParser.parseAllow(allow) : [];
      },
      canDelete() {
        return this.allow.includes("delete");
      }
    }
  };
</script>

<style scoped>
  .methods {
    position: absolute;
    right: 0;
    margin-top: .5em;
  }
  .methods * {
    margin-right: .5em;
  }
</style>
