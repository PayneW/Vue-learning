<!-- 所有分类 -->
<template>
    <div class="all-categories">
        <ul class="categories-ul">
           <!-- <li v-for="item in categoriesList.data">
                <router-link :to="">{{ item.name }}</router-link>
            </li>-->
            <li>
                <router-link to="/">
                    <span class="category-name">家用电器</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">金融/银行</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">快递/顺丰/京东</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">商场/招商处</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">珠宝/钟表</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">医疗/医院/药房</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">宠物/医院/猫粮</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">教育/学校/培训</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">服装/化妆品</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">旅游/户外运动</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">汽车/4S店/保养</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">家居/橱柜/木地板</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">数码3C/手机/相机</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>
            <li>
                <router-link to="/">
                    <span class="category-name">游戏/装备</span>
                    <span class="left-arrow-icon"></span>
                </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss">
    .all-categories {
        height: 430px;
        width: 190px;
        background: #fff;

        ul.categories-ul {

            margin-top: 10px;

            li {
                line-height: 30px;
                overflow: hidden;

                .category-name {
                    float:left;
                    max-width: 80%;
                    color: #666666;
                    font-size: 14px;
                    text-indent: 20px;
                }
                .left-arrow-icon {
                    float: right;
                    width: 12px;
                    height: 12px;
                    background: url("../../../../../../assets/images/icons/arrow-icon/left-arrow-grey.svg") no-repeat center center;
                    background-size: contain;
                    margin-top: 8px;
                    margin-right: 10px;
                }

            }

            .activeBg { color: #139ef6; background: #e6f6fe; }

        }

    }
</style>
