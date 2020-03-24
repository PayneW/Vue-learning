<template>
    <div id="app152" class="default-div">
        <h2>1.5.2: 侦听器(Watchers)</h2>
        <div id="watch-example">
            <p>
                Ask a yes/no question:
                <input v-model="question">
            </p>
            <p>{{ answer }}</p>
        </div>
    </div>
</template>


<script>
    // - 使用 ES6 的方式引入 axios 和 lodash.
    // - 注意: 下面都是用的 `_` 来表示的 lodash.
    import axios from 'axios';
    import _ from 'lodash';

    export default {
        name: 'Demo152',
        data() {
            return {
                question: '',
                answer: 'I cannot give you an answer until you ask a question!'
            }
        },
        watch: {
            // - 如果 `question` 发生改变, 这个函数就会运行
            question: function(newQuestion, oldQuestion) {
                console.log('newQuestion:', newQuestion);
                console.log('oldQuestion', oldQuestion);
                this.answer = 'Waiting for you to stop typing...';
                this.debouncedGetAnswer()
            }
        },
        created: function() {
            // - `_.debounce` 是一个通过 Lodash 限制操作频率的函数. 在这个例子中,
            //   我们希望限制访问 yesno.wtf/api 的频率; AJAX 请求直到用户输入完毕
            //   才会发现. 想要了解更多关于 `_.debounce` 函数
            //   (及其近亲 `_.throttle`) 的知识,
            //   请参考: https://lodash.com/docs#debounce

            // - 函数节流和函数防抖的简单参考:
            //   `/js-sundry-goods/20190224-函数节流和防抖/函数节流和防抖.md`
            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        },
        methods: {
            getAnswer: function() {
                if (this.question.indexOf('?') === -1) {
                    this.answer =
                        'Questions usually contain a question mark. ;-)';
                    return;
                }
                this.answer = 'Thinking...';
                let vm = this;
                axios.get('https://yesno.wtf/api')
                    .then(function(response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function(error) {
                        vm.answer = 'Error! Could not reach the API. ' + error;
                    })
            }
        }
    }
</script>
