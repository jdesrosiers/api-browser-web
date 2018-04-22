<template>
  <Button class="btn-secondary" @click="click">Edit</Button>
</template>

<script>
  import Button from "@/bootstrap/Button.vue";

  export default {
    name: "Edit",
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
