<template>
    <div class="default-div">
       <h2>4.3.1 渲染函数 & JSX -- 基础</h2>
        <AnchoredHeading :level="level">Hello world!</AnchoredHeading>
    </div>
</template>
<script>
    import AnchoredHeading from './anchored-heading-jsx';
    export default {
        name: 'Demo423',
        data() {
            return {
                level: 3
            }
        },
        components: {
            AnchoredHeading,
        }
    }
</script>
<style scoped></style>
