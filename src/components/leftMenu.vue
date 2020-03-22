<template>
    <div class="left-menu">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <div v-for="(itemMenu,index) in menuList" :key = "index">
                <div v-if="itemMenu.subMenuList">
                     <el-submenu :index="itemMenu.index">
                        <template slot="title">
                        <i :class="itemMenu.icon"></i>
                        <span slot="title">{{itemMenu.title}}</span>
                        </template>
                        <el-menu-item :index="itemSubMenu.subIndex" v-for="(itemSubMenu,index) in itemMenu.subMenuList" :key = "index">{{itemSubMenu.subTitle}}</el-menu-item>
                    </el-submenu>
                </div>
                <div v-else>
                    <el-menu-item :index="itemMenu.index">
                        <i :class="itemMenu.icon"></i>
                        <span slot="title">{{itemMenu.title}}</span>
                    </el-menu-item>
                </div>
            </div>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: "left-menu",
    data () {
        return {
            isCollapse: false,
            menuList: [
                {
                    title: "首页",
                    icon: "el-icon-s-home",
                    index: "1"
                },
                {
                    title: "认证中心",
                    icon: "el-icon-location",
                    index: "2",
                    subMenuList: [
                        {
                            subTitle: "女用户认证",
                            subIndex: "2-1",
                        },
                        {
                            subTitle: "男用户认证",
                            subIndex: "2-2",
                        }
                    ]
                },
                {
                    title: "用户管理",
                    icon: "el-icon-user",
                    index: "3",
                    subMenuList: [
                        {
                            subTitle: "女用户管理",
                            subIndex: "3-1",
                        },
                        {
                            subTitle: "男用户管理",
                            subIndex: "3-2",
                        }
                    ]
                },
                {
                    title: "邀请码",
                    icon: "el-icon-location",
                    index: "4",
                    subMenuList: [
                        {
                            subTitle: "邀请码管理",
                            subIndex: "4-1",
                        }
                    ]
                },
                {
                    title: "举报",
                    icon: "el-icon-location",
                    index: "5",
                    subMenuList: [
                        {
                            subTitle: "举报",
                            subIndex: "5-1",
                        }
                    ]
                },
                {
                    title: "提现",
                    icon: "el-icon-location",
                    index: "6",
                    subMenuList: [
                        {
                            subTitle: "用户提现",
                            subIndex: "6-1",
                        }
                    ]
                },
                {
                    title: "数据查询",
                    icon: "el-icon-location",
                    index: "7",
                    subMenuList: [
                        {
                            subTitle: "资金流水",
                            subIndex: "7-1",
                        },
                        {
                            subTitle: "充值记录",
                            subIndex: "7-2",
                        }
                    ]
                },
            ]
        }
    },
    methods: {
        handleOpen() {

        },
        handleClose() {

        }
    }
}
</script>
<style lang="less" scoped>
.left-menu {
    height: 100%;
    overflow: auto;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        // width: 100%;
        height: 100%;
    }
    .el-menu-item {
        text-align: left;
    }
    .el-submenu__title {
        text-align: left;
    }
}
</style>