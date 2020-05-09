<template>
    <div id="carousel" class="carousel-wrap">
        <!-- <p>Vue 轮播图组件</p>-->

        <!-- 轮播图列表 -->
        <transition-group tag="ul" class="slide-ul" name="list">
            <li
                v-for="(list, index) in slideList"
                :key="index"
                v-show="index===currentIndex"
                @mouseenter="stop"
                @mouseleave="go"
            >
                <a :href="list.clickUrl">
                    <img :src="list.image" :alt="list.desc">
                </a>
            </li>
        </transition-group>

        <!-- 轮播图 -->
        <div class="carousel-items">
            <span
                v-for="(item, index) in slideList.length"
                :class="{'active': index===currentIndex}"
                @mouseover="change(index)"
            ></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BaseCarousel',
        data() {
            return {
                slideList: [
                    {
                        "clickUrl": "#",
                        "desc": "nhwc",
                        "image": "http://dummyimage.com/1745x492/f1d65b"
                    },
                    {
                        "clickUrl": "#",
                        "desc": "hxrj",
                        "image": "http://dummyimage.com/1745x492/40b7ea"
                    },
                    {
                        "clickUrl": "#",
                        "desc": "rsdh",
                        "image": "http://dummyimage.com/1745x492/e3c933"
                    }
                ],
                currentIndex: 0,
                timer: ''
            }
        },
        methods: {
            // - 暂停轮播图
            stop: function() {

            },

            // - 轮播图开始
            go: function() {

            },

            // - 鼠标移动到指定的小点时, 轮播图跳转到当前小点对应的图片
            change: function() {
                
            } 
        }
    }
</script>

<style scoped>
    #carousel {
        margin: 10px;
        height: 460px;
        min-width: 90%;
        padding: 0 10px;
        background: #96bc75;
        overflow: hidden;
    }
</style>
