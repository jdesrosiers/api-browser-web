<template>
  <div class="input-group">
    <input
       type="text"
       class="form-control"
       :value="value"
       :placeholder="placeholder"
       :class="{ 'is-invalid': !isUrlValid }"
       @keyup.enter="onEnter"
       aria-label="URL"
       aria-describedby="basic-addon2">
  </div>
</template>

<script>
  import { validateUri } from "../validator.js";

  export default {
    name: "UrlBar",
    data: () => ({
      isUrlValid: true
    }),
    props: {
      value: String,
      placeholder: String
    },
    methods: {
      onEnter(event) {
        const url = event.target.value;
        this.isUrlValid = validateUri(url);

        if (this.isUrlValid) {
          this.$emit("make-a-get-request", event.target.value);
        } else {
          this.$emit("handle-no-response");
        }

        this.$emit("input", event.target.value);
      }
    },
    watch: {
      value(url) {
        this.isUrlValid = validateUri(url);
      }
    }
  };
</script>

<style scoped>
</style>
