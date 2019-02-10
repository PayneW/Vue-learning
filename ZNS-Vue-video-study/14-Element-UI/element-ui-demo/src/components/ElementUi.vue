<template>
    <div class="def-router-content-style">
        <p>展示默认路由内容</p>
        <div>
            <span class="demonstration">默认日历插件</span>
            <el-date-picker
                    v-model = "value1"
                    type = "date"
                    placeholder = "选择日期"
                    :picker-options = "range">
            </el-date-picker>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'elementUi',
        data() {
            return {
                value1: "",
                range: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                }
            }
        }
    }
</script>

<style>
    .def-router-content-style {
        color: lightcoral;
    }
</style>