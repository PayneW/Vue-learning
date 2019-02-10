<template>
    <!--<div>推荐页面</div>-->
    <div class="recommend">
        <div class="recommend-content">
            <!-- Q: 为什么添加 v-if ?
                 A: data 下 recommends 数组的值是通过异步调用(Promise.then) getRecommend
                   后被赋予的，Slider 组件内的 DOM 渲染是根据 recommend 数组循环出来的，完成渲染
                   后回传给 slider.vue 以供 slot 插槽使用，问题便出在 slider.vue 中的一切操作都
                   是根据 recommends 有数据的情况下发生的，所以我们要做的就是确保 recommends 中一
                   定是有值的，这便是 v-if 添加的原因。 -->
            <div v-if="recommends.length" class="slider-wrapper">
                <Slider>
                    <!-- 填写插槽 (slot) 详解: Vue-study\Vue--文档+语法\
                         20190122-vue-slot\vue-slot-study-demo -->
                    <p v-for="item in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </p>
                </Slider>
            </div>
            <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul></ul>
            </div>
        </div>
    </div>
</template>


<script>
    import {getRecommend, getDiscList} from "api/recommend";
    import {ERR_OK} from "api/config";

    import Slider from "base/slider/slider";

    export default {
        data() {
            return {
                recommends: [],
            }
        },

        components: {
            Slider,
        },

        created() {
            this._getRecommend();
            // 调用获取歌单接口
            // debugger;
            this._getDiscList();
        },
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider;
                        // console.log(res.data.slider);
                    }
                })
            },

            _getDiscList() {
                getDiscList().then((res) => {
                    console.log("res: ", res);
                    if (res.code === ERR_OK) {
                        // console.log("res.data.list: ",res.data.list);
                    }
                })
            }
        }
    }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~assets/stylus/variable";

    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;

        .recommend-content {
            height: 100%;
            overflow: hidden;

            .slider-wrapper {
                position: relative;
                width: 100%;
                overflow: hidden;
            }

            .recommend-list {
                .list-title {
                    height: 65px;
                    line-height: 65px;
                    text-align: center;
                    font-size: $font-size-medium;
                    color: $color-theme;
                }
                .item {
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    padding: 0 20px 20px 20px;

                    .icon {
                        flex: 0 0 60px;
                        width: 60px;
                        padding-right: 20px;
                    }
                    .text {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        flex: 1;
                        line-height: 20px;
                        overflow: hidden;
                        font-size: $font-size-medium;

                        .name {
                            margin-bottom: 10px;
                            color: $color-text;
                        }
                        .disc {
                            color: $color-text-d
                        }
                    }
                }
            }

            .loading-container {
                position: absolute;
                width: 100%;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
</style>
