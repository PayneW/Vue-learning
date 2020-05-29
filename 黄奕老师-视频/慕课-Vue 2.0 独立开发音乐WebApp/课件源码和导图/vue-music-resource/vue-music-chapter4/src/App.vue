<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/课件源码和导图/vue-music-resource/vue-music-chapter4/src/components/m-header/m-header'
  import Tab from 'Vue-learning/黄奕/慕课-Vue 2.0 独立开发音乐WebApp/课件源码和导图/vue-music-resource/vue-music-chapter4/src/components/tab/tab'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
