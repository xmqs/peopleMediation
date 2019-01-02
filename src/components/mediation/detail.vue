<template>
  <div>
    <div class="header">
      <span @click="state=0" :class="{'active':state==0}">申请详情</span>
      <span @click="state=1" :class="{'active':state==1}">调解进度</span>
    </div>
    <div class="main">
      <div class="main_1" v-if="state==0">
        <div class="tip">
          申请人信息
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">姓名</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.applicantName}}</div>
          </div>
        </div>
        <div class="ele eleright" @click="chose(0)">
          <div class="tit">
            <div class="cntit">性别</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.applicantGender=='male'?'男':'女'}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">身份证号码</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.applicantIdCard}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">联系方式</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.applicantContact}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">住址</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.applicantStreet}}{{data.applicantAddr}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">单位</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.applicantUnit}}</div>
          </div>
        </div>
        <div class="tip">
          被申请人信息
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">姓名</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.respondentName}}</div>
          </div>
        </div>
        <div class="ele eleright" @click="chose(1)">
          <div class="tit">
            <div class="cntit">性别</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.respondentGender=='male'?'男':'女'}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">身份证号码</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.respondentIdCard}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">联系方式</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.respondentContact}}</div>
          </div>
        </div>
        <div class="ele">
          <div class="tit">
            <div class="cntit">详细地址</div>
          </div>
          <div class="elecontent">
            <div class="inps2">{{data.respondentStreet}}{{data.respondentAddr}}</div>
          </div>
        </div>
        <div class="tip">
          纠纷简要情况
        </div>
        <div class="ele4">
          {{data.briefSituation}}
        </div>
        <div class="tip">
          申请人要求事项
        </div>
        <div class="ele4">
          {{data.requirements}}
        </div>
      </div>
      <div class="main_2" v-if="state==1">
        <div class="item">
          <div class="item_main">
            <p>申请人：{{data.applicantName}}</p>
            <p>联系方式：{{data.applicantContact}}</p>
            <p>申请时间：{{data.applicationTime}}</p>
          </div>
          <div class="item_state">
            <n-state :status="data.orderStatus">{{data.orderStatus}}</n-state>
          </div>
        </div>
        <div class="detail" style="padding-top: 16px">
          <ul>
            <li v-if="orderStatus==3004">
              <div class="time">
                <p class="day">{{timeLine.time4.slice(5,10)}}</p>
                <p class="hour">{{timeLine.time4.slice(11,16)}}</p>
              </div>
              <div class="d1">
                <p class="t2">不予受理</p>
                <p class="t2">驳回理由：{{returnMessage}}</p>
              </div>
            </li>

            <li v-if="t3">
              <div class="time">
                <p class="day">{{t3.slice(5,10)}}</p>
                <p class="hour">{{t3.slice(11,16)}}</p>
              </div>
              <div class="d1">
                <p class="t2">已评价</p>
              </div>
            </li>

            <li v-if="mediationRemark.length>0" v-for="item in mediationRemark">
              <div class="time">
                <p class="day">{{item.mediationTime.slice(5,10)}}</p>
                <p class="hour">{{item.mediationTime.slice(11,16)}}</p>
              </div>
              <div class="d1">
                <p class="t2">{{item.mediationRemark}}</p>
              </div>
            </li>


            <li v-if="t2">
              <div class="time">
                <p class="day">{{t2.slice(5,10)}}</p>
                <p class="hour">{{t2.slice(11,16)}}</p>
              </div>
              <div class="d1">
                <p class="t2">成功受理</p>
                <p class="d2">已受理调解业务，指派人：{{JSON.parse(data.designatePersonString).join(">")}}</p>
              </div>
            </li>
            <li v-if="t1">
              <div class="time">
                <p class="day">{{t1.slice(5,10)}}</p>
                <p class="hour">{{t1.slice(11,16)}}</p>
              </div>
              <div class="d1">
                <p class="t2">申请成功</p>
                <p class="d2">已申请调解业务</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import NState from "./state"

  export default {
    name: "detail",
    data() {
      return {
        data: {},
        state: 0,
        timeLine:{},
        mediationRemark:[],
        t1:"",
        t2:"",
        t3:"",
        orderStatus:"",
        returnMessage:''
      }
    },
    components: {
      NState
    },
    mounted() {
      axios.post("/myjn-server/mediation/echoOrder.do", {
        "mediationId": this.$route.params.id
      }).then(res => {
        this.data = res.data.data;
        this.timeLine = JSON.parse(res.data.data.timeLine);
        if(this.timeLine.time1){
          this.t1 = this.timeLine.time1;
        }
        if(this.timeLine.time2){
          this.t2 = this.timeLine.time2;
        }
        if(this.timeLine.time3){
          this.t3 = this.timeLine.time3;
        }

        this.orderStatus = res.data.data.orderStatus;
        this.returnMessage = res.data.data.returnMessage;

        this.mediationRemark = JSON.parse(res.data.data.mediationRemarkString);
        this.mediationRemark = this.mediationRemark.reverse();
      })
    }
  }
</script>

<style scoped>
  .header {
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    width: 100%;
    background: #fff;
    z-index: 999;

    border-bottom: 1px solid #EEEEEE;
  }

  .header span {
    text-align: center;
    font-size: 32px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    width: 375px;
    padding: 13px 0;
    color: #666;
    border-bottom: 4px solid #fff;
  }

  .header span.active {
    line-height: 42px;
    color: #4D7BFE;
    border-bottom: 4px solid #4D7BFE;
  }

  .main {
    padding: 72px 0 0 0;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #f5f5f5;
  }

  .main_1 {
    background: #fff;
  }

  .main_2 {
    padding: 16px 0 0 0;
    background: #f5f5f5;
  }

  .ele {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 32px;
    border-bottom: 1px solid #efefef;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .ele4 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    border-bottom: 1px solid #efefef;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    line-height: 48px;
    color: rgba(51, 51, 51, 1);
  }

  .tit {
    color: #333;
    max-width: 35%;
    overflow: hidden;
  }

  .cntit {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    color: rgba(51, 51, 51, 1);
  }

  .elecontent {
    width: 60%;
  }

  .inps {
    width: 100%;
    border: 0;
    outline: none;
    font-size: 30px;
    font-family: PingFangSC-Regular;
    color: #333;
    text-align: right;
    margin: 0;
    min-height: 86px;
    padding: 0 16px 0 0;
  }

  .inps2 {
    width: 100%;
    padding: 0 0 0 0;
    min-height: 88px;
    text-align: right;
    line-height: 88px;
    word-wrap: break-word;
  }

  .title {
    height: 70px;
    background: rgba(255, 247, 234, 1);
    line-height: 70px;
    font-size: 26px;
    color: rgba(255, 181, 64, 1);
    padding: 0 32px;
  }

  .tip {
    height: 70px;
    background: #F5F5F5;
    line-height: 70px;
    font-size: 26px;
    color: rgba(170, 170, 170, 1);
    padding: 0 32px;
  }

  .item {
    width: 750px;
    background: #fff;
    display: flex;

    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 35px 0 35px 32px;
  }

  .item_main {
    width: 450px;
    border-right: 1px solid #EEEEEE;
  }

  .item_main p {
    font-size: 30px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 52px;
  }

  .item_state {
    flex-grow: 1;
    text-align: center;

    font-size: 30px;
    font-weight: 400;
  }

  .detail {
    padding: 16px 32px;
    background-color: #fff;
    margin-top: 16px;
    font-size: 30px;
  }

  .time {
    text-align: right;
    min-width: 100px;
  }

  .day {
    font-size: 28px;
    font-weight: 400;
    line-height: 36px;
  }

  .hour {
    font-size: 18px;
    font-weight: 400;
    line-height: 36px;
  }

  .detail li {
    display: flex;
    padding-bottom: 80px;

    background: url("./../../../static/img/t2.png") no-repeat;
    background-size:36px;
    background-position: 120px -230px;
  }
  .detail li:first-child p{
    color: #285FB1;
  }
  .detail li:first-child{
    background: url("./../../../static/img/t1.png") no-repeat;
    background-size:36px;
    background-position: 120px 0;
  }

  .detail li:last-child{
    background: url("./../../../static/img/t3.png") no-repeat;
    background-size:36px;
    background-position: 120px -460px;
  }

  .d1 {
    padding-left: 80px;
    flex-grow: 1;
  }

  .t2 {
    font-size: 28px;
  }

  .d2 {
    font-size: 26px;
    margin-top: 10px;
  }
</style>
