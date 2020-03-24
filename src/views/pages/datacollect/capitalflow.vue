<template>
    <div class="capital-flow">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="capitalFlowForm">
                <el-form-item label="关键词:">
                    <el-input v-model="capitalFlowForm.keyword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="支付类型:">
                    <el-select v-model="capitalFlowForm.kind" size="small">
                        <!-- <el-option
                        v-for="item in currentTopicList"
                        :key="item.topicBoardId"
                        :label="item.title"
                        :value="item.topicBoardId">
                        <span style="float: left">{{ item.title }}</span>
                        </el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="支付状态:">
                    <el-select v-model="capitalFlowForm.status" size="small">
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
                    <el-input v-model="capitalFlowForm.time" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData(classifyForm)">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column prop="createAt" label="订单号" align="center"></el-table-column>
                <el-table-column prop="categoryName" label="账号" align="center"></el-table-column>
                <el-table-column prop="status" label="昵称" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{statusMap[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="支付类型" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付金额（狐币）" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付状态" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付对象账号" align="center"></el-table-column>
            </el-table>
            </div>
    </div>
</template>
<script>
export default {
    name: "capital-flow",
    data () {
        return {
            capitalFlowForm: {
                keyword: "",
                kind: "",
                status: "",
                time: ""
            },
            tableData: []
        }
    },
    methods: {
        searchData () {

        },
    }
}
</script>
<style lang="less" scoped>
.capital-flow {
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