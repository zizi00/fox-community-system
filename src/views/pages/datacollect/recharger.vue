<template>
    <div class="recharger">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="rechargerForm">
                <el-form-item label="关键词:">
                    <el-input v-model="rechargerForm.key" size="small" placeholder="账号/昵称/流水号"></el-input>
                </el-form-item>
                <el-form-item label="支付方式:">
                    <el-select v-model="rechargerForm.payWay" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="微信" value="1"></el-option>
                        <el-option key="2"  label="支付宝" value="2"></el-option>
                        <el-option key="3"  label="钱包" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="rechargerForm.startDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间">
                    </el-date-picker>至
                    <el-date-picker
                        v-model="rechargerForm.endDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
          <div class="statisticsW">
            <div class="recharger-total">累计充值金额:{{rechargerTotal}}(元)</div>
            <div class="recharger-total">今日充值金额：{{todayTotals}}(元)</div>
            <div class="recharger-total">本周充值金额：{{weekTotals}}(元)</div>
            <div class="recharger-total">本月充值金额：{{monthTotals}}(元)</div>
          </div>
            
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="userNickName" label="昵称" align="center"></el-table-column>
                <el-table-column prop="payWay" label="支付方式" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ payWayMap[scope.row.payWay] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="充值金额（元）" align="center"></el-table-column>
                <el-table-column prop="payTime" label="付款时间" align="center"></el-table-column>
                <el-table-column prop="payType" label="充值类型" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ payTypeMap[scope.row.payType] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="tradeNo" label="流水号" align="center"></el-table-column>
            </el-table>
            <el-row>
                <el-col :span="5" class="totals">合计:{{totals}}(元)</el-col>
                <el-col :span="19">
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
import { getRechargeList, getRechargeOverview } from '@/api/aggregate.js'
export default {
    name: "recharger",
    data () {
        return {
            rechargerForm: {
                key: "",
                pageNo: 1,
                pageSize: 10,
                startDate: "",
                endDate: "",
                payWay: "",
            },
            tableData: [],
            total: 0, //分页
            currentPage: 1,
            payWayMap: {
                1: "微信",
                2: "支付宝",
                3: "钱包",
            },
            payTypeMap: {
                1: "普通照片",
                2: "红包照片",
                3: "会员充值",
                4: "钱包充值",
                5: "付费广播",
                6: "付费相册",
                7: "查看QQ",
                8: "查看微信"
            },
            rechargerTotal: 0,
            totals: 0,
            todayTotals: 0,
            weekTotals: 0,
            monthTotals: 0,
        }
    },
    methods: {
        initData() {
            getRechargeList(this.rechargerForm).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.pageInfo.list
                    this.total = res.data.pageInfo.total
                    this.totals = res.data.totals
                    this.todayTotals = res.data.totalToday
                    this.weekTotals = res.data.totalWeek
                    this.monthTotals = res.data.totalMonth
                }
            })
        },
        getRechargerTotal() {
            getRechargeOverview().then(res => {
                if(res.code === 1) {
                    this.rechargerTotal = res.data.rechargeTotal
                    // this.totals = res.data.totals
                }
            })
        },
        // 分页
        handleCurrentChange(val) {
            this.rechargerForm.pageNo = val
            this.initData()
        },
        searchData () {
            this.currentPage = 1
            this.rechargerForm.pageNo = 1
            let start = new Date(this.rechargerForm.startDate).getTime()
            let end = new Date(this.rechargerForm.endDate).getTime()
            if(start>end) {
                this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间"
                });
                return false
            }
            this.initData()
        },
    },
    created() {
        this.initData()
        this.getRechargerTotal()
    }
}
</script>
<style lang="less" scoped>
.recharger {
    margin-top: 57px;
    padding: 10px;
    height: 100%;
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
        .statisticsW {
          color:#409EFF;
          text-align: left;
          margin-bottom: 10px;
          .recharger-total{
            display: inline-block;
            margin-left: 30px;
            &.recharger-total:first-child {
              margin-left: 0px;
            }
          }
          
        }
        
        /deep/.el-table thead {
            background-color: #f9fafd;
        }
        /deep/.el-th {
            background-color: #f9fafd;
        }
        /deep/.el-table th>.cell {
            color: #000000;
            
        }
        .totals {
            margin-top: 10px;
            text-align: left;
        }
        .pagination{
            text-align: right;
            margin-top: 10px;
        }
    }
}
</style>