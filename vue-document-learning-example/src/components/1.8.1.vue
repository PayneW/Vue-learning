<template>
    <div id="app181" class="default-div">
        <h2>1.8.1: 用 `v-for` 把一个数组对应为一组元素 </h2>
        <ul id='example-1'>
            <li v-for="(item, index) in items" :key="index">
                {{ parentMessage }} - {{ index }} - {{ item.message }}
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'Demo181',
        data() {
            return {
                parentMessage: 'Parent',
                items: [
                    {message: 'Foo'},
                    {message: 'Bar'},
                ]
            }
        }
    }
</script>
