<template>
  <div class="input-group">
    <input
       type="text"
       class="form-control"
       :value="value"
       :placeholder="placeholder"
       @keyup.enter="onEnter"
       aria-label="URL"
       aria-describedby="basic-addon2">
  </div>
</template>
       <!--:class="{ invalid: !isUrlValid }"-->
       <!--@keydown="onKeydown"-->

<script>
  //import Ajv from "ajv";

  //const ajv = new Ajv();
  //const schema = {
  //  "properties": {
  //    "apiUrl": { "type": "string", "format": "url" }
  //  }
  //};
  //const validate = ajv.compile(schema);

  export default {
    name: "UrlBar",
    //data: () => ({
    //  isUrlValid: true
    //}),
    props: {
      value: String,
      placeholder: String
    },
    mounted() {
      //const validate = ajv.compile(schema);
      //var valid = validate(data);
    },
    methods: {
      onEnter(event) {
        //const apiUrl = event.target.value;

        //const data = {
        //  "apiUrl": apiUrl
        //};

        //const valid = validate(data);

        //if (valid) {
        //  this.isUrlValid = true;
        //} else {
        //  this.isUrlValid = false;
        //}

        this.$emit("input", event.target.value);
      }
      //onKeydown(event) {
      //  this.isUrlValid = true;
      //}
    }
  };
</script>

<style scoped>
  /*.form-control.invalid {
    border: 2px solid red;
  }*/
</style>
