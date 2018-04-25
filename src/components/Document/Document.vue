<template>
  <Card :class="{ 'border-danger': isError }">
    <CardHeader v-if="title" :class="{ 'bg-danger': isError }">
      {{ title }}
    </CardHeader>
    <Decorator v-if="editMode">
      <div slot="decoration" class="buttons">
        <Save @click="onSave" />
        <Cancel @click="onCancel" />
      </div>
      <Editor :browser="browser" @input="body = $event" />
    </Decorator>
    <Decorator v-else>
      <div slot="decoration" class="buttons">
        <Edit v-if="canEdit" @click="onEdit" />
        <Delete v-if="canDelete" @click="onDelete" />
      </div>
      <Code :browser="browser" />
    </Decorator>
    <Link v-for="(link, index) in links" :key="index" :browser="browser" :link="link" />
  </Card>
</template>

<script>
  import * as HttpParser from "@/../lib/parse-http";
  import Card from "@/bootstrap/Card.vue";
  import CardHeader from "@/bootstrap/CardHeader.vue";
  import Cancel from "@/components/Document/components/Cancel.vue";
  import Code from "@/components/Document/components/Code.vue";
  import Decorator from "@/Decorator.vue";
  import Delete from "@/components/Document/components/Delete.vue";
  import Edit from "@/components/Document/components/Edit.vue";
  import Editor from "@/components/Document/components/Editor.vue";
  import Link from "@/components/Document/components/Link.vue";
  import Save from "@/components/Document/components/Save.vue";

  export default {
    name: "Document",
    props: ["browser"],
    data: () => ({ editMode: false, body: "" }),
    components: {
      Card,
      CardHeader,
      Cancel,
      Code,
      Decorator,
      Delete,
      Edit,
      Editor,
      Link,
      Save
    },
    methods: {
      onEdit() {
        this.editMode = true;
      },
      onCancel() {
        this.editMode = false;
      },
      onDelete() {
        const link = { href: this.browser.location.href, method: "DELETE" };
        this.$emit("follow", link);
      },
      onSave() {
        const link = { href: this.browser.location.href, method: "PUT", body: this.body };
        this.$emit("follow", link);
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
      },
      canEdit() {
        return this.allow.includes("put");
      }
    }
  };
</script>

<style scoped>
  .card {
    height: 100%;
  }

  .buttons {
    margin-top: 1em;
    margin-right: 1em;
    right: 0;
  }

  .buttons * {
    margin-right: .5em;
  }

  .decorator {
    height: 100%;
  }
</style>
