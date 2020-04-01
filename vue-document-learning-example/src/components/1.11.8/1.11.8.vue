<template>
    <div id="app1118" class="default-div">
        <h2>1.11.8: 动态组件</h2>
        <div class="dynamic-component">
            <button
                v-for="tab in tabs"
                :key="tab"
                :class="['tab-button', {active: currentTab === tab}]"
                @click="currentTab = tab"
            >{{ tab }}</button>

            <component
                class="tab"
                :is="currentTabComponent"
            ></component>
        </div>
    </div>
</template>
<script>
    import TabHome from './tab-home';
    import TabPosts from './tab-posts';
    import TabArchive from './tab-archive';

    export default {
        name: 'Demo1118',
        data() {
            return {
                currentTab: '',
                tabs: ['Home', 'Posts', 'Archive'],
            }
        },
        created() {
            this.currentTab = this.tabs[0];
        },
        computed: {
            currentTabComponent: function() {
                return 'tab-' + this.currentTab.toLowerCase();
            }
        },

        components: {
            TabHome,
            TabPosts,
            TabArchive,
        }
    }
</script>
<style scoped>
    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background-color: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .tab-button.active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>
