<template>
  <div class="home">
    <div class="statistic-wrapper">
      <ul class="lists">
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/boy.png" alt="">
          </div>
          <div class="statistic-info">
            <p>今日新增男用户</p>
            <p><span>{{maleUser}}</span><span>个</span></p>
          </div>
        </li>
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/girl.png" alt="">
          </div>
          <div class="statistic-info">
            <p>今日新增女用户</p>
            <p><span>{{femaleUser}}</span><span>个</span></p>
          </div>
        </li>
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/vip.png" alt="">
          </div>
          <div class="statistic-info">
            <p>昨日VIP销量</p>
            <p><span>{{vipCount}}</span><span>元</span></p>
          </div>
        </li>
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/wallet.png" alt="">
          </div>
          <div class="statistic-info">
            <p>昨日平台收益</p>
            <p><span>{{incomeCount? incomeCount: 0}}</span><span>元</span></p>
          </div>
        </li>
      </ul>
    </div>
    <div class="chart-wrapper">
      <div class="table">
        <div class="table-head">
          <p class="title">平台收益表</p>
          <div class="date">
            <p class="interval">默认当前一周</p>
            <el-date-picker
              v-model="weekValue"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周">
            </el-date-picker>
            <!-- <el-date-picker
                v-model="startTime"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择开始时间">
            </el-date-picker>--
            <el-date-picker
                v-model="endTime"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择结束时间">
            </el-date-picker> -->
            <el-button class="select" type="primary" size="small" @click="selectDateIncome">筛选</el-button>
          </div>
        </div>
        
        <div class="statistic-table">
          <div class="left">
            <div class="statistic-item">
              <p class="statistic-title">本月收益总额</p>
              <p class="statistic-num">{{incomeData.thisMonth}}元</p>
              <p class="statistic-ratio"><img v-if="incomeData.monthPercent>=0" class="rate-icon" src="../../assets/images/up.png" alt=""><img v-else class="rate-icon" src="../../assets/images/down.png" alt=""><span class="rate">{{this.incomeData.monthPercent}}%</span><span class="gray">同比上月</span></p>
            </div>
            <div class="statistic-item">
              <p class="statistic-title">本周收益总额</p>
              <p class="statistic-num">{{incomeData.thisWeek}}元</p>
              <p class="statistic-ratio"><img v-if="incomeData.weekPercent>=0" class="rate-icon" src="../../assets/images/up.png" alt=""><img v-else class="rate-icon" src="../../assets/images/down.png" alt=""><span class="rate">{{this.incomeData.weekPercent}}%</span><span class="gray">同比上周</span></p>
            </div>
          </div>
          <div class="right">
            <div ref="myChart" v-if="!incomeDataNull" style="width: 800px;height:400px;"></div>
            <div v-if="incomeDataNull" style="margin-top: 150px;">没有收益数据</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getInCome, getByDateWithMonth } from '@/api/income.js'
import { getTodayUser, getVip } from '@/api/user.js'
import { getDate } from '@/assets/js/validate.js'
export default {
  name: "Home",
  data() {
    return {
      startTime: "",
      endTime: "",
      chartData: [],
      maleUser: "",
      femaleUser: "",
      vipCount: "",
      incomeCount: "",
      incomeDataNull: false,
      weekValue: "",
      incomeData: {}
    }
  },
  created () {
    this.initdata()
    this.getDateWithMonth()
  },
  methods: {
    initdata() {
      let nowdate = new Date()
      this.weekValue = nowdate
      let params = {}
      if(nowdate.getDay() === 0) {
        params = {
          startDate: nowdate.getTime(),
          endDate: nowdate.getTime() + 6*24*3600*1000
        }
      }
      if(nowdate.getDay() === 1) {
        params = {
          startDate: nowdate.getTime() - 24*3600*1000,
          endDate: nowdate.getTime() + 5*24*3600*1000
        }
      }
      if(nowdate.getDay() === 2) {
        params = {
          startDate: nowdate.getTime() - 2*24*3600*1000,
          endDate: nowdate.getTime() + 4*24*3600*1000
        }
      }
      if(nowdate.getDay() === 3) {
        params = {
          startDate: nowdate.getTime() - 3*24*3600*1000,
          endDate: nowdate.getTime() + 3*24*3600*1000
        }
      }
      if(nowdate.getDay() === 4) {
        params = {
          startDate: nowdate.getTime() - 4*24*3600*1000,
          endDate: nowdate.getTime() + 2*24*3600*1000
        }
      }
      if(nowdate.getDay() === 5) {
        params = {
          startDate: nowdate.getTime() - 5*24*3600*1000,
          endDate: nowdate.getTime() + 24*3600*1000
        }
      }
      if(nowdate.getDay() === 6) {
        params = {
          startDate: nowdate.getTime() - 6*24*3600*1000,
          endDate: nowdate.getTime()
        }
      }
      getInCome(params).then(res =>{
        if(res.code === 1) {
          this.chartData = res.data
          if(this.chartData.length>0) {
            this.drawingCharts()
          }else {
            this.incomeDataNull = true
          }
        }
      })
      let paramsMale = {
        sex: "1",  // 1==男，2==女
        date: nowdate.getTime()
      }
      getTodayUser(paramsMale).then(res=>{
        if(res.code === 1){
          this.maleUser = res.data
        }
      })
      let paramsFemale = {
        sex: "2",  // 1==男，2==女
        date: nowdate.getTime()
      }
      getTodayUser(paramsFemale).then(res=>{
        if(res.code === 1){
          this.femaleUser = res.data
        }
      })
      let vipDate = new Date(nowdate-24*3600*1000)
      let paramsVip = {
        date: vipDate.getTime()
      }
      getVip(paramsVip).then(res => {
        if(res.code === 1) {
          this.vipCount = res.data
        }
      })
      let inconmeDate = new Date(nowdate-24*3600*1000)
      let paramsIncome = {
        startDate: inconmeDate.getTime(),
        endDate: nowdate.getTime()
      }
      getInCome(paramsIncome).then(res =>{
        if(res.code === 1) {
          this.incomeCount = res.data.income
        }
      })
    },
    // 获取本月本周收益
    getDateWithMonth () {
      getByDateWithMonth().then(res =>{
        if(res.code === 0) {
          this.incomeData = res.data
          console.log(this.incomeData)
          // if(res.data.monthIncome === 0 && res.data.monthRate === 1){
          //   this.incomeData.monthRate = 0
          // }
          // if(res.data.weekIncome === 0 && res.data.weekRate === 1) {
          //   this.incomeData.weekRate = 0
          // }
        }
      })
    },
    // 根据时间区间显示图表数据
    selectDateIncome() {
      // 查询一周的收益
      let starttime = this.weekValue.getTime() - 24*3600*1000
      let endtime = this.weekValue.getTime() + 5*24*3600*1000
      let params = {
        startDate: starttime,
        endDate: endtime
      }
      // // 调接口
      getInCome(params).then(res =>{
        if(res.code === 1) {
          this.chartData = res.data
          if(this.chartData.length>0) {
            this.drawingCharts()
          }else {
            this.incomeDataNull = true
          }
        }
      })
    },
    // 画图表
    drawingCharts () {
      var dateList = this.chartData.map(function (item) {
        return item.date;
      });
      var valueList = this.chartData.map(function (item) {
        return item.income;
      });
      console.log(dateList)
      console.log(valueList)
      let myChart = this.$echarts.init(this.$refs.myChart)
      let option = {
        color: 'rgb(85,152,253)',
        title: {
          text: '一周收益统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          },
          backgroundColor: '#ffffff',
          textStyle: {
            color: '#000000'
          }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dateList
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: valueList,
            type: 'line',
            areaStyle: {
              color: 'rgb(213,230,255)'
            }
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 57px;
  width: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  padding-bottom: 20px;
  .statistic-wrapper{
    width: 100%;
    .lists {
      display: flex;
      .list-item{
        flex: 1;
        height: 150px;
        margin-right: 20px;
        padding-left: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:first-child {
          border-top: 4px solid rgb(26,188,156);
        }
        &:nth-child(2) {
          border-top: 4px solid rgb(255,102,51);
        }
        &:nth-child(3) {
          border-top: 4px solid rgb(24,144,255);
        }
        &:nth-child(4) {
          border-top: 4px solid rgb(255,204,102);
          margin-right: 0px;
        }
        .icon-wrapper{
          width: 80px;
          height: 80px;
          margin-right: 20px;
          img {
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
          }
        }
        .statistic-info {
          text-align: left;
        }
      }
    }
    
  }
  .chart-wrapper {
    width: 100%;
    .table {
      margin: 0 auto;
      width: 95%;
      border: 1px solid rgba(0, 0, 0, 0.1);
      .table-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        padding-right: 10px;
        height: 50px;
        background-color: #f5f5f5;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        .title {
          // line-height: 50px;
        }
        .date {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: rgba(0,0,0,0.5);
          .interval {
            margin-right: 5px;
          }
          .select {
            margin-left: 5px
          }
        }
      }
      
      .statistic-table {
        display: flex;
        .left {
          width: 200px;
          height: 500px;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          .statistic-item {
            padding: 40px;
            padding-left: 40px;
            text-align: left;
            .statistic-title {
              color: #9b9b9b;
            }
            .statistic-num {
              font-size: 30px;
            }
            .statistic-ratio {
              .rate-icon {
                display: inline-block;
                vertical-align: middle;
                margin-right: 4px;
              }
              .rate {
                display: inline-block;
                vertical-align: middle;
              }
              .green {
                color: #08c4a0;
              }
              .orange {
                color: salmon;
              }
              .gray {
                display: inline-block;
                vertical-align: middle;
                font-size: 14px;
                color: #cdcdcd;
              }
            }

          }
        }
        .right {
          flex: 1;
          padding-top: 40px;
          padding-left: 20px;
        }
      }
    }
  }
}

</style>

