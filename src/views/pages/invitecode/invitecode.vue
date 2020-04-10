<template>
    <div class="invite-code">
        <div class="search-wrapper">
            <el-button type="primary" size="small" icon="search" @click="addCode()">添加邀请码</el-button>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="createUser" label="管理人" align="center"></el-table-column>
                <el-table-column prop="inviteCode" label="邀请码" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
                <el-table-column prop="manCount" label="邀请男用户数" align="center"></el-table-column>
                <el-table-column prop="womanCount" label="邀请女用户数" align="center"></el-table-column>
                <el-table-column prop="lastTime" label="最近邀请时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.lastTime | parseTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="生成时间" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.createTime | parseTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="isValid" label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{isValidMap[scope.row.isValid]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    v-if="scope.row.isValid === 1"
                    type="text"
                    size="small"
                    plain
                    @click="onUpdateValid(scope.row,0)"
                    >禁用</el-button>
                    <el-button
                    v-if="scope.row.isValid === 0"
                    type="text"
                    size="small"
                    plain
                    @click="onUpdateValid(scope.row,1)"
                    >开启</el-button>
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
        <el-dialog
            title="添加邀请码"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <div class="content">
                <el-form ref="form" :model="codeForm" label-width="80px" :rules="form_rules">
                    <el-form-item label="邀请码:">
                        <div class="code"><span>{{codeForm.code}}</span><span style="margin-left:5px;color:#409EFF;cursor:pointer" @click="refreshCode">刷新</span></div>
                    </el-form-item>
                    <el-form-item prop="userName" label="管理人">
                        <el-input v-model="codeForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="联系电话">
                        <el-input v-model="codeForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onSubmitAddCode()">提 交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getInviteCodeList, getRefreshCodet, addInviteCode, updateInviteCodestate } from '@/api/invitecode.js'
export default {
    name: "invite-code",
    data () {
        return {
            codeForm: {
                code: "",
                userName: "",
                phone: ""
            },
            searchData: {
                pageNo: 1,
                pageSize: 10
            },
            tableData: [],
            dialogVisible: false,
            form_rules: {
                userName: [
                    { required: true, message: "名称不能为空！", trigger: "blur" }
                ],
                phone: [
                    {required: true, message: "手机号不能为空！", trigger: "blur"},
                ],
            },
            total: 0, //分页
            currentPage: 1,
            isValidMap: {
                0: "禁用",
                1: "启用",
            }
        }
    },
    methods: {
        initData() {
            getInviteCodeList(this.searchData).then(res => {
                if(res.code === 1) {
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
                console.log(res)
            })
        },
        // 刷新验证码
        refreshCode () {
            getRefreshCodet().then(res => {
                if(res.code === 1) {
                    this.codeForm.code = res.data
                }
            })
        },
        addCode () {
            this.dialogVisible = true
            // 打开添加验证码弹窗时，刷新验证码
            this.refreshCode()
            this.codeForm.userName = ""
            this.codeForm.phone = ""
        },
        onSubmitAddCode() {
            this.$refs.form.validate((valid) => {
                if(valid) {
                    addInviteCode(this.codeForm).then(res => {
                        if(res.code === 1) {
                            this.$notify({
                                title: '添加成功',
                                message: '邀请码添加成功',
                                type: 'success'
                                });
                            this.dialogVisible = false
                            this.initData()
                        }
                    }).catch(err =>{
                        console.log("error submit!!");
                        return false;
                        })
                }
            })
        },
        handleClose () {
            this.dialogVisible = false
        },
        // 修改邀请码状态
        onUpdateValid (row,val) {
            let params = {
                inviteCode: row.id,
                status: val
            }
            updateInviteCodestate(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            })
        },
        // 分页
        handleCurrentChange(val){
            this.searchData.pageNo = val
            this.initData()
        },
    },
    created() {
        this.initData()
        this.refreshCode()
    }
}
</script>
<style lang="less" scoped>
.invite-code {
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
    .content {
        .el-dialog__header {
            text-align: left;
        }
        .el-form-item__content {
            width: 300px;
        }
        .code {
            text-align: left;
        }
    }
}
</style>