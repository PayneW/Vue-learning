<template>
    <div class="us">
        <h3>用户设置 User Settings</h3>
        <div class="row">
            <div class="col-sm-3 col-md-3 col-lg-3">
                <userSettingsNav/>
            </div>

            <div class="right-plate col-sm-8 col-md-8 col-lg-8" ref="show">
                <router-view/>
                <router-view name="helper" class="us-helper"/>
            </div>
        </div>
    </div>
</template>

<script>
    // vue如何在一个组件中引用另外一个组件
    // https://blog.csdn.net/lzzattack03x/article/details/79244687
    import userSettingsNav from "./UserSettingsNav";
    export default {
        components: { userSettingsNav },
        name: "userSettings",

        mounted() {
            /*this.$refs.show.style.lineHeight = this.$refs.show.getBoundingClientRect().height + "px";*/
        }
    }
</script>

<style scoped="scoped">
    .us > h3 {
        margin: 1rem 0;
    }
    .right-plate {
        border-radius: 4px;
        background: #B4C07B;
        text-align: left;
        margin-bottom: 1rem;
        line-height: 2rem;
    }
    .us-helper {
        color: #F07D52;
        text-indent: 2rem;
    }
</style>