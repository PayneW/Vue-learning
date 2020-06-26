<template>
    <div id="app">
        <div id="nav">
            <h2>Vuex 示例</h2>
            <router-link to="/">Home</router-link> |
            <router-link to="/count">Count</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
