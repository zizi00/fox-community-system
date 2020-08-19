<template>
    <div class="users-update">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="userForm">
                <el-form-item label="状态:">
                    <el-select v-model="userForm.status" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="正常" value="1"></el-option>
                        <el-option key="2"  label="下架" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市:">
                    <el-input v-model="userForm.city" size="small" placeholder="请输入城市"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" icon="search" @click="onSearch()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column type="index" label="序号" align="center" width="100"></el-table-column> -->
                <el-table-column prop="pic" label="头像" align="center">
                  <template slot-scope="scope">
                    <img style="width:50px;height:50px" :src="'http://foxcommunity.oss-cn-beijing.aliyuncs.com/'+scope.row.pic" alt="图片错误">
                  </template>
                </el-table-column>
                <el-table-column prop="nickname" label="用户昵称" align="center"></el-table-column>
                <el-table-column prop="address" label="地址" align="center"></el-table-column>
                <el-table-column prop="contact" label="联系方式" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px;display:block;text-align:left">微信：{{scope.row.contact[0]}}</span>
                        <span style="margin-left: 10px;display:block;text-align:left">QQ：{{scope.row.contact[1]}}</span>
                        <span style="margin-left: 10px;display:block;text-align:left">电话：{{scope.row.contact[2]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" align="center"></el-table-column>
                <el-table-column prop="remark" label="详情" align="center"></el-table-column>
                <el-table-column prop="createTime" label="同步时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{scope.row.createTime | parseTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="syncStatus" label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px" :class="[scope.row.syncStatus==1?'green':'red']">{{syncStatusMap[scope.row.syncStatus]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    v-if="scope.row.syncStatus == 2"
                    @click="onUp(scope.row.id)"
                    >上架</el-button>
                    <el-button
                    v-if="scope.row.syncStatus == 1"
                    type="text"
                    size="small"
                    plain
                    @click="onDown(scope.row.id)"
                    >下架</el-button>
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
        <!-- 弹出弹窗 -->
        <el-dialog
            :visible.sync="detailDialog"
            width="1200px"
            center
            :before-close="handleClose">
            <div class="detail-wrapper">
                
            </div>
        </el-dialog>
        
    </div>
</template>
<script>
import { getSyncGirlsInfo, SyncGirls } from '@/api/user.js'
export default {
    name: "users-update",
    data () {
        return {
            detailDialog: false,
            userForm: {
                page: 1,
                pageSize: 10,
                status: "",
                city: "",
            },
            tableData: [],
            total: 0, //分页
            currentPage: 1,
            syncStatusMap: {
                1: "正常",
                2: "下架"
            },
            detailData: [],
            photoList: [],
            userData: [],
        }
    },
    methods: {
        initData() {
            getSyncGirlsInfo(this.userForm).then(res =>{
                if(res.code === 1) {
                    let arr = []
                    arr = res.data
                    for(let i=0;i<arr.length;i++) {
                        let arr2 = []
                        arr[i].address=arr[i].city+arr[i].address
                        arr2.push(arr[i].wechat)
                        arr2.push(arr[i].qq)
                        arr2.push(arr[i].phone)
                        arr[i].contact = arr2
                    }
                    this.tableData = arr
                    this.total = res.count
                }
            })
        },
        handleCurrentChange(val) {
            this.userForm.page = val
            this.initData()
        },
        onSearch () {
            this.currentPage = 1
            this.userForm.page = 1
            this.initData()

        },
        // 查看详情
        onDetail (id,money,isValid) {
            this.photoList = []
            // this.detailDialog = true
            let params = {
                userId: id
            }
        },
        handleClose () {
            this.detailDialog = false
        },
        // 上架
        onUp(id) {
            let params = {
                userId: id,
                status : 1,
            }
            SyncGirls(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            })
        },
        // 下架
        onDown(id) {
            let params = {
                userId: id,
                status : 2,
            }
            SyncGirls(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            })
        },
    },
    created () {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.users-update {
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
        .green {
            color: #08c4a0;
        }
        .red {
            color: salmon;
        }
        .pagination{
            text-align: right;
            margin-top: 10px;
        }
    }
    /deep/.el-dialog__header {
        text-align: left;
        background-color: #fcfcfc;
        border-bottom: 1px solid #f5f5f5;
    }
    /deep/.el-dialog__body {
        padding: 50px 20px;
        text-align: left;
    }
    /deep/.el-dialog__footer {
        padding: 15px 20px;
        border-top: 1px solid #f5f5f5;
    }
    /deep/.el-textarea__inner {
        margin-top: 10px;
    }
}
</style>