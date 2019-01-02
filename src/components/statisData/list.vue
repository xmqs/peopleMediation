<template>
    <div class="ul">
      <div class="li" v-for="item in data" @click="jump(item.fileURL)">
        <div class="title">
          {{item.fileName}}
        </div>
        <div class="msg">
          {{item.releaseTime}}
          {{item.source}}
        </div>
      </div>
    </div>
</template>

<script>
  import axiso from 'axios'
    export default {
        name: "list",
      data(){
        return{
          data:[]
        }
      },
      methods:{
        jump(url){
          window.location = "http://192.168.0.37:8000/jn/pdf/whjn/pdf.html?url="+url;
        }
      },
      mounted(){
          axiso.post('/myjn-server/statistics/getFilesList.do',{
              "fileCategory":this.$route.params.static,
              "pageNo":"1",
              "pageSize":"20"
            }).then(res=>{
              this.data = res.data.data
          })
      }
    }
</script>

<style scoped>
  .ul{
    padding: 0 32px;
  }
  .li{
    padding: 16px 0;
    border-bottom: 1px solid #ddd;
  }
  .li:last-child{
    border-bottom: 0;
  }
  .title{
    font-size: 32px;
  }
  .msg{
    font-size: 24px;
    color: #666;
  }
</style>
