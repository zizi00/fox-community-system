<template>
    <div class="recharger">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="rechargerForm">
                <el-form-item label="关键词:">
                    <el-input v-model="rechargerForm.keyword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="支付类型:">
                    <el-select v-model="rechargerForm.payWay" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="微信" value="1"></el-option>
                        <el-option key="2"  label="支付宝" value="2"></el-option>
                        <el-option key="3"  label="钱包" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付状态:">
                    <el-select v-model="rechargerForm.rechargeType" placeholder="请选择" size="small" clearable>
                        <el-option key="3"  label="会员充值" value="3"></el-option>
                        <el-option key="4"  label="钱包充值" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="rechargerForm.startDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        placeholder="选择开始时间">
                    </el-date-picker>至
                    <el-date-picker
                        v-model="rechargerForm.endDate"
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
import { getRechargeList } from '@/api/aggregate.js'
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
                rechargeType: ""
            },
            tableData: [],
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                },
            }
        }
    },
    methods: {
        initData() {
            getRechargeList(this.rechargerForm).then(res => {

            })
        },
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