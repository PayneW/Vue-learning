<template>
    <div id="app1842" class="default-div">
        <h2>1.8.4.2: 替换数组</h2>
        <ul id='v-for-object' class="demo">
           <li v-for="(value, index) in items" :key="index">
               {{ index + 1}}. {{ value.message }}
           </li>
        </ul>
        <button @click="replacingAnArray">替换数组</button>
    </div>
</template>
<script>
    export default {
        name: 'Demo1842',
        data() {
            return {
                items: [
                    {message: 'Foo'},
                    {message: 'Bar'},
                ]
            }
        },
        methods: {
            replacingAnArray: function() {
                this.items = this.items.filter(function(item) {
                    return item.message.match(/Foo/);
                })
            }
        }
    }
</script>
