<template>
    <div id="container">

        <div class="container-first-module">

            <!--全部分类-->
            <AllCategories/>

            <!--轮播图-->
            <Carousel/>

            <!--个人信息卡片-->
            <PersonalInfo/>
        </div>

        <!--品牌推荐模块-->
        <BrandCommend/>

        <!--电器品牌-->
        <ElectronicBrands/>

    </div>
</template>

<script>
    // 全部分类
    import AllCategories from "./content-compnents/AllCategories";
    // 轮播图
    import Carousel from "./content-compnents/Carousel";
    // 个人信息
    import PersonalInfo from "./content-compnents/PersonalInfo";

    // 品牌推荐模块
    import BrandCommend from "./content-compnents/BrandCommend";

    // 电器品牌
    import ElectronicBrands from "./content-compnents/ElectronicBrands";

    export default {
        name: "contentWall",
        components: {
            // 全部分类
            AllCategories,
            // 轮播图
            Carousel,
            // 个人信息卡片
            PersonalInfo,

            // 品牌推荐模块
            BrandCommend,

            // 电器品牌
            ElectronicBrands,
        }
    }
</script>

<style lang="scss">
    #container {
        width: 1190px;
        margin: 0 auto;
        min-height: 1400px;

        /*background: lightskyblue;*/

        .container-first-module {
            height: 430px;
            overflow: hidden;

            div { float:left; }
        }
    }
</style>
