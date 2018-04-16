<template>
  <div class="main-body">
    <Code
       :code="code"
       :language="language"
       :statusText="statusText"
       :wasResponseAnError="wasResponseAnError"
       :links="links">
    </Code>

    <ul class="list-group" v-for="(link) in links" :key="link.rel">
      <li class="list-group-item justify-content-between align-items-center">
        <a :href="link.href" class="card-link">{{ link.title }}</a>
        <span class="badge badge-primary badge-pill">{{ link.rel }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import Code from "./Code.vue";

  export default {
    name: "MainBody",
    components: { Code },
    props: {
      code: String,
      language: String,
      statusText: String,
      wasResponseAnError: Boolean,
      links: Array
    }
  };
</script>

<style scoped>
  .main-body {
    margin-left: 1em;
    margin-right: 1em;
  }
</style>
