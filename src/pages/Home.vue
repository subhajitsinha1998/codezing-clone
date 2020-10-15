<template>
  <div id="home">
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
    <div class="mainarea">
      <div class="innerarea justify-content-center">
        <a href="#" class="challengeButton">Premier</a>
        <a href="#" class="challengeButton">Challenges</a>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
export default {
  name: "Home",
  components: {
    HeaderComponent
  }
};
</script>

<style scoped>
.mainarea {
  background-color: #e9e9e9;
  padding: 10vh 20vw;
}
.innerarea {
  width: 60vw;
  height: 60vh;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.challengeButton {
  position: relative;
  margin: auto;
  background: #ffcb1f;
  color: #3c3c3c;
  padding: 15px 25px;
  font-size: 17px;
  border-radius: 10vh;
  cursor: pointer;
  font-weight: 700;
  text-align: center;
}
</style>