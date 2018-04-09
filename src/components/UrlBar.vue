<template>
  <div class="input-group">
    <input
       type="text"
       class="form-control"
       :value="value"
       :placeholder="placeholder"
       @keyup.enter="onEnter"
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
      onEnter(event) {
        this.$emit("input", event.target.value);
      }
    }
  };
</script>

<style scoped>
</style>
