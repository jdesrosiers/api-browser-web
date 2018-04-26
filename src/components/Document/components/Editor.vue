<template>
  <div class="editor">
    <div class="buttons">
      <Button class="badge" @click="formatJson">Format</Button>
    </div>
    <textarea v-model="value" @input="input" />
  </div>
</template>

<script>
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
        this.value = JSON.stringify(JSON.parse(this.value), null, "  ");
      }
    }
  };
</script>

<style scoped>
  .editor {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  textarea {
    width: 100%;
    height: 100%;
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
