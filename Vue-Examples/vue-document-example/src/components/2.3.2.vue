<template>
    <div id="Demo232" class="default-div">
        <h2>2.3.2 自定义组件的 `v-model`</h2>
        <base-checkbox
            v-model="lovingVue"
        ></base-checkbox>
    </div>
</template>
<script>
    import BaseCheckbox from '../base-components/base-checkbox';
    export default {
        name: 'Demo232',
        data() {
            return {
                lovingVue: false
            }
        },
        components: {
            BaseCheckbox,
        },
        watch: {
            lovingVue: function(newValue) {
                console.log('checkbox newValue:', newValue);
            }
        }
    }
</script>
