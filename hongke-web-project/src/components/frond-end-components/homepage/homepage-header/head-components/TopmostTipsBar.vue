<template>
    <div id="topmost-tips-bar">
        <div class="tips-bar-container">
            <ul class="tips-bar-left">
                <li v-for="item in logRegList" :key="item.id"  @click="activeFun(item)">
                    <router-link
                            :to="{ path: item.path }"
                            :class="{active: item.isActive}">
                        {{item.text}}
                    </router-link>
                </li>
            </ul>
            <div class="tips-bar-right">
                <ul>
                    <li>
                        <router-link to="/my-account">我的服务鸟</router-link>
                    </li>
                    <li>
                        <router-link to="/brand-center">品牌中心</router-link>
                    </li>
                    <li>
                        <router-link to="/server-center">平台客服中心</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "topmostTipsBar",
        data() {
            return {
                logRegList: [
                    {text: "请先登录", id: "1",  isActive: true, path: "/user-login"},
                    {text: "免费注册", id: "2", isActive: false, path: "/user-register"}
                ]
            }
        },

        methods: {
            activeFun (item) {
                this.logRegList.forEach(function(item) {
                    item.isActive = false;
                });
                item.isActive = !item.isActive;
            }
        },
    }
</script>

<style lang="scss">
    #topmost-tips-bar {
        background:#efefef;
    }

    .tips-bar-container {
        width: 1190px;
        margin: 0 auto;
        height: 32px;
        line-height: 32px;

        .tips-bar-left {
            min-width: 20%;
            float: left;
            text-align: left;
            overflow: hidden;

            li { float:left; width: 140px; }
            .active { color: #139ef6;  }
        }

        .tips-bar-right {
            float: right;
            min-width: 30%;
            ul {
                li {
                    float: left;
                    text-align: center;
                    border-right: 1px #efefef solid;
                    min-width: 120px;
                }
                li:nth-child(1) {
                    border-left: 1px #efefef solid;
                }
            }
        }
    }
</style>
