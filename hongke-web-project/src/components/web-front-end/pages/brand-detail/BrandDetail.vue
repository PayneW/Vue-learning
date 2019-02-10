<template>
    <div>
        <p class="current-page-position">
            <span class="C999">当前位置:</span>
            <router-link to="/">首页</router-link>
            <i class="C999"> > </i>
            <router-link to="/" class="current-position">美的</router-link>
        </p>

        <div id="brand-detail">
            <div class="brand-info">
                <p class="brand-logo"></p>
                <div class="brand-introduction">
                    <p>
                        <span class="brand-name">Midea/美的</span>
                        <span class="attention"><i class="heart-icon"></i>关注我们</span>
                    </p>

                    <p>
                        <span>中国知名电器品牌</span>
                        <span>服务理念：   美的承诺服务，到家。用心服务。</span>
                    </p>

                    <p>
                        <span> <i class="grey-crow"></i> 中国品牌</span>
                        <span> <i class="heart-icon"></i> 1000</span>
                    </p>

                    <ul>
                        <li>
                            <i class="advisory-num common-icon-style"></i>
                            <span>
                                咨询总数 <br>
                                <i>3213</i>
                            </span>
                        </li>
                        <li>
                            <i class="total-order common-icon-style"></i>
                            <span>
                                订单总数 <br>
                                <i> 3213</i>
                            </span>
                        </li>
                        <li>
                            <i class="satisfaction common-icon-style"></i>
                            <span>
                                满意度 <br>
                                <i>97%</i>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="brand-wrapper">

            <!--左侧商城功能板块-->
            <div class="brand-function-section"></div>

            <!--右侧服务板块-->
            <div class="brand-service-section">

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "BrandDetail"
    }
</script>

<style lang="scss">
    #brand-detail {
        background: #fff;
    }

    .brand-info {
        width: 1190px;
        height: 300px;
        margin: 0 auto;
        overflow: hidden;

        .brand-logo {
            float: left;
            width: 300px; height: 300px;
            border-right: 1px dashed #dcdcdc;
            background: url("../../../../assets/images/brands-logo/midea.jpg") no-repeat center;
            background-size: 50% auto;
        }
        .brand-introduction {
            margin-left: 330px;
            padding-right: 22px;
            text-align: left;

            p {
                line-height: 30px;
                margin-bottom: 1px;
            }

            .brand-name {
                font-size: 18px;
                font-weight: bold;
                color: #333333;
                line-height: 75px;
            }
            .attention {
                margin-top: 20px;
                float:right;
                margin-right: 20px;

                i {
                    display: inline-block;
                    width: 20px; height: 20px;
                    background: lightsalmon;
                    vertical-align: middle;
                }
            }

            p:nth-child(2) {
                span {
                    font-size: 14px;
                    margin-right: 40px;
                    color: #999999;
                }
            }

            p:nth-child(3) {
                span:nth-child(1) {
                    margin-right: 40px;
                }
                span i {
                    width: 14px;
                    height: 14px;
                    display: inline-block;
                    background: lightpink;
                    vertical-align: middle;
                }
            }

            ul {
                margin-top: 20px;
            }
            ul  li{
                float: left;
                width: 110px; height: 110px;
                border: 1px solid #efefef;
                margin-right: 10px;

                i.common-icon-style {
                    display: block;
                    height: 59px;
                    margin: 0 10px;
                    border-bottom: 1px dashed #f7f7f7;
                }

                span {
                    display: block;
                    margin-top: 5px;
                    line-height: 20px;
                    text-align: center;
                }
            }
        }
    }

    .brand-wrapper {
        width: 1190px;
        margin: 10px auto 0;
        overflow: hidden;

        div.brand-function-section {
            float: left; width: 860px;
            padding: 0 20px;
            background: #fff;
            min-height: 600px;
        }
        div.brand-service-section {
            float: right; width: 280px;
            background: #fff;
            min-height: 600px;

        }
    }

</style>