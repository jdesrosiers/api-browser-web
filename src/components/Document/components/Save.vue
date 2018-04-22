<template>
  <Button class="btn-success" @click="click">Save</Button>
</template>

<script>
  import Button from "@/bootstrap/Button.vue";

  export default {
    name: "Save",
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
