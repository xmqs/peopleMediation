<template>
  <span :class="pStatics">{{state}}</span>
</template>

<script>
    export default {
      name: "state",
      data(){
        return{
          pStatics:"",
          state:""
        }
      },
      props: {
        status: ""
      },
      mounted(){
        switch (this.status){
          case "1000" :this.pStatics = "pStatic3"; this.state = "草稿";  break;
          case "1001" :this.pStatics = "pStatic4"; this.state = "待受理";  break;
          case "2000" :this.pStatics = "pStatic4"; this.state = "待调解";  break;
          case "3001" :this.pStatics = "pStatic3"; this.state = "调解结束";  break;
          case "3002" :this.pStatics = "pStatic"; this.state = "调解成功";  break;
          case "2003" :this.pStatics = "pStatic4"; this.state = "调解中";  break;
          case "3003" :this.pStatics = "pStatic3"; this.state = "已评价";  break;
          case "3004" :this.pStatics = "pStatic2"; this.state = "已驳回";  break;
        }
      }

    }
</script>

<style scoped>
  .pStatic{
    color: #26CD79;
  }
  .pStatic2{
    color: #FE4D4D;
  }
  .pStatic3{
    color: #ccc;
  }
  .pStatic4{
    color: #4D7BFE;
  }
</style>
