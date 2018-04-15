<template>
  <button type="button" class="btn btn-danger" @click="click">Delete</button>
</template>

<script>
  export default {
    name: "Delete",
    methods: {
      click(event) {
        this.$emit("click", event);
      }
    }
  };
</script>

<style scoped>
</style>
