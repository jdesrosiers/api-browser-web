<template>
  <div class="input-group">
    <input
       type="text"
       class="form-control"
       :value="value"
       :placeholder="placeholder"
       @input="onInput"
       @keyup="onKeyup"
       aria-label="URL"
       aria-describedby="basic-addon2">
  </div>
</template>

<script>
  export default {
    name: "UrlBar",
    props: {
      value: String,
      placeholder: String
    },
    methods: {
      onInput(event) {
        this.$emit(event.type, event.target.value);
      },
      onKeyup(event) {
        this.$emit(event.type, event);
      }
    }
  };
</script>

<style scoped>
</style>
