<template>
  <div class="input-group">
    <input type="text"
           class="form-control"
           :value="value"
           v-bind="$attrs"
           @input="input"
           @keyup="keyup"
           aria-label="URL"
           aria-describedby="basic-addon2">
  </div>
</template>

<script>
  export default {
    name: "UrlBar",
    props: { value: String },
    methods: {
      input(event) {
        this.$emit("input", event.target.value);
      },
      keyup(event) {
        this.$emit("keyup", event);
      }
    }
  };
</script>

<style scoped>
</style>
