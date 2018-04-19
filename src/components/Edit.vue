<template>
  <Button class="btn-secondary" @click="click">Edit</Button>
</template>

<script>
  export default {
    name: "Edit",
    methods: {
      click(event) {
        this.$emit("click", event);
      }
    }
  };
</script>

<style scoped>
</style>
