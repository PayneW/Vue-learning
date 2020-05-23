<template>
    <div class="default-div">
        <h2>4.3.4.4 JSX 插槽</h2>
        <slot-jsx>
            <template v-slot:default>
                <span>我是默认插槽中的内容</span>
            </template>
        </slot-jsx>
    </div>
</template>
<script>
    import SlotJsx from './slot-jsx';
    export default {
        name: 'Demo4344',
        data() {
            return {
               
            }
        },
        components: {
            SlotJsx,
        }
    }
</script>
