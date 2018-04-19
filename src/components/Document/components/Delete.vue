<template>
  <Button class="btn-danger" @click="click">Delete</Button>
</template>

<script>
  import Button from "@/bootstrap/Button.vue";

  export default {
    name: "Delete",
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
