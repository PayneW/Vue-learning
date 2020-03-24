<template>
    <div id="app-1514" class="default-div">
        <h2>1.5.1.4: 计算属性的 setter</h2>
        <p><input v-model="fullName" placeholder="请输入一个姓名"></p>
        <p>{{ fullName }}</p>
    </div>
</template>

<script>
    export default {
        name: 'Demo1513',
        data() {
            return {
                name: 'Evan You'
            }
        },
        computed: {
            fullName: {
                // - getter
                get: function() {
                    return this.name;
                },
                // - setter
                set: function(newName) {
                    this.name = newName;
                }
            }
        },
    }
</script>
