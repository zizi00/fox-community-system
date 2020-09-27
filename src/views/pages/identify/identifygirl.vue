<template>
    <div class="identify-girl">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="identifyForm">
                <el-form-item label="关键词:">
                    <el-input v-model="identifyForm.searchText" size="small" placeholder="账号/昵称"></el-input>
                </el-form-item>
                <el-form-item label="认证:">
                    <el-select v-model="identifyForm.authStatus" size="small">
                        <el-option
                        v-for="item in stateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        <span style="float: left">{{ item.name }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区(城市):">
                    <el-input v-model="identifyForm.city" size="small" placeholder="请输入地区"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column type="index" label="序号" align="center" width="100"></el-table-column> -->
                <el-table-column prop="phone" label="账号" align="center"></el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                <el-table-column prop="city" label="所在城市" align="center"></el-table-column>
                <el-table-column prop="career" label="身份" align="center"></el-table-column>
                <el-table-column prop="state" label="认证" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{stateMap[scope.row.state]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最近登录" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.updateTime | parseTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.createTime | parseTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="inviteCode" label="认证码" align="center"></el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onChecked(scope.row,scope.$index)"
                    >查看</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onExamine(scope.row,scope.$index)"
                    >通过</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onFailed(scope.row,scope.$index)"
                    >驳回</el-button>
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

        <!-- 弹出弹窗 -->
        <el-dialog
            title=""
            :visible.sync="checkDialog"
            width="450px"
            center>
            <p><span style="color:#409EFF;">{{userData.nickname}}</span>的验证码：<span style="color:#409EFF;">{{userData.inviteCode}}</span></p>
            <div class="wrapper">
                <el-image 
                    v-if="isImage"
                    style="width: 300px; height: 300px"
                    :src="userData.picPath"
                    :preview-src-list="srcList">
                </el-image>
                <video v-if="isVideo" :src="userData.picPath"></video>
            </div>
        </el-dialog>
        <!-- 通过 -->
        <el-dialog
            title="审核确认"
            :visible.sync="examineDialog"
            width="450px"
            :before-close="handleClose">
            <span>确定要通过</span><span style="color:#409EFF;">{{userData.nickname}}</span><span>的认证条件吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSubmitExamine(userData.id,userData.nickname)">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 驳回 -->
        <el-dialog
            title="审核确认"
            :visible.sync="failedDialog"
            width="450px"
            :before-close="handleClose">
            <span>确定拒绝通过</span><span style="color:#409EFF;">{{userData.nickname}}</span><span>的认证条件吗？</span>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="failedMessage">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onSubmitFailed(userData.id,userData.nickname)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getAuthGirlsList, auditUser } from '@/api/user.js'
export default {
    name: "identify-girl",
    data () {
        return {
            checkDialog: false,
            examineDialog: false,
            failedDialog: false,
            failedMessage: "",
            srcList: [
            ],
            identifyForm: {
                searchText: "",
                authStatus: "",
                city: "",
                page: 1,
                pageSize: 10
            },
            tableData: [], //表格数据
            stateMap: {
                1: "资料未完成",
                2: "待认证",
                3: "认证完成",
                4: "认证失败",
                5: "审核中",
                10: "封号"
            },
            total: 0, //分页
            currentPage: 1,
            stateList: [
                {
                    id: 1,
                    name: "资料未完成"
                },
                {
                    id: 2,
                    name: "待认证"
                },
                {
                    id: 3,
                    name: "认证完成"
                },
                {
                    id: 4,
                    name: "认证失败"
                },
                {
                    id: 5,
                    name: "审核中"
                },
                {
                    id: 10,
                    name: "封号"
                }
            ],
            userData: [],
            isVideo: false,
            isImage: false
        }
    },
    methods: {
        initData() {
            getAuthGirlsList(this.identifyForm).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data
                    this.total = res.count
                }
            }).catch(err =>{
                console.log(err)
            })
        },
        searchData () {
            this.initData()
        },
        // 查看
        onChecked (row) {
            this.isVideo = false
            this.isImage = false
            this.checkDialog = true
            this.userData = row
            if(row.picPath) {
                if(row.picPath.indexOf('mp4')>0 || row.picPath.indexOf('MP4')>0 ) {
                    this.isVideo = true
                }else {
                    this.isImage = true
                    this.srcList.push(row.picPath)
                }
            }
            console.log(this.userData)
        },
        // 通过
        onExamine (row) {
            this.examineDialog = true
            this.userData = row
        },
        // 确定通过
        onSubmitExamine(id,nickname) {
            // 调用接口
            let params = {
                id: id,
                state: 3
            }
            auditUser(params).then(res => {
                if(res.code === 1) {
                    this.examineDialog = false
                    this.$notify({
                        title: '操作成功',
                        message: '已通过'+ nickname +'的认证',
                        type: 'success'
                        });
                    this.initData()
                }
            })
        },

        // 驳回
        onFailed (row) {
            this.userData = row
            this.failedDialog = true
        },
        // 确认驳回
        onSubmitFailed(id,nickname) {
            // 调用接口
            let params = {
                id: id,
                state: 4,
                remark: this.failedMessage
            }
            auditUser(params).then(res => {
                if(res.code === 1) {
                    this.failedDialog = false
                    this.$notify({
                        title: '操作成功',
                        message: '已驳回'+ nickname +'的认证',
                        type: 'warning'
                        });
                    this.initData()
                }
            })
        },
        handleClose () {
            this.checkDialog = false
            this.examineDialog = false
            this.failedDialog = false
        },
        // 分页
        handleCurrentChange(val){
            this.identifyForm.page = val
            getAuthGirlsList(this.identifyForm).then()
        },
    },
    created() {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.identify-girl {
    margin-top: 57px;
    padding: 10px;
    min-height: calc(100% - 80px);
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
        overflow-y: scroll;
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