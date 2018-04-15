<template>
  <iframe v-if="language === 'html'" :srcdoc="highlighted"></iframe>
  <pre v-else-if="language"><code class="hljs" :class="language" v-html="highlighted"></code></pre>
</template>

<script>
  import * as HttpParser from "../../lib/parse-http";
  import hljs from "highlight.js";
  import "highlight.js/styles/default.css";

  const formatJson = (json) => JSON.stringify(JSON.parse(json), null, "  ");

  export default {
    name: "Code",
    props: ["browser"],
    methods: {
      highlight(code) {
        return hljs.highlightAuto(code).value;
      }
    },
    computed: {
      highlighted() {
        if (!this.body || this.language === "html") {
          return this.body;
        } else if (this.language === "json") {
          const formatted = formatJson(this.body);
          return this.highlight(formatted);
        } else {
          return this.highlight(this.body);
        }
      },
      language() {
        const contentType = this.browser.headers["content-type"];
        return contentType ? HttpParser.subtypeName(contentType) : "";
      },
      body() {
        return this.browser.body;
      }
    }
  };
</script>

<style scoped>
  pre {
    margin: 0;
  }

  iframe {
    border: none;
  }
</style>
