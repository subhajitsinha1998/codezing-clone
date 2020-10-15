<template>
  <div>
    <b-navbar sticky type="dark" variant="danger ">
      <img id="logo" src="http://app.codezing.in/assets/codezing-logo.png" />
      <b-collapse id="nav-collapse" is-nav>
        <slot />
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style scoped>
#logo {
  height: 55px;
}
</style>

<script>
export default {
  name: "HeaderComponent",
};
</script>