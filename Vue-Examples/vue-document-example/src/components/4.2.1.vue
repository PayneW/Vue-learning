<template>
    <div class="default-div">
       <h2>4.2.1 自定义指令</h2>
        <input type="text" v-model="val" v-focus>
    </div>
</template>

<script>
    const myMixin = {
        
        
    };
    export default {
        name: 'Demo421',
        data() {
            return {
                val: '打开页面即选中'
            }
        },
        directives: {
            focus: {
                // - 自定义指令的定义
                inserted: function(el) {
                    el.focus()
                }
            }
        }
        
    }
</script>

<style scoped></style>
