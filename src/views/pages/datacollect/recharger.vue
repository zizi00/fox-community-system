<template>
    <div class="recharger">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="rechargerForm">
                <el-form-item label="关键词:">
                    <el-input v-model="rechargerForm.keyword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="支付类型:">
                    <el-select v-model="rechargerForm.kind" size="small">
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
                    <el-select v-model="rechargerForm.status" size="small">
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
                    <el-input v-model="rechargerForm.time" size="small"></el-input>
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
                <el-table-column prop="createAt" label="充值类型" align="center"></el-table-column>
                <el-table-column prop="createAt" label="充值金额（元）" align="center"></el-table-column>
                <el-table-column prop="createAt" label="付款时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="支付方式" align="center"></el-table-column>
                <el-table-column prop="createAt" label="流水号" align="center"></el-table-column>
            </el-table>
            </div>
    </div>
</template>
<script>
export default {
    name: "recharger",
    data () {
        return {
            rechargerForm: {
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
.recharger {
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