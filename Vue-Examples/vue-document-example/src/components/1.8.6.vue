<template>
    <div id="app1842" class="default-div">
        <h2>1.8.6: 显示过滤/排序后的结果</h2>
        <ul>
           <li v-for="(num, index) in odd(numbers)" :key="index">
               {{ num }}
           </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'Demo186',
        data() {
            return {
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        },
        // computed: {
        //     evenNumbers: function() {
        //         // - 返回偶数(even)项
        //         return this.numbers.filter(function(number) {
        //             return number % 2 === 0
        //         })
        //     }
        // },
        methods: {
            odd: function(numbers) {
                return numbers.filter(function(number) {
                    return number % 2 === 1
                })
            }
        }
    }
</script>
