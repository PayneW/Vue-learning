<template>
    <div id="app11162" class="default-div">
        <h2>1.11.6.2 在组件上使用 v-model</h2>
        <custom-input v-model="searchText"></custom-input>
        <p>输入框中的值为:  {{ searchText }}</p>
    </div>
</template>
<script>
    import CustomInput from './component_use_v-model';
    export default {
        name: 'Demo11162',
        data() {
            return {
                searchText: ''
            }
        },
        components: {
            CustomInput,
        }
    }
</script>
