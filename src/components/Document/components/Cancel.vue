<template>
  <Button class="btn-secondary" @click="click">Cancel</Button>
</template>

<script>
  import Button from "@/bootstrap/Button.vue";

  export default {
    name: "Cancel",
    components: { Button },
    methods: {
      click(event) {
        this.$emit("click", event);
      }
    }
  };
</script>

<style scoped>
</style>
