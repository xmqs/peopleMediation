<template>
  <div>
    <div class="title">
      注意：*为必填信息
    </div>
    <div class="tip">
      申请人信息
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>姓名</div>
      </div>
      <div class="elecontent">
        <input class="inps" type="text" placeholder="请输入申请人的姓名" v-model="data.applicantName"/>
      </div>
    </div>
    <div class="ele eleright" @click="chose(0)">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>性别</div>
      </div>
      <div class="elecontent">
        <div class="inps2">{{data.applicantGender=='male'?'男':'女'}}</div>
      </div>
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>身份证号码</div>
      </div>
      <div class="elecontent">
        <input class="inps" type="text" placeholder="请输入申请人的身份证号码" v-model="data.applicantIdCard"/>
      </div>
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>联系方式</div>
      </div>
      <div class="elecontent">
        <input class="inps" type="text" placeholder="请输入申请人的联系方式" v-model="data.applicantContact"/>
      </div>
    </div>
    <div class="ele eleright" @click="choseStreet(0)">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>住址</div>
      </div>
      <div class="elecontent">
        <div class="inps2">{{data.applicantStreet}}</div>
      </div>
    </div>
    <div class="ele">
        <input class="inps" type="text" placeholder="请输入申请人的详细住址" v-model="data.applicantAddr"/>
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit">单位</div>
      </div>
      <div class="elecontent">
        <input class="inps" type="text" placeholder="请输入申请人的单位" v-model="data.applicantUnit"/>
      </div>
    </div>
    <div class="tip">
      被申请人信息
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>姓名</div>
      </div>
      <div class="elecontent">
        <input class="inps" type="text" placeholder="请输入被申请人姓名" v-model="data.respondentName"/>
      </div>
    </div>
    <div class="ele eleright" @click="chose(1)">
      <div class="tit">
        <div class="cntit"><span class="red">*</span>性别</div>
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
        <input class="inps" type="text" placeholder="请输入被申请人的身份证号码" v-model="data.respondentIdCard"/>
      </div>
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit">联系方式</div>
      </div>
      <div class="elecontent">
        <input class="inps" type="text" placeholder="请输入被申请人的联系方式" v-model="data.respondentContact"/>
      </div>
    </div>
    <div class="ele eleright" @click="choseStreet(1)">
      <div class="tit">
        <div class="cntit">住址</div>
      </div>
      <div class="elecontent">
        <div class="inps2">{{data.respondentStreet}}</div>
      </div>
    </div>
    <div class="ele">
      <input class="inps" type="text" placeholder="请输入被申请人的详细地址" v-model="data.respondentAddr"/>
    </div>
    <div class="ele">
      <div class="tit">
        <div class="cntit">单位</div>
      </div>
      <div class="elec  ontent">
        <input class="inps" type="text" placeholder="请输入被申请人的单位" v-model="data.respondentUnit"/>
      </div>
    </div>
    <div class="tip">
      注意：联系方式、详细住址至少填写一项
    </div>
    <div class="textare">
      <div class="cntit bb1"><span class="red">*</span>纠纷简要情况</div>
      <textarea rows="4" cols="20" placeholder="请输入纠纷简要情况" class="t" v-model="data.briefSituation">

      </textarea>
    </div>

    <div class="textare ta2">
      <div class="cntit bb1"><span class="red">*</span>申请人要求事项</div>
      <textarea rows="4" cols="20" placeholder="请输入申请人要求事项" class="t" v-model="data.requirements">

      </textarea>
    </div>
    <div class="bottom_button">
      <div class="save" @click="save">
        保存
      </div>
      <div class="commit" @click="commit">
        提交
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: "commit",
    data() {
      return {
        cancommit:true,
        cansave:true,
        data:{
          applicantName:"",
          applicantGender:"male",
          applicantAge:"",
          applicantIdCard:"",
          applicantContact:"",
          applicantStreet:"请选择区域街道",
          applicantAddr:"",
          applicantUnit:"",
          respondentName:"",
          respondentGender:"male",
          respondentAge:"",
          respondentIdCard:"",
          respondentContact:"",
          respondentStreet:"请选择区域街道",
          respondentAddr:"",
          respondentUnit:"",
          briefSituation:"",
          requirements:"",

          userID:"",
          mediationId:"",
        },
        street:[]
      }
    },
    methods: {
      chose(n) {
        let vue = this;
        let picker = new mui.PopPicker();
        picker.setData([{
          value: "male",
          text: "男"
        }, {
          value: "female",
          text: "女"
        }])
        picker.show(function (selectItems) {
          if(n==0){
            vue.data.applicantGender = selectItems[0].value;
          }
          if(n==1){
            vue.data.respondentGender = selectItems[0].value;
          }
          picker.dispose();
        })
      },
      choseStreet(n){
        let vue = this;
        let picker = new mui.PopPicker({layer: 3});
        picker.setData(this.street)
        picker.show(function (selectItems) {
          if(n==0){
            vue.data.applicantStreet = selectItems[0].text+" "+selectItems[1].text+" "+(selectItems[2].text?selectItems[2].text:"");
          }
          if(n==1){
            vue.data.respondentStreet = selectItems[0].text+" "+selectItems[1].text+" "+(selectItems[2].text?selectItems[2].text:"");
          }
          picker.dispose();
        })
      },
      save(){
        if(this.cansave){
          this.cansave = false;
          mui.toast('正在保存',{ duration:'short', type:'div' });
          axios.post("/myjn-server/mediation/saveOrder.do",this.data).then(res=>{
            if(res.data.result == 1){
              mui.toast('保存成功',{ duration:'short', type:'div' });
              setTimeout(()=>{
                this.cansave = true;
                this.$router.go(-1);
              },1000)
            }
          }).catch(err=>{
            this.cansave = true;
            mui.toast(err.data.msg,{ duration:'long', type:'div' });
          })
        }
      },
      commit(){
        if(this.data.applicantName==""){
          mui.toast('申请人姓名不能为空',{ duration:'short', type:'div' });return;
        }
        /*if(this.data.applicantAge==""){
          mui.toast('申请人年龄不能为空',{ duration:'short', type:'div' });return;
        }*/
        if(this.data.applicantIdCard==""){
          mui.toast('申请人身份证号不能为空',{ duration:'short', type:'div' });return;
        }
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(this.data.applicantIdCard) === false)
        {
          mui.toast('申请人身份证不合法',{ duration:'short', type:'div' });return;
        }
        if(this.data.applicantContact==""){
          mui.toast('申请人联系方式不能为空',{ duration:'short', type:'div' });return;
        }

        if(this.data.applicantStreet=="请选择区域街道"){
          mui.toast('请选择申请人地址街道',{ duration:'short', type:'div' });return;
        }

        if(this.data.applicantAddr==""){
          mui.toast('申请人详细地址不能为空',{ duration:'short', type:'div' });return;
        }


        if(this.data.respondentName==""){
          mui.toast('被申请人姓名不能为空',{ duration:'short', type:'div' });return;
        }

        if(this.data.respondentIdCard && reg.test(this.data.respondentIdCard) === false)
        {
          mui.toast('被申请人身份证不合法',{ duration:'short', type:'div' });return;
        }

        if(this.data.respondentContact==""&&this.data.respondentAddr==""){
          mui.toast('被申请人联系方式、详细住址至少填写一项',{ duration:'short', type:'div' });return;
        }

        if(this.data.briefSituation==""){
          mui.toast('纠纷简要情况不能为空',{ duration:'short', type:'div' });return;
        }
        if(this.data.requirements==""){
          mui.toast('申请人要求事项不能为空',{ duration:'short', type:'div' });return;
        }

        if(this.data.respondentStreet=="请选择区域街道"){
          this.data.respondentStreet="";
        }

        if(this.cancommit){
          this.cancommit = false;
          mui.toast('正在提交',{ duration:'short', type:'div' });
          axios.post("/myjn-server/mediation/submitOrder.do",this.data).then(res=>{
            if(res.data.result == 1){
              mui.toast('提交成功',{ duration:'short', type:'div' });
              setTimeout(()=>{
                this.cancommit = true;
                this.$router.go(-1);
              },1000)
            }
          }).catch(err=>{
            this.cancommit = true;
            mui.toast(err.data.msg,{ duration:'long', type:'div' });
          })
        }
      }
    },
    mounted(){

      this.data.applicantName = JSON.parse(sessionStorage.getItem('userifo')).userName;
      this.data.applicantIdCard = JSON.parse(sessionStorage.getItem('userifo')).idcard;
      this.data.applicantContact = JSON.parse(sessionStorage.getItem('userifo')).tel;
      this.data.userID = JSON.parse(sessionStorage.getItem('userifo')).userId;

      axios.get('/myjn-server/mediation/getNjAreas.do').then(res=>{
        this.street = res.data.data;
      })

      if(parseInt(this.data.applicantIdCard.slice(16,17))%2 ==0){
        this.data.applicantGender = "female";
      }

      if(this.$route.params.id){
        axios.post("/myjn-server/mediation/echoOrder.do",{
          "mediationId":this.$route.params.id
        }).then(res=>{
          this.data = res.data.data;
        })
      }
    }
  }
</script>

<style scoped>
  .ele {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 32px;
    border-bottom: 1px solid #efefef;
    font-size: 32px;
    font-family: PingFangSC-Regular;
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
    padding: 0 32px 0 0;
    min-height: 88px;
    text-align: right;
    line-height: 88px;
    font-size: 30px;
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

  .red {
    color: red;
  }

  .textare {
    padding: 32px;
  }

  .ta2 {
    border-top: 20px solid #F5F5F5;
    border-bottom: 20px solid #F5F5F5;
  }

  .bb1 {
    padding-bottom: 18px;
    border-bottom: 1px solid #eee;
  }

  .t {
    border: 0;
    font-size: 30px;
    margin-top: 18px;
  }

  .bottom_button {
    height: 100px;
    background-color: #4D7BFE;
    font-size: 34px;
    color: #fff;
    line-height: 100px;
    display: flex;
  }

  .bottom_button div {
    flex-grow: 1;
    text-align: center;
  }

  .bottom_button div.save {
    background-color: #8E9BBE;
  }

  .eleright {
    background: #fff url("./../../../static/img/shape2.png") no-repeat right;
    background-size: 16px;
  }
</style>
