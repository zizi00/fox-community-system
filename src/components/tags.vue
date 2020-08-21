<template>
	<div class="tabs">
    <div class="isCollapse" @click="setCollapse">
      <i class="fa fa-margin fa-reorder"></i>
    </div>
    <div class="tabs-wrapper">
      <el-tabs v-if="openTab.length" type="card" v-model="activeIndex" @tab-click='tabClick' @tab-remove='tabRemove' closable>
        <el-tab-pane v-for="item in openTab" :key="item.route" :name="item.route" :label="item.name" >
        </el-tab-pane>
      </el-tabs>
    </div>
		
	</div>
</template>
<script>
export default {
  name:"tags",
  data () {
    return {
    }
  },
  methods: {
    //tab标签点击时，切换相应的路由
    tabClick () {
      this.$router.push({path: this.activeIndex});
    },
    //移除tab标签
    tabRemove (targetName) {
      //首页不删
      if(targetName == '/'||targetName == '/home'){
        return
      }
      //关闭同城服务标签时，把临时存放的区id移出
      if(targetName == '/servicelabel'||targetName == '/servicelabel/editservicelabel'){
        sessionStorage.removeItem("AreaCode")
      }
      this.$store.dispatch('deleteTab', targetName);
      let openTabList = this.$store.state.openTab
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (openTabList && openTabList.length >= 1) {
          this.$store.dispatch('setActiveIndex', openTabList[openTabList.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    },
    // 切换左边菜单是否伸展
    setCollapse () {
      //获取vuex的Collapse数据
      let currentCollapse = this.$store.getters.collapse
      if(!currentCollapse) {
        //如果是false， 设置为true
        this.$store.dispatch('setCollapse', false);
      }else {
        this.$store.dispatch('setCollapse', false);
      }
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab;
    },
    activeIndex:{
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.dispatch('setActiveIndex', val);
      }
    }
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>
.tabs{
  display: flex;
  .isCollapse{
    width: 40px;
    height: 40px;
    border-bottom: 1px solid #E4E7ED;
    .fa-margin{
      line-height: 40px;
      font-size: 20px;
    }
  }
}

</style>

