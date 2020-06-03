<template>
    <div id="Demo244" class="default-div">
        <h2>2.4.4 具名插槽(named slots)</h2>
        <base-layout>
            <template v-slot:header>
                <h1>Here might be a page title</h1>
            </template>

            <template v-slot:default>
                <p>A paragraph for the main content.</p>
                <p>And another one.</p>
            </template>

            <template v-slot:footer>
                <p>Here's some contact info</p>
            </template>
        </base-layout>
    </div>
</template>
<script>
    import BaseLayout from './base-layout';
    export default {
        name: 'Demo244',
        components: {
            BaseLayout,
        }
    }
</script>
