<template>
  <div v-if="isValid" class="validation text-success">
    <Check /> Valid
  </div>
  <div v-else class="validation text-danger">
    <X /> {{ validationErrors }}
  </div>
</template>

<script>
  import Check from "@/iconic/Check.vue";
  import X from "@/iconic/X.vue";

  export default {
    name: "Validation",
    props: ["isValid", "validationErrors"],
    components: { Check, X }
  };
</script>

<style scoped>
  .validation {
    margin-left: .5em;
  }
</style>
