<template>
    <div class="default-div">
       <h2>4.5 过滤器</h2>
       <p>
           <input type="text" v-model="str">
       </p>
       {{ str | capitalize }}
    </div>
</template>
<script>
    export default {
        name: 'Demo423',
        data() {
            return {
                str: 'john'
            }
        },
        filters: {
            capitalize: function(value) {
                if (!value) return '';
                // - `charAt(num)`: 以单字符字符串的形式返回给定位置的那个字符.
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        }
    }
</script>
<style scoped></style>
