
<!--https://segmentfault.com/a/1190000011707883-->

<template>
    <div class="template">
        <!--待办任务-->
        <ul>
            <li v-for="(work_task,index) in tasks">
                <!--使用v-bind动态绑定id传递给目标路径-->
                <router-link tag="a" :to="{path:'/workTaskEdit',query{id:work_task.id}}">
                    <div class="mui-navigate-right">
                        <span>{{index+1}}.</span>
                        <span>{{work_task.title}}</span>
                        <span>
              {{work_task.schedulel}}%
            </span>
                    </div>
                </router-link>
            </li>
        </ul>

    </div>
</template>


<script>
    export default {
        data() {
            return {
            }
        },
        created() {
            this.id = this.$route.query.id;//获取上个页面传递的id,在下面获取数据的时候先提交id
        },
    }
</script>
