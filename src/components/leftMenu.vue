<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu mode="vertical" :default-active="$route.path" router class="el-menu-vertical-demo" :collapse="isCollapse">
                <template v-for="item in items">
                    <el-submenu v-if="item.children" :index="item.path" :key="item.path">
                        <template slot="title">
                            <i :class="'fa fa-margin '+item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </template>
                        <router-link v-for="(citem,cindex) in item.children"
                                     :to="citem.path" :key="cindex">
                            <el-menu-item
                                    :index='citem.path'>
                                <span slot="title">{{citem.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                    <template v-if="!item.children">
                        <router-link :to="item.path" :key="item.path" >
                            <el-menu-item :index="item.path">
                                <i :class="'fa fa-margin '+item.icon"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </router-link>
                    </template>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        name: "leftmenu",
        data() {
            return {
                // isCollapse: this.$store.getters.collapse,
                items: [
                    {
                        icon: "fa-home",
                        name: "首页",
                        path: "/home",
                    },
                    {
                        icon: "fa-check-square",
                        name: "认证中心",
                        path: "identify",
                        children: [
                            {path: "/identifygirl", name: "女认证中心"}
                        ]
                    },
                    {
                        icon: "fa-user",
                        name: "用户管理",
                        path: "users",
                        children: [
                          { path: "/usersgirl", name: "女用户管理" },
                          { path: "/usersboy", name: "男用户管理" },
                          { path: "/usersupdate", name: "女用户同步" },
                        ]
                      },
                    {
                        icon: "fa-barcode",
                        name: "邀请码",
                        path: "invitecode",
                        children: [
                            {path: "/invitecode", name: "邀请码管理"},
                        ]
                    },
                    {
                        icon: "fa-sticky-note",
                        name: "内容管理",
                        path: "article",
                        children: [
                            {path: "/article", name: "内容列表"},
                        ]
                    },
                    {
                        icon: "fa-money",
                        name: "分销中心",
                        path: "profit",
                        children: [
                            {path: "/profitSet", name: "基础设置"},
                            {path: "/profitRecord", name: "分销记录"},
                        ]
                    },
                    {
                        icon: "fa-frown-o",
                        name: "举报",
                        path: "complaint",
                        children: [
                            {path: "/complaint", name: "举报管理"},
                        ]
                    },
                    {
                        icon: "fa-dollar",
                        name: "提现",
                        path: "cashout",
                        children: [
                            {path: "/cashout", name: "用户提现"},
                        ]
                    },
                    {
                        icon: "fa-line-chart",
                        name: "数据查询",
                        path: "datacollet",
                        children: [
                            {path: "/capitalflow", name: "资金流水"},
                            {path: "/recharger", name: "充值记录"},
                        ]
                    }
                ]
            };
        },
        computed: {
            isCollapse: function () {
                let ret = this.$store.getters.collapse
                return ret
            }
        },
        methods: {
        }
    };
</script>
<style scoped>
    .menu_page {
        height: 100%;
        min-height: 100%;
        overflow: auto;
    }
    .el-col-24 {
        height: 100%;
    }
    .el-menu {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    .fa-margin {
        margin-right: 5px;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 240px;
        height: 100%;
    }

    .el-menu-vertical-demo {
        width: 55px;
        height: 100%;
    }
    .el-menu-item {
        text-align: left;
    }
    >>>.el-submenu__title {
        text-align: left;
    }
    .el-submenu .el-menu-item {
        min-width: 240px;
    }

    .hiddenDropdown,
    .hiddenDropname {
        display: none;
    }

    a {
        text-decoration: none;
    }
</style>
