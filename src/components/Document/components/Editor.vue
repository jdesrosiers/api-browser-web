<template>
  <div class="full-height">
    <div class="buttons">
      <Button ref="format" class="badge" @click="formatJson">Format</Button>
    </div>
    <textarea v-model="value" @input="input" class="full-height" />
  </div>
</template>

<script>
  import * as Application from "@/../lib/application";
  import Button from "@/bootstrap/Button.vue";

  export default {
    name: "Editor",
    components: { Button },
    props: ["browser"],
    data: () => ({ value: "" }),
    mounted() {
      this.value = this.browser.body;
    },
    methods: {
      input(event) {
        this.$emit("input", event.target.value);
      },
      formatJson() {
        this.value = Application.formatJson(this.value);
      }
    }
  };
</script>

<style scoped>
  textarea {
    margin: 0;
    border: 0;
    border-radius: 3px;
    padding: .5em;
    outline: none;
    resize: none;
  }

  .buttons {
    margin-top: .5em;
    margin-left: .5em;
  }
</style>
