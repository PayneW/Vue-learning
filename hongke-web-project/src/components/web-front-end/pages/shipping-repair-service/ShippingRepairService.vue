<template>
    <div>
        <!--当前位置-->
        <p class="current-page-position">
            <span class="C999">当前位置:</span>
            <router-link to="/">美的</router-link>
            <i class="C999"> > </i>
            <router-link to="/">服务大厅</router-link>
            <i class="C999"> > </i>
            <router-link to="/" class="current-position">寄修服务</router-link>
        </p>


        <div id="shipping-repair-service" class="common-content-wrapper-style">

            <div class="content-wrapper">
                <div class="title-plate">
                    <span>寄修服务</span>
                    <!--返回服务大厅 按钮-->
                    <router-link to="/" class="return-to-service-hall-btn">
                        <i class="blue-back-icon"></i>返回服务大厅
                    </router-link>
                </div>

                <!--查看该服务评价-->
                <div class="view-service-evaluation">
                    <router-link to="/" >查看该服务评价</router-link>
                </div>


                <div class="edit-area-plate">

                    <!--填写表单区域 edit area wrapper --- 填写寄修申请表-->
                    <div class="edit-area-wrapper">
                        <p>
                            <i class="small-point"></i>填写寄修申请表<i class="small-point"></i>
                        </p>
                        <p><i class="red">*</i>号为必填项目</p>

                        <!--维修产品-行-->
                        <div class="public-line">
                            <div class="public-line-left"><i class="red">*</i>维修产品：</div>
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

                        <!--问题描述-行-->
                        <div class="public-line">
                            <div class="public-line-left"><i class="red">*</i>问题描述：</div>
                            <div class="public-line-right textarea-wrapper">
                            <textarea name="" placeholder="请输入问题描述，不得少于10个字。"></textarea>
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



                        <div class="common-dashed-line"></div>

                    </div>


                    <!--收货地址-->
                    <ShippingAddress></ShippingAddress>


                    <p class="submit-btn">
                        <router-link to="/repair-application-successful">提交寄修工单</router-link>
                    </p>


                </div>

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

<style lang="scss" scoped>
    #shipping-repair-service {

        div.content-wrapper {
            background: #fff;
            padding: 0 20px 30px;
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

                div.edit-area-wrapper {
                    border-radius: 4px;
                    padding: 0 20px;

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
                        margin: 50px 0 40px;
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

                .textarea-wrapper {
                    width: 600px;
                    padding: 10px;
                    height: 280px;
                    border-radius: 4px;
                    overflow: hidden;
                    text-indent: 5px;
                    line-height: 20px;
                    border: 1px solid #dcdcdd;
                }

                textarea {
                    width: 100%; height: 100%;
                }


                .choose-select-wrapper {
                    padding: 0 20px;
                    /*background: #fafafa;*/
                    min-height: 400px;

                    p:nth-child(1) {
                        color: #666666;
                        font-size: 24px;
                        margin-top: 30px;
                        line-height: 60px;
                    }

                    p:nth-child(2) {
                        height: 50px;
                        overflow: hidden;
                    }
                    .add-address-btn {
                        float: right;
                        width: 100px;
                        font-size: 14px;
                        color: #139ef6;
                        line-height: 30px;
                        cursor: pointer;
                        overflow: hidden;
                        border-radius: 4px;
                        border: 1px solid #139ef6;

                        i {
                            width: 18px !important;
                            height: 18px !important;
                            margin-right: 5px;
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

            }
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