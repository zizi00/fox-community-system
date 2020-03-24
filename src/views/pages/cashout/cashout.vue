<template>
    <div class="cash-out">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="cashOutForm">
                <el-form-item label="关键词:">
                    <el-input v-model="cashOutForm.keyword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="举报原因:">
                    <el-select v-model="cashOutForm.reason" size="small">
                        <!-- <el-option
                        v-for="item in currentTopicList"
                        :key="item.topicBoardId"
                        :label="item.title"
                        :value="item.topicBoardId">
                        <span style="float: left">{{ item.title }}</span>
                        </el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-input v-model="cashOutForm.time" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData(classifyForm)">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column prop="categoryName" label="账号" align="center"></el-table-column>
                <el-table-column prop="status" label="昵称" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{statusMap[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="提现金额（元）" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付宝账号" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付宝昵称" align="center"></el-table-column>
                <el-table-column prop="createAt" label="申请时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="审核时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="提现状态" align="center"></el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onEditClassify(scope.row,scope.$index)"
                    >驳回</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onDeleteClassify(scope.row,scope.$index)"
                    >通过审核</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div>
    </div>
</template>
<script>
export default {
    name: "cash-out",
    data () {
        return {
            cashOutForm: {
                keyword: "",
                reason: "",
                time: ""
            },
            tableData: []
        }
    },
    methods: {
        searchData () {

        },
        onEditClassify () {

        },
        onDeleteClassify () {

        }
    }
}
</script>
<style lang="less" scoped>
.cash-out {
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