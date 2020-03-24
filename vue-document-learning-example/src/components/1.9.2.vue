<template>
    <div id="app192" class="default-div">
        <h2>1.9.2: 事件处理方法</h2>
        <div id="example-2">
            <!-- `greet` 是下面定义的方法名 -->
            <button @click="greet">Greet</button>
            <p> {{ target }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Demo191',
        data() {
            return {
                name: '01-Vue.js',
                target: ''
            }
        },
        methods: {
            greet: function(event) {
                // `this` 在方法里指向当前 Vue 实例
                console.log('Hello ' + this.name + '!');
                // `event` 是原生 DOM 事件
                if (event) {
                    this.target
                        = "Getting from " + event.target.tagName + "'s greeting!"
                }
            }
        }
    }
</script>
