<!-- 10-16 add: 搜索页面 删除搜索列表 confirm 确认组件  -->
<template>
    <transition class="confirm-fade">
        <div class="confirm" v-show="showFlag">
            <div class="confirm-wrapper">
                <div class="confirm-content">
                    <p class="text">{{text}}</p>
                    <div class="operate">
                        <div @click="cancel"  class="operate-btn left">{{cancelBtnText}}</div>
                        <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            text: {
                type: String,
                default: ""
            },
            confirmBtnText: {
                type: String,
                default: "确定"
            },
            cancelBtnText: {
                type: String,
                default: "取消"
            }
        },

        data() {
            return {
                showFlag: false,
            }
        },

        methods: {
            show() {
                this.showFlag = true;
            },
            hide() {
                this.showFlag = false;
            },

            cancel() {
                this.hide();
                // 基础组件还是不做业务逻辑,直派发事件
                this.$emit("cancel");
            },
            confirm() {
                this.hide();
                this.$emit("confirm");
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~assets/stylus/variable";


    .confirm-fade-enter-active {
        animation: confirm-fadein .3s;
    }

    .confirm {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 998;
        background-color: $color-background-d;

        .confirm-wrapper {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;

            .confirm-content {
                width: 270px;
                border-radius: 13px;
                background: $color-highlight-background;

                animation: confirm-zoom .3s;

                .text {
                    padding: 19px 15px;
                    line-height: 22px;
                    text-align: center;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                }
                .operate {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    font-size: $font-size-medium;
                    .operate-btn {
                        flex: 1;
                        line-height: 22px;
                        padding: 10px 0;
                        border-top: 1px solid $color-background-d;
                        color: $color-text-d;
                        &.left {
                            border-right: 1px solid $color-background-d;
                         }
                    }
                }
            }

        }

    }

    @keyframes confirm-fadein {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes confirm-zoom {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
