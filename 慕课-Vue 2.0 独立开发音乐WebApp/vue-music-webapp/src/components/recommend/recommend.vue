<template>
    <!--<div>推荐页面</div>-->
    <div class="recommend">
        <!-- 在 "4-10 scroll 组件的抽象和应用(上)" 视频时把 <div class="recommend-content">
         更新为 <Scroll class="recommend-content" >。
            绑定的 data 属性是父组件通过 props (props 属性在子组件内定义) 传值给 scroll.vue
         组件使用的， discList 为下面获取的'热门歌单推荐'的数据，那么为什么要绑定 discList 数据呢？
         这是因为 scroll.vue 组件中我们在 mounted (模板编译之后)就初始化了 better-scroll 组件，
         但此时下面'热门歌单推荐'的数据可能还没有返回(注:异步获取)，这样 div.recommend-list 就不存在
         高度可言; 此处给 scroll.vue 传值就是为了侦测这个数据是否已经返回，返回后 scroll.vue 中的
         watch 函数就重新触发 better-scroll 组件，重新获取高度。 -->
        <!-- "4-11 scroll 组件的抽象和应用(下)" 这节添加了 ref="scroll"，作用是判断轮播图的图片请
            求是否已经返回，因为轮播图板块的高度是根据图片的高度撑开的，如果此时轮播图的图片请求还没有
            返回那轮播图就不存在高度，所以此处添加 ref 在当前组件加载完毕后，调用 scroll 组件内的
            refresh 方法 (父组件通过 ref 就可以直接拿到子组件的所有的方法)。
            (注: 如何确定图片请求回来了，是给内部的 img 添加 loadImage 事件)  -->
        <Scroll class="recommend-content" :data="discList" ref="scroll">
            <!-- 4-10 视频中添加此 div, 因为这节封装了 scroll.vue 复用组件，在 better-scroll
             github repository 文档中明确写了 "better-scroll 只处理容器（wrapper）的第一个子元素
             （content）的滚动，其它的元素都会被忽略" -->
            <div>
                <!-- Q: 为什么添加 v-if ?
                 A: data 下 recommends 数组的值是通过异步调用(Promise.then) getRecommend
                   后被赋予的，Slider 组件内的 DOM 渲染是根据 recommend 数组循环出来的，完成渲染
                   后回传给 slider.vue 以供 slot 插槽使用，问题便出在 slider.vue 中的一切操作都
                   是根据 recommends 有数据的情况下发生的，所以我们要做的就是确保 recommends 中一
                   定是有值的，这便是 v-if 添加的原因。 -->
                <!-- 1、slider 轮播图 板块-->
                <div v-if="recommends.length" class="slider-wrapper">
                    <Slider>
                        <!-- 填写插槽 (slot) 即在父组件内定义，在子组件内接收。详解: Vue-study\Vue--文档+语法\
                             20190122-vue-slot\vue-slot-study-demo -->
                        <p v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <!-- 4-11 视频，添加 loadImage 事件 判断图片是否加载完毕 -->
                                <img @load="loadImage" :src="item.picUrl" >
                            </a>
                        </p>
                    </Slider>
                </div>
                <!-- 2、热门歌单推荐 版本 -->
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="item">
                            <p class="icon">
                                <!-- 4-12 视频 把 :src="item.imgurl" 改为 v-lazy="item.imgurl" 使用
                                    图片懒加载加载图片, 在 main.js 中把 vue-lazyload 使用 vue.use
                                    作为全局组件使用，所以无需再次引用，{loading:require("xx.jpg)} 属性，
                                    是默认图片 -->
                                <img v-lazy="item.imgurl" width="60" height="60" alt="">
                            </p>
                            <div class="text">
                                <!--名称-->
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <!--描述-->
                                <span class="desc" v-html="item.dissname"></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 4-13 loading : v-show 是当 discList 没有数据的时候显示-->
            <div class="loading-container" v-show="!discList.length">
                <Loading/>
            </div>
        </Scroll>
    </div>
</template>


<script>
    import {getRecommend, getDiscList} from "api/recommend";
    import {ERR_OK} from "api/config";

    import Slider from "base/slider/slider";

    import Scroll from "base/scroll/scroll.vue";

    import Loading from "base/loading/loading.vue";

    export default {
        data() {
            return {
                recommends: [],
                // disc = disk n.唱片
                discList : [],
            }
        },

        components: {
            Slider,
            Scroll,
            Loading,
        },

        created() {
            this._getRecommend();
            // 调用获取歌单接口
            // debugger;
            setTimeout(()=> {
                this._getDiscList();
            }, 500)
        },
        methods: {
            loadImage() {
                // 为什么添加 checkLoaded 的判断 ?  答: 轮播图有很多图片，我们只需要确保加载
                // 一张就可以把轮播图的 div 撑开，不用每张都监听有没有加载
                if (!this.checkLoaded) {
                    this.checkLoaded = true;
                    setTimeout(()=>{
                        // 父组件通过 ref 就可以直接拿到子组件的所有的方法
                        this.$refs.scroll.refresh();
                    }, 20);
                }
            },


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
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list;
                        // console.log("res.data.list: ",res.data.list);
                    }
                })
            },

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
            /* 其他样式在 slider.vue 中定义 */


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

                        img {
                            border-radius: 2px;
                        }
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
                        .desc {
                            color: $color-text-d;
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
