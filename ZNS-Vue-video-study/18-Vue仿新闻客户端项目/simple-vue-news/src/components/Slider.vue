<template>
    <div class="banner">
        <img :src=img1 alt="">
        <div class="text-box">
            <h2>有理想的现实主义者、有现实感的理想主义者</h2>
            <p>文昭 /文</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                img1: require("../assets/images/img_1.jpg")
            }
        }
    }
</script>




