<template>
  <iframe v-if="language === 'html'" :srcdoc="highlighted"></iframe>
  <pre v-else-if="language"><code class="hljs" :class="language" v-html="highlighted"></code></pre>
</template>

<script>
  import * as Application from "@/../lib/application";
  import hljs from "highlight.js";
  import "highlight.js/styles/default.css";

  export default {
    name: "Code",
    methods: {
      highlight(code) {
        return hljs.highlightAuto(code).value;
      }
    },
    computed: {
      data() {
        return this.$store.getters.data;
      },
      language() {
        return this.$store.getters.rootFormat;
      },
      highlighted() {
        if (!this.data || this.language === "html") {
          return this.data;
        } else if (this.language === "json") {
          const formatted = Application.formatJson(this.data);
          return this.highlight(formatted);
        } else {
          return this.highlight(this.data);
        }
      }
    }
  };
</script>

<style scoped>
  pre {
    margin: 0;
    height: 100%;
  }

  code {
    height: 100%;
  }

  iframe {
    border: none;
    border-radius: 3px;
  }
</style>
