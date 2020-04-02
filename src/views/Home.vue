<template>
  <div id="home">
    <div id="nav">
      <router-link to="/listCode">验证码</router-link>|
      <router-link to="/addCode">添加</router-link>

    </div>
    <transition>
      <router-view/>
    </transition>
  </div>
</template>


<script>
// @ is an alias to /src
export default {
  name: "Home",
  components: {}
};
</script>
<style>
#home {
  width: 800px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.v-enter-active,
.v-leave-acive {
  transition: all 1s ease;
}
</style>
