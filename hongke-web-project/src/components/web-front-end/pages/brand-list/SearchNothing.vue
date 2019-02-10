<template>
    <div>

        <!--当前位置-plate-->
        <p class="current-page-position">
            <span class="C999">当前位置:</span>
            <router-link to="/">首页</router-link>
            <i class="C999"> > </i>
            <router-link to="/" class="current-position"> 电器 </router-link>
        </p>

        <div id="search-nothing" class="common-content-wrapper-style">
            <div class="search-nothing-tips">
                <p class="search-nothing-img"></p>
                <p class="search-nothing-text">
                    抱歉，没有搜索到与 <i class="search-input-text">电视机海尔</i>  相关的品牌
                    <br>
                    <span>请检查您的输入是否有误</span>
                </p>

                <p class="C999">您还可以尝试以下搜索：</p>
                <ul ref="wrapper">
                    <li v-for="(item, index) in searchSuggestionList" :key="item.id">
                        <router-link to="/"  :class="{ blue: item.isActive }">{{ item.title }}</router-link>
                    </li>
                </ul>

            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "searchNothing",
        data() {
            return {
                searchSuggestionList: [
                    { title: "惠普电视机", isActive: false, id: 0 },
                    { title: "LG电视", isActive: false, id: 1 },
                    { title: "W小米电视", isActive:true , id: 2 },
                    { title: "海尔电视", isActive: false, id: 3 },
                    { title: "LG电视", isActive: false, id: 4 },
                    { title: "W小米电视", isActive: false, id: 5 },
                    { title: "海尔电视", isActive: false, id: 6 },
                ]
            }
        },

        mounted() {
            /* this.computedWidth();*/
        },

        computed: {

        },

        methods: {
            computedWidth () {
                this.$nextTick(()=> {
                    let sugListUl = this.$refs;
                    let listLi = sugListUl.childNodes;

                    console.log(sugListUl);
                    console.log(listLi);
                    let wid = 0;
                    let i = 0;
                    for(; i < listLi.length; i++) {
                        wid += listLi[i].getBoundingClientRect().width;
                    }
                    sugListUl.style.width = width + "px";
                })
            }
        }
    }
</script>

<style lang="scss">
    #search-nothing {

        /* 当前位置 */
        .current-page-position {
            line-height: 48px;
            font-size: 14px;
            text-align: left;

            .current-position {
                color: #333333;
            }
        }

        .search-nothing-tips {
            height: 600px;
            background-color: #fff;
            overflow: hidden;

            .search-nothing-img {
                width: 300px;
                height: 230px;
                margin: 80px auto 60px;
                background: url("../../../../assets/images/brand-list-page/serach-nothing.png") no-repeat center;
                background-size: contain;
            }
            .search-nothing-text {
                color: #139ef6;
                text-align: center;
                font-size: 18px;

                span {
                    color: #666666;
                    line-height: 36px;
                    font-size: 14px;
                }
            }
            p:nth-child(3) {
                text-align: center;
                font-size: 14px;
                margin: 90px auto 20px;
            }

            ul {
                width: 54%;
                overflow: hidden;
                margin: 0 auto;

                li {
                    float: left;
                    padding: 0 15px;
                    border-right: 1px solid #dcdddd;
                }

            }

        }

    }
</style>
