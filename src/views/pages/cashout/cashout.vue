<template>
    <div class="cash-out">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="cashOutForm">
                <el-form-item label="关键词:">
                    <el-input v-model="cashOutForm.key" size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="cashOutForm.status" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="待审核" value="1"></el-option>
                        <el-option key="2"  label="审核通过" value="2"></el-option>
                        <el-option key="3"  label="审核拒绝" value="3"></el-option>
                        <el-option key="4"  label="确认汇款" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="cashOutForm.startDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        placeholder="选择开始时间">
                    </el-date-picker> -- 
                    <el-date-picker
                        v-model="cashOutForm.endDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData(classifyForm)">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="name" label="昵称" align="center"></el-table-column>
                <el-table-column prop="money" label="提现金额（元）" align="center"></el-table-column>
                <el-table-column prop="aliAccount" label="支付宝账号" align="center"></el-table-column>
                <el-table-column prop="aliNick" label="支付宝昵称" align="center"></el-table-column>
                <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
                <el-table-column prop="auditTime" label="审核时间" align="center"></el-table-column>
                <el-table-column prop="status" label="提现状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ statusMap[scope.row.status] }}</span>
                    </template>
                </el-table-column>
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
import { getCashoutList } from '@/api/aggregate.js'
export default {
    name: "cash-out",
    data () {
        return {
            cashOutForm: {
                key: "",
                status: "",
                pageNo: 1,
                pageSize: 10,
                startDate: "",
                endDate: ""
            },
            tableData: [],
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                },
            },
            statusMap: {
                1: "待审核",
                2: "审核通过",
                3: "审核拒绝",
                4: "确认汇款",
            }
        }
    },
    methods: {
        initData() {
            getCashoutList(this.cashOutForm).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.list
                }
            })
        },
        searchData () {

        },
        onEditClassify () {

        },
        onDeleteClassify () {

        }
    },
    created() {
        this.initData()
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