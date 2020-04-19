<template>
    <div class="index">
        <HeadNav></HeadNav>
        <div class="main-wrapper">
            <div class="left-container">
                <LeftMenu></LeftMenu>
            </div>
            <div class="right-container">
                <!-- 顶部标签卡 -->
                <div class="tags-wrapper">
                    <Tags></Tags>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import HeadNav from '../components/headNav'
import LeftMenu from '../components/leftMenu'
import Tags from "../components/tags.vue"
export default {
    name: "index",
    data () {
        return {

        }
    },
    components: {
        HeadNav,
        LeftMenu,
        Tags
    },
    mounted() {
            // 刷新时以当前路由做为tab加入tabs
            // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
            // 当当前路由是首页时，添加首页到store，并设置激活状态
            let currentList = this.$store.getters.openTab
            if (this.$route.path !== '/' && this.$route.path !== '/home' && this.$route.path !== '/index') {
                if(!currentList[0]) {
                    this.$store.dispatch('addOpenTab', {route: '/home' , name: '首页'});
                    this.$store.dispatch('addOpenTab', {route: this.$route.path , name: this.$route.meta.title });
                    this.$store.dispatch('setActiveIndex', this.$route.path);
                }
            } else {
                if(!currentList[0]) {
                    this.$store.dispatch('addOpenTab', {route: '/home', name: '首页'});
                    this.$store.dispatch('setActiveIndex', '/home');
                    // this.$router.push('/'); 
                }      
            }
        },
    watch:{
            '$route'(to){
                //判断路由是否已经打开
                //已经打开的 ，将其置为active
                //未打开的，将其放入队列里
                let flag = false;
                this.$forceUpdate();
                let openTabList = this.$store.getters.openTab
                for(let item of openTabList){
                    if(item.name === to.meta.title ){
                        this.$store.dispatch('setActiveIndex',to.path)
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    if(to.meta.title) {
                        this.$store.dispatch('addOpenTab', {route: to.path, name: to.meta.title });
                        this.$store.dispatch('setActiveIndex', to.path);
                    }
                
                }

            }
        }
}
</script>
<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        .left-container {
            // width: 260px;
            height: calc(100% - 80px);
            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 200px;
                height: 100%;
            }
        }
        .right-container {
            width: 100%;
            height: calc(100% - 80px);
            overflow: auto;
            // padding: 0 20px;
            // .tags-wrapper {
            //     width: 100%;
            //     position: fixed;
            //     top: 81px;
            //     background-color: #ffffff;
            //     z-index: 999;
            // }
        }
    }
    
}
</style>