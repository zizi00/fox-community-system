<template>
    <div class="capital-flow">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="capitalFlowForm">
                <el-form-item label="关键词:">
                    <el-input v-model="capitalFlowForm.key" size="small" placeholder="账号/昵称/订单号/支付对象"></el-input>
                </el-form-item>
                <el-form-item label="支付类型:">
                    <el-select v-model="capitalFlowForm.payType" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="普通照片" value="1"></el-option>
                        <el-option key="2"  label="红包照片" value="2"></el-option>
                        <el-option key="3"  label="会员充值" value="3"></el-option>
                        <el-option key="4"  label="钱包充值" value="4"></el-option>
                        <el-option key="5"  label="付费广播" value="5"></el-option>
                        <el-option key="6"  label="付费相册" value="6"></el-option>
                        <el-option key="7"  label="查看QQ" value="7"></el-option>
                        <el-option key="8"  label="查看微信" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付状态:">
                    <el-select v-model="capitalFlowForm.payStatus" placeholder="请选择" size="small" clearable>
                        <el-option key="0"  label="未支付" value="0"></el-option>
                        <el-option key="1"  label="已支付" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="capitalFlowForm.startDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        placeholder="选择开始时间">
                    </el-date-picker>--
                    <el-date-picker
                        v-model="capitalFlowForm.endDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <div class="table-top"><span>会员充值:{{capitalFlowTotal.vipRechargeTotal}}(元)</span><span>累计解锁相册: {{capitalFlowTotal.unlockPhotoTotal}}(元)</span><span>累计红包相册：{{capitalFlowTotal.redPackagePhotoTotal}}(元)</span><span>累计查看资料：{{capitalFlowTotal.lookDataTotal}}(元)</span><span>累计合计：{{capitalFlowTotal.totals}}(元)</span></div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="orderNo" label="订单号" align="center"></el-table-column>
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="userNickName" label="昵称" align="center"></el-table-column>
                <el-table-column prop="payType" label="支付类型" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ payTypeMap[scope.row.payType] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="订单金额" align="center"></el-table-column>
                <el-table-column prop="payMoney" label="支付金额（狐币）" align="center"></el-table-column>
                <el-table-column prop="payTime" label="支付时间" align="center"></el-table-column>
                <el-table-column prop="payStatus" label="支付状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ payStatusMap[scope.row.payStatus] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="toAccount" label="支付对象账号" align="center"></el-table-column>
            </el-table>
            <el-row class="table-bottom">
                <span>会员充值：{{capitalFlow.vipRechargeTotal}}(元)</span><span>解锁相册：{{capitalFlow.unlockPhotoTotal}}(元)</span><span>红包照片：{{capitalFlow.redPackagePhotoTotal}}(元)</span><span>查看资料：{{capitalFlow.lookDataTotal}}(元)</span><span>合计：{{capitalFlow.totals}}(元)</span>
            </el-row>
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
import { getCapitalflowList, getCapitalOverview } from '@/api/aggregate.js'
export default {
    name: "capital-flow",
    data () {
        return {
            capitalFlowForm: {
                key: "",
                pageNo: 1,
                pageSize: 10,
                startDate: "",
                endDate: "",
                payStatus: "",
                payType: ""
            },
            tableData: [],
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                },
            },
            total: 0, //分页
            currentPage: 1,
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
            payStatusMap: {
                0: "未支付",
                1: "已支付",
            },
            capitalFlow: {},
            capitalFlowTotal: {}
        }
    },
    methods: {
        initData() {
            getCapitalflowList(this.capitalFlowForm).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.pageInfo.list
                    this.total = res.data.pageInfo.total
                    this.capitalFlow.unlockPhotoTotal = res.data.unlockPhotoTotal
                    this.capitalFlow.redPackagePhotoTotal = res.data.redPackagePhotoTotal
                    this.capitalFlow.lookDataTotal = res.data.lookDataTotal
                    this.capitalFlow.totals = res.data.totals
                    this.capitalFlow.vipRechargeTotal = res.data.vipRechargeTotal
                }
            })
        },
        // 分页
        handleCurrentChange(val) {
            this.capitalFlowForm.pageNo = val
            this.initData()
        },
        getCapitalData() {
            getCapitalOverview().then(res =>{
                if(res.code === 1) {
                    this.capitalFlowTotal = res.data
                }
            })
        },
        searchData () {
            this.currentPage = 1
            this.capitalFlowForm.pageNo = 1
            let start = new Date(this.capitalFlowForm.startDate).getTime()
            let end = new Date(this.capitalFlowForm.endDate).getTime()
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
        this.getCapitalData()
    }
}
</script>
<style lang="less" scoped>
.capital-flow {
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
        .table-top {
            color:#409EFF;
            text-align: left;
            margin-bottom: 10px;
            span {
                margin-right: 10px;
            }
        }
        .table-bottom {
            margin-top: 10px;
            text-align: left;
            span {
                margin-right: 12px;
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
        .pagination{
            text-align: right;
            margin-top: 10px;
        }
    }
}
</style>