<template>
  <div id="data">
    <!--主体-->
    <div class="mui-content">
      <!--轮播图-->
      <div class="mui-slider" id='slide1'>
        <div class="mui-slider-group mui-slider-loop">
          <!--支持循环，需要重复图片节点-->
          <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img
            src="../../assets/img/Rectangle 5_slices/Rectangle 5.png"/></a></div>
          <div class="mui-slider-item"><a href="#"><img src="../../assets/img/Rectangle 5_slices/Rectangle 5.png"/></a>
          </div>
          <div class="mui-slider-item"><a href="#"><img src="../../assets/img/Rectangle 5_slices/Rectangle 5.png"/></a>
          </div>
          <div class="mui-slider-item"><a href="#"><img src="../../assets/img/Rectangle 5_slices/Rectangle 5.png"/></a>
          </div>
          <div class="mui-slider-item"><a href="#"><img src="../../assets/img/Rectangle 5_slices/Rectangle 5.png"/></a>
          </div>
          <!--支持循环，需要重复图片节点-->
          <div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img
            src="../../assets/img/Rectangle 5_slices/Rectangle 5.png"/></a></div>
        </div>
      </div>
      <!--数据公开折叠面板-->
      <div class='msgNav'>
        <a>数据公开</a>
        <a href="#/statisData">更多></a>
        <!--<router-link  to="/statisData">更多<router-link>-->
        <!--<span class="mui-icon mui-icon-forward"></span>-->
      </div>
      <div class='msgReload'>
        2018年{{newMonth==1?"":"1~"}}{{newMonth}}月主要经济指标完成情况
      </div>
      <!--数据展示-->
      <div class="msgShow">
        <div>
          <table>
            <tr>
              <td rowspan="2"><span>地区生产总值(亿元)</span></td>
              <td>{{indexValue0}}</td>
              <td :style="activeColor0">
                {{indexBasis0=="--"?"--":indexBasis0+"%"}}
              </td>
            </tr>
            <tr>
              <td>总数</td>
              <td>同比</td>
            </tr>
          </table>
        </div>
        <div>
          <table>
            <tr>
              <td rowspan="2"><span>一般公共预算收入(亿元)</span></td>
              <td>{{indexValue1}}</td>
              <td :style="activeColor1">
                {{indexBasis1=="--"?"--":indexBasis1+"%"}}
              </td>
            </tr>
            <tr>
              <td>总数</td>
              <td>同比</td>
            </tr>
          </table>
        </div>
      </div>


      <!--滑动列表-->
      <div class="slideMenu">
        <ul>
          <li :class="{active:0==index}" @click="clicklist(0)">历年数据</li>
          <li :class="{active:1==index}" @click="clicklist(1)">统计公报</li>
          <li :class="{active:2==index}" @click="clicklist(2)">统计服务</li>
          <li :class="{active:3==index}" @click="clicklist(3)">指标解释</li>
        </ul>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="sliderItem">
              <div @click="jump(2017)">
                <span>江宁2017年数据</span>
                <span>国家统计局</span>
              </div>
              <div @click="jump(2016)">
                <span>江宁2016年数据</span>
                <span>国家统计局</span>
              </div>
              <div @click="jump(2015)">
                <span>江宁2015年数据</span>
                <span>国家统计局</span>
              </div>
              <div @click="jump(2014)">
                <span>江宁2014年数据</span>
                <span>国家统计局</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="sliderItem">
              <div v-for="data in datas2" @click="jump1(data.fileURL)">
                <span>{{data.fileName}}</span>
                <span>{{data.source}}</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="sliderItem">
              <div v-for="data in datas3" @click="jump1(data.fileURL)">
                <span>{{data.fileName}}</span>
                <span>{{data.source}}</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="sliderItem">
              <div v-for="val in vals" @click="jump2(val.url)">
                <p>{{val.sourceLabel}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Swiper from 'swiper';
  import axios from 'axios'

  export default {
    data() {
      return {
        datas: {},//历年展示的数据
        datas2: {},//历年展示的数据
        datas3: {},//历年展示的数据
        fileCategory: '',
        pageSize: 20,
        pageNo: 1,
        newMonth: "",//2018年最新月
        indexBasis0: "",
        indexValue0: "",
        indexBasis1: "",
        indexValue1: "",
        index: 0,
        vals: {},
        swiper:{}
      }
    },
    methods: {
      //定义请求函数
      postmsg(fileCategory, pageNo, pageSize) {
        axios.post('/myjn-server/statistics/getFilesList.do', {
          'fileCategory': fileCategory,
          'pageNo': "",
          'pageSize': ""
        })
          .then((res) => {
            this.datas = res.data.data;
            //this.pageSum=Math.ceil(res.data.page.total/this.pageNo);
          })
          .catch((err) => {
            console.log(err);
          })
      },
      //定义一个方法实现滑动列表的高度为最低高度，溢出隐藏，左右滑动触发hover样式
      clicklist(i) {
        //点击高亮显示
        this.index = i;

        this.swiper.slideTo(i);
        /*if (this.index == 1) {
          this.postmsg("G")
        }
        else if (this.index == 2) {
          this.postmsg("F")
        }
        else if (this.index == 3) {
          this.getmsg()
        }*/
      },
      //滑动数据转换，且导航相应按钮高亮
      slideleft() {
        this.index == 3 ? this.index = 3 : this.index++;
        if (this.index == 1) {
          this.postmsg("G")
        }
        else if (this.index == 2) {
          this.postmsg("F")
        }
        else if (this.index == 3) {
          this.getmsg()
        }
      },
      slideright() {
        this.index == 0 ? this.index = 0 : this.index--;
        if (this.index == 1) {
          this.postmsg("G")
        }
        else if (this.index == 2) {
          this.postmsg("F")
        }
        else if (this.index == 3) {
          this.getmsg()
        }
      },
      jump1(url) {
        location.href = "/jn/pdf/whjn/pdf.html?url=" + url
      },
      jump2(url) {
        location.href = url
      },
      //历年数据点击跳转
      jump(year) {
        this.$router.push("/beforeDate/" + year)
      },
      //指标解释请求的方法
      getmsg() {
        var url = "/web-editor-web/public/catalog/querySource.do?channelAlias=jn_tj_zbjsnew&pageNo=1&pageSize=50&catalogId=57&sourceType=03";
        axios.get(url).then((res) => {
          this.vals = res.data.data;
        }).catch((err) => {
          console.log(err)
        });
      }


    },
    mounted() {
      axios.post('/myjn-server/statistics/getAllData.do', {
        indexDate: ""
      })
        .then(res => {
          var newMonth = res.data.data[0].indexDate.slice(5);
          newMonth > 9 ? newMonth : newMonth = newMonth.slice(1);
          this.newMonth = newMonth;
          this.indexBasis0 = res.data.data[0].indexBasis;
          this.indexValue0 = res.data.data[0].indexValue;
          this.indexBasis1 = res.data.data[1].indexBasis;
          this.indexValue1 = res.data.data[1].indexValue;
        });
      //轮播图
      var gallery = mui('#slide1');
      gallery.slider({
        interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
      });

      axios.post('/myjn-server/statistics/getFilesList.do', {
        'fileCategory': 'G',
        'pageNo': "",
        'pageSize': ""
      })
        .then((res) => {
          this.datas2 = res.data.data;
          axios.post('/myjn-server/statistics/getFilesList.do', {
            'fileCategory': 'F',
            'pageNo': "",
            'pageSize': ""
          })
            .then((res) => {
              let vue = this;
              this.datas3 = res.data.data;

              let url = "/web-editor-web/public/catalog/querySource.do?channelAlias=jn_tj_zbjsnew&pageNo=1&pageSize=50&catalogId=57&sourceType=03";
              axios.get(url).then((res) => {
                this.vals = res.data.data;

                this.swiper = new Swiper ('.swiper-container', {
                  loop: false,
                  autoHeight:true,
                  observer:true,
                  observeParents:true,
                  on: {
                    slideChangeTransitionEnd: function(){
                      vue.index = this.activeIndex
                    },
                  },
                })
              }).catch((err) => {
                console.log(err)
              });
            })
            .catch((err) => {
              console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        })
    },
    computed: {
      //计算值的正负，改变颜色
      activeColor0() {
        if (this.indexBasis0.substring(0, 1) == "-") {
          return {color: '#07A094'}
        } else {
          return {color: '#E9602E'}
        }
      },
      activeColor1() {
        if (this.indexBasis1.substring(0, 1) == "-") {
          return {color: '#07A094'}
        } else {
          return {color: '#E9602E'}
        }
      },

    }
  }
</script>
<style>
  .swiper-container {
    width: 750px;
  }
  .swiper-slide{
    width: 750px!important;
  }
  /*引入字体*/
  /*@font-face {
        font-family:FZCQJW;
        src: url('../../../static/font/FZCQJW.ttf');
    }*/
  /*数据公开导航模块div*/
  #data .msgNav {
    width: 750px;
    height: 88px;
    background: rgba(255, 255, 255, 1);
    padding: 24px 32px;

  }

  /*数据公开*/
  #data .msgNav > a:first-child {
    display: block;
    float: left;
    font-size: 30px;
    font-family: 'PingFangSC';
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 42px;
  }

  #data .msgNav > a:nth-child(2) {
    display: block;
    float: left;
    margin-left: 484px;
    font-size: 28px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 40px;
  }

  /*下拉刷新*/
  #data .msgReload {
    width: 750px;
    height: 64px;
    background: rgba(255, 247, 234, 1);
    font-size: 28px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(255, 181, 64, 1);
    line-height: 64px;
    text-align: center;
  }

  /*数据展示*/
  #data .msgShow {
    margin-bottom: 20px;
    background: #ffffff;
  }

  #data .msgShow > div {
    width: 100%;
    height: 139px;
    border-bottom: 1px solid rgb(238, 238, 238);
    background: #ffffff;
    box-sizing: border-box;
    padding: 21px 32px 34px 32px;
  }

  #data .msgShow > div > table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
  }

  #data .msgShow > div > table tr:first-child > td:first-child {
    border-right: 1px solid rgb(238, 238, 238);

  }

  #data .msgShow > div > table tr:first-child > td:first-child > span {
    display: block;
    width: 180px;
    height: 100%;
    font-size: 30px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 42px;
    text-align: left;
  }

  #data .msgShow > div > table tr > td {
    width: 33%;
    text-align: center;
  }

  #data .msgShow > div > table tr:first-child > td:nth-child(2) {
    font-size: 40px;
    font-family: 'DINAlternate-Bold';
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }

  #data .msgShow > div > table tr:first-child > td:nth-child(3) {
    font-size: 40px;
    font-family: 'DINAlternate-Bold';
    font-weight: bold;
    color: rgba(233, 96, 46, 1);
  }

  #data .msgShow > div > table tr:last-child > td {
    font-size: 24px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    box-sizing: border-box;
  }

  /*滑动列表*/
  #data .slideMenu {
    width: 750px;
    height: 88px;
    background: rgba(255, 255, 255, 1);
    padding: 0 32px;
  }

  #data .slideMenu > ul {
    display: flex;
    justify-content: space-between;
  }

  #data .slideMenu > ul > li {
    float: left;
    height: 100%;
    line-height: 84px;
    font-size: 30px;
    font-family: 'PingFangSC-Medium';
    font-weight: bold;
    color: rgba(51, 51, 51, 51);
    box-sizing: border-box;
    border-bottom: 4px solid rgba(77, 123, 254, 0);
  }

  #data .slideMenu > ul > li.active {
    color: rgba(77, 123, 254, 1);
    border-bottom: 6px solid rgba(77, 123, 254, 1);
  }

  #data .slideMenu > ul > li:first-child {
    text-align: left;
  }

  #data .slideMenu > ul > li:last-child {
    text-align: right;
  }

  /*滑动数据*/
  #data .sliderItem > div {
    width: 750px;
    min-height: 108px;
    background: rgba(255, 255, 255, 1);
    padding: 10px 32px;
    border-top: 1px solid rgba(238, 238, 238, 1);
  }

  #data .sliderGroup > div:last-child > div > span {
    display: block;
    font-size: 30px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }



  #data .sliderItem > div > span:first-child {
    display: block;
    font-size: 30px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  #data .sliderItem > div > span:last-child {
    font-size: 24px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    margin-top: 20px;
  }

  #data .sliderItem > div > p:last-child {
    font-size: 30px;
    font-family: 'PingFangSC-Regular';
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-top: 20px;
  }

  #data {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
  }
</style>
