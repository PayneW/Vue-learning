<template>
    <div>
        <p>基础组件 base-input</p>
        <label>
            <span> {{ label }}: </span>
            <input
                ref="input"
                type="text"
                v-bind="$attrs"
                :value="value"
                v-on="inputListeners"
            >
        </label>
    </div>
</template>
<script>
    export default {
        name: 'BaseInput',
        // - 此处设置禁用继承特性
        inheritAttrs: false,
        props: ['label', 'value'],
        mounted: function() {
            // console.log(this.$attrs)
        },
        computed: {
            inputListeners: function() {
                let vm = this;
                // - Object.assign 将所有的对象合并为一个新对象
                return Object.assign({},
                    // - 我们从父级添加所有的监听器
                    this.$listeners,
                    // - 然后我们添加自定义监听器, 或覆写一些监听器的行为
                    {
                        // - 这里确保组件配合 `v-model` 来工作
                        input: function(event) {
                            vm.$emit('input', event.target.value)
                        }
                    }
                )
            }
        }
    }
</script>
<style lang="stylus" scoped>
   @import "./base-components-style.styl"
</style>
