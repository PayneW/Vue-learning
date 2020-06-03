<template>
    <div id="app-1513" class="default-div">
        <h2>1.5.1.3: 计算属性 vs 侦听属性</h2>
         <p>{{ fullName }}</p>
    </div>
</template>

<script>
    export default {
        name: 'Demo1514',
        data() {
            return {
                firstName: 'Foo',
                lastName: 'Bar',
            }
        },
        computed: {
            fullName: function() {
                return this.firstName + ' ' + this.lastName
            }
        },
    }
</script>
