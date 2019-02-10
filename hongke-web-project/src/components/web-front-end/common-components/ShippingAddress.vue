<template>
    <div>
        <!--选择地址 choose select wrapper-->
        <div class="choose-select-wrapper">
            <p><i class="small-point"></i>选择地址<i class="small-point"></i></p>
            <p>
                <span class="add-address-btn">
                    <i class="add-plus-icon"></i>添加地址
                </span>
            </p>

            <ul class="address-list">
                <li class="selected-address-style">
                    <i class="default-address-flag">默认地址</i>
                    <span class="pro-city-dis">
                                <i class="province">广东省</i>
                                <i class="city">深圳市</i>
                                <i class="district">龙华区</i>
                            </span>
                    <span class="street-building-room">
                                民治街道民泰大厦4楼3A35民泰大夏4楼3A35
                            </span>
                    <span class="edit-btn">修改</span>
                    <i class="red-address-selected-flag"></i>
                </li>
                <li>
                    <i class="default-address-flag">默认地址</i>
                    <span class="pro-city-dis">
                                <i class="province">广东省</i>
                                <i class="city">深圳市</i>
                                <i class="district">龙华区</i>
                            </span>
                    <span class="street-building-room">
                                民治街道民泰大厦4楼3A35民泰大夏4楼3A35
                            </span>
                    <span class="edit-btn">修改</span>
                    <i class="red-address-selected-flag"></i>
                </li>
                <li>
                    <i class="default-address-flag">默认地址</i>
                    <span class="pro-city-dis">
                                <i class="province">广东省</i>
                                <i class="city">深圳市</i>
                                <i class="district">龙华区</i>
                            </span>
                    <span class="street-building-room">
                                民治街道民泰大厦4楼3A35民泰大夏4楼3A35
                            </span>
                    <span class="edit-btn">修改</span>
                    <i class="red-address-selected-flag"></i>
                </li>
                <li>
                    <i class="default-address-flag">默认地址</i>
                    <span class="pro-city-dis">
                                <i class="province">广东省</i>
                                <i class="city">深圳市</i>
                                <i class="district">龙华区</i>
                            </span>
                    <span class="street-building-room">
                                民治街道民泰大厦4楼3A35民泰大夏4楼3A35
                            </span>
                    <span class="edit-btn">修改</span>
                    <i class="red-address-selected-flag"></i>
                </li>
            </ul>

            <p class="see-all-address-btn">
                <span>点击查看全部 </span><i class="down-grey-arrow"></i>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shippingAddress"
    }
</script>

<style lang="scss" scoped>
    .choose-select-wrapper {
        padding: 0 20px;
        /*background: #fafafa;*/
        min-height: 360px;

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

        ul.address-list {
            width: 1000px;
            margin: 0 auto;
            overflow: hidden;

            li {
                width: 214px;
                height: 125px;
                padding: 0 8px;
                float: left; margin-left: 10px;
                border: 5px dashed #efefef;
                position: relative;


                i.default-address-flag {
                    display: none;
                    position: absolute;
                    right: -5px; top: -5px;
                    text-align: center;
                    font-size: 12px;
                    width: 60px; height: 24px;
                    line-height: 24px; overflow: hidden;
                    background: rgba(229, 229, 229, .9);
                    color: #139ef6;
                }

                span {
                    display: block;
                    text-align: left;
                    overflow: hidden;
                }

                span.pro-city-dis {
                    line-height: 36px;
                    text-align: left;
                    border-bottom: 1px solid #dcdcdd;
                    i {
                        margin-right: 6px;
                    }
                    i:nth-child(1) {
                        font-weight: bold;
                    }
                }

                span.street-building-room {
                    margin: 10px 0;
                    line-height: 20px;
                }
                span.edit-btn {
                    color: #ff9d29;
                    cursor: pointer;
                    display: none;
                }

                i.red-address-selected-flag {
                    display: none;
                    width: 30px; height: 25px;
                    position: absolute;
                    right: -5px; bottom: -5px;
                    background: url("../../../assets/images/icons/ship-repair-servie/red-address-selected-flag.svg") no-repeat center;
                    background-size: 100% auto;
                }

            }

            li.selected-address-style {
                border: 5px dashed #288cff;

                i.default-address-flag {
                    display: block;
                }
                span.edit-btn {
                    display: block;
                }

                i.red-address-selected-flag {
                    display: block;
                }
            }
        }

        p.see-all-address-btn {
            color: #139ef6;
            margin-top: 20px;
            line-height: 60px;
            font-size: 14px;
            overflow: hidden;
            span { cursor: pointer; }
            i {
                display: inline-block;
                vertical-align: middle;
                width: 16px; height: 16px;
                background: url("../../../assets/images/icons/arrow-icon/down-grey-arrow-icon.svg") no-repeat center;
                background-size: contain;
            }
        }

    }
</style>