<template>
  <div id="editor">
    <header-component>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-show="!hasTitle" v-on:submit="onSave">
          <label class="mr-sm-2" style="color:white" for="title">Title:</label>
          <b-form-input id="title" size="sm" class="mr-sm-2" v-model="title" type="text" required></b-form-input>
          <b-button variant="outline-light" class="my-2 my-sm-0" type="submit">Save</b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-show="hasTitle">
        <b-button variant="outline-light" class="m-2 my-sm-0" @click="onSave">Save</b-button>
        <b-button @click="newEditor" variant="outline-light">Editor</b-button>
        <div id="personalId" style="display:flex; margin:auto 15px; cursor: pointer;">
          <b-icon icon="person" font-scale="2" variant="light"></b-icon>
          <p style="margin:auto;" class="text-light">mentor7</p>
        </div>
        <b-popover target="personalId" placement="bottom" triggers="hover">
          <ul style="list-style-type: none;">
            <li>
              <router-link style="color: black" to="/my-projects">my projects</router-link>
            </li>
            <li>
              <router-link style="color: black" to="/">logout</router-link>
            </li>
          </ul>
        </b-popover>
      </b-navbar-nav>
    </header-component>
    <b-container fluid>
      <b-row style="border-bottom: 1px solid gray;">
        <b-col class="inputAreaHeader">
          <h2>{{inputAreaHeaderText}}</h2>
          <div>
            <b-button
              variant="outline-danger"
              class="my-2 my-sm-0"
              @click="toggleInput"
              style="margin-right: 15px; cursor: pointer;"
            >{{windowButtonText}}</b-button>
            <b-icon
              id="fontSettings"
              icon="gear-fill"
              font-scale="2"
              variant="danger"
              style="margin-right: 15px; cursor: pointer; vertical-align: middle"
            ></b-icon>
            <b-popover variant="danger" target="fontSettings" placement="bottom" triggers="click">
              <p class="text-light" style="font-size: 18px;">
                font-size:
                <b-icon
                  icon="plus"
                  scale="1.5"
                  style="cursor: pointer"
                  @click="increaseInputFontSize"
                ></b-icon>
                <b-icon
                  icon="dash"
                  scale="1.5"
                  style="cursor: pointer"
                  @click="decreaseInputFontSize"
                ></b-icon>
              </p>
            </b-popover>
          </div>
        </b-col>
        <b-col class="livepreviewAreaHeader">
          <h2>Live-Preview</h2>
          <div>
            <b-icon
              icon="arrows-fullscreen"
              font-scale="2"
              variant="danger"
              style="margin-right: 15px; cursor: pointer; z-index: 10000; position: relative;"
              v-on:click="expand"
            ></b-icon>
            <b-icon
              icon="download"
              font-scale="2"
              variant="danger"
              style="margin-right: 15px; cursor: pointer;"
            ></b-icon>
          </div>
        </b-col>
      </b-row>
      <b-row style="border-bottom: 1px solid gray;">
        <b-col class="inputArea">
          <codemirror
            :options="cmOptions"
            v-show="openHtml"
            name="htmlarea"
            id="htmlarea"
            cols="30"
            rows="25"
            @input="showOutput"
            :style="{fontSize: customInputStyle.fontSize+'px'}"
            v-model="html"
          ></codemirror>
          <codemirror
            :options="cmOptions"
            v-show="!openHtml"
            name="cssarea"
            id="cssarea"
            cols="30"
            rows="25"
            @input="showOutput"
            :style="{fontSize: customInputStyle.fontSize+'px'}"
            v-model="css"
          ></codemirror>
        </b-col>
        <b-col class="livePreviewArea">
          <div :class="{ outputArea: !expandOutputArea, outputAreaFullscreen: expandOutputArea }">
            <iframe id="outputArea" style="width:100%; height:100%; border: none"></iframe>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import "codemirror/mode/css/css.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import HeaderComponent from "./components/HeaderComponent.vue";
import firebase from "firebase/app";
import { db } from "../Firebase";
export default {
  name: "Editor",
  components: {
    HeaderComponent
  },
  data() {
    return {
      hasTitle: this.$route.params.title ? true : false,
      title: this.$route.params.title,
      openHtml: true,
      inputAreaHeaderText: "HTML-Editor",
      windowButtonText: "CSS",
      expandOutputArea: false,
      html: "",
      css: "",
      cmOptions: {
        tabSize: 4,
        mode: "text/html",
        lineNumbers: true,
        line: true,
        scrollbarStyle: "null",
        indentUnit: 4
      },
      customInputStyle: {
        fontSize: 15
      }
    };
  },
  methods: {
    toggleInput() {
      this.openHtml = !this.openHtml;
      this.inputAreaHeaderText = this.openHtml ? "HTML-Editor" : "CSS-Editor";
      this.windowButtonText = this.openHtml ? "CSS" : "HTML";
      this.cmOptions.mode = this.openHtml ? "text/html" : "text/css";
    },
    expand() {
      this.expandOutputArea = !this.expandOutputArea;
    },
    showOutput() {
      var doc = document.getElementById("outputArea").contentWindow.document;
      doc.open();
      doc.write(
        `<html><head><style type="text/css">${this.css}</style></head><body>${this.html}</body></html>`
      );
      doc.close();
    },
    decreaseInputFontSize() {
      this.customInputStyle.fontSize--;
    },
    increaseInputFontSize() {
      this.customInputStyle.fontSize++;
    },
    onSave(event) {
      event.preventDefault();
      if (!this.hasTitle) {
        db.collection("project")
          .doc(this.title)
          .set({
            title: this.title,
            html: this.html,
            css: this.css,
            date: firebase.firestore.Timestamp.now(),
            author: "mentor7"
          })
          .then(() => {
            this.$router.push(`/editor/${this.title}`);
            this.hasTitle = true;
            this.showOutput();
          })
          .catch(() => alert("Some error occured. Please try again."));
      } else {
        db.collection("project")
          .doc(this.title)
          .update({
            html: this.html,
            css: this.css
          })
          .then(this.showOutput())
          .catch(() => alert(() => "Some error occured. Please try again."));
      }
    },
    newEditor() {
      this.$router.push("/editor");
      this.hasTitle = false;
      this.title = "";
      this.openHtml = true;
      this.inputAreaHeaderText = "HTML-Editor";
      this.windowButtonText = "CSS";
      this.expandOutputArea = false;
      this.html = "";
      this.css = "";
      this.cmOptions = {
        tabSize: 4,
        mode: "text/html",
        lineNumbers: true,
        line: true,
        scrollbarStyle: "null",
        indentUnit: 4
      };
      this.customInputStyle = {
        fontSize: 15
      };
    }
  },
  created() {
    if (this.hasTitle) {
      db.collection("project")
        .doc(this.title)
        .get()
        .then(data => data.data())
        .then(data => {
          this.html = data.html;
          this.css = data.css;
        })
        .catch(() => alert("Some error occured. Please try again."));
    }
  },
  mounted() {
    this.hasTitle = this.$route.params.title ? true : false;
    this.showOutput();
  }
};
</script>

<style scoped>
.inputAreaHeader {
  border-right: 1px solid gray;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.livepreviewAreaHeader {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.inputArea {
  border-right: 1px solid gray;
}
.outputArea {
  position: relative;
  height: 100%;
  width: 100%;
  border: none;
  margin: 0px;
}
.outputAreaFullscreen {
  background-color: white;
  z-index: 9999;
  width: 100%;
  height: 100% !important;
  position: fixed;
  border-radius: 10px;
  margin: 0;
  top: 0;
  left: 0;
}
</style>