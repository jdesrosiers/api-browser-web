<template>
  <div class="alert alert-danger" role="alert">
    <slot />
  </div>
</template>

<script>
  export default {
    name: "Error"
  };
</script>

<style scoped>
  .alert {
    margin: 0 1rem 0 1rem;
  }
</style>
