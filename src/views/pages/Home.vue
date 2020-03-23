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
  .statistic-wrapper{
    width: 100%;
    .lists {
      display: flex;
      .list-item{
        flex: 1;
        height: 150px;
        margin-right: 20px;
        padding-left: 30px;
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
          width: 90px;
          height: 90px;
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
}

</style>

