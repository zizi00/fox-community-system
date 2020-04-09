<template>
    <div class="head-nav">
        <div class="left">
            <p class="title">狐狸社区管理系统</p>
        </div>
        <div class="right">
            <span class="title">当前用户:</span><span class="username">{{user.nickname}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "head-nav",
    computed:{
    user(){
      return this.$store.getters.user;
    }
  },
}
</script>
<style lang="less" scoped>
.head-nav {
    width: 100%;
    height: 80px;
    display: flex;
    // box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .left {
        width: 241px;
        height: 100%;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
        .title {
            text-align: center;
            line-height: 80px;
            color: #409EFF;
            font-size: 20px;
            font-weight: bold;
        }
    }
    .right {
        flex: 1;
        text-align: right;
        margin-right: 100px;
        line-height: 80px;
        .username {
            color: #409EFF;
        }
    }
}
</style>