<template>
    <div class="header-wall">
        <!--最顶部提示条-->
        <TopmostTipsBar/>

        <!--搜索栏-->
        <SearchPlate/>

        <!--全部分类-蓝条-->
        <BluePlate/>
    </div>
</template>

<script>

    // 最顶部提示条板块
    import TopmostTipsBar from "./head-components/TopmostTipsBar";
    // 搜索栏板块
    import SearchPlate from "./head-components/SearchPlate";
    // 蓝色通条
    import BluePlate from "./head-components/BluePlate";


    export default {
        name: "headerWall",
        components: {
            // 最顶部提示条
            TopmostTipsBar,

            // 搜索板块
            SearchPlate,

            // 蓝色通条
            BluePlate,
        }
    }
</script>
