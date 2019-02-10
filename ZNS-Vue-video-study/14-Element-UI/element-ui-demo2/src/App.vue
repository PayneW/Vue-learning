<template>
    <div id="app">
        <el-row>
            <el-col :span="6">
                <!-- 使用 element-ui -->
                <p>{{ msg }}</p>
            </el-col>
            <el-col :span="6">
                <p><el-button type="primary">默认按钮</el-button></p>
            </el-col>
            <el-col :span="6">
                <p><router-link to="/showRouter">默认路由</router-link></p>
            </el-col>
            <el-col :span="6">
                <p><router-view></router-view></p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "app",
        data () {
            return {
                msg: "按需加载 Element-UI"
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .el-col {
        background: #D1C69C;
        border-radius: 4px;
    }
    .el-col p {
        min-height: 3rem;
        line-height: 3rem;
        overflow: hidden;
        padding:0;
        margin:0;
    }
</style>
