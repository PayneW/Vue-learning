<template>
    <div id="app">
        <div id="dynamic-component" class="demo">
            <button
                v-for="tab in tabs"
                :key="tab"
                :class="['tab-button', {active: currentTab === tab}]"
                @click="currentTab = tab"
            >{{tab}}</button>
        </div>
        <component :is="currentTabComponent" class="tab"></component>
    </div>
</template>

<script type="text/javascript">
    import TabArchive from "./components/tabs/tab-archive";
    import TabHome from "./components/tabs/tab-home";
    import TabPosts from "./components/tabs/tab-posts";

    export default {
        data() {
            return {
                currentTab: "Home",
                tabs: ["Home", "Posts", "Archive"]
            }
        },

        computed: {
            currentTabComponent: function() {
                return "tab-" + this.currentTab.toLowerCase();
            }
        },

        components: {
            TabArchive,
            TabHome,
            TabPosts
        }
    }
</script>

<style lang="stylus" scoped>
    *
        margin 0
        padidng 0
        list-style none
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing: antialiased
        -moz-osx-font-smoothing: grayscale
        text-align: center
        color: #2c3e50
        width: 80%;
        margin: 20px auto;
    }
    .tab-button {
        padding 6px 10px
        border-top-left-radius 3px
        border-top-right-radius 3px
        border 1px solid #cccc
        cursor pointer
        background #f0f0f0
        margin-bottom -1px
        margin-right -1px
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .tab-button:active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>
