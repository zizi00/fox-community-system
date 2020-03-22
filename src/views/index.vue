<template>
    <div class="index">
        <HeadNav></HeadNav>
        <div class="left-container">
            <LeftMenu></LeftMenu>
        </div>
        <div class="right-container">
            <!-- 顶部标签卡 -->
            <!-- <Tags></Tags> -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import HeadNav from '../components/headNav'
import LeftMenu from '../components/leftMenu'
export default {
    name: "index",
    data () {
        return {

        }
    },
    components: {
        HeadNav,
        LeftMenu
    }
}
</script>
<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .left-container {
        width: 242px;
        height: calc(100% - 80px);
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
            height: 100%;
        }
    }
    .right-container {
        // position: relative;
        // top: 0;
        // left: 240px;
        // width: calc(100% - 240px);
        width: calc(100% - 120px);
        height: calc(100% - 80px);
        overflow: auto;
        // padding: 20px;
    }
}
</style>