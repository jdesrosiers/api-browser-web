<template>
  <div class="code">
    <div class="card" :class="{ 'border-danger': wasResponseAnError }">
      <div class="card-header" v-if="wasResponseAnError">
        {{ statusText }}
      </div>
      <iframe v-if="language === 'html'" :srcdoc="highlighted"></iframe>
      <pre class="card" v-else>
        <code class="hljs" :class="language" v-html="highlighted"></code>
      </pre>
    </div>
  </div>
</template>

<script>
  import hljs from "highlight.js";
  import "highlight.js/styles/default.css";

  const formatJson = (json) => JSON.stringify(JSON.parse(json), null, "  ");

  export default {
    name: "Code",
    props: {
      code: String,
      language: String,
      statusText: String,
      wasResponseAnError: Boolean
    },
    methods: {
      highlight(code) {
        return hljs.highlightAuto(code).value;
      }
    },
    computed: {
      highlighted() {
        if (this.language === "html") {
          return this.code;
        } else if (this.language === "json") {
          const formatted = formatJson(this.code);
          return this.highlight(formatted);
        } else {
          return this.highlight(this.code);
        }
      }
    }
  };
</script>

<style scoped>
  .code {
    margin-left: 1em;
    margin-right: 1em;
  }

  iframe {
    border: none;
    height: 100%;
    width: 100%;
  }
</style>
