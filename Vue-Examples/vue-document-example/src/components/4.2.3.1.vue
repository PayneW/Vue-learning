<template>
    <div class="default-div">
       <h2>4.2.3.1 钩子函数参数 -- 动态指令参数</h2>
       <div id="fixed-ele" ref="fixedEle">
           <p>Scroll down the page</p>
           <p v-color-swatch="red">Color changed</p>
       </div>
    </div>
</template>
<script>
    export default {
        name: 'Demo4231',
        data() {
            return {
                red: 'red'
            }
        },
        directives: {
            "color-swatch": function(el, binding, vnode) {
                el.style.color = binding.value;
            }
        }
    }
</script>
<style scoped></style>
