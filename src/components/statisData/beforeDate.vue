<template>
  <div class="main">
    <div class="header">
      {{year}}年1~{{month}}月主要经济指标完成情况
    </div>
    <div class="title0">
      <div class="t1">指标（单位）</div>
      <div class="t2">总数</div>
      <div class="t2">同比（%）</div>
    </div>
    <div class="wall">
      <div id="scroll">
        <div class="page" v-for="(item,i) in data">
        <div class="title" @click="showDetail(i)">
          <div class="t1">
            <div>{{item.indexName}}（{{item.indexUnit}}）</div>
            <img src="./../../../static/img/xia.png" alt="" width="18px" v-if="item.indexDetail" class="down" :class="'a'+i">
          </div>
          <div class="t2">{{item.indexValue}}</div>
          <div class="t2">{{item.indexBasis}}</div>
        </div>
        <div class="title2 none" v-for="index in item.indexDetail" :class="'c'+i">
          <div class="t1">
            <div>{{index.indexTitle}}（{{index.indexUnit}}）</div>
          </div>
          <div class="t2">{{index.indexValue}}</div>
          <div class="t2">{{index.indexBasis}}</div>
        </div>
      </div>
      </div>
    </div>
    <!--<div class="time_picker" @click="timePicker">
            请选择时间
    </div>-->

  </div>
</template>

<script>
  import axios from "axios"
  import $ from "jquery"

  export default {
      data(){
            return{
              pickerValue:'',
              year:"2014",
              month:"12",
              data:{},
            }
      },
      mounted(){
		this.year=this.$route.params.indexDate;
        this.getdata(this.year);
        //this.timePicker()
      },
      methods:{
        getdata(year){
          axios.post('/myjn-server/statistics/getAllData.do',{
            "indexDate":year
          }).then(res=>{
            this.data = res.data.data;
          })
        },
        showDetail(i) {
          if($('.a'+i).hasClass("up")){
            $('.a'+i).removeClass("up")
          }else{
            $('.a'+i).addClass("up")
          }

          if($('.c'+i).hasClass("none")){
            $('.c'+i).removeClass("none").addClass("show");
          }else{
            $('.c'+i).removeClass("show").addClass("none");
          }

        }
      }
    }
</script>

<style scoped>
  *{
    -webkit-overflow-scrolling: touch;
  }
  .main{
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .header{
    text-align: center;
    color: #179cec;
    font-size: 34px;
    line-height: 90px;
    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 999;
    height: 90px;
  }
  /*.wall{
    padding: 180px 0 90px 0;
    width: 100%;
  }*/
  #scroll{
    padding: 170px 0 0 0;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .title0{
    display: flex;
    border-top: 1px solid #eee;
    padding: 16px 32px;
    align-items: center;
    position: fixed;
    top: 90px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    z-index: 999;
    height: 80px;
  }
  .title{
    display: flex;
    padding: 16px 32px;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .title2{
    display: flex;
    border-top: 1px solid #eee;
    padding: 16px 32px;
    align-items: center;
    background: #eee;
  }
  .t1{
    flex-grow: 1;
    font-size: 28px;
    display: flex;
    align-items: center;
  }
  /*.t1 img{
    margin-left: 16px;
  }*/
  /*.t1{
    width:50%;
   display: flex;
   align-items:center;

  }
  .t1>div:first-child{
    width:90%;
    float: left;
    margin:10px 0;
  }
  .t1>.divimg{
    float: right;
    width:50%;
  }
  .t1>.divimg>img{
    width:100%;
    max-width: 20px;
  }*/
  .t2{
    min-width: 160px;
    white-space: nowrap;
    font-size: 28px;
    text-align: center;
    box-sizing: border-box;
  }
  .time_picker{
    position: fixed;
    bottom: 0;
    height: 90px;
    width: 100%;
    background: #EEEEEE;
    text-align: center;
    line-height: 90px;
    font-size: 32px;
  }
  .show{
    display: flex;
  }
  .none{
    display: none;
  }

  .down{
    transition: all .4s;
    -moz-transition: all .4s; /* Firefox 4 */
    -webkit-transition: all .4s; /* Safari 和 Chrome */
    -o-transition: all .4s; /* Opera */
  }
  .up{
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); 	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg); 	/* Opera */
  }
</style>
<style>
  .mui-dtpicker-title h5{
    font-size: 28px!important;
  }
</style>
