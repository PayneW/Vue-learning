<template>
    <!-- 品牌推荐 -->
    <div class="brand-recommend-module">
        <p class="brand-recommend-title">
            <span>品牌推荐</span>
            <span>厂家专人服务，专业更放心</span>
        </p>

        <ul>
            <li class="recommend-brand-list">
                <router-link to="/brand-detail">
                    <p class="recommend-brand" :style="{ backgroundImage: imgUrl[0].url }"></p>
                </router-link>

                <router-link to="/">
                    <p class="online-service">
                        <i class="online-service-icon common-icon"></i>在线客服
                    </p>
                </router-link>

                <router-link to="/shipping-repair-service">
                    <p class="service-hall">
                        <i class="service-hall-icon common-icon"></i>服务大厅
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="official-mall">
                        <i class="official-mall-icon common-icon"></i>官网商城
                    </p>
                </router-link>
            </li>

            <li class="recommend-brand-list">
                <router-link to="/">
                    <p class="recommend-brand" :style="{ backgroundImage: imgUrl[1].url }"></p>
                </router-link>

                <router-link to="/">
                    <p class="online-service" :class="{ active: isActive }">
                        <i class="online-service-icon common-icon online-service-icon-selected"></i>在线客服
                    </p>
                </router-link>

                <router-link to="/home-installation">
                    <p class="service-hall">
                        <i class="service-hall-icon common-icon"></i>服务大厅
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="official-mall">
                        <i class="official-mall-icon common-icon"></i>官网商城
                    </p>
                </router-link>
            </li>

            <li class="recommend-brand-list">
                <router-link to="/">
                    <p class="recommend-brand" :style="{ backgroundImage: imgUrl[2].url }"></p>
                </router-link>

                <router-link to="/">
                    <p class="online-service">
                        <i class="online-service-icon common-icon"></i>在线客服
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="service-hall">
                        <i class="service-hall-icon common-icon"></i>服务大厅
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="official-mall">
                        <i class="official-mall-icon common-icon"></i>官网商城
                    </p>
                </router-link>
            </li>

            <li class="recommend-brand-list">
                <router-link to="/">
                    <p class="recommend-brand" :style="{ backgroundImage: imgUrl[3].url }"></p>
                </router-link>

                <router-link to="/">
                    <p class="online-service">
                        <i class="online-service-icon common-icon"></i>在线客服
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="service-hall">
                        <i class="service-hall-icon common-icon"></i>服务大厅
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="official-mall">
                        <i class="official-mall-icon common-icon"></i>官网商城
                    </p>
                </router-link>
            </li>

            <li class="recommend-brand-list">
                <router-link to="/">
                    <p class="recommend-brand" :style="{ backgroundImage: imgUrl[4].url }"></p>
                </router-link>

                <router-link to="/">
                    <p class="online-service">
                        <i class="online-service-icon common-icon"></i>在线客服
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="service-hall">
                        <i class="service-hall-icon common-icon"></i>服务大厅
                    </p>
                </router-link>

                <router-link to="/">
                    <p class="official-mall">
                        <i class="official-mall-icon common-icon"></i>官网商城
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "brandRecommend",
        data () {
            return {
                imgUrl: [
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/midea-logo.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/canon-logo.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/alienware-logo.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/huawei-logo.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/jeep-logo.png') + ")" },
                ],
                isActive: true,
            }
        }
    }
</script>

<style lang="scss">
    .brand-recommend-module {
        height: 400px;
        padding: 0 10px;
        margin-top: 10px;
        background: #fff;


        p.brand-recommend-title{
            line-height: 80px;
            height: 80px; overflow: hidden;
            padding-left: 10px;
            text-align: left;

            span:nth-child(1) { color: #ff7780; font-size: 24px; font-weight: bold; }
            span:nth-child(2) { margin-left: 20px; font-size: 14px; }
        }

        ul { overflow: hidden; }
        li.recommend-brand-list {
            float: left;
            margin-left: 10px;
            width: 220px;
            height: 298px;
            text-align: center;
            border: 1px solid #e6e6e6;

            p { line-height: 31px; height: 31px; color: #666;  overflow: hidden;}

            .recommend-brand {
                height: 201px; width: 100%;
                overflow: hidden;
                text-align: center;
                border-bottom: 1px dashed #e6e6e6;
                background-position: center;
                background-repeat: no-repeat;
                background-color: #fcfcfc;
                background-size: 60% auto;
            }

            .common-icon {
                display:inline-block; border-radius: 5px;
                width: 18px; height: 18px;
                margin-right: 10px;
                vertical-align: middle;
            }
            .online-service-icon {
                background: url("../../../../../../assets/images/homepage/brand-service-icon.svg") no-repeat center;
                background-size: contain;
            }
            .service-hall-icon {
                background: url("../../../../../../assets/images/homepage/brand-recommend-icon/service-hall-icon.svg") no-repeat center;
                background-size: contain;
            }
            .official-mall-icon {
                background: url("../../../../../../assets/images/homepage/brand-recommend-icon/official-mall-icon.svg") no-repeat center;
                background-size: contain;
            }

            .online-service, .service-hall { border-bottom: 1px dashed #e6e6e6;}
        }

        .active{ background: #139ef6; color: #fff;}

        .online-service-icon-selected {
            background: url("../../../../../../assets/images/homepage/brand-recommend-icon/service-hall-icon-selected.svg") no-repeat center !important;
        }
    }
</style>
