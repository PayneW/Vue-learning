<template>
<div>
    <div class="one">
        <div class="vv">
            <img src="../img/logo.png" alt="" id="img">
            <input type="text" v-model="value" placeholder="请数入小区或商圈名" @change="sou">
        </div>
        <span id="return" @click="fan">取消</span>
    </div>
    <div class="two" v-show="isShow">
        <p>历史搜索</p>
        <!--<div v-for="item in this.$store.state.record">-->
        <div v-for="item in cc">
            <span @click="detail(item)" id="item(item)">{{item}}</span>
            <span @click="delate(item)">X</span>
        </div>
    </div>
    <div class="three" v-show="isShow" @click="clear"><div>清空历史记录</div></div>
    <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            id="resu" v-show="show">
        <li v-for="item in result" class="resu" @click="que(item)">
            <span>{{item.name}}</span>
            <span>{{item.count}}套</span>
        </li>
    </ul>
</div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import {VillageFind} from '../../../api/config'
    export default{
        data () {
            return {
                value: '',
                type: 'used',
                loading: false,
                arr: [],
                result: [],
                isShow: true,
                num: 1,
                size: 12,
                cc: [],
                block: [],
                show: false
            }
        },
        created () {
            var a = sessionStorage.getItem('objStr')
            if (a) {
                this.cc = a.split(',')
            }
        },
        methods: {
            loadMore () {
                this.loading = true
                this.size += 12
                this.getDate()
                this.loading = false
            },
            getDate () {
                var self = this
                VillageFind({type: this.type, name: this.value, page_num: this.num, page_size: this.size}).then(function (res) {
                    self.result = res.data.data
                })
            },
            sou () {
                this.getDate()
                this.isShow = false
                this.show = true
            },
            fan () {
                this.$router.go(-1)
            },
            que (item) {
                this.cc.push(item.name)
                var name = this.cc.toString()
                sessionStorage.setItem('objStr', name)
//        this.$store.commit('jiLu', name)
                this.getDate()
//        this.$router.push('/ershou/' + name)
                this.$router.push({path: '/ershou', query: {village: name}})
            },
            detail (item) {
                this.$router.push({path: '/ershou', query: {village: item}})
            },
            delate (item) {
                var num = this.cc.indexOf('item')
                this.cc.splice(num - 1, 1)
                sessionStorage.setItem('objStr', this.cc)
//        this.$store.commit('clearOne', item)
            },
            clear () {
                MessageBox.confirm('确定要清空历史搜索么？').then(action => {
//          this.$store.commit('clear', name)
                    this.cc = []
                    sessionStorage.clear('objStr')
                })
            }
        }
    }
</script>

---------------------

本文来自 NextToTheLaoWang 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/NextToTheLaoWang/article/details/79397866?utm_source=copy