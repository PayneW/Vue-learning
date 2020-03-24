<template>
    <div id="app1714" class="default-div">
        <h2>1.7.1.4: 用 key 管理可复用的元素</h2>
        <template v-if="loginType === true">
           <div class="add-flex">
               <label>Username:</label>
               <input placeholder="Enter your username">
           </div>
        </template>
        <template class="add-flex" v-else>
            <div class="add-flex">
                <label>Email:</label>
                <input placeholder="Enter your email address">
            </div>
        </template>
        <button @click="loginType = !loginType">Toggle login Type</button>
    </div>
</template>
<script>
    export default {
        name: 'Demo1714',
        data() {
            return {
                loginType: true
            }
        },
    }
</script>
<style scoped>
    .add-flex {
        display: flex;
        margin-bottom: 10px;
        justify-content: left;
    }
    .add-flex > label {
        flex-basis: 26%;
        display: flex;
        justify-content: left;
        /* - align-items 设置交叉轴为 center 实现文字垂直居中 */
        align-items: center;
    }
    input { width: 200px; }
</style>
