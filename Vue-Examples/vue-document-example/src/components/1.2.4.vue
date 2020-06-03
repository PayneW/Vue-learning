<template>
    <div id="app-4" class="default-div">
        <h2>1.2.4: v-for</h2>
        <ol>
            <li v-for = 'todo in todos' :key="todo.index">
                {{ todo.text }}
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: 'Demo124',
        data() {
            return {
                todos:[
                    {text: '学习 JavaScript', index: 0},
                    {text: '学习 Vue', index: 1},
                    {text: '建个项目', index: 2},
                ]
            }
        }
    }
</script>

<style scoped>
    #app-4 {}
</style>
