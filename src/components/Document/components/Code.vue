<template>
  <iframe v-if="language === 'html'" :srcdoc="highlighted"></iframe>
  <pre v-else-if="language"><code class="hljs" :class="language" v-html="highlighted"></code></pre>
</template>

<script>
  import * as Application from "@/../lib/application";
  import * as HttpParser from "@/../lib/parse-http";
  import hljs from "highlight.js";
  import "highlight.js/styles/default.css";

  const parseLanguage = (subtypeName) => {
    const matches = subtypeName.match(/(?:.*\+)?(.*)/);
    return matches ? matches[1] : "";
  };

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
          const formatted = Application.formatJson(this.body);
          return this.highlight(formatted);
        } else {
          return this.highlight(this.body);
        }
      },
      language() {
        const contentType = this.browser.headers["content-type"] || "";
        const subtypeName = HttpParser.subtypeName(contentType);
        return parseLanguage(subtypeName);
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
