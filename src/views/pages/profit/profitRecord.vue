<template>
    <div class="profit-record">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="recordForm">
                <el-form-item label="关键词:">
                    <el-input v-model="recordForm.keyWorld" size="small" placeholder="账号/昵称/订单号"></el-input>
                </el-form-item>
                <el-form-item label="代理等级:">
                    <el-select v-model="recordForm.agencyGradeId" placeholder="请选择" size="small" clearable>
                        <!-- <el-option key="1"  label="资料未完成" value="1"></el-option>
                        <el-option key="2"  label="待认证" value="2"></el-option>
                        <el-option key="3"  label="认证完成" value="3"></el-option>
                        <el-option key="4"  label="认证失败" value="4"></el-option>
                        <el-option key="5"  label="审核中" value="5"></el-option>
                        <el-option key="10"  label="封号" value="10"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="分佣级别:">
                    <el-select v-model="recordForm.divideGradeId" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="有效" value="1"></el-option>
                        <el-option key="0"  label="已禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-form-item label="时间:">
                    <el-date-picker
                        v-model="recordForm.beginDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="recordForm.endDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-button type="primary" size="small" icon="search" @click="onSearch()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column type="index" label="序号" align="center" width="100"></el-table-column> -->
                <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                <el-table-column prop="agencyPhone" label="账号" align="center"></el-table-column>
                <el-table-column prop="payMoney" label="支付金额(元)" align="center"></el-table-column>
                <el-table-column prop="divideMoney" label="佣金(元)" align="center"></el-table-column>
                <el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
                <el-table-column prop="agencyNickname" label="代理昵称" align="center"></el-table-column>
                <el-table-column prop="agencyGradeName" label="代理等级" align="center"></el-table-column>
                <el-table-column prop="divideGradeName" label="分佣级别" align="center"></el-table-column>
                <el-table-column prop="creatDate" label="时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{scope.row.creatDate | parseTime}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination" v-if="total > 10">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10"
                        background
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { getAgencyList } from '@/api/profit.js'
export default {
    name: "profit-record",
    data () {
        return {
            recordForm: {
                page: 1,
                pageSize: 10,
                keyWorld: "",
                agencyGradeId: "",
                divideGradeId: "",
                startDate: "",
                endDate: ""
            },
            tableData: [],
            total: 0, //分页
            currentPage: 1,
            stateMap: {
                1: "资料未完成",
                2: "待认证",
                3: "认证完成",
                4: "认证失败",
                5: "审核中",
                10: "封号"
            },
            isValidMap:{
                1: "有效",
                0: "已禁用"
            },
        }
    },
    methods: {
        initData() {
            getAgencyList(this.recordForm).then(res =>{
                if(res.code === 1) {
                    this.tableData = res.data
                    this.total = res.count
                }
            })
        },
        handleCurrentChange(val) {
            this.recordForm.page = val
            this.initData()
        },
        onSearch () {
            this.currentPage = 1
            this.recordForm.page = 1
            this.initData()

        },
    },
    created () {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.profit-record {
    margin-top: 57px;
    padding: 10px;
    min-height: calc(100% - 80px);
    background-color: #f0f2f6;
    .search-wrapper {
        min-height: 50px;
        padding: 5px 0px;
        box-sizing: border-box;
        text-align: left;
        padding-left: 10px;
        background-color: #ffffff;
        .el-form--inline {
            min-height: 40px;
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
        .pagination{
            text-align: right;
            margin-top: 10px;
        }
    }
    .article-wrapper {
        
    }
}
</style>