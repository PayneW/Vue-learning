<template>
    <div id="Demo244" class="default-div">
        <h2>2.4.5 作用域插槽 (Scoped Slot)</h2>
        <current-user>
            <template v-slot:default="slotProps">
                {{ slotProps.user.firstName }}
            </template>
        </current-user>
    </div>
</template>
<script>
    import CurrentUser from './current-user';
    export default {
        name: 'Demo245',
        components: {
            CurrentUser,
        }
    }
</script>
