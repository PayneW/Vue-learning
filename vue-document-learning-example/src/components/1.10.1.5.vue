<template>
    <div id="app11015" class="default-div">
        <h2>1.10.1.5: `v-model` select-option 多选</h2>
        <div id="example-7">
            <select v-model='selected'  multiple style="width: 50px;">
            <!-- 选中的 option 会把 value 赋值给外围 select 上利用 v-model
                 添加的双向数据绑定的 selected 属性上-->
                <option
                    v-for="option in options"
                    :value="option.value"
                    :key="option.value"
                >
                    {{ option.text }}
                </option>
            </select>
            <!-- 上面 select 的 selected 属性值发生改变此处的值也会发生改变. -->
            <span>Selected: {{ selected }}</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Demo11015',
        data() {
            return {
                selected: [],
                options: [
                    {text: 'One', value: 'A'},
                    {text: 'Two', value: 'B'},
                    {text: 'Three', value: 'C'},
                    {text: 'Four', value: 'D'}
                ]
            }
        },
        created() {
            this.$nextTick(function() {
                this.selected.push(this.options[0].value);
            })
        },
    }
</script>
<style scoped>
    #example-5 {
        margin-top: 10px;
    }
    span {
        margin-left: 20px;
    }
</style>
