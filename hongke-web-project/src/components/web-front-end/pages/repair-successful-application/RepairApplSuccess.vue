<template>
    <div>
        <!--当前位置-->
        <p class="current-page-position">
            <span class="C999">当前位置:</span>
            <router-link to="/">美的</router-link>
            <i class="C999"> > </i>
            <router-link to="/">服务大厅</router-link>
            <i class="C999"> > </i>
            <router-link to="/">寄修服务</router-link>
            <i class="C999"> > </i>
            <router-link to="/" class="current-position">申请成功</router-link>
        </p>


        <div id="repair-application-successful" class="common-content-wrapper-style">

            <div class="appl-success-wrapper">
                <p>
                    <i class="blue-right-icon"></i>
                </p>
                <p>寄修服务申请成功,等待品牌受理</p>
                <p>受理后您可进入服务工单选择寄件方式。 <br> 您的口令码是：<i >BB123456</i></p>
                <p>
                    为了保障您的服务质量与资金安全，请使用口令码在线支付服务费用 <br>
                    <i class="bold">什么是口令码：</i>
                    维修检测后维修方会输入口令码发起报价，您可登陆服务鸟账号，进行确认费用与支付，如存在异议可立刻求助投诉客服
                </p>

                <p>
                    <router-link to="/">
                        <span class="personal-center-btn">进入个人中心</span>
                    </router-link>
                    <router-link to="/">
                        <span class="back-home-btn">返回首页</span>
                    </router-link>
                </p>

            </div>
        </div>

    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    #repair-application-successful {

        .appl-success-wrapper {
            height: 620px;
            background: #fff;
            overflow: hidden;

            p {
                padding: 20px 0 0;
                line-height: 26px;
                font-size: 13px;
            }
            p:nth-child(1) {
                margin-top: 100px;

                i {
                    width: 55px; height: 55px;
                    display: block;
                    margin: 0 auto;
                    background: url("../../../../assets/images/icons/blue-right-icon.svg") no-repeat center;
                    background-size: contain;
                }


            }
            p:nth-child(2) {
                font-size: 24px;
                color: #139ef6;
            }
            p:nth-child(3) {
                font-size: 16px;
                color: #999999;
                i {
                    color: #ff7482;
                    font-weight: bold;
                    letter-spacing: 2px;
                }
            }
            p:nth-child(5) {
                .personal-center-btn, .back-home-btn {
                    width: 170px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    cursor: pointer;
                    overflow: hidden;
                    margin-top: 30px;
                    display: inline-block;
                    vertical-align: middle;
                }
                .personal-center-btn {
                    height: 48px;
                    line-height: 50px;
                    color: #139ef6;
                    margin-right: 10px;
                    border: 1px solid #139ef6;
                }
                .back-home-btn {
                    color: #fff;
                    margin-left: 10px;
                    background: #139ef6;
                }
            }
        }

    }
</style>