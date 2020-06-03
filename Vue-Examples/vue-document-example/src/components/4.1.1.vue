<template>
    <div class="default-div">
       <h2>4.1.1 混入--基础</h2>
       <p>{{mixinValue}}</p>
    </div>
</template>

<script>
    const myMixin = {
        data() {
            return {
                mixinValue: "",
                messge: 'hello',
                foo: 'abc'
            }
        },
        created: function() {
            this.hello()
        },
        methods: {
            hello: function() {
                this.mixinValue = "Hello from mixin!"
            },
            foos: function() {
                console.log('foo')
            },
            conflicting: function() {
                console.log('from mixin')
            }
        }
    };
    export default {
        mixins: [myMixin],
        name: 'Demo411',
        data() {
            return {
                messge: 'Hello Vue',
                bar: 'def'
            }
        },
        created: function() {
            // => {"messge": "Hello Vue", "bar": "def",
            //     "mixinValue": "Hello from mixin!", "foo": "abc"}
            // - tip: 注意这里的的 console 会输出 2 次, 因为利用 mixin
            //   合并, 肯定要把每个对象中的属性/方法都执行一遍.
            // console.log(JSON.stringify(this.$data))
        },
        methods: {
            bars: function() {
                console.log('bar')
            },
            conflicting: function() {
                console.log('from self')
            }
        }
    }
</script>

<style scoped></style>
