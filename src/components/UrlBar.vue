<template>
  <div class="input-group">
    <input
       type="text"
       class="form-control"
       :placeholder="placeholder"
       @keyup.enter="onKeyup"
       aria-label="URL"
       aria-describedby="basic-addon2">
  </div>
</template>

<script>
  export default {
    name: "UrlBar",
    props: { placeholder: String },
    methods: {
      onKeyup(event) {
        this.$emit("input", event.target.value);
      }
    }
  };
</script>

<style scoped>
</style>
