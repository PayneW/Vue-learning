<template>
    <div class="personal-info-wall">
        <div class="personal-info">
            <p class="user-head-bg">
            <span class="user-head">
                <img src="../../../../../assets/images/user-img/default-head.svg" alt="" class="user-head-img">
            </span>
            </p>
            <p class="personal-signature">Hi, 欢迎来到服务鸟</p>
            <p>
                <router-link to="/" class="login-btn">登陆</router-link>
                <router-link to="/" class="register-btn">注册</router-link>
            </p>
        </div>

        <!-- 品牌入驻 + 品牌登陆 -->
        <div class="brand-plate">
            <p class="crown-icon"></p>
            <p>
                <router-link to="/">
                    <span class="brand-into">品牌入驻 ></span>
                </router-link>
                <router-link to="/">
                    <span class="brand-login">品牌登陆 ></span>
                </router-link>
            </p>
        </div>

        <!-- 用户须知 + 品牌须知 -->
        <div class="user-brand-notice">
            <p>
                <router-link to="/">
                    <span class="user-notice">用户须知</span>
                </router-link>
            </p>
            <p>
                <router-link to="/">
                    <span class="brand-notice">品牌须知</span>
                </router-link>
            </p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "personalInfo",
    }

</script>

<style lang="scss">
    .personal-info-wall {
        float: right;
        width: 290px;
        height: 420px;
        margin-top: 10px;
        overflow: hidden;

        .personal-info {
            width: inherit;
            height: 195px;
            overflow: hidden;
            background: #fff;

            .user-head-bg {
                background: url("../../../../../assets/images/user-img/user-head-bg.png") no-repeat center bottom;
                background-size: 40% auto;

                span.user-head {
                    display: block;
                    margin: 20px auto 0;
                    border-radius: 50%;

                    .user-head-img {
                        width: 44px;
                        height: 44px;
                        padding: 6px 3px 0;
                        margin-bottom: 12px;
                        border-radius: 50%;
                        background: #ffd6d9;
                    }
                }

            }
            .personal-signature {
                line-height: 40px;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .login-btn, .register-btn {
                width: 80px;
                line-height: 30px;
                margin: 0 auto;
                display: inline-block;
                background: #139ef6;
                border-radius: 4px;
                font-size: 14px;
                text-align: center;
                color: #fff;
                box-shadow: 0 2px 8px 0 #d7d6d6;

            }
            .login-btn { margin-right: 8px; }
            .register-btn { margin-left: 8px; }
        }

        .brand-plate {
            height: 80px;
            width: inherit;
            margin: 6px 0;
            background: #fff url("../../../../../assets/images/homepage/brand-into-bg.png") no-repeat center;
            background-size: cover;

            .crown-icon {
                width: 35px; height: 35px; margin: 5px auto;
                background: url("../../../../../assets/images/homepage/crown-icon.svg") no-repeat center;
                background-size: contain;
            }

            p:nth-child(2) { margin-top: 10px;}

            span {
                font-size: 14px; line-height: 20px;
                display: inline-block; width: 50%;
                text-align: center; color: #ff9f1a;
            }
        }

        .user-brand-notice {
            width: inherit;
            height: 135px;
            background: #fdfdfd;
            overflow: hidden;

            p { width: 142px; height: 100%; }

            p:nth-child(1) {
                float: left;
                background: url("../../../../../assets/images/homepage/user-notice.png") no-repeat center;
                background-size: contain;
            }

            p:nth-child(2) {
                float: right;
                background: url("../../../../../assets/images/homepage/brand-notice.png") no-repeat center;
                background-size: contain;
            }
            span {
                width: 56%;
                line-height: 20px;
                display: inline-block;
                margin: 74% auto 0;
                border-radius: 10px; }

            span.user-notice {
                color: #149df6;
                border: 1px solid #149df6;

            }
            span.brand-notice { color: #fb757f;border: 1px solid #fb757f; }
        }

    }

</style>
