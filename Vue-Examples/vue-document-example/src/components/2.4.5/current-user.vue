<template>
    <div>
        <slot v-bind:user="user">
            {{ user.lastName }}
        </slot>
    </div>
</template>
<script>
    export default {
        name: 'CurrentUser',
        data() {
            return {
                user: {
                    firstName: 'Evan',
                    lastName: 'You'
                }
            }
        }
    }
</script>
