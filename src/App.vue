<template>
  <div id="app">
    <router-view v-bind="myProjects"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import CodeMirror from "vue-codemirror";
import "codemirror/lib/codemirror.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(CodeMirror);

export default {
  name: "App",
  data() {
    return {
      myProjects: []
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.CodeMirror {
  height: 80vh;
  width: 45vw !important;
}
.popover {
  z-index: 10001;
}
</style>
