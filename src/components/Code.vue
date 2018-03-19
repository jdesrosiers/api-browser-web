<template>
  <div class="code card">
    <div class="card-body">
      <p class="card-text"><slot /></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Code"
  };
</script>

<style scoped>
  .code {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>
