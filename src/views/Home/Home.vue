<template>
  <div class="home">
    <el-menu
      :default-active="nowRoute"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
      <el-menu-item index="/HomePage">
        <i class="el-icon-s-marketing"></i>
        <span>主页</span>
      </el-menu-item>
      <el-menu-item index="/StuAdd">
        <i class="el-icon-document-add"></i>
        <span slot="title">学员录入</span>
      </el-menu-item>
      <el-menu-item index="/SelectTest">
        <i class="el-icon-search"></i>
        <span slot="title">学员考试查询</span>
      </el-menu-item>
      <el-menu-item index="/Franchisee">
        <i class="el-icon-s-shop"></i>
        <span slot="title">加盟商资料</span>
      </el-menu-item>
      <el-menu-item index="/Finance">
        <i class="el-icon-money"></i>
        <span slot="title">财务系统</span>
      </el-menu-item>
      <el-menu-item index="/Car">
        <i class="el-icon-truck"></i>
        <span slot="title">车辆管理</span>
      </el-menu-item>
      <el-menu-item index="/NewStu">
        <i class="el-icon-s-ticket"></i>
        <span slot="title">待付款学员</span>
      </el-menu-item>
      <el-menu-item index="/Pic">
        <i class="el-icon-picture"></i>
        <span slot="title">待付款学员图片</span>
      </el-menu-item>
      <div style="flex:1"></div>
      <el-menu-item @click="exitClick()">
        <i class="el-icon-close"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
    <router-view id="home-right"/>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data(){
    return{
      isCollapse:false,
      nowRoute:this.$route.path,
      screenWidth:document.documentElement.clientWidth
    }
  },
  methods:{
    exitClick(){
      this.$confirm(`此操作将退出账号,是否继续?`,'温馨提示',{
        confirmButtonText:'确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() =>{
        this.exit()
      })
      .catch(() => {
        
      })
    },
    exit(){
      localStorage.clear()
      this.$store.commit('schoolChange','')
      this.$store.commit('permChange','')
      this.$router.push({path:'/Login'})
    }
  },
  created(){
    //判断是否带着学校进入
    if(localStorage.school == undefined){
      this.$alert(`登录已过期，请重新登录`,'温馨提示',{
        confirmButtonText:'确定',
        callback: action => {
          this.$router.push({path:'/Login'})
        }
      })
    }
  },
  mounted(){
    //监听屏幕缩小，左边导航栏缩入
    var _this = this;
    _this.screenWidth < 1000 ? _this.isCollapse = true : _this.isCollapse = false
    window.onresize = function(){ 
        _this.screenWidth = document.documentElement.clientWidth;
    }
  },
  watch:{
     screenWidth(value){
       value < 1000 ?  this.isCollapse = true : this.isCollapse = false
     }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: flex;

  .el-menu-vertical:not(.el-menu--collapse) {
    flex-basis:200px;
  }

  .el-menu-vertical-demo{
    color:#fff;
    height: 100vh;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
  }

  #home-right{
    height: 100vh;
    overflow: auto;
    flex: 1;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
