<template>
    <div class="users-girl">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="usersForm">
                <el-form-item label="关键词:">
                    <el-input v-model="usersForm.key" size="small" placeholder="账号/昵称/手机号/QQ/微信/邀请码"></el-input>
                </el-form-item>
                <el-form-item label="认证:">
                    <el-select v-model="usersForm.state" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="资料未完成" value="1"></el-option>
                        <el-option key="2"  label="待认证" value="2"></el-option>
                        <el-option key="3"  label="认证完成" value="3"></el-option>
                        <el-option key="4"  label="认证失败" value="4"></el-option>
                        <el-option key="5"  label="审核中" value="5"></el-option>
                        <el-option key="10"  label="封号" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="usersForm.isValid" placeholder="请选择" size="small" clearable>
                        <el-option key="1"  label="有效" value="1"></el-option>
                        <el-option key="0"  label="已禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地区:">
                    <el-input v-model="usersForm.city" size="small" placeholder="请输入地区"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="onSearch()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <!-- <el-table-column type="index" label="序号" align="center" width="100"></el-table-column> -->
                <el-table-column prop="phone" label="账号" align="center"></el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center"></el-table-column>
                <el-table-column prop="city" label="所在城市" align="center"></el-table-column>
                <el-table-column prop="career" label="职业" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" align="center"></el-table-column>
                <el-table-column prop="qq" label="QQ" align="center"></el-table-column>
                <el-table-column prop="wechat" label="微信" align="center"></el-table-column>
                <el-table-column prop="state" label="认证" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{stateMap[scope.row.state]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="钱包" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="最近登录" align="center"></el-table-column>
                <el-table-column prop="createTime" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="isValid" label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{isValidMap[scope.row.isValid]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="inviteCode" label="受邀请码" align="center"></el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="200">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onDetail(scope.row.id,scope.row.money,scope.row.isValid)"
                    >详情</el-button>
                    <!-- <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onDeleteClassify(scope.row,scope.$index)"
                    >流水</el-button> -->
                    <el-button
                    v-if="scope.row.isValid == 1"
                    type="text"
                    size="small"
                    plain
                    @click="onChangeValid(scope.row.id,0)"
                    >禁用</el-button>
                    <el-button
                    v-if="scope.row.isValid == 0"
                    type="text"
                    size="small"
                    plain
                    @click="onChangeValid(scope.row.id,1)"
                    >启用</el-button>
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
                <div class="header">
                    <div class="avatar">
                        <el-image
                            style="width: 70px; height: 70px; border-radius:50%"
                            :src="detailData.picPath"
                            fit="cover">
                        </el-image>
                    </div>
                    <div class="info-wrapper">
                        <p class="username">{{detailData.nickname}}</p>
                        <div class="info">
                            <div class="basic first">
                                <p><span>年龄：</span><span>{{detailData.age}}岁</span>&ensp; |&ensp; <span>身高：</span><span>{{detailData.height}}</span>&ensp; |&ensp; <span>体重：</span><span>{{detailData.weight}}</span>&ensp; |&ensp; <span>胸围：</span><span>{{detailData.bust}}</span></p>
                                <p><span>简介：</span><span>{{detailData.introduction}}</span></p>
                                <p><span>账号：</span><span>{{detailData.phone}}</span></p>
                                <p><span>微信：</span><span>{{detailData.wechat}}</span></p>
                                <p><span>qq：</span><span>{{detailData.qq}}</span></p>
                            </div>
                            <div class="line"></div>
                            <div class="basic second">
                                <p><span>城市：</span><span>{{detailData.city}}</span>&ensp;| &ensp; <span>职业：</span><span>{{detailData.career}}</span></p>
                                <p><span>约会范围：</span><span>{{detailData.datingRange}}</span></p>
                                <p><span>约会条件：</span><span>{{detailData.datingProgram}}</span></p>
                                <p><span>约会节目：</span><span>{{detailData.datingCondition}}</span></p>
                            </div>
                            <div class="basic third">
                                <div class="status" :class="detailData.isValid == 0? 'y-status':'g-status'">{{isValidMap[detailData.isValid]}}</div>
                                <p><span>钱包（狐币）</span><span>{{detailData.money}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="photos-wrapper">
                    <p class="title">她的相册</p>
                    <div class="photos">
                        <el-image :src="item.files.filePath" v-for="(item,index) in detailData.images" :key = "index" :preview-src-list="photoList"></el-image>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { getUserList, getByUserId,forbiddenUser } from '@/api/user.js'
export default {
    name: "users-girl",
    data () {
        return {
            detailDialog: false,
            usersForm: {
                sex: '2', // 1==男，2==女
                page: 1,
                pageSize: 10,
                state: "",
                key: "",
                isValid: "",
                city: ""
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
            detailData: [],
            photoList: []
        }
    },
    methods: {
        initData() {
            getUserList(this.usersForm).then(res =>{
                if(res.code === 1) {
                    this.tableData = res.data
                    this.total = res.count
                }
            })
        },
        handleCurrentChange(val) {
            this.usersForm.page = val
            this.initData()
        },
        onSearch () {
            this.currentPage = 1
            this.usersForm.page = 1
            this.initData()

        },
        // 查看详情
        onDetail (id,money,isValid) {
            this.photoList = []
            this.detailDialog = true
            let params = {
                userId: id
            }
            getByUserId(params).then(res => {
                if(res.code === 1) {
                    this.detailData = res.data
                    this.detailData.money = money
                    this.detailData.isValid = isValid
                    if(res.data.images.length>0) {
                        for(let i = 0; i<res.data.images.length; i++) {
                            this.photoList.push(res.data.images[i].files.filePath)
                        }
                    }
                }
            })
        },
        onDeleteClassify () {

        },
        // 禁用或启用
        onChangeValid(userid, num) {
            let params = {
                id: userid,
                isValid : num
            }
            forbiddenUser(params).then(res => {
                if(res.code === 1) {
                    this.initData()
                }
            }) 
        },
        handleClose () {
            this.detailDialog = false
        }
    },
    created () {
        this.initData()
    }
}
</script>
<style lang="less" scoped>
.users-girl {
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
    .detail-wrapper {
        .header {
            width: 100%;
            display: flex;
            .avatar {
                width: 70px;
                margin-right: 20px;
            }
            .info-wrapper {
                flex: 1;
                padding-top: 10px;
                .username {
                    margin-bottom: 12px;
                    font-size: 18px;
                    font-weight: bold;
                    color: rgba(0,0,0,0.8);
                }
                .info {
                    display: flex;
                    .basic {
                        p{
                            margin-bottom: 8px;
                        }
                        
                    }
                    .first {
                        width: 370px;
                    }
                    .second {
                        width: 300px;
                    }
                    .third {
                        width: 250px;
                        text-align: right;
                        .status {
                            margin-left: 208px;
                            margin-bottom: 8px;
                            min-width: 40px;
                            height: 20px;
                            color: #ffffff;
                            text-align: center;
                            border-radius: 2px;
                        }
                        .y-status {
                            background-color: salmon;
                        }
                        .g-status {
                            background-color: #08c4a0;
                        }
                    }
                    .line {
                        margin-right: 50px;
                        height: 120px;
                        border-right: 1px solid rgba(0,0,0,0.3);
                    }
                }
            }
        }
        .photos-wrapper {
            margin-top: 20px;
            .title {
                font-size: 18px;
                color: #409EFF;
            }
            .photos {
                padding: 40px;
                background-color: #000000;
                .el-image {
                    width: 200px;
                    height: 200px;
                    margin-right: 10px;
                    object-fit: cover;
                }
            }
        }
    }
}
</style>