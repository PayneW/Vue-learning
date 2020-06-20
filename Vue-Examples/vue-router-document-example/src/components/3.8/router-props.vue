<template>
    <div class="router-props">
         <p class="view-p">
           当前子组件的
           <br>
           <span>$route.params: {{$route.params}}</span>
           <br>
           <span>$route.path: {{$route.path}}</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: 'RouterProps',
        props: {
            name: {
                type: String,
                default: ''
            },
            years: {
                type: Function
            },
        }
    }
</script>

<style scoped>
    p {
        font-size: 0.9rem;
    }
</style>
