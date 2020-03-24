<template>
    <div id="app-1511" class="default-div">
        <h2>1.5.1.1 计算属性-基础示例</h2>
        <div id="example">
            <!-- Tip: 从下面的 JS 代码中可以看到 `reversedMessage`
              是一个方法属性, 但是在当前模板中, 如果不给 `reversedMessage`
              传递参数, 不需要在其后添加 `()`, Vue 源码内部会帮我们做处理,
              我想这样是 Vue 称呼其名叫 `计算属性` 属性的原因,
              传递参数的写法见, 见下个 `p` 标签.-->
            <p>Original message: "{{ message }}"</p>
            <p>Passing parameters to Computed Properties: {{ passPar(666)}}</p>
            <p>Computed reversed message: "{{ reversedMsg() }}"</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo1511',
        data() {
            return {
                message: 'Hello'
            }
        },
        computed: {
            // - 计算属性的 getter
            reversedMessage: function() {
                // - this 执行 vm 实例
                // - String.split(): 基于指定的分隔符, 把字符串转换为数组
                return this.message.split('').reverse().join('')
            },
            passPar() {
                return function(num) {
                    return num;
                }
            }
        },
        methods: {
            reversedMsg: function() {
                return this.message.split('').reverse().join('')
            }
        }
    }
</script>
