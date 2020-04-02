<template>
  <div id="app">
    <transition>
      <router-view />
    </transition>
  </div>
</template>
<style>
#app {
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
