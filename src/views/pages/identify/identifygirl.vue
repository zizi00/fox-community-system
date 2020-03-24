<template>
    <div class="identify-girl">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="identifyForm">
                <el-form-item label="关键词:">
                    <el-input v-model="identifyForm.keyword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="认证:">
                    <el-select v-model="identifyForm.isIdentify" size="small">
                        <!-- <el-option
                        v-for="item in currentTopicList"
                        :key="item.topicBoardId"
                        :label="item.title"
                        :value="item.topicBoardId">
                        <span style="float: left">{{ item.title }}</span>
                        </el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="地区:">
                    <el-select v-model="identifyForm.areaid" size="small">
                        <!-- <el-option
                        v-for="item in currentTopicList"
                        :key="item.topicBoardId"
                        :label="item.title"
                        :value="item.topicBoardId">
                        <span style="float: left">{{ item.title }}</span>
                        </el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="searchData(classifyForm)">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
                <el-table-column prop="account" label="账号" align="center"></el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center">
                    <!-- <template slot-scope="scope">
                        <span style="margin-left: 10px">{{statusMap[scope.row.status]}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="city" label="所在城市" align="center"></el-table-column>
                <el-table-column prop="identify" label="身份" align="center"></el-table-column>
                <el-table-column prop="identifystatus" label="认证" align="center"></el-table-column>
                <el-table-column prop="login" label="最近登录" align="center"></el-table-column>
                <el-table-column prop="createAt" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="code" label="认证码" align="center"></el-table-column>
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
            </div>
        <!-- 弹出弹窗 -->
        <el-dialog
            title=""
            :visible.sync="checkDialog"
            width="50%"
            center>
            <p>海绵宝宝的验证码：<span>644747</span></p>
            <div class="wrapper">
                <el-image 
                    style="width: 300px; height: 300px"
                    :src="url" 
                    :preview-src-list="srcList">
                </el-image>
                <video src=""></video>
            </div>
        </el-dialog>
        <!-- 通过 -->
        <el-dialog
            title="审核确认"
            :visible.sync="examineDialog"
            width="30%"
            :before-close="handleClose">
            <span>确定要通过托尼-屎大颗的认证条件吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 驳回 -->
        <el-dialog
            title="审核确认"
            :visible.sync="failedDialog"
            width="30%"
            :before-close="handleClose">
            <span>确定拒绝通过托尼-屎大颗的认证条件吗？</span>
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="failedMessage">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "identify-girl",
    data () {
        return {
            checkDialog: false,
            examineDialog: false,
            failedDialog: false,
            failedMessage: "",
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                // 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            ],
            identifyForm: {
                keyword: "",
                isIdentify: "",
                areaid: ""
            },
            tableData: [
                {
                    account: "3546475",
                    nickname: "zhansan",
                    city: "longhua",
                    identify: "student",
                    identifystatus: "是",
                    login: "2020/03/24",
                    createAt: "2020/03/24",
                    code: "hjkknnj"
                }
            ]
        }
    },
    methods: {
        searchData () {

        },
        onChecked () {
            this.checkDialog = true
        },
        onExamine () {
            this.examineDialog = true
        },
        onFailed () {
            this.failedDialog = true
        },
        handleClose () {
            this.checkDialog = false
            this.examineDialog = false
            this.failedDialog = false
        }
    }
}
</script>
<style lang="less" scoped>
.identify-girl {
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