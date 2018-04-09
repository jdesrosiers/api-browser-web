<template>
  <div class="card" :class="{ 'border-danger': statusText }">
    <div class="card-header" :class="{ 'bg-danger': statusText }" v-if="statusText">
      {{ statusText }}
    </div>
    <div v-if="language === 'html'">
      <iframe :srcdoc="highlighted"></iframe>
    </div>
    <pre v-else><code class="hljs" :class="language" v-html="highlighted"></code></pre>
  </div>
</template>

<script>
  import * as HttpParser from "../../lib/parse-http";
  import hljs from "highlight.js";
  import "highlight.js/styles/default.css";

  const formatJson = (json) => JSON.stringify(JSON.parse(json), null, "  ");

  export default {
    name: "Document",
    props: ["browser"],
    data: () => ({ body: "", language: "" }),
    mounted() {
      this.update(this.browser);
    },
    methods: {
      update(browser) {
        this.language = HttpParser.subtypeName(browser.headers["content-type"]);
        this.body = browser.body;
      },
      highlight(code) {
        return hljs.highlightAuto(code).value;
      }
    },
    computed: {
      highlighted() {
        if (this.language === "html") {
          return this.body;
        } else if (this.language === "json") {
          const formatted = formatJson(this.body);
          return this.highlight(formatted);
        } else {
          return this.highlight(this.body);
        }
      },
      statusText() {
        const status = this.browser.status;
        return status >= 400 && status < 600 ? this.browser.statusText : undefined;
      }
    },
    watch: {
      browser(browser) {
        this.update(browser);
      }
    }
  };
</script>

<style scoped>
  .card {
    margin-left: 1em;
    margin-right: 1em;
  }

  pre {
    margin: 0;
  }

  iframe {
    border: none;
  }
</style>
