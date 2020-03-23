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
        <p class="title">平台收益表</p>
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
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
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
      .title {
        height: 50px;
        padding-left: 20px;
        line-height: 50px;
        text-align: left;
        background-color: #f5f5f5;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
        }
      }
    }
  }
}

</style>

