<template>
    <div class="footer-wall">
        <!--平台服务说明 platform service description -->
        <div class="ptm-svc-desc-wall">
           <ul class="ptm-svc-desc">
               <li>
                   <span class="service-type-logo brand-customer-service"></span>
                   <span class="service-type-slogan">品牌专业客户</span>
               </li>
               <li>
                   <span class="service-type-logo brand-after-sale-logo"></span>
                   <span class="service-type-slogan">品牌专业售后</span>
               </li>
               <li>
                   <span class="service-type-logo brand-service-guarantee"></span>
                   <span class="service-type-slogan">平台服务保障</span>
               </li>
           </ul>
        </div>

        <!--平台信息-->
        <div class="platform-information">
            <div class="dashed-border-bottom">
                <ul>
                    <li>
                        <i class="small-circle-point"></i>
                        <span>用户帮助</span>
                        <ol>
                            <li><router-link to="/">保障范围</router-link></li>
                            <li><router-link to="/">常见问题</router-link></li>
                        </ol>
                    </li>
                    <li>
                        <i class="small-circle-point"></i>
                        <span>品牌合作</span>

                        <ol>
                            <li><router-link to="/">品牌入驻</router-link></li>
                            <li> <router-link to="/">常见问题</router-link></li>
                        </ol>
                    </li>
                    <li>
                        <i class="small-circle-point"></i>
                        <span>关于我们</span>
                        <ol>
                            <li><router-link to="/">联系方式</router-link></li>
                            <li> <router-link to="/">公司介绍</router-link></li>
                        </ol>
                    </li>
                </ul>

                <div class="platform-customer-center">
                    <p>
                        <i class="smallest-circle-point"></i>
                        平台客服中心
                        <i class="smallest-circle-point"></i>
                    </p>
                    <ul>
                        <li>
                            <i class="brand-online-advisory"></i>
                            <span class="brand-font-color">客服在线咨询</span>
                            <span>7 x 24小时在线客服 <br> 竭诚为您服务</span>
                        </li>
                        <li>
                            <i class="customer-online-advisory"></i>
                            <span class="customer-font-color">品牌在线咨询</span>
                            <span>7 x 24小时在线客服 <br> 竭诚为您服务</span>
                        </li>
                    </ul>
                </div>
            </div>

            <p class="copy-right">
                ICP备案 <br> CopyRight c XX 2018 - 2027
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "footerWall"
    }
</script>

<style lang="scss">
    .footer-wall {
        /*min-height: 680px;*/
        background: #fff;

        .ptm-svc-desc-wall {
            background: #f7f7f9;

            .ptm-svc-desc {
                width: 1190px;
                margin: 0 auto;
                overflow: hidden;

                li {
                    float: left;
                    width: 396px;
                    height: 245px;
                    line-height: 245px;
                    border-radius: 24px;
                    text-align: center;
                    overflow: hidden;

                    span {
                        display: inline-block;
                        height: 60px;
                        vertical-align: middle;
                    }
                    .service-type-logo {
                        margin-right: 20px;
                        width: 60px;
                    }

                    .brand-customer-service {
                        background: url("../../../../../assets/images/homepage/brand-service-icon.svg") no-repeat center;
                        background-size: contain;
                    }
                    .brand-after-sale-logo {
                        background: url("../../../../../assets/images/homepage/after-sales-icon.svg") no-repeat center;
                        background-size: contain;
                    }
                    .brand-service-guarantee {
                        background: url("../../../../../assets/images/homepage/brand-service-guarantee-logo.svg") no-repeat center;
                        background-size: contain;
                    }

                    .service-type-slogan {
                        padding-left: 10px;
                        font-size: 24px;
                        line-height: 60px;
                        font-weight: bold;
                        min-width: 160px;
                        letter-spacing: 2px;
                        color: #666666;
                        overflow: hidden;
                        border-left: 1px solid #c9caca;
                    }
                }
            }
        }

        .platform-information {
            width: 1190px;
            margin: 0 auto;
            overflow: hidden;

            div.dashed-border-bottom {
                height: 260px;
                padding-top: 35px;
                width: inherit;
                overflow: hidden;
                border-bottom: 1px dashed #dcdcdd;

                ul {
                    float: left;
                    width: 710px;
                    height: 229px;
                    text-align: center;
                    overflow: hidden;
                    border-right: 1px solid #c9caca;

                    li {
                        float: left;
                        width: 33%;
                        /*background: lightcoral;*/
                        text-align: left;


                        .small-circle-point {
                            display: inline-block;
                            vertical-align: middle;
                            width: 8px; height: 8px;
                            margin-right: 12px;
                            border-radius: 50%;
                            background: #666666;
                        }
                        span { color: #333333; font-size: 18px; }

                        ol {
                            margin-top: 30px;

                            li {
                                width: 100%;
                                text-indent: 24px;
                                line-height: 26px;
                                text-align: left;
                                color: #999999;
                                font-size: 14px;
                            }
                        }
                    }
                }

                div.platform-customer-center {
                    width: 469px;
                    margin-left: 10px;
                    height: 229px;
                    overflow: hidden;

                    p {
                        line-height: 58px;
                        text-align: center;

                        font-size: 24px;
                        color: #333333;

                        .smallest-circle-point {
                            width: 5px;
                            height: 5px;
                            display: inline-block;
                            vertical-align: middle;
                            margin: 0 5px;
                            background: #666666;
                            border-radius: 50%;
                        }
                    }

                    ul {
                        margin-top: 0;
                        width: inherit;
                        border:0;
                        overflow: hidden;

                        li {
                            float: right;
                            width: 218px;
                            height: 168px;
                            margin-left: 10px;
                            text-indent: 0;
                            border: 1px solid #e6e6e6;
                            text-align: center;
                            border-radius: 4px;

                            i, span { display: block;}
                            .customer-font-color, .brand-font-color {
                                font-size: 18px; font-weight: bold;
                                line-height: 30px;
                            }
                            .customer-font-color { color: #139ef6; }
                            .brand-font-color { color: #ffc528; }

                            i {
                                width: 52px; height: 52px;
                                margin: 12px auto 8px;
                            }
                            .customer-online-advisory {
                                background: url("../../../../../assets/images/homepage/brand-service-icon.svg") no-repeat center;
                                background-size: contain;
                            }
                            .brand-online-advisory {
                                background: url("../../../../../assets/images/homepage/brand-online-advisory.svg") no-repeat center;
                                background-size: contain;
                            }

                            span:nth-child(3) {
                                color: #999999;
                                font-size: 12px;
                                margin-top: 18px;
                            }
                        }
                    }
                }
            }

            p.copy-right {
                text-align: center;
                margin: 30px auto 40px;
                line-height: 20px;
                font-size: 14px;
                color: #999999;
            }

        }

    }
</style>
