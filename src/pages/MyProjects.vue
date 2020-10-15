<template>
  <div>
    <header-component>
      <b-navbar-nav class="ml-auto">
        <router-link to="/editor">
          <b-button variant="outline-light">Editor</b-button>
        </router-link>
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
    <b-container>
      <h4 class="my-4">My Projects</h4>
      <b-table
        :striped="striped"
        :bordered="bordered"
        :borderless="borderless"
        :outlined="outlined"
        :small="small"
        :hover="hover"
        :dark="dark"
        :fixed="fixed"
        :foot-clone="footClone"
        :no-border-collapse="noCollapse"
        :items="myProjects"
        :fields="fields"
        :head-variant="headVariant"
        :table-variant="tableVariant"
      >
        <template v-slot:cell(title)="data">
          <router-link
            :to="`/editor/${data.item.title}`"
          >{{ data.item.title }}</router-link>
        </template>
        <template v-slot:cell(date)="data">{{ data.item.date.toDate().toDateString() }}</template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import { db } from "../Firebase";
import HeaderComponent from "./components/HeaderComponent.vue";
export default {
  name: "MyProject",
  components: {
    HeaderComponent
  },
  data() {
    return {
      fields: ["title", "date", "author"],
      myProjects: [],
      striped: false,
      bordered: false,
      borderless: false,
      outlined: false,
      small: false,
      hover: true,
      dark: false,
      fixed: false,
      footClone: false,
      headVariant: "dark",
      tableVariant: "",
      noCollapse: false
    };
  },
  created() {
    db.collection("project").orderBy("date","desc").onSnapshot(snapshot =>
      snapshot.docs.map(doc => this.myProjects.push(doc.data()))
    );
  }
};
</script>