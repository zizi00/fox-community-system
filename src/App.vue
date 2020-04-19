<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name:'app',
  created() {
    if (localStorage.userName) {
      let user = {}
      user.nickname = localStorage.userName
      this.$store.dispatch("setIsAutnenticated", !this.isEmpty(user));
      this.$store.dispatch("setUser", user);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  height: 100%;
}
</style>
