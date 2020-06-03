<template>
    <div class="default-div">
        <h2>1.9.3: 内联处理器中的方法 + `$event`</h2>
        <p>
            <button @click="warn('Form cannot be submitted yet!', $event)">
                Submit
            </button>
        </p>
        <p>{{ msg }}</p>
    </div>
</template>
<script>
    export default {
        name: 'Demo193',
        data() {
            return {
                msg: ''
            }
        },
        methods: {
            warn: function(message, event) {
                // - 现在我们可以访问原生事件对象
                if (event) {
                    event.preventDefault()
                }
                this.msg = message + ' ' + event.target.tagName;
            }
        }
    }
</script>
