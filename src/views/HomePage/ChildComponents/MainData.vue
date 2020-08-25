<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :lg="6" :md="10">
        <div class="card-left">
          <el-row :gutter="20"> 
            <el-col :span="12">
              <el-card shadow="hover">
                <div class="card-data">
                  <p class="card-title"><i class="el-icon-user" style="color:#28c0de"></i>今日报名人数</p>
                  <p class="card-text">{{mainData.today}}人</p>
                  <p class="card-down">夜晚12点后刷新</p>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <div class="card-data">
                  <p class="card-title"><i class="el-icon-odometer" style="color:#28d17c"></i>剩余时长</p>
                  <p class="card-text">{{mainData.days}}天</p>
                  <p class="card-down">{{mainData.lastDay}}</p>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-card shadow="hover" id="QRcode">
            <div class="card-data">
              <p class="card-title"><i class="el-icon-odometer"></i>小程序二维码</p>
              <p class="QRcode-text">扫码即可进入小程序报名</p>
                <img src="~assets/QRcode.png" alt="" srcset="">
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :lg="10" :md="14">
        <el-card shadow="hover">
          <div class="notice">
            <p class="notice-top"><i class="el-icon-s-opportunity"></i>公告</p>
            <h2>系统升级通知</h2>
            <div v-for="item in mainData.notice" :key="item.id" class="notice-text">
              <p>{{item.info}}</p>
              <p>对此不便表示抱歉！！如有问题请致电：123456789</p>
              <p>更新时间段为<span>{{item.startTime}}</span>&nbsp;~&nbsp;{{item.endTime}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="24">
        <el-card shadow="hover">
          <div class="money">
            <p class="money-top"><i class="el-icon-pie-chart"></i>分点占比</p>
            <ve-pie :data="chartData"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import VePie from 'v-charts/lib/pie'
export default {
  name: '',
  // components:{VePie},
  computed:{
  },
  props:{
    mainData:{
      type:Object,
      default:() =>{}
    }
  },
  data(){
    return {
      signUp:5,
      date:100,
      chartData: {
        columns: ['分点', '报名客户'],
        rows: [
          { '分点': '1', '报名客户': 1393 },
          { '分点': '2', '报名客户': 3530 },
          { '分点': '3', '报名客户': 2923 },
          { '分点': '4', '报名客户': 1723 },
          { '分点': '5', '报名客户': 3792 },
          { '分点': '6', '报名客户': 4593 }
        ]
      }
    }
  },
}
</script>
<style scoped lang="scss">
.main{
  padding: 0 20px;
  box-sizing: border-box;
  i{margin-right: 10px}

  #QRcode{
    margin-top: 10px;
    height: 300px;
    .QRcode-text{
      text-align: center;
      margin-top: 10px;
      font-size: 25px;
    }
    img{
      width: 60%;
      margin: 0 auto;
      display: block;
    }
  }

  .el-row{
    >div{margin-top: 1.5%;}
  }

  .card-data{
    color:#76838f;
    font-size: 1vw;
    .card-title{
      font-size: 12px;
    }
    .card-text{
      font-size: 1.6em;
      margin: 15px 0;
      text-align: center;
    }
    .card-down{
      font-size: 12px;
      text-align: center;
    }
  }

  .notice{
    height: 425px;
    .notice-text:first-of-type{
      border-bottom: 1px dashed;
      margin-bottom: 40px;
      padding-bottom: 30px;
    }
    .notice-top{
      color: #0bb2d4;
      font-size: 20px;
    }
    h2{
      text-align: center;
      margin-bottom: 1.5em;
    }
    p{
      margin-bottom: 15px;
    }
  }

  .money-top{
    color: #3E8EF7;
    font-size: 20px;
  }
}
@media screen and (max-width: 1199px){
  .card-text{
    font-size: 35px!important;
  }
}
</style>