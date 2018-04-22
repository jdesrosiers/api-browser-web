<template>
  <textarea v-model="value" @input="input" />
</template>

<script>
  export default {
    name: "Editor",
    props: ["browser"],
    data: () => ({ value: "" }),
    mounted() {
      this.value = this.browser.body;
    },
    methods: {
      input(event) {
        this.$emit("input", event.target.value);
      }
    }
  };
</script>

<style scoped>
  textarea {
    width: 100%;
    display: block;
    margin: 0;
    border: 0;
    border-radius: 3px;
    padding: .5em;
    outline: none;
  }
</style>
