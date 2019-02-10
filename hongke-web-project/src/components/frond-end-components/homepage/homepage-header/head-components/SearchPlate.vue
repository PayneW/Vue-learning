<template>
    <div id="search-plate">
       <div class="search-plate-container">

           <div>
               <router-link  to="/home" tag="a">
                   <div class="logo"></div>
               </router-link>
           </div>


           <div class="search-plate-center">
               <div class="search-container">
                   <p class="search-wall">
                       <i class="search-icon"></i>
                       <input type="text" class="search" placeholder="请输入品牌或售后关键词" v-model="searchContent">
                   </p>
                   <p class="search-btn" @click="searchJump">搜索</p>
                   <p class="clear"></p>
               </div>
               <!-- 推荐列表 -->
               <ul class="recommend-list">
                   <li v-for="item in recommendList" @click="activeFun(item)" :key="item.id">
                       <router-link :to="{ path: item.path }"  :class="{active: item.isActive}" >{{ item.name }}</router-link>
                   </li>
               </ul>
               <div class="clear"></div>
           </div>

           <div class="custom-service">
               <p>
                   <router-link to="/">
                       <span class="after-sales-icon"></span>
                       <span>品牌专业售后 <br> 维修精准</span>
                   </router-link>
               </p>
               <p>
                   <router-link to="/">
                       <span class="brand-service-icon"></span>
                       <span>品牌专业客服 <br> 解答精准</span>
                   </router-link>
               </p>
           </div>
           <div class="clear"></div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "searchPlate",
        data () {
            return {

                searchContent: "",

                recommendList: [
                    { name: "深圳4S店",      id: 1,   isActive: false, path: "/area/fours-shop" },
                    { name: "美的空调维修" ,  id: 2,   isActive: true, path: "/industry/brand/service/fixed" },
                    { name: "大众汽车",      id: 3,   isActive: false, path: "/brand/cars"  },
                    { name: "清华大学咨询",   id: 4,   isActive: false, path: "/collage/service/advisory" },
                    { name: "洗衣机维修",     id: 5,   isActive: false, path: "/3c/fixed" },
                    { name: "教育咨询",       id: 6,   isActive: false, path: "/service/advisory" },
                ]
            }
        },

        methods: {
            activeFun(item) {
                this.recommendList.forEach(function(item) {
                    item.isActive = false;
                });
                item.isActive = !item.isActive;
            },

            // 搜索跳转
            searchJump() {
                if (this.searchContent === "") {
                    this.$router.push({ path: "search-nothing" });
                } else {
                    this.$router.push({ path: "brand-list" })
                }
            }
        }
    }
</script>

<style lang="scss">

    a { color: #999999; }
    #search-plate {
        width: 100%;
        min-height: 120px;
        background: #ffffff;

        .search-plate-container {

            width: 1190px;
            margin: 0 auto;

            div { float: left; }
            .logo {
                width: 190px;
                height: 120px;
                overflow: hidden;
                background: url("../../../../../assets/images/different-logos/logo.svg") no-repeat center center;
                background-size: 96% auto;
            }

            .search-plate-center {
                width: 690px;
                min-height: 120px;

                .search-container {
                    float: right;
                    margin-top: 40px;
                    height: 42px;
                    width: 596px;
                    border-radius: 30px;
                    background: #139ef6;
                    overflow: hidden;

                    p { float: left;}
                    p.search-wall {
                        width: 85%;
                        height: 38px;
                        margin-left: 2px;
                        margin-top: 2px;
                        background: #fff;
                        border-top-left-radius: 30px;
                        border-bottom-left-radius: 30px;

                        i.search-icon {
                            float: left;
                            width: 28px; height: 28px;
                            background: url("../../../../../assets/images/homepage/search-icon.svg") no-repeat center;
                            background-size: auto 60%;
                            border-radius: 50%;
                            margin: 5px 4px 0 10px;
                            display: block;
                        }
                        input.search {
                            float: left;
                            width: 450px;
                            height:100%;
                            font-size: 14px;
                            color: #666666;
                            line-height: 100%;
                        }
                    }
                    p.search-btn {
                        width: 14%;
                        height: 100%;
                        font-size: 18px;
                        line-height: 240%;
                        text-align: center;
                        cursor: pointer;
                        letter-spacing: 3px;
                        color: #fff;
                    }
                }

                .recommend-list {
                    float: right;
                    line-height: 36px;
                    width: 596px;
                    overflow: hidden;

                    li {
                        float: left;min-width: 76px;
                        margin-left: 5px; margin-right: 5px;
                        text-align: center; color: #666666;  }
                    .active { color: #139ef6; }
                }
            }

            .custom-service {
                float: right;
                height: 80px;
                margin-top: 20px;
                width: 290px;

                p {
                    float: right;
                    width: 120px;
                    height: 100%;
                    text-align: center;
                    line-height: 16px;

                    span { display: block; height: 40px; color: #666; margin-top: 5px;  }

                    span.brand-service-icon, span.after-sales-icon {
                        width:40px;
                        height: 40px;
                        margin: 0 auto;
                        border-radius: 50%;
                        border: 1px solid #139ff5;

                    }
                    span.brand-service-icon {
                        background: url("../../../../../assets/images/homepage/brand-service-icon.svg") no-repeat center center;
                        background-size: auto 66%;
                    }
                    span.after-sales-icon {
                        background: url("../../../../../assets/images/homepage/after-sales-icon.svg") no-repeat center center;
                        background-size: auto 66%;
                    }
                }
            }
            p:nth-child(1) { border-left: 1px solid #efefef; }

        }
    }
</style>
