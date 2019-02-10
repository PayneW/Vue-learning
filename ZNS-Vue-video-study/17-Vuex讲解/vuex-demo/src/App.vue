<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>

        <div class="container">
            <el-row :gutter="20">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click.native="increment">数字增加</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="warning" round @click.native="decrement">数字减小</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <!-- odd /ɒd/  n. 奇数  adj. 奇数的; 奇怪的  -->
                        <el-button type="info" round @click.native="oddIncrement">奇数点击才增加</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="success" round @click.native="evenIncrement">偶数点击才增加</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="success" round @click.native="asyncIncrement">点击异步增加</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">

                    </div>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <p class="grid-content bg-purple show-current-num">
                        <span>现在数字为: </span>
                        <span>{{ countNum }}</span>
                        <span> 它现在是 -- {{ oddOrEven }} </span>
                    </p>
                </el-col>
            </el-row>

        </div>
    </div>
</template>

<script>
    // ES6 对象解构
    import {mapGetters, mapActions} from "vuex";

    // console.log(mapActions);
    export default {

        computed: mapGetters([
            "countNum",
            "oddOrEven"
        ]),

        /*
         * 正常写法就是在 methods 中定义方法，但是用 Vuex 之后，不这样维护一堆方法了，
         * 可以利用 mapActions() 方法
         *  methods: {
         *      increment() {},
         *      decrement() {},
         *      otherMethods() {},
         *  }
         */
        // mapActions() 参数为一个数组， 数组内为上面注释内的方法名'
        methods: mapActions([
            "increment",
            "decrement",
            "oddIncrement",
            "evenIncrement",
            "asyncIncrement"
        ]),

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

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
    .container {
        max-width: 1600px;
        margin: 0 auto;
    }

    .el-row{
        margin-bottom: 20px;
        &:last-child {
           margin-bottom:0;
        }
    }
    .el-col{
        border-radius: 4px;
    }
    .bg-purple {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .show-current-num {
        line-height: 36px;
    }

</style>
