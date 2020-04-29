<template>
    <div class="default-div typo">
        <h2>3.1.7.3 列表的交错过渡</h2>
        <input v-model="query">
        <transition-group
            name="staggered-fade"
            tag="ul"
            :css="false"
            :before-enter="beforeEnter"
            @enter="enter"
            @leave="leave">
            <li
                v-for="(item, index) in computedList"
                :key="item.msg"
                :data-index="index"
            >{{ item.msg }}</li>
        </transition-group>
    </div>
</template>

<script>
    import Velocity from 'velocity-animate';
    export default {
        name: 'Demo3173',
        data() {
            return {
                query: '',
                list: [
                    {msg: 'Bruce Lee'},
                    {msg: 'Jackie Chan'},
                    {msg: 'Chunk Norris'},
                    {msg: 'Jet Li'},
                    {msg: 'Kung Fury'},
                ]
            }
        },
        computed: {
            computedList: function() {
                var vm = this;
                return this.list.filter(function(item) {
                    return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1;
                })
            }
        },
        methods: {
            beforeEnter: function(el) {
                el.style.opacity = 0;
                el.style.height = 0;
            },
            enter: function(el, done) {
                // - HTML5 规定可以为元素添加以 `data-` 为前缀的非标准属性,
                //   可以通过元素的 `dataset` 属性来访问自定义属性的值.
                //   --《JavaScript 高级程序设计》 11.3.5 自定义数据属性
                var delay = el.dataset.index * 150;
                setTimeout(function() {
                    Velocity(
                        el,
                        {opacity: 1, height: '1.6em'},
                        {complete: done}
                    )
                }, delay)
            },
            leave: function(el, done) {
                var delay = el.dataset.index * 150;
                setTimeout(function() {
                    Velocity(
                        el,
                        {opacity: 0, height: 0},
                        {complete: done}
                    )
                }, delay)
            }
        },
    }
</script>

<style scoped>
    .default-div {
        height: auto;
        min-height: 260px;
        overflow: auto;
    }

</style>
