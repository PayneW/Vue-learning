<template>
    <div id="app11013" class="default-div">
        <h2>1.10.1.3: `v-model` 多个(multi)复选框(checkbox)</h2>
        <p class="checkbox-wrapper">
            <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
            <label for="jack">Jack</label>
            <input type="checkbox" id="john" value="John" v-model="checkedNames">
            <label for="john">John</label>
            <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
            <label for="mike">Mike</label>
        </p>
        <span>checked Names: {{ checkedNames }}</span>
    </div>
</template>
<script>
    export default {
        name: 'Demo11013',
        data() {
            return {
                checkedNames: []
            }
        }
    }
</script>
<style scoped>
    .checkbox-wrapper {
        margin-top: 10px;
        min-height: 30px;
    }
    input {
        margin-right: 5px;
    }
    label {
        margin-right: 10px;
    }
</style>
