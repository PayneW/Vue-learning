<template>
    <div class="default-div">
        <h2>2.6.1.3 访问子组件实例或子元素</h2>
        <base-input
            label="姓名"
            v-model="inputValue"
            v-on="$listeners"
            placeholder="Enter your name"
            @input="focus()"
        ></base-input>
    </div>
</template>

<script>
    import BaseInput from '../base-components/base-input';
    export default {
        name: 'Demo2613',
        data() {
            return {
                inputValue: ''
            }
        },
        methods: {
          focus: function() {
              this.$refs.input.focus();
              console.log(111111);
          }
        },
        components: {
            BaseInput
        }
    }
</script>
