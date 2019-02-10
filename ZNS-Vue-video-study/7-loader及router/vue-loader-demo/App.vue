<!-- 解析 template 就需要 vue-html-loader : npm install vue-html-loader --save-dev
    --save-dev 会把加载器(loader)下入到 package.json 中的 devDependencies 属性中 -->
<template>
    <div>
        <h1>Welcom Vue</h1>
        {{msg}}
    </div>
</template>


<!-- npm install vue-hot-reload-api : 每次改完后刷新验证代码有没有错误 -->
<script>
    export default {
        date() {
            return {
                msg: "Welcome Vue ^_^"
            }
        }
    }
</script>

<!-- npm install css-loader vur-style-loader --save-dev -->
<style></style>