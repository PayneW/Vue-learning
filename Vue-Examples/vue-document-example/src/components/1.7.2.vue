<template>
    <div id="app1714" class="default-div">
        <h2>1.7.2: v-show 指令</h2>
        <div class="add-flex" v-show="loginOk">
            <label>Username:</label>
            <input class="username-style"
                   placeholder="Enter your username">
        </div>
        <div class="add-flex" v-show="!loginOk">
            <label>Email</label>
            <input placeholder="Enter your email address">
        </div>
        <button @click="loginOk = !loginOk">切换登录类型</button>
    </div>
</template>


<script>
    export default {
        name: 'Demo172',
        data() {
            return {
                loginOk:true
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .add-flex {
        display: flex;
        margin-bottom: 10px;
        justify-content: left;
    }
    .add-flex > label {
        flex-basis: 26%;
        display: flex;
        justify-content: left;
        /* - align-items 设置交叉轴为 center 实现文字垂直居中 */
        align-items: center;
    }
    input {
        width: 200px;
    }
    .username-style {
        background: #FFF1BC;
    }
</style>
