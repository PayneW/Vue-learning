<template>
    <div class="default-div">
       <h2>4.2.3 钩子函数参数</h2>
       <div v-demo:foo.a.b="message"></div>
    </div>
</template>

<script>
    export default {
        name: 'Demo423',
        data() {
            return {
                message: 'Hello!'
            }
        },
        directives: {
            demo: {
                // - 自定义指令的定义
                bind: function(el, binding, vnode) {
                    var s = JSON.stringify;
                    // - name: 为自定义指令名.
                    // - value: 为给自定义指令传递的值.
                    // - expression: 指令绑定值的字符串形式.
                    // - arg: 传递给自定义指令的参数, 这里为 `foo`
                    // - modifiers: 修饰符对象, 此处是 `{a:true, b:true}`
                    // - vnode: Vue 编译后生成的虚拟节点.
                    el.innerHTML = 
                        'name: ' + s(binding.name) + '<br>' + 
                        'value: ' + s(binding.value) + '<br>' + 
                        'expression: ' + s(binding.expression) + '<br>' + 
                        'argument: ' + s(binding.arg) + '<br>' + 
                        'modifiers: ' + s(binding.modifiers) + '<br>' +
                        'vnode keys: ' + Object.keys(vnode).join(', ')
                }
            }
        }
        
    }
</script>

<style scoped>
    .default-div {
        min-height: 220px;
        overflow-y: auto;
    }
</style>
