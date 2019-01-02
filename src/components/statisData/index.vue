<template>
    <div>
      <button @click="jump('F')">统计服务</button>
      <button @click="jump('G')">统计公报</button>
      <button @click="jump('Z')">统计制度</button>
      <button @click="detail">各月主要经济指标完成情况</button>
    </div>
</template>

<script>
    export default {
        name: "index",
      methods:{
          jump(n){
            this.$router.push({path:'/list/'+n})
          },
          detail(){
            this.$router.push({path:'/statisData'})
          }
      }
    }
</script>

<style scoped>

</style>
