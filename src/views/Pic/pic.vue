<template>
  <div class="NewStu">
    <el-form 
      :inline="true" 
      :model="formInline" 
      class="demo-form-inline" 
      label-position="top"
      style="margin-top:50px"
      >
      <el-form-item  style="margin-left:30px" align="center">
        <el-input @input="select()" v-model="formInline.name" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item  style="margin-left:30px" align="center">
        <el-input @input="select()" v-model="formInline.card" placeholder="身份证" clearable></el-input>
      </el-form-item>
    </el-form>
    <pic-table :tableData="tableData" :loading="loading"/>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import picTable from './components/picTable'
import {tableMixin} from 'assets/js/tableMixin.js'
export default {
  name: '',
  components:{picTable},
  mixins:[tableMixin],
  data(){
    return {
      formInline: {
        name: '',
        card: '',
      },
      loading:false,
      tableData: []
    }
  },
  methods:{
    select(){
      this.loading = true
      this.currentPage = 1
      this.dataPost()
    },
    dataPost(){
      this.$debounce(() =>{
      let filterData = Object.entries(this.formInline).filter(item => item)
      let postData = {
        page:this.currentPage,
        pageSize:this.pageSize,
      }
        //遍历filterData插入obj
        filterData.map(e => {
          postData[e[0]] = e[1]
        })
      //插入当前学校
      postData['school'] = this.$store.state.school
      this.axios.post(`${process.env.VUE_APP_fank}/photoSelect`,postData,{
        timeout:10000
      })
      .then(res => {
        if(res.data.status == 'over'){
          this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
            confirmButtonText:'确定',
              callback: action => {
            }
          })
        }else{
          this.total = res.data.all
          //当前页的数量
          this.tableData = res.data.list.filter((item, index) => index < this.pageSize)
          this.loading = false
        }
      })
      .catch(err => {
          this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
            confirmButtonText:'确定',
            callback: action => {
          }
          })
      })
      },500)
    }
  },
  created(){
    this.loading = true
    this.dataPost()
  }
}
</script>
<style scoped lang="scss">
.NewStu{
  .demo-form-inline{
    width: 1280px;
    margin: 0 auto;
  }
}
.el-form-item{
  text-align: center;
}

.el-pagination{
  text-align: center;
}
</style>