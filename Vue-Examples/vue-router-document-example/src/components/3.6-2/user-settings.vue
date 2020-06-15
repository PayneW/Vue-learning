<template>
    <div class="us">
        <UserSettingsNav/>

       <div class=view-div>
            <router-view/>
            <router-view name="helper"/>
       </div>
    </div>
</template>

<script>
import UserSettingsNav from './user-settings-nav';


export default {
    name: 'UserSettings',
    components: {
        UserSettingsNav
    }
}
</script>

<style lang="stylus" scoped>
.us {
    min-height: 120px;
    margin-top: 5px;
    display: flex;
    background: lightblue;
    justify-content: space-between;

    .view-div {
        display: flex;
        flex-basis: 70%;
        background: #eaeaea;
        flex-direction: column;
    }
}

</style>
