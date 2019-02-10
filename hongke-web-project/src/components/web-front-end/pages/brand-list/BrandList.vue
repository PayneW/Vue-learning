<template>
    <div id="brand-list">
        <!--当前位置-plate-->
        <p class="current-page-position">
            <span class="C999">当前位置:</span>
            <router-link to="/">首页</router-link>
            <i class="C999"> > </i>
            <router-link to="/" class="current-position"> 电器 </router-link>
        </p>

        <!--电器品牌(electrical appliance brand)-plate-->
        <div class="electrical-appliance-brand">

            <p class="elec-appliance-brand-title">
                <span>电器品牌</span>
            </p>

            <!--分类 classification-->
            <div class="classification">
                <p class="classification-title common-left-style">分类：</p>
                <div class="electrical-appliance-type-list common-middle-style">
                    <ul>
                       <li v-for="item in list" :key="item.id" v-if="item.isShow">
                           <router-link to="item.path">{{ item.type }}</router-link>
                       </li>
                    </ul>
                </div>
                <p class="classification-more-btn common-btn-style" @click="classificationToggle()">
                    更多 <i class="down-red-arrow-icon common-down-arrow-icon"></i>
                </p>
            </div>

            <!--品牌 brand-->
            <!--<div class="brands">
                <p class="common-left-style">品牌：</p>
                <div class="brands-list common-middle-style">
                    <ul>
                        <li v-for="(item, index) in brandsList" :key="item.id"
                            :style="{ backgroundImage: item.url }"
                            :class="{ 'active':index === checkIndex }"
                            @mouseenter="brandListShow(item, index)" @mouseleave="brandListHidden(item)" >
                            <span class="brand-name" v-if="item.nameShow">{{ item.name }}</span>
                        </li>
                    </ul>
                </div>
                <p class="common-btn-style">
                    更多 <i class="down-grey-arrow-icon common-down-arrow-icon"></i>
                </p>
            </div>-->
        </div>


        <!--头部: 字母列表-->
        <div class="letter-list-title">
            <span>所有品牌</span>
            <ul>
                <li>A</li>
                <li>B</li>
                <li>C</li>
                <li>D</li>
                <li>E</li>
                <li>F</li>
                <li>G</li>
                <li>H</li>
                <li>I</li>
                <li>J</li>
                <li>K</li>
                <li>L</li>
                <li>M</li>
                <li>N</li>
                <li>O</li>
                <li>P</li>
                <li>Q</li>
                <li>R</li>
                <li>S</li>
                <li>T</li>
                <li>Y</li>
                <li>V</li>
                <li>W</li>
                <li>X</li>
                <li>Y</li>
                <li>Z</li>
            </ul>
            <span class="get-brands">
                    共有品牌 <i class="get-brands-number"> 281 </i> 家
            </span>
        </div>

        <!--循环输出: 品牌列表-->
        <div class="loop-output-brands-list">
            <ul>
                <li class="electronic-brand-list"
                    v-for="(item, index) in electronicBrandsList"
                    :key="item.id"
                    :class="(index+1)%4 === 0 ? 'mar-right-0': ''">
                    <router-link to="/">
                        <p class="brand-logo" :style="{ backgroundImage: item.bgImg }"></p>
                    </router-link>

                    <router-link to="/">
                        <p class="brand-name">{{ item.name }}</p>
                    </router-link>

                    <p class="service-group">
                        <router-link to="/">
                            <span class="online-service">
                                 <i class="online-service-icon common-icon"></i>在线客服
                            </span>
                        </router-link>

                        <router-link to="/">
                            <span class="service-hall">
                                <i class="service-hall-icon common-icon"></i>服务大厅
                            </span>
                        </router-link>

                        <router-link to="/">
                            <span class="official-mall">
                                <i class="official-mall-icon common-icon"></i>官网商城
                            </span>
                        </router-link>
                    </p>

                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    export default {
        name: "brandList",

        data () {
            return {

                checkIndex: "",

                hidShowMarArr: [],

                list: [
                    { type: "全部", isShow: true, path: "/type:0", id: 0, },
                    { type: "电视", isShow: true, path: "/type:1", id: 1, },
                    { type: "冰箱", isShow: true, path: "/type:2", id: 2, },
                    { type: "洗衣机", isShow: true, path: "/type:3", id: 3, },
                    { type: "空调", isShow: true, path: "/type:4", id: 4, },
                    { type: "洗碗机", isShow: true, path: "/type:5", id: 5, },
                    { type: "热水器", isShow: true, path: "/type:6", id: 6, },
                    { type: "净水机", isShow: true, path: "/type:7", id: 7, },
                    { type: "净化器", isShow: true, path: "/type:8", id: 8, },
                    { type: "抽油烟机", isShow: true, path: "/type:9", id: 9, },
                    { type: "电饭煲", isShow: false, path: "/type:10", id: 10, },
                    { type: "电风扇", isShow: false, path: "/type:0", id: 11, },
                    { type: "热水器", isShow: false, path: "/type:6", id: 12, },
                    { type: "净水机", isShow: false, path: "/type:7", id: 13, },
                    { type: "净化器", isShow: false, path: "/type:8", id: 14, },
                    { type: "抽油烟机", isShow: false, path: "/type:9", id: 15, },
                    { type: "电饭煲", isShow: false, path: "/type:10", id: 16, },
                    { type: "电风扇", isShow: false, path: "/type:0", id: 17, },
                ],

                brandsList: [
                    {
                        name: "爱仕达", nameShow: false,  path: "/brand:0", id: 0,
                        url: "url(" + require('../../../../assets/images/brands-logo/aishida.jpg')+ ")" ,
                    },
                    {
                        name: "奥克斯", nameShow: false,  path: "/brand:1", id: 1,
                        url: "url(" + require('../../../../assets/images/brands-logo/aokesi.jpg')+ ")",
                    },
                    {
                        name: "半球", nameShow: false,  path: "/brand:2", id: 2,
                        url: "url(" + require('../../../../assets/images/brands-logo/banqiu.jpg')+ ")",
                    },
                    {
                        name: "长虹", nameShow: false,  path: "/brand:3", id: 3,
                        url: "url(" + require('../../../../assets/images/brands-logo/changhong.jpg')+ ")",
                    },
                    {
                        name: "大松", nameShow: false,  path: "/brand:4", id: 4,
                        url: "url(" + require('../../../../assets/images/brands-logo/dasong.jpg')+ ")",
                    },
                    {
                        name: "东芝", nameShow: false,  path: "/brand:5", id: 5,
                        url: "url(" + require('../../../../assets/images/brands-logo/dongzhi.jpg')+ ")",
                    },
                    {
                        name: "飞利浦", nameShow: false,   path: "/brand:6", id: 6,
                        url: "url(" + require('../../../../assets/images/brands-logo/feilipu.jpg')+ ")",
                    },
                    {
                        name: "格力", nameShow: false,  path: "/brand:7", id: 7,
                        url: "url(" + require('../../../../assets/images/brands-logo/gree.jpg')+ ")",
                    },

                    {
                        name: "海尔", nameShow: false,  path: "/brand:8", id: 8,
                        url: "url(" + require('../../../../assets/images/brands-logo/haier.jpg')+ ")",
                    },
                    {
                        name: "康佳", nameShow: false,  path: "/brand:9", id: 9,
                        url: "url(" + require('../../../../assets/images/brands-logo/kangjia.jpg')+ ")",
                    },
                    {
                        name: "莱克", nameShow: false,  path: "/brand:10", id: 10,
                        url: "url(" + require('../../../../assets/images/brands-logo/lexy.jpg')+ ")",
                    },
                    {
                        name: "利仁", nameShow: false, isShow: true, path: "/brand:0", id: 11,
                        url: "url(" + require('../../../../assets/images/brands-logo/liren.jpg')+ ")"
                    },
                    {
                        name: "大松", nameShow: false,  path: "/brand:4", id: 12,
                        url: "url(" + require('../../../../assets/images/brands-logo/dasong.jpg')+ ")",
                    },
                    {
                        name: "东芝", nameShow: false,  path: "/brand:5", id: 13,
                        url: "url(" + require('../../../../assets/images/brands-logo/dongzhi.jpg')+ ")",
                    },
                    {
                        name: "飞利浦", nameShow: false,   path: "/brand:6", id: 14,
                        url: "url(" + require('../../../../assets/images/brands-logo/feilipu.jpg')+ ")",
                    },
                    {
                        name: "格力", nameShow: false,  path: "/brand:7", id: 15,
                        url: "url(" + require('../../../../assets/images/brands-logo/gree.jpg')+ ")",
                    },
                ],


                electronicBrandsList: [
                    {
                        name: "东宝宝品牌服务",  id: 0,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "奥克斯品牌服务",  id: 1,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "海尔品牌服务",  id: 2,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "格力品牌服务",  id: 3,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "美的品牌服务",  id: 4,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "大金品牌服务",  id: 5,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "东宝宝品牌服务",  id: 6,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },
                    {
                        name: "东宝宝品牌服务",  id: 7,
                        bgImg: "url(" + require('../../../../assets/images/homepage/brand-logos/meling.png') + ")",
                    },

                ]
            }
        },

        mounted() {
            // this.hidMarRight();
        },

        computed: {
        },

        methods: {
            classificationToggle() {
                this.list.forEach(function(item){
                    if (item.id >= 10) {
                        item.isShow = !item.isShow;
                    }
                })
            },

            hidMarRight () {
                // 循环输出品牌列表，第四个 margin-right 等于 0
                this.electronicBrandsList.forEach(function(item) {
                    if ((item.id + 1) % 4 === 0) {
                        this.hidShowMarArr.push(true);
                    } else {
                        this.hidShowMarArr.push(false);
                    }
                    console.log(this.hidShowMarArr);
                    console.log(item.id);
                })
            }
        },
    }
</script>

<style lang="scss">
    #brand-list {
        min-height: 900px;
        width: 1190px;
        margin: 0 auto;
        font-size: 13px;

        /*电器品牌*/
        .electrical-appliance-brand {
            width: 1190px;
            background-color: #fff;
            margin: 0 auto;

            .elec-appliance-brand-title {
                line-height: 60px;
                height: 50px;
                overflow: hidden;
                font-size: 18px;
                font-weight: bold;
                text-align: left;
                color: #666666;
                margin: 0 20px;
                border-bottom: 1px solid #f8f7f7;
            }

            .classification, .brands {
                min-height: 80px;
                padding: 0 20px;
            }

            /*分类*/
            .classification {
                border-bottom: 1px solid #f7f7f8;
                overflow: hidden;

                .electrical-appliance-type-list {
                    overflow: hidden;
                    min-height: 45px;
                    padding-bottom: 10px;

                    li {
                        float: left;
                        margin-top: 10px;
                        width: 124px;
                        text-align: left;
                        a { color: #333333; }
                        a:hover { color: #139ef6; }
                    }
                }

                p.classification-more-btn {
                    text-align: center;
                    color: #ee3442;

                    .down-red-arrow-icon {
                        background: url("../../../../assets/images/icons/arrow-icon/down-red-arrow-icon.svg") no-repeat center;
                        background-size: contain;
                    }
                }

            }

            /*品牌*/
            .brands {
                padding-top: 30px;
                padding-bottom: 30px;
                font-size: 13px;
                overflow: hidden;

                .brands-list {
                    /*overflow: hidden;*/
                    padding-top: 1px;
                    li {
                        float: left;
                        width: 118px;
                        height: 48px;
                        line-height: 48px;
                        padding: 0;
                        cursor: pointer;
                        margin: -1px -1px 0 0;
                        border: 1px solid #dcdcdd;

                        background-size: 82% auto;
                        background-repeat: no-repeat;
                        background-position: center;

                        .brand-name {
                            display: block;
                            height: 99%; width: auto;
                            /*border: 1px solid #42b2f7;*/
                            background-color: #fff;
                            /*内边框*/
                            cursor: pointer;
                            box-sizing: border-box;
                            color: #139ef6;
                            text-align: center;
                        }
                    }


                    .active {
                        border: 1px solid #42b2f7 !important;
                    }
                }

                .down-grey-arrow-icon {
                    background: url("../../../../assets/images/icons/arrow-icon/down-grey-arrow-icon.svg") no-repeat center;
                    background-size: contain;
                }

            }

            .common-left-style {
                float: left;
                width: 88px;
                margin-top: 10px;
                color: #999999;
            }
            .common-middle-style {
                float: left;
                width:927px;
                min-height: 55px;
                /*background: lightblue;*/
                overflow: hidden;
            }
            .common-btn-style {
                float: right;
                width: 68px;
                cursor: pointer;
                line-height: 26px;
                margin-top: 10px;
                border: 1px solid #dcdcdd;
                border-radius: 4px;
               /* background: lightsalmon;*/

                .common-down-arrow-icon {
                    width: 10px;
                    height: 10px;
                    display: inline-block;
                    background-size: contain;
                }
            }
        }


        /*字母列表头部*/
        .letter-list-title {
            height: 45px;
            line-height: 40px;
            padding: 35px 20px 0;
            background: #fff;
            margin-top: 10px;
            border-bottom: 3px solid #129ef4;
            overflow: hidden;

            span, ul { float: left; }
            ul {
                margin-left: 30px;
                li {
                    float: left;
                    width: 25px;
                    margin: 0 1px;
                   /* background: lightcoral;*/
                    color: #007ccc;
                    cursor: pointer;
                }
            }
            span:nth-child(1) {
                width: 68px;
                cursor: pointer;
                line-height: 26px;
                margin-top: 6px;
                color: #999999;
                border: 1px solid #dcdcdd;
                border-radius: 4px;

            }
            .get-brands {
                float: right;
                font-size: 12px;

                .get-brands-number {
                    color: #ff7482;
                    font-weight: bold;
                    font-size: 12px;
                }
            }
        }


        /*循环输出: 品牌列表*/
        .loop-output-brands-list {
            min-height: 400px;

            li {
                margin-top: 10px;
                float: left;
                width: 290px;
                height: 195px;
                margin-right: 10px;
                background: #fff;

                .brand-logo {
                    width: 100%; height: 126px;
                    background-position: center;
                    background-repeat: no-repeat;
                    text-align: center;
                    background-size: 50% auto;
                }
                .brand-name {
                    line-height: 30px;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    border-top: 1px dashed #efefef; }
                .service-group {
                    line-height: 40px; border-top: 1px dashed #cbcbcb;

                    span {
                        float: left;
                        width: 33%;
                        text-align: center;
                        letter-spacing: 0;
                        color: #666666;

                        .common-icon {
                            display:inline-block; border-radius: 5px;
                            width: 16px; height: 16px;
                            margin-right: 5px;
                            vertical-align: middle;
                        }
                        .online-service-icon {
                            background: url("../../../../assets/images/homepage/brand-service-icon.svg") no-repeat center;
                            background-size: contain;
                        }
                        .service-hall-icon {
                            background: url("../../../../assets/images/homepage/brand-recommend-icon/service-hall-icon.svg") no-repeat center;
                            background-size: contain;
                        }
                        .official-mall-icon {
                            background: url("../../../../assets/images/homepage/brand-recommend-icon/official-mall-icon.svg") no-repeat center;
                            background-size: contain;
                        }
                    }
                }
            }

            .mar-right-0 { margin-right: 0; }
        }
    }
</style>
