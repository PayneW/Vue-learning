<template>
    <div class="notice">
        <div class="notice-t"><span :class="{bg1:chose1,bg2:chose2}" @click="changeBg"></span>《平台免责声明》</div>
        <div class="notice-con">注：我们将在3个工作日内告知您申请结果，届时请注意查看哦~</div>
    </div>
</template>

<script>
    export default {
        name: "self_auth",
        data(){
            return{
                chose1:true,
                chose2:false
            }
        },
        methods:{
            changeBg(){
                this.chose1=!this.chose1;
                this.chose2=!this.chose2
            }

        }
    }
</script>