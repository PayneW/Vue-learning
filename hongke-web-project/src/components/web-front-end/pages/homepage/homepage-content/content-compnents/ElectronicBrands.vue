<template>
    <div class="electronic-brand">

        <p class="electronic-brand-title">
            <span>电器品牌</span>
            <span>查看更多 ></span>
        </p>

        <div>
            <p class="electronic-img"></p>

            <div class="diff-electronic-brands">
                <ul>
                    <li class="electronic-brand-list">
                        <router-link to="/">
                            <p class="brand-logo" :style="{ backgroundImage: imgUrl[0].url }"></p>
                        </router-link>

                        <router-link to="/">
                            <p class="brand-name">东宝宝品牌服务</p>
                        </router-link>

                        <p class="service-group">
                            <router-link to="/">
                                <span class="online-service">
                                     <i class="online-service-icon common-icon"></i>在线客服
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="service-hall">
                                    <i class="service-hall-icon common-icon"></i>服务大厅
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="official-mall">
                                    <i class="official-mall-icon common-icon"></i>官网商城
                                </span>
                            </router-link>
                        </p>

                    </li>

                    <li class="electronic-brand-list">
                        <router-link to="/">
                            <p class="brand-logo" :style="{ backgroundImage: imgUrl[1].url }"></p>
                        </router-link>

                        <router-link to="path/">
                            <p class="brand-name">东宝宝品牌服务</p>
                        </router-link>

                        <p class="service-group">
                            <router-link to="/">
                                <span class="online-service">
                                     <i class="online-service-icon common-icon"></i>在线客服
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="service-hall">
                                    <i class="service-hall-icon common-icon"></i>服务大厅
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="official-mall">
                                    <i class="official-mall-icon common-icon"></i>官网商城
                                </span>
                            </router-link>
                        </p>

                    </li>

                    <li class="electronic-brand-list">
                        <router-link to="/">
                            <p class="brand-logo" :style="{ backgroundImage: imgUrl[2].url }"></p>
                        </router-link>

                        <router-link to="path/">
                            <p class="brand-name">东宝宝品牌服务</p>
                        </router-link>

                        <p class="service-group">
                            <router-link to="/">
                                <span class="online-service">
                                     <i class="online-service-icon common-icon"></i>在线客服
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="service-hall">
                                    <i class="service-hall-icon common-icon"></i>服务大厅
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="official-mall">
                                    <i class="official-mall-icon common-icon"></i>官网商城
                                </span>
                            </router-link>
                        </p>

                    </li>
                    <li class="electronic-brand-list">
                        <router-link to="/">
                            <p class="brand-logo" :style="{ backgroundImage: imgUrl[3].url }"></p>
                        </router-link>

                        <router-link to="path/">
                            <p class="brand-name">东宝宝品牌服务</p>
                        </router-link>

                        <p class="service-group">
                            <router-link to="/">
                                <span class="online-service">
                                     <i class="online-service-icon common-icon"></i>在线客服
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="service-hall">
                                    <i class="service-hall-icon common-icon"></i>服务大厅
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="official-mall">
                                    <i class="official-mall-icon common-icon"></i>官网商城
                                </span>
                            </router-link>
                        </p>

                    </li>
                    <li class="electronic-brand-list">
                        <router-link to="/">
                            <p class="brand-logo" :style="{ backgroundImage: imgUrl[4].url }"></p>
                        </router-link>

                        <router-link to="path/">
                            <p class="brand-name">东宝宝品牌服务</p>
                        </router-link>

                        <p class="service-group">
                            <router-link to="/">
                                <span class="online-service">
                                     <i class="online-service-icon common-icon"></i>在线客服
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="service-hall">
                                    <i class="service-hall-icon common-icon"></i>服务大厅
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="official-mall">
                                    <i class="official-mall-icon common-icon"></i>官网商城
                                </span>
                            </router-link>
                        </p>

                    </li>

                    <li class="electronic-brand-list">
                        <router-link to="/">
                            <p class="brand-logo" :style="{ backgroundImage: imgUrl[3].url }"></p>
                        </router-link>

                        <router-link to="path/">
                            <p class="brand-name">东宝宝品牌服务</p>
                        </router-link>

                        <p class="service-group">
                            <router-link to="/">
                                <span class="online-service">
                                     <i class="online-service-icon common-icon"></i>在线客服
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="service-hall">
                                    <i class="service-hall-icon common-icon"></i>服务大厅
                                </span>
                            </router-link>

                            <router-link to="/">
                                <span class="official-mall">
                                    <i class="official-mall-icon common-icon"></i>官网商城
                                </span>
                            </router-link>
                        </p>

                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>


<script>
    export default {
        name: "electronicBrand",
        data () {
            return {
                imgUrl: [
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/meling.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/samsung.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/simens.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/haier.png') + ")" },
                    { url: "url(" + require('../../../../../../assets/images/homepage/brand-logos/aokesi.png') + ")" },
                ],
                isActive: true,
            }
        }
    }
</script>

<style lang="scss">
    .electronic-brand {
        height: 525px;
        padding: 0 10px;
        margin-top: 10px;
        background: #fff;
        overflow: hidden;


        p.electronic-brand-title{
            line-height: 80px;
            height: 80px; overflow: hidden;
            padding-left: 10px;
            border-bottom: 3px solid #129ef4;
            text-align: left;

            span:nth-child(1) {
                color: #333333; font-size: 24px;
                font-weight: bold;
            }
            span:nth-child(2) { margin-right: 20px; float:right; font-size: 12px; color: #999; }
        }


        p.electronic-img {
            width: 270px; height: 420px;
            overflow: hidden;
            float: left;
            background: url("../../../../../../assets/images/homepage/electronic-image-1.jpg") no-repeat center;
            background-size: contain;
        }

        div.diff-electronic-brands {
            width: 900px;
            /*min-height: 420px;*/
            float: right;

            .electronic-brand-list {
                float: left;
                width: 268px; height: 196px;
                padding: 0 10px;
                border: 1px solid #efefef;
                color: #666666;
                margin-left: 10px;
                margin-top: 10px;
                overflow: hidden;

                .brand-logo {
                    width: 100%; height: 126px;
                    background-position: center;
                    background-repeat: no-repeat;
                    text-align: center;
                    background-size: 50% auto;
                }
                .brand-name {
                    line-height: 30px;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    border-top: 1px dashed #efefef; }
                .service-group {
                    line-height: 40px; border-top: 1px dashed #cbcbcb;

                    span {
                        float: left;
                        width: 89px;
                        text-align: center;
                        letter-spacing: 0;
                        color: #666666;

                        .common-icon {
                            display:inline-block;
                            width: 16px; height: 16px;
                            margin-right: 5px;
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
                    }
                }
            }
        }

    }
</style>
