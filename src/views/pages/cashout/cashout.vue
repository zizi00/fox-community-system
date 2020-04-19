<template>
    <div class="cash-out">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="cashOutForm">
                <el-form-item label="关键词:">
                    <el-input v-model="cashOutForm.key" size="small" placeholder="账号/昵称"></el-input>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="cashOutForm.status" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="等待汇款" value="1"></el-option>
                        <el-option key="2"  label="审核通过" value="2"></el-option>
                        <el-option key="3"  label="提现已驳回" value="3"></el-option>
                        <el-option key="4"  label="提现成功" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="cashOutForm.startDate"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="cashOutForm.endDate"
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
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="name" label="昵称" align="center"></el-table-column>
                <el-table-column prop="money" label="提现金额（元）" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px; color: #46a846">{{ scope.row.money }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="aliAccount" label="支付宝账号" align="center"></el-table-column>
                <el-table-column prop="aliNick" label="支付宝昵称" align="center"></el-table-column>
                <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
                <el-table-column prop="auditTime" label="审核时间" align="center"></el-table-column>
                <el-table-column prop="status" label="提现状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ statusMap[scope.row.status] }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onCheck(scope.row.id,scope.row.name)"
                    >查看</el-button>
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
            <el-dialog
            title=""
            :visible.sync="transferVisible"
            width="500px"
            :before-close="handleClose">
                <span slot = "title">正在执行{{cachoutData.name}}的提现转账</span>
                <div class="content">
                    <div class="transfer-item"><span>支付宝昵称:</span>&ensp; <span>{{cachoutData.aliNick}}</span></div>
                    <div class="transfer-item"><span>支付宝账号:</span>&ensp; <span>{{cachoutData.aliAccount}}</span></div>
                    <div class="transfer-item"><span>提现金额:&ensp; </span><span style="color: #08c4a0">{{cachoutData.money}}</span><span style="margin: 0px 15px">|</span><span>冻结金额:&ensp; </span><span style="color: #08c4a0">{{cachoutData.freezeMoney}}</span><span style="margin: 0px 15px">|</span><span>账户余额:{{cachoutData.balance}}</span></div>
                    <div class="textarea">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入支付宝32位转账订单号；或输入驳回原因，默认原因“您的提现申请有误，请核实后重新申请。"
                            v-model="transferMessage">
                        </el-input>
                    </div>
                </div>
                <div slot="footer" class="submit">
                    <el-button class="disabled" type="primary" v-if="!this.transferMessage">确认已转账</el-button>
                    <el-button type="primary" v-else @click="onSubmitTransfer(cachoutData.id,cachoutData.name)">确认已转账</el-button>
                    <span class="refuse-button" @click="changeDialog">驳回</span>
                </div>
            </el-dialog>
            <el-dialog
            title=""
            :visible.sync="refuseVisible"
            width="500px"
            :before-close="refuseClose">
                <span slot = "title">正在执行{{cachoutData.name}}的提现转账</span>
                <div class="content">
                    <div class="transfer-item"><span>支付宝昵称:</span>&ensp; <span>{{cachoutData.aliNick}}</span></div>
                    <div class="transfer-item"><span>支付宝账号:</span>&ensp; <span>{{cachoutData.aliAccount}}</span></div>
                    <div class="transfer-item"><span>提现金额:&ensp; </span><span style="color: #ff0000">{{cachoutData.money}}</span><span style="margin: 0px 15px">|</span><span>冻结金额:&ensp; </span><span style="color: #ff0000">{{cachoutData.freezeMoney}}</span><span style="margin: 0px 15px">|</span><span>账户余额:{{cachoutData.balance}}</span></div>
                    <p class="refuse-tip">系统判定该用户为恶意操作，请驳回TA的提现申请</p>
                    <div class="refuse-textarea">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder='请输入驳回原因，默认原因“您的提现申请有误，请核实后重新申请。”'
                            v-model="refuseMessage">
                        </el-input>
                    </div>
                </div>
                <div slot="footer" class="submit">
                    <el-button type="primary" class="refuse-btn" @click="onSubmitRefuse(cachoutData.id,cachoutData.name)">提现已驳回</el-button>
                </div>
            </el-dialog>
            <!-- 提现成功查看 -->
            <el-dialog
            title=""
            :visible.sync="successVisible"
            width="500px"
            :before-close="successClose">
                <span slot = "title">正在执行{{cachoutData.name}}的提现转账</span>
                <div class="content">
                    <div class="transfer-item"><span>支付宝昵称:</span>&ensp; <span>{{cachoutData.aliNick}}</span></div>
                    <div class="transfer-item"><span>支付宝账号:</span>&ensp; <span>{{cachoutData.aliAccount}}</span></div>
                    <div class="transfer-item"><span>提现金额:&ensp; </span><span style="color: #08c4a0">{{cachoutData.money}}</span><span style="margin: 0px 15px">|</span><span>冻结金额:&ensp; </span><span style="color: #08c4a0">{{cachoutData.freezeMoney}}</span><span style="margin: 0px 15px">|</span><span>账户余额:{{cachoutData.balance}}</span></div>
                    <p class="remark"><span>支付宝转账订单号：</span><span>{{cachoutData.remark}}</span></p>
                </div>
                <div slot="footer" class="submit">
                    <p type="primary" class="success">提现成功</p>
                </div>
            </el-dialog>
            <!-- 提现驳回查看 -->
            <el-dialog
            title=""
            :visible.sync="failedVisible"
            width="500px"
            :before-close="failedClose">
                <span slot = "title">正在执行{{cachoutData.name}}的提现转账</span>
                <div class="content">
                    <div class="transfer-item"><span>支付宝昵称:</span>&ensp; <span>{{cachoutData.aliNick}}</span></div>
                    <div class="transfer-item"><span>支付宝账号:</span>&ensp; <span>{{cachoutData.aliAccount}}</span></div>
                    <div class="transfer-item"><span>提现金额:&ensp; </span><span style="color: #ff0000">{{cachoutData.money}}</span><span style="margin: 0px 15px">|</span><span>冻结金额:&ensp; </span><span style="color: #ff0000">{{cachoutData.freezeMoney}}</span><span style="margin: 0px 15px">|</span><span>账户余额:{{cachoutData.balance}}</span></div>
                    <p class="remark"><span>驳回原因：</span><span>{{cachoutData.remark}}</span></p>
                </div>
                <div slot="footer" class="submit">
                    <p type="primary" class="failed">提现已驳回</p>
                </div>
            </el-dialog>
    </div>
</template>
<script>
import { getCashoutList, getUserWithdrawDetail, updateStatus,reject } from '@/api/aggregate.js'
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
                1: "等待汇款",
                2: "审核通过",
                3: "提现已驳回",
                4: "提现成功",
            },
            cachoutData: {},
            transferVisible: false, // 汇款弹窗
            transferMessage: "",
            refuseVisible: false, // 驳回弹窗
            refuseMessage: "",
            successVisible: false, // 提现成功查看
            failedVisible: false, // 提现驳回查看
            total: 0, //分页
            currentPage: 1,
        }
    },
    methods: {
        initData() {
            getCashoutList(this.cashOutForm).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
        },
        searchData () {
            this.currentPage = 1
            this.cashOutForm.pageNo = 1
            let start = new Date(this.cashOutForm.startDate).getTime()
            let end = new Date(this.cashOutForm.endDate).getTime()
            if(start>end) {
                this.$message({
                type: "warning",
                message: "开始时间不能大于结束时间"
                });
                return false
            }
            this.initData()
        },
        onCheck (id,name) {
            this.transferMessage = ""
            this.refuseMessage = ""
            let params = {
                id: id
            }
            getUserWithdrawDetail(params).then(res =>{
                if(res.code === 1) {
                    this.cachoutData = res.data
                    this.cachoutData.id = id
                    this.cachoutData.name = name
                    if(res.data.status === 1) {
                        if(this.cachoutData.money === this.cachoutData.freezeMoney) {
                            this.transferVisible = true
                        } else {
                            this.refuseVisible = true
                        }
                    }else if (res.data.status === 3) {
                        //提现已驳回
                        this.failedVisible = true
                    }else if (res.data.status === 4) {
                        // 提现成功
                        this.successVisible = true
                    }else {
                        this.refuseVisible = true
                    }
                    
                    
                }
            })
        },
        //  确认转账
        onSubmitTransfer(id,nickname) {
            let params = {
                id: id,
                status: 4,
                remark: this.transferMessage
            }
            updateStatus(params).then(res => {
                if(res.code === 1) {
                    this.transferVisible = false
                    this.$notify({
                        title: '操作成功',
                        message: nickname +'提现转账成功',
                        type: 'success'
                        });
                    this.initData()
                }
            })
        },
        // 提现驳回
        onSubmitRefuse(id,nickname) {
            let params ={
                id: id,
                remark: this.refuseMessage
            }
            reject(params).then(res => {
                // console.log(res)
                this.refuseVisible = false
                this.$notify({
                    title: '操作成功',
                    message: '已驳回' + nickname +'的提现申请',
                    type: 'warning'
                    });
                this.initData()

            })
        },
        // 转账弹窗转成驳回弹窗
        changeDialog() {
            this.transferVisible = false
            this.refuseVisible = true
        },
        handleClose () {
            this.transferVisible = false
        },
        refuseClose () {
            this.refuseVisible = false
        },
        successClose () {
            this.successVisible = false
        },
        failedClose () {
            this.failedVisible = false
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
        .pagination{
            text-align: right;
            margin-top: 10px;
        }
    }
    /deep/.el-dialog {
        text-align: left;
        .el-dialog__header{
            padding: 20px;
            background-color: #FCFCFC;
            border-bottom: 1px solid #f5f5f5;
        }
    }
    .content {
        .transfer-item {
            margin-top: 10px;
        }
        .refuse-tip {
            margin-top: 10px;
            color: #ff0000;
        }
        .textarea {
            margin-top: 20px;
        }
        .refuse-textarea {
            margin-top: 10px;
        }
        .remark {
            margin-top: 10px;
            color: #000000;
        }
        
    }
    .submit {
        margin-top: 20px;
        text-align: center;
        position: relative;
        .el-button {
            padding: 10px 50px;
        }
        .disabled {
            border: none;
            background-color: gray;
        }
        .refuse-btn {
            border: none;
            background-color: #ff0000;
        }
        .failed {
            color: #ff0000;
        }
        .refuse-button {
            position: absolute;
            top: 5px;
            right: 0;
            color: red;
            cursor: pointer;
        }
    }
    /deep/.el-dialog__footer {
        padding: 1px 20px 20px;
        border-top: 1px solid #f5f5f5;
    }
}
</style>