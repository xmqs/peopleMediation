<template>
    <div>
      <div class="header">
        <span @click="changeState(100)" :class="{'active':state==100}">待受理</span>
        <span @click="changeState(200)" :class="{'active':state==200}">待调解</span>
        <span @click="changeState(300)" :class="{'active':state==300}">已完成</span>
      </div>
      <div class="main">
        <div class="img" v-show="list.length==0&&!loading">
          <img src="./../../../static/img/nodata.png" alt="" width="150px">
          <div>暂无申请</div>
        </div>
        <div class="img" v-show="loading">
          <img src="./../../../static/img/loading.png" alt="" width="80px" class="load">
        </div>
        <div class="item" v-for="item in list">
          <div class="item_main" @click="toDetail(item.mediationId,item.orderStatus)">
            <p>申请人：{{item.applicantName}}</p>
            <p>联系方式：{{item.applicantContact}}</p>
            <p>申请时间：{{item.applicationTime}}</p>
          </div>
          <div class="item_state" @click="toDetail2(item.mediationId,item.orderStatus,item.isEvalution)">
            <nstate :status="item.orderStatus"></nstate>
            <div class="canEvaluation" v-if="(item.orderStatus==3002||item.orderStatus==3001)&&item.isEvalution=='false'">（待评价）</div>
            <div class="canEvaluation" v-if="item.isEvalution=='true'">（已评价）</div>
          </div>
        </div>
      </div>
        <div class="bottom" v-if="state==100">
          <div class="swiper-container swiper-no-swiping">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="i in news">
                <div class="link">
                  {{i}}
                </div>
              </div>
              <div class="swiper-slide" v-if="news.length==0">
                <div class="link">
                  暂无
                </div>
              </div>
            </div>
          </div>
          <div class="button" @click="toCommit">
            申请调解
          </div>
        </div>
    </div>
</template>

<script>
  import axios from "axios"
  import nstate from "./state"
  import Swiper from 'swiper';
    export default {
      name: "index",
      data(){
          return{
            list:[],
            state:100,
            userID:"",
            loading:true,
            news:[],
            swiper:{}
          }
      },
      components:{
        nstate
      },
      methods:{
        getList(){
          this.loading = true;
          axios.post("/myjn-server/mediation/orderList.do",{
            "userID":this.userID,
            "nodeStatus":this.state
          }).then(res=>{
            this.list = res.data.data;
            this.loading = false;
          })
        },
        toCommit(){
          if(JSON.parse(sessionStorage.getItem('userifo')).userId!==""){
            this.$router.push('/mediation/mediationInp');
          }else{
            mui.toast('正在获取用户信息请稍后',{ duration:'short', type:'div' });
          }
        },
        changeState(n){
          this.list = [];
          this.state = n;
          this.getList();
        },
        toDetail(id,st){
          if(st=="1000"){
            /*评价入口*/
            this.$router.push("/mediation/mediationInp/"+id);
          }else{
            this.$router.push("/mediation/mediationDetail/"+id);
          }
        },
        toDetail2(id,st,ts){
          if(st=="1000"){
            /*评价入口*/
            this.$router.push("/mediation/mediationInp/"+id);
          }else if(ts == 'false'&&(st=="3001"||st=="3002")){
            /*评价入口*/
            this.$router.push("/mediation/evaluation/"+id);
          }else{
            this.$router.push("/mediation/mediationDetail/"+id);
          }
        }
      },
      mounted(){

        axios.get('/myjn-server/mediation/case.do').then(res=>{
          this.news = res.data.data;

          this.$nextTick(() => {
            this.swiper = new Swiper ('.swiper-container', {
              autoplay: {
                delay: 4000,
              },
              loop : true,
              direction : 'vertical',
              autoHeight:true,
              observer:true,
              observeParents:true,
            })
          });

        })
      },
      activated(){
        this.list = [];
        let t3 = setInterval(()=>{
          if(JSON.parse(sessionStorage.getItem('userifo')).userId!==""){
            this.userID = JSON.parse(sessionStorage.getItem('userifo')).userId;
            clearInterval(t3);
            this.getList();
          }
        },100)

        setTimeout(()=>{
          if(JSON.parse(sessionStorage.getItem('userifo')).userId==""){
            mui.toast('未获取到用户信息，请稍后尝试',{ duration:'short', type:'div' });
          }
          clearInterval(t3);
        },10000)
      }
    }
</script>

<style scoped>
  .header{
    height: 72px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    padding: 0 65px;

    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 999;

    border-bottom: 1px solid #EEEEEE;
  }
  .header span{
    font-size:32px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    padding:13px 20px;
    color: #666;
    border-bottom: 4px solid #fff;
  }
  .header span.active{
    line-height:42px;
    color: #4D7BFE;
    border-bottom: 4px solid #4D7BFE;
  }
  .main{
    padding: 93px 0 165px 20px;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #f5f5f5;
  }
  .bottom{
    position: fixed;
    bottom: 0;
    height: 164px;
    width: 100%;
    background: #fff;
    z-index: 999;

    border-top: 1px solid #EEEEEE;
  }

  .item{
    width: 710px;
    background: #fff;
    display: flex;
    margin-bottom: 20px;

    justify-content:space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 35px 0 35px 32px;
  }

  .item_main{
    width: 450px;
    border-right: 1px solid #EEEEEE;
  }
  .item_main p{
    font-size:30px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:52px;
  }
  .item_state{
    flex-grow:1;
    text-align: center;

    font-size:30px;
    font-weight:400;
  }

  .link{
    height: 64px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;

    font-size:24px;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding: 0 30px 0 90px;
    line-height: 68px;

    background: url("./../../../static/img/icon.png") no-repeat 20px center;

    background-size: 51px 23px;
  }
  .button{
    height: 100px;
    background: #4D7BFE;
    text-align: center;
    line-height: 100px;
    font-size:34px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .canEvaluation{
    font-size: 20px;
    color: #666;
  }
  .img{
    text-align: center;
    font-size: 26px;
    color: #666;
    padding-top: 200px;
  }

  .load{
    @keyframes rotating{
      from{transform:rotate(0)}
      to{transform:rotate(360deg)}
    }

    animation:rotating 2s linear infinite
  }

  .swiper-container{
    height: 64px;
  }
</style>
