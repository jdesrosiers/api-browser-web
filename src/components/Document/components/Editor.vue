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
    data: () => ({ value: "" }),
    mounted() {
      this.value = Application.formatJson(this.$store.getters.data);
      this.$emit("input", this.value);
    },
    methods: {
      input(event) {
        this.$emit("input", event.target.value);
      },
      formatJson() {
        this.value = Application.formatJson(JSON.parse(this.value));
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
