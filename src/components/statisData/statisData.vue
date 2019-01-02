<template>
  <div class="main">
    <div class="header">
      {{year}}年{{month==1?"":"1~"}}{{month}}月主要经济指标完成情况
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
    <div class="time_picker" @click="timePicker">
      请选择时间
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import $ from "jquery"

  export default {
      name: "statisData",
      data(){
            return{
              pickerValue:'',
              year:"",
              month:"",
              data:{},
              latestMonth:"",
            }
      },
      mounted(){
        axios.post('/myjn-server/statistics/getAllData.do',{
          "indexDate":""
        }).then(res=>{
          this.data = res.data.data;
          var newMonth = res.data.data[0].indexDate.slice(5);
		          newMonth>9?newMonth:newMonth=newMonth.slice(1);
		          this.month=newMonth;
		      var newYear = res.data.data[0].indexDate.substring(0,4);
		          this.year =newYear
        })
      },
      methods:{
        getdata(time){
          axios.post('/myjn-server/statistics/getAllData.do',{
            "indexDate":time
          }).then(res=>{
            this.data = res.data.data;
          })
        },
        timePicker() {
          var that = this;
          axios.post('/myjn-server/statistics/getLatestMonth.do',{
	            })
	            .then((res)=>{
	            	var date=res.data.data.latestMonth;
	            	date.slice(5)>9?this.latestMonth=date.slice(5):this.latestMonth=date.slice(6);
	              var dtPicker = new mui.DtPicker({
				            "type": "month",
				            "beginDate":new Date(2018,0),
				            "endDate":new Date(2018,this.latestMonth-1),
				          });
				          dtPicker.show(function (selectItems) {
				            that.year = selectItems.y.value;
				            that.month = parseInt(selectItems.m.value);
				            that.getdata(selectItems.y.value+'-'+selectItems.m.value);

                    dtPicker.dispose();
				          })

	            })
	            .catch((err)=>{
	                console.log(err);
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
    padding: 170px 0 90px 0;
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
