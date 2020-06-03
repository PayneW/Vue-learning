<template>
    <span>{{ tweeningValue }}</span>
</template>

<script>
    import TWEEN from '@tweenjs/tween.js';

    // - 这种复杂的补间动画逻辑可以被复用, 任何整数都可以执行动画,
    //   组件化使我们的界面十分清晰, 可以支持更多更复杂的动态过渡策略.
    export default {
        name: 'BaseAnimatedInteger',
        props: {
            value: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                tweeningValue: 0
            }
        },
        watch: {
            // - 监听 props 对象内的 value 属性值的变化, 当前值为 oldValue,
            //   如果有新值传入, 则命名为 newValue
            value: function(newValue, oldValue) {
                // - 调用当前 methods 对象下的 tween 方法, 传入 oldValue 和
                //   newValue,
                this.tween(oldValue, newValue);
            }
        },
        // - 模板编译之后
        mounted: function() {
            // console.log("this.value: ", this.value);
            this.tween(0, this.value);
        },
        methods: {
            tween: function(startValue, endValue) {
                var vm = this;
                function animate() {
                    if (TWEEN.update()) {
                        requestAnimationFrame(animate);
                    }
                }

                // - 注意: tween.js 从 16 版本开始, 对 onUpdate 方法
                //   接收的匿名函数做了调整, 原来匿名函数不接收参数,
                //   现在必须传入一个 objec 的参数, 此 object
                //   应该代表当前对象本身.
                new TWEEN.Tween({tweeningValue: startValue})
                    .to({tweeningValue: endValue}, 500)
                    .onUpdate(function(object) {
                        vm.tweeningValue = object.tweeningValue.toFixed(0);
                    })
                    .start();

                animate()
            }
        }
    }
</script>

<style scoped></style>
