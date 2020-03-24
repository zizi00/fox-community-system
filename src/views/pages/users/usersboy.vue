<template>
    <div class="users-boy">
        <div class="search-wrapper">
            <el-form :inline="true" ref="search_data" :model="usersForm">
                <el-form-item label="关键词:">
                    <el-input v-model="usersForm.keyword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="认证:">
                    <el-select v-model="usersForm.isIdentify" size="small">
                        <!-- <el-option
                        v-for="item in currentTopicList"
                        :key="item.topicBoardId"
                        :label="item.title"
                        :value="item.topicBoardId">
                        <span style="float: left">{{ item.title }}</span>
                        </el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="usersForm.status" size="small">
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
                    <el-select v-model="usersForm.areaid" size="small">
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
                <el-table-column prop="categoryName" label="账号" align="center"></el-table-column>
                <el-table-column prop="status" label="昵称" align="center">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{statusMap[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="所在城市" align="center"></el-table-column>
                <el-table-column prop="createAt" label="职业" align="center"></el-table-column>
                <el-table-column prop="createAt" label="年龄" align="center"></el-table-column>
                <el-table-column prop="createAt" label="QQ" align="center"></el-table-column>
                <el-table-column prop="createAt" label="微信" align="center"></el-table-column>
                <el-table-column prop="createAt" label="认证" align="center"></el-table-column>
                <el-table-column prop="createAt" label="钱包" align="center"></el-table-column>
                <el-table-column prop="createAt" label="最近登录" align="center"></el-table-column>
                <el-table-column prop="createAt" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="createAt" label="状态" align="center"></el-table-column>
                <el-table-column prop="createAt" label="受邀请码" align="center"></el-table-column>
                <el-table-column prop="operation" align="center" label="操作" fixed="right" width="300">
                <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onEditClassify(scope.row,scope.$index)"
                    >详情</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    @click="onDeleteClassify(scope.row,scope.$index)"
                    >流水</el-button>
                    <el-button
                    type="text"
                    size="small"
                    plain
                    >禁用</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div>
    </div>
</template>
<script>
export default {
    name: "users-boy",
    data () {
        return {
            usersForm: {
                keyword: "",
                isIdentify: "",
                status: "",
                areaid: ""
            },
            tableData: []
        }
    },
    methods: {
        searchData () {

        },
        onEditClassify () {

        },
        onDeleteClassify () {

        }
    }
}
</script>
<style lang="less" scoped>
.users-boy {
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