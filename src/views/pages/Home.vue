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
            <p><span>100</span><span>个</span></p>
          </div>
        </li>
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/girl.png" alt="">
          </div>
          <div class="statistic-info">
            <p>今日新增女用户</p>
            <p><span>100</span><span>个</span></p>
          </div>
        </li>
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/vip.png" alt="">
          </div>
          <div class="statistic-info">
            <p>昨日VIP销量</p>
            <p><span>100</span><span>元</span></p>
          </div>
        </li>
        <li class="list-item">
          <div class="icon-wrapper">
            <img src="../../assets/images/wallet.png" alt="">
          </div>
          <div class="statistic-info">
            <p>昨日平台收益</p>
            <p><span>100</span><span>元</span></p>
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
              v-model="startTime"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="选择开始时间">
            </el-date-picker>至
            <el-date-picker
              v-model="endTime"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="选择结束时间">
            </el-date-picker>
            <el-button class="select" type="primary" size="small" @click="selectDateIncome">筛选</el-button>
          </div>
        </div>
        
        <div class="statistic-table">
          <div class="left">
            <div class="statistic-item">
              <p class="statistic-title">本月收益总额</p>
              <p class="statistic-num">100000</p>
              <p class="statistic-ratio"><span>10%</span><span class="gray">同比上月</span></p>
            </div>
            <div class="statistic-item">
              <p class="statistic-title">本周收益总额</p>
              <p class="statistic-num">50000</p>
              <p class="statistic-ratio"><span>10%</span><span class="gray">同比上周</span></p>
            </div>
          </div>
          <div class="right">
            <div ref="myChart" style="width: 800px;height:400px;"></div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getInCome } from '@/api/income.js'
import { getDate } from '@/assets/js/validate.js'
export default {
  name: "Home",
  data() {
    return {
      startTime: "",
      endTime: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      }
    }
  },
  created () {
    this.$nextTick(() =>{
      this.initdata ()
      this.drawingCharts()
    })
  },
  methods: {
    initdata() {
      let nowdate = new Date() 
      var oneweekdate = new Date(nowdate-7*24*3600*1000)
      this.endTime = getDate(nowdate)
      this.startTime = getDate(oneweekdate)
      let params = {
        startDate: Date.parse(nowdate),
        endDate: Date.parse(oneweekdate)
      }
      console.log(params)

      // getInCome(params).then(res =>{
      //   console.log(res)
      // })
      
    },
    // 根据时间区间显示图表数据
    selectDateIncome() {
      // 字符串转标准时间
      let starttime = Date (this.startTime)
      let endtime = Date (this.endtTime)
      let params = {
        startDate: Date.parse(starttime), // 标准时间转时间戳
        endDate: Date.parse(endtime)
      }
      // 调接口
    },
    // 画图表
    drawingCharts () {
      let myChart = this.$echarts.init(this.$refs.myChart)
      let option = {
        color: 'rgb(85,152,253)',
        title: {
          text: '收益统计'
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
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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
              .gray {
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

