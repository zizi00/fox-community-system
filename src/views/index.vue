<template>
    <div class="index">
        <HeadNav></HeadNav>
        <div class="main-wrapper">
            <el-col :span="5" class="left">
                <div class="left-container">
                    <LeftMenu></LeftMenu>
                </div>
            </el-col>
            <el-col :span="19" class="right">
                <div class="right-container">
                    <!-- 顶部标签卡 -->
                    <!-- <Tags></Tags> -->
                    <router-view></router-view>
                </div>
            </el-col>
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
    .main-wrapper {
        width: 100%;
        height: 100%;
        .left {
            height: 100%;
            .left-container {
                width: 242px;
                height: calc(100% - 80px);
                .el-menu-vertical-demo:not(.el-menu--collapse) {
                    width: 200px;
                    height: 100%;
                }
            }
        }
        .el-col-5 {
            width: 242px;
        }
        .right {
            width: calc(100% - 242px);
            .right-container {
                height: calc(100% - 80px);
                overflow: auto;
                padding: 0 20px;
            }
        }
    }
    
}
</style>