<template>
    <div id="app182" class="default-div">
        <h2>1.8.2: 在 `v-for` 里使用对象</h2>
        <ul id='v-for-object' class="demo">
           <li v-for="(value, name, index) in object" :key="index">
               {{ index + 1 }}. {{ value }}
           </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'Demo182',
        data() {
            return {
                object: {
                    title: 'How to do lists in Vue',
                    author: 'Jane Doe',
                    publishedAt: '2016-04-10',
                }
            }
        }
    }
</script>
