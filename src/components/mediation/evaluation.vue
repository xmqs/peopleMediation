<template>
    <div>
      <div class="header">
        <div @click="changeState('T')" :class="{'active':data.evaluationStatus=='T'}">满意</div>
        <div @click="changeState('F')" :class="{'active':data.evaluationStatus=='F'}">不满意</div>
      </div>
      <div>
        <textarea rows="6" cols="20" placeholder="亲！评价一下吧…" class="t" v-model="data.evaluationInfo">

        </textarea>
      </div>
      <div class="tip">
        提示：在规定的时间内未评价系统则自动默认为满意
      </div>
      <div class="button" @click="evaluation">
        发布评价
      </div>
    </div>
</template>

<script>
  import axios from "axios"
    export default {
      name: "evaluation",
      data(){
          return{
            data:{
              mediationId:"",
              evaluationStatus:"",
              evaluationInfo:""
            }
          }
      },
      mounted(){
        this.data.mediationId = this.$route.params.id;
      },
      methods:{
        changeState(N){
          this.data.evaluationStatus = N;
        },
        evaluation(){
          if(this.data.evaluationStatus==""){
            mui.toast('请选择满意或者不满意',{ duration:'short', type:'div' });return;
          }

          axios.post("/myjn-server/mediation/evaluation.do",this.data).then(res=>{
            if(res.data.result == 1){
              mui.toast('评价成功',{ duration:'short', type:'div' });
              setTimeout(()=>{
                this.$router.go(-1);
              },1000)
            }
          })
        }
      }
    }
</script>

<style scoped>
  .header{
    height: 120px;
    display: flex;
    align-items: center;
    justify-content:space-around ;
    padding: 0 90px;
  }
  .header div{
    width: 180px;
    height: 62px;
    font-size: 28px;
    line-height: 62px;
    border: 1px solid #999;
    color: #999;
    border-radius: 4px;
    text-align: center;
  }
  .header div.active{
    border: 1px solid #4D7BFE;
    color: #4D7BFE;
    background: #EDF1FE;
  }
  .t{
    font-size:28px;
    border: 1px solid #eee;
    padding: 20px 32px;
  }
  .tip{
    font-size: 24px;
    color: #AAAAAA;
    padding: 20px 32px;
  }
  .button{
    margin: 0 auto;
    width: 670px;
    height: 92px;
    background: #4D7BFE;
    font-size:34px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 92px;
    text-align: center;
    border-radius: 4px;
  }
</style>
