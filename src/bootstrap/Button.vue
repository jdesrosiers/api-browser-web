<template>
  <button type="button" class="btn" @click="click">
    <slot />
  </button>
</template>

<script>
  export default {
    name: "Button",
    methods: {
      click(event) {
        this.$emit("click", event);
      }
    }
  };
</script>

<style scoped>
</style>
