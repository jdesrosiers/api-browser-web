<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="/">{{ title }}</a>
    <slot />
  </nav>
</template>

<script>
  export default {
    name: "NavBar",
    props: ["title"]
  };
</script>

<style scoped>
</style>
