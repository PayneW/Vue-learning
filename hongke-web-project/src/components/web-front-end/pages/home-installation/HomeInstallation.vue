<template>
    <div>
        <!--当前位置-->
        <p class="current-page-position">
            <span class="C999">当前位置:</span>
            <router-link to="/">美的</router-link>
            <i class="C999"> > </i>
            <router-link to="/">服务大厅</router-link>
            <i class="C999"> > </i>
            <router-link to="/" class="current-position">上门安装</router-link>
        </p>

        <div id="home-installation" class="common-content-wrapper-style">

            <div class="content-wrapper">
                <div class="title-plate">
                    <span>上门服务</span>
                    <router-link to="/" class="return-to-service-hall-btn">
                        <i class="blue-back-icon"></i>返回服务大厅
                    </router-link>
                </div>

                <!--查看该服务评价-->
                <div class="view-service-evaluation">
                    <span>服务类型</span>
                    <router-link to="/" >查看该服务评价</router-link>
                </div>


                <div class="edit-area-plate">

                    <ul class="three-service-type">
                        <li>
                            <router-link to="/home-maintenance">上门维修</router-link>
                            <i class="down-triangle"></i>
                        </li>
                        <li class="cur-service-type">
                            <router-link to="/home-installation">上门安装</router-link>
                            <i class="down-triangle"></i>
                        </li>
                        <li>
                            <router-link to="/home-machine-move">上门移机</router-link>
                            <i class="down-triangle"></i>
                        </li>
                        <span class="clear"></span>
                    </ul>

                    <!--填写表单区域 edit area wrapper --- 填写寄修申请表-->
                    <div class="edit-area-wrapper">
                        <p>
                            <i class="small-point"></i>填写寄修申请表<i class="small-point"></i>
                        </p>
                        <p><i class="red">*</i>号为必填项目</p>

                        <!--安装产品-行-->
                        <div class="public-line">
                            <div class="public-line-left"><i class="red">*</i>安装产品：</div>
                            <div class="public-line-right">
                                <ul class="select-product-model">
                                    <li>
                                        <select name="" id="" placeholder="选择产品型号">
                                            <option value="1">选择产品型号</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span class="common-error-tips">
                                            <i class="error-tips-icon"></i>错误提示
                                        </span>
                                    </li>
                                    <li>
                                        <select name="" id=""  placeholder="选择分类">
                                            <option value="1">选择分类</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span class="common-error-tips">
                                        <i class="error-tips-icon"></i>错误提示
                                    </span>
                                    </li>
                                    <li>
                                        <p class="add-from-device">
                                            <i class="add-plus-icon"></i>
                                            从我的设备中添加
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <span class="clear"></span>
                        </div>

                        <!--物流状态-行-->
                        <div class="public-line">
                            <div class="public-line-left"><i class="red">*</i>物流状态：</div>
                            <div class="public-line-right">
                                <ul class="select-product-model">
                                    <li>
                                        <select name="" id="" placeholder="选择产品型号">
                                            <option value="1">选择产品是否到货</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <span class="common-error-tips">
                                            <i class="error-tips-icon"></i>错误提示
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <span class="clear"></span>
                        </div>

                        <div class="common-dashed-line"></div>

                    </div>


                    <!--填写表单区域 edit area wrapper --- 填写联系人-->
                    <div class="edit-area-wrapper">
                        <p>
                            <i class="small-point"></i>填写联系人<i class="small-point"></i>
                        </p>
                        <p><i class="red">*</i>号为必填项目</p>

                        <!--联系人-行-->
                        <div class="public-line">
                            <div class="public-line-left public-line-left2"><i class="red">*</i>联系人：</div>
                            <div class="public-line-right">
                                <input type="text" placeholder="请输入姓名">
                                <span class="common-error-tips">
                                <i class="error-tips-icon"></i>错误提示
                            </span>
                            </div>
                            <span class="clear"></span>
                        </div>

                        <!--联系电话-行-->
                        <div class="public-line">
                            <div class="public-line-left public-line-left2"><i class="red">*</i>联系电话：</div>
                            <div class="public-line-right">
                                <input type="text" placeholder="请输入与联系电话">
                                <span class="common-error-tips">
                                <i class="error-tips-icon"></i>错误提示
                            </span>
                            </div>
                            <span class="clear"></span>
                        </div>

                        <!--验证手机-行-->
                        <div class="public-line">
                            <div class="public-line-left public-line-left2"><i class="red">*</i>验证手机：</div>
                            <div class="public-line-right">
                                <p >
                                    <input type="text" placeholder="输入验证码">
                                    <span class="send-msg-button">发送验证码</span>
                                </p>
                                <span class="common-error-tips">
                                <i class="error-tips-icon"></i>错误提示
                            </span>
                            </div>
                            <span class="clear"></span>
                        </div>

                        <!--期望服务时间-->
                        <div class="public-line">
                            <div class="public-line-left public-line-left2"><i class="red">*</i>期望服务时间：</div>
                            <div class="public-line-right">
                                <input type="text" placeholder="2018-07-04 07:00">
                                <span class="common-error-tips">
                                    <i class="error-tips-icon"></i>错误提示
                                </span>
                            </div>
                            <span class="clear"></span>
                        </div>

                        <div class="common-dashed-line"></div>
                    </div>

                    <!--收货地址-->
                    <ShippingAddress></ShippingAddress>


                    <p class="submit-btn">
                        <router-link to="/">提交订单</router-link>
                    </p>

                </div>

                <p class="tips-text">
                    <span> <i class="tips-icon"></i> 温馨提示：</span>
                    <span>• 服务工单受理后会以短信形式告知，或在申请记录中查询。</span>
                    <span>• 提交服务单后，售后专员可能与您电话沟通，请保持手机畅通。</span>
                </p>

            </div>

        </div>
    </div>
</template>

<script>

    import ShippingAddress from "../../common-components/ShippingAddress";

    export default {

        data() {
            return {

            }
        },

        components: {
            ShippingAddress,
        }

    }
</script>


<style lang="scss">
    #home-installation {
        min-height: 600px;
        background: #fff;

        div.content-wrapper {
            background: #fff;
            padding: 0 20px 30px;
            border-radius: 4px;
            overflow:hidden;


            div.title-plate {
                height: 79px;
                margin-top: 10px;
                border-bottom: 1px dashed #dcdcdd;
                overflow: hidden;

                span:nth-child(1) {
                    float:left;
                    font-size: 18px;
                    text-align: left;
                    color: #666666;
                    line-height: 80px;
                }

                .return-to-service-hall-btn {
                    float:right;
                    width: 160px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    margin-top: 20px;
                    color: #139ef6;
                    border: 1px solid #139ef6;
                    border-radius: 4px;
                }

                i.blue-back-icon {
                    display:inline-block;
                    vertical-align: middle;
                    width: 20px; height: 20px;
                    margin-right: 10px;
                    background: url("../../../../assets/images/icons/blue-back-icon.svg") no-repeat center;
                    background-size: 90% auto;
                }
            }

            div.view-service-evaluation {
                height: 80px;
                overflow: hidden;

                span {
                    float: left;
                    line-height: 100px;
                    font-size: 16px;
                }

                a {
                    float: right;
                    width: 130px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    cursor: pointer;
                    margin-top: 30px;
                    background: #139ef6;
                    color: #fff;
                }
            }

            div.edit-area-plate {
                padding-bottom: 30px;
                border: 1px solid #dcdddd;
                border-radius: 4px;
                overflow: hidden;

                ul.three-service-type {
                    margin-bottom: 20px;

                    li {
                        float:left;
                        width: 33%;
                        line-height: 64px;
                        position: relative;

                        a {
                            display: block;
                            width: 100%; height: 100%;
                            background: #f8f7f7;
                            text-align: center;
                            font-size: 18px;
                            color: #333333;
                        }

                        i.down-triangle {
                            display: none;
                            border: transparent;
                            position: absolute;
                            left: 46%;
                            bottom: -10px;
                            width: 0; height: 0;
                            border-left: 10px solid transparent;
                            border-right: 10px solid transparent;
                            border-top: 10px solid #139ef6;
                        }
                    }
                    li:nth-child(2) {
                        margin: 0 .5%;
                    }

                    li.cur-service-type {
                        a {
                            color: #fff;
                            background: #139ef6;
                        }

                        i.down-triangle {
                            display: block;
                        }
                    }
                }


                div.edit-area-wrapper {
                    padding: 0 20px;
                    overflow: hidden;

                    p:nth-child(1) {
                        color: #666666;
                        font-size: 24px;
                        margin-top: 30px;
                        line-height: 60px;
                        /*font-weight: bold;*/
                    }
                    p:nth-child(2) {
                        margin-bottom: 40px;
                    }

                    div.common-dashed-line {
                        height: 0;
                        margin: 50px 0 20px;
                        border-bottom: 1px dashed #dcdddd;
                    }

                }


                .select-product-model {
                    li {
                        height: 100%;
                        float: left;
                        width: 198px;
                        margin-right: 10px;

                        select, p {
                            border: 1px solid #dcdcdd;
                            width: 100%;
                            height: 40px;
                            line-height: 40px;
                            border-radius: 4px;
                        }
                        select {

                            text-indent: 6px;
                        }

                        p.add-from-device {
                            font-size: 14px;
                            color: #139ef6;
                            height: 38px;
                            line-height: 38px !important;
                            cursor: pointer;
                            overflow: hidden;
                            margin-top: 0;
                            border: 1px solid #139ef6;
                        }
                    }
                }


            }


            p.tips-text {
                margin-top: 40px;
                text-align: left;
                line-height: 20px;

                span {
                    display: block;
                }

                span:nth-child(1) {
                    color: #ff7482;
                    font-size: 18px;
                    line-height: 26px;
                    i {
                        display: inline-block;
                        background: url("../../../../assets/images/icons/red-error-tips-icon.svg") no-repeat center;
                        background-size: contain;
                        width: 18px; height: 18px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }


    p.submit-btn {
        width: 200px;
        height: 52px;
        line-height: 52px;
        font-size: 18px;
        margin: 25px auto ;

        a {
            display: block;
            color: #fff;
            cursor: pointer;
            background: #139ef6;
            border-radius: 4px;

        }
    }


    i.small-point {
        width: 6px;
        height: 6px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 6px;
        background: #666666;
        border-radius: 50%;
    }

    i.add-plus-icon {
        width: 26px; height: 26px;
        display: inline-block;
        background: url("../../../../assets/images/icons/add-plus-icon.svg") no-repeat center;
        background-size: 80% auto;
        vertical-align: middle;
    }


    div.public-line {
        width:100%;
        font-size: 14px;

        .public-line-left{
            float:left;
            width:24%;
            height:64px;
            /*background: lightblue;*/
            line-height:40px;
            text-align:right;
            letter-spacing: 1px;
        }
        .public-line-right{
            height: 64px;
            float:left;
            /* background: #fafafa;*/
            margin-left:30px;

            .common-error-tips {
                text-align: left;
                display: block;
                width: 100%;
                height: 24px;
                line-height: 20px;
                font-size: 13px;
                color: #ee3442;
                overflow: hidden;

                .error-tips-icon {
                    display: inline-block;
                    background: url("../../../../assets/images/icons/red-error-tips-icon.svg") no-repeat center;
                    background-size: 80% auto;
                    width: 18px; height: 18px;
                    margin: 0 3px 0 6px;
                    vertical-align: middle;
                }
            }
        }
    }

    .public-line-left2 { width: 36% !important; }


    .public-line-right input {
        width: 300px;
        height: 38px;
        line-height: 38px;
        border-radius: 4px;
        text-indent: 10px;
        border: 1px solid #dcdcdd;
    }

    .public-line-right p {
        margin-top: 0 !important;
        line-height: 0 !important;

        input {
            width: 168px;
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
            text-indent: 10px;
            border: 1px solid #dcdcdd;
        }
        span.send-msg-button {
            display: inline-block;
            width: 118px;
            margin-left: 10px;
            height: 38px;
            line-height: 38px;
            border-radius: 4px;
            background: #f3faff;
            color: #139ef6;
            font-size: 14px;
            cursor: pointer;
            border: 1px solid #139ef6;
        }
    }

    input:focus, input:active, input:link, input:visited { border: 1px solid #139ef6; }

</style>