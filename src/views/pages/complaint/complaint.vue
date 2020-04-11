<template>
    <div class="complaint">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="complaintForm">
                <el-form-item label="关键词:">
                    <el-input v-model="complaintForm.key" size="small"></el-input>
                </el-form-item>
                <el-form-item label="举报原因:">
                    <el-input v-model="complaintForm.reportReason" size="small"></el-input>
                </el-form-item>
                <el-form-item label="时间:">
                    <el-date-picker
                        v-model="complaintForm.startDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="complaintForm.endDate"
                        type="date"
                        value-format="yyyy-MM-dd"
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
                <el-table-column prop="fromUser" label="反馈人账号" align="center"></el-table-column>
                <el-table-column prop="remark" label="详细描述" align="center"></el-table-column>
                <el-table-column prop="toUser" label="被举报人账号" align="center"></el-table-column>
                <el-table-column prop="createTime" label="发布时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.createTime | parseTime }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="24">
                    <div class="pagination" v-if="total > 10">
                        <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
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
import { getComplaintList } from '@/api/aggregate.js'
export default {
    name: "complaint",
    data () {
        return {
            complaintForm: {
                key: "",
                reportReason: "",
                pageNo: 1,
                pageSize: 10,
                startDate: "",
                endDate: ""
            },
            tableData: [],
            total: 0, //分页
            currentPage: 1,
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now();
                },
            }
        }
    },
    methods: {
        initData() {
            getComplaintList(this.complaintForm).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            })
        },
        searchData () {
            console.log(typeof this.complaintForm.endDate)
            // 时间格式需要处理
            this.initData()
        },
        // 分页
        handleCurrentChange(val){
            this.complaintForm.pageNo = val
            this.initData()
        },
    },
    created() {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.complaint {
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