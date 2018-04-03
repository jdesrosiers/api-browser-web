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
  import hljs from "highlight.js";
  import "highlight.js/styles/default.css";

  const subtypeName = (contentType) => contentType.match(/.*\/([^;]*)(;.*)?/)[1];
  const formatJson = (json) => JSON.stringify(JSON.parse(json), null, "  ");

  export default {
    name: "Document",
    props: ["response"],
    data: () => ({ body: "", language: "" }),
    mounted() {
      this.response.text()
        .then((body) => {
          this.language = subtypeName(this.response.headers.get("content-type"));
          this.body = body;
        });
    },
    methods: {
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
        const status = this.response.status;
        return status >= 400 && status < 600 ? this.response.statusText : undefined;
      }
    }
  };
</script>

<style scoped>
  .card {
    margin-left: 1em;
    margin-right: 1em;
    height: 100%;
  }

  pre {
    margin: 0;
  }

  iframe {
    border: none;
    height: 100%;
    width: 100%;
  }
</style>
