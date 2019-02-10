<template>
    <div class="hello">
        <input type="text" v-model="loginName"><br>
        <input type="password" v-model="passWord"><br>
        <button @click="loginSub">登录</button>
    </div>
</template>

<script >
    import ProsAndEmit from './testPropsAndEmit'
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                loginName: '',
                passWord: ''
            }
        },
        methods: {
            loginSub () {
                console.log('登录名:' + this.loginName + ',密码:' + this.passWord)
                // 纯数字
                let number = /^.*[^\d].*$/
                // 随便验证一下
                if (this.loginName === '') {
                    alert('请输入登录名')
                    return
                }
                if (!number.test(this.loginName)) {
                    alert('login Success!')
                    // 验证成功进入 loginSuccess
                    this.$router.push('loginSuccess')
                } else {
                    alert('登录名为纯数字！')
                }
            }
        },
        components: {
            ProsAndEmit: ProsAndEmit
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {font-weight: normal;}
    ul {list-style-type: none;padding: 0;}
    li {display: inline-block;margin: 0 10px;}
    a {color: #42b983;}
</style>
