<template>
    <div>
        <button @click="layOut">注销</button>
    </div>
</template>

<script>
    export default {
        methods: {
            layOut () {
                alert('注销成功！')
                // 注销成功 返回登录界面
                this.$router.go(-1)
                console.log(123)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
