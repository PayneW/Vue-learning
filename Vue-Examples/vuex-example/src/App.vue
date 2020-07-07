<template>
    <div id="app">
        <h2>Vuex 示例</h2>
        <div id="nav">
            <router-link to="/count">Count (计数)</router-link>
            <router-link to="/shopping-cart">Shopping Cart</router-link>
            <router-link to="/todos">Todos</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style lang="stylus">
    #app
        font-family Avenir, Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50
        margin: 30px 0

    h2 {
        margin-bottom: 1em
    }

    #nav {
        display: flex
        height: auto
        width: 100%
        overflow: hidden
        justify-content: center
        align-items: center
        flex-wrap: wrap
        align-content: flex-start
        margin-bottom: 1.2em

        a {
            flex: 0 0 40%
            align-content: start
            background: #66cc99
            border-radius: 4px
            padding: 3px
            margin-left: .5em
            margin-bottom: .5em
            color: #000
            text-decoration: none
            word-wrap: normal
        }
    }
</style>
