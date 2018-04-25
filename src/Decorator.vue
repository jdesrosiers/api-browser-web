<script>
  export default {
    name: "Decorator",
    render(createElement) {
      this.$slots.decoration.forEach((decoration) => {
        decoration.data.staticClass += " decoration";
      });

      return createElement(
        "div",
        { "class": "decorator" },
        [this.$slots.decoration, this.$slots.default]
      );
    }
  };
</script>

<style scoped>
  .decorator {
    position: relative;
  }

  .decoration {
    position: absolute;
  }
</style>
