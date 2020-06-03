<template>
    <div id="Demo251" class="default-div">
        <h2>2.5.1 在动态组件上使用 keep-alive</h2>
        <button
            v-for="tab in tabs"
            :key="tab"
            @click="currentTab = tab"
            :class="['tab-button', {active: currentTab === tab}]"
        >
            {{ tab }}
        </button>
        <keep-alive>
            <component :is="currentTabComponent" class="tab"></component>
        </keep-alive>
    </div>
</template>
<script>
    import TabPosts from './tab-posts';
    import TabArchive from './tab-archive';
    export default {
        name: 'Demo251',
        data() {
            return {
                currentTab: 'Posts',
                tabs: ["Posts", "Archive"]
            }
        },
        components: {
            TabPosts,
            TabArchive,
        },
        computed: {
            currentTabComponent: function() {
                return 'tab-' + this.currentTab.toLowerCase()
            }
        }
    }
</script>
<style scoped>
    #Demo251 {
        min-width: 660px;
        min-height: 200px;
    }
    .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
    }
    .tab-button:hover {
        background: #e0e0e0;
    }
    .current-tab {
        color: #f54343;
    }
    .tab-button.active {
        background: #e0e0e0;
    }
    .tab {
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>
