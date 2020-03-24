<template>
    <div class="invite-code">
        <div class="search-wrapper">
            <el-button type="primary" size="small" icon="search" @click="searchData(classifyForm)">添加邀请码</el-button>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column prop="categoryName" label="管理人" align="center"></el-table-column>
                <el-table-column prop="status" label="邀请码" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{statusMap[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="createAt" label="邀请男用户数" align="center"></el-table-column>
                <el-table-column prop="createAt" label="邀请女用户数" align="center"></el-table-column>
                <el-table-column prop="createAt" label="最近邀请时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="生成时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="状态" align="center"></el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onEditClassify(scope.row,scope.$index)"
                    >禁用</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div>
    </div>
</template>
<script>
export default {
    name: "invite-code",
    data () {
        return {
            usersForm: {
                keyword: "",
                isIdentify: "",
                status: "",
                areaid: ""
            },
            tableData: []
        }
    },
    methods: {
        onEditClassify () {
            
        }
    }
}
</script>
<style lang="less" scoped>
.invite-code {
    padding: 10px;
    height: 100%;
    background-color: #f0f2f6;
    .search-wrapper {
        height: 50px;
        padding: 5px 0px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 10px;
        background-color: #ffffff;
        .el-form--inline {
            height: 40px;
        }
    }
    .table_container {
        margin-top: 20px;
        padding: 10px;
        background-color: #ffffff;
        /deep/.el-table thead {
            background-color: #f9fafd;
        }
        /deep/.el-th {
            background-color: #f9fafd;
        }
        /deep/.el-table th>.cell {
            color: #000000;
            
        }
    }
}
</style>