<template>
  <Card class="full-height" :class="{ 'border-danger': isError }">
    <CardHeader v-if="title" :class="{ 'bg-danger': isError }">
      {{ title }}
    </CardHeader>
    <CardBody class="full-height">
      <Decorator v-if="editMode" class="full-height">
        <div slot="decoration" class="buttons">
          <Save @click="onSave" :disabled="!isValid" />
          <Cancel @click="onCancel" />
        </div>
        <Editor @input="body = $event" />
        <Validation :isValid="isValid" :validationErrors="validationErrors" />
      </Decorator>
      <Decorator v-else class="full-height">
        <div slot="decoration" class="buttons">
          <Edit v-if="canEdit" @click="onEdit" />
          <Delete v-if="canDelete" @click="onDelete" />
        </div>
        <Code />
      </Decorator>
      <Link v-for="(link, index) in links" :key="index" :link="link" />
    </CardBody>
  </Card>
</template>

<script>
  import Card from "@/bootstrap/Card.vue";
  import CardBody from "@/bootstrap/CardBody.vue";
  import CardHeader from "@/bootstrap/CardHeader.vue";
  import Cancel from "@/components/Document/components/Cancel.vue";
  import Code from "@/components/Document/components/Code.vue";
  import Decorator from "@/Decorator.vue";
  import Delete from "@/components/Document/components/Delete.vue";
  import Edit from "@/components/Document/components/Edit.vue";
  import Editor from "@/components/Document/components/Editor.vue";
  import Link from "@/components/Document/components/Link.vue";
  import Save from "@/components/Document/components/Save.vue";
  import Validation from "@/components/Document/components/Validation.vue";

  export default {
    name: "Document",
    data: () => ({ editMode: false, body: "", isValid: true, validationErrors: "" }),
    components: {
      Card,
      CardBody,
      CardHeader,
      Cancel,
      Code,
      Decorator,
      Delete,
      Edit,
      Editor,
      Link,
      Save,
      Validation
    },
    methods: {
      onEdit() {
        this.editMode = true;
      },
      onCancel() {
        this.editMode = false;
      },
      onDelete() {
        this.$store.dispatch("delete");
      },
      onSave() {
        this.$store.dispatch("save", this.body);
      }
    },
    computed: {
      title() {
        return this.isError ? this.$store.getters.statusText : undefined;
      },
      isError() {
        return this.$store.getters.isError;
      },
      links() {
        return this.$store.getters.links;
      },
      canDelete() {
        return this.$store.getters.canDelete;
      },
      canEdit() {
        return this.$store.getters.canEdit;
      }
    },
    watch: {
      body(body) {
        this.$store.getters.isValid(body)
          .then((result) => [this.isValid, this.validationErrors] = result)
          .catch((error) => {
            this.isValid = false;
            this.validationErrors = error.message;
          });
      }
    }
  };
</script>

<style scoped>
  .card-body {
    padding: 0;
  }

  .buttons {
    margin-top: 1em;
    margin-right: 1em;
    right: 0;
  }

  .buttons * {
    margin-right: .5em;
  }
</style>
