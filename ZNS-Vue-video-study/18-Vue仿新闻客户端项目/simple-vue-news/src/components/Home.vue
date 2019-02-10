<template>
    <div class="content">
        <Slider/>
        <div class="newsList">
            <ul>
                <li v-for="(item, index) in arrList" :key="item.id">
                    <router-link :to="'/article'/+ item.id">
                        <h2>{{ index+1 }}.{{ item.title }}</h2>
                        <p>{{ item.detail }}</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Slider from "./Slider.vue";

    import axios from "axios";

    export default {
        data() {
            return {
                arrList: []
            }
        },
        components: {Slider},
        mounted() {
            // 获取数据
            this.fetchData();
        },
        methods: {
            fetchData() {
                let _this = this;
                console.log("_this:", _this);
                axios({
                    method: "get",
                    url: "/api/indexData",
                    dataType: "json",
                    crossDomain: true,
                    cache: false
                }).then(function (res) {
                    _this.arrList = res.data;
                    console.log("response: ", res);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/index.css";
</style>
