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
      <el-form-item  style="margin-left:30px" align="center">
        <el-input @input="select()" v-model="formInline.agent" placeholder="分点" clearable></el-input>
      </el-form-item>
      <el-form-item style="margin-left:50px" align="center">
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <new-stu-table :tableData="tableData" @refresh="refresh" :loading="loading"/>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-button type="primary" @click="handleExport()">导出Excel表</el-button>
  </div>
</template>

<script>
import newStuTable from './components/newStuTable'
import FileSaver from 'file-saver'
import XLSX, { utils } from 'xlsx'
import {tableMixin} from 'assets/js/tableMixin.js'
export default {
  name: '',
  components:{newStuTable},
  mixins:[tableMixin],
  watch:{
    //监听是否要导出Excel，我也不知道为什么$nextTick在其他地方监听不了，只能在watch内监听
    tableData(){
      var _this = this;
      // console.log(_this.excelExport);
      if(_this.excelExport == true){
        _this.$nextTick(function(){
        var xlsxParam = { raw: true }
        var wb = XLSX.utils.table_to_book(document.querySelector('#newStuTable'),xlsxParam)
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'order.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        _this.excelExport = false
        _this.pageSize = _this.oldPageSize
        _this.dataPost() //这个dataPost得在自己组件文件下定义。
        return wbout
        })
      }
    }
  },
  data(){
    return {
      formInline: {
        name: '',
        agent:'',
        card: '',
        date:['',''],
        school:this.$store.state.school
      },
      loading:false,
      tableData: []
    }
  },
  methods:{
    select(){
      this.loading = true
      this.currentPage = 1
      this.dateChange() //在mixin里面。修改date的格式为yyyy--MM-dd
      this.dataPost()
    },
    dataPost(){
      this.loading = true
      if(this.$store.state.perm == 'a' && this.$store.state.perm != '' ){
      this.$debounce(() =>{
      let filterData = Object.entries(this.formInline).filter(item => item)
      let postData = {
        page:this.currentPage,
        pageSize:this.pageSize,
      }
        //遍历filterData插入obj
        filterData.map(e => {
          if(e[1] instanceof Array){
            //把开始时间和结束时间的数组拆解为两个字符串
            postData['date'] = e[1][0]
            postData['end_date'] = e[1][1]
          }else{
            postData[e[0]] = e[1]
          }
        })
      this.axios.post(`${process.env.VUE_APP_fank}/NotPayingSelect`,postData,{
        timeout:10000
      })
      .then(res => {
          this.total = res.data.all
          //当前页的数量
          this.tableData = res.data.list
          this.loading = false
      })
      .catch(err => {
          this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
            confirmButtonText:'确定',
            callback: action => {}
          })
        })
      },500)
    }else{
      this.$alert(`此账号没有权限。`,'温馨提示',{
        confirmButtonText:'确定',
        callback: action => {
          this.loading = false
        }
      })
    }
    },
    refresh(){
      this.dataPost()
    }
  },
  created(){
    this.formInline.date = ['','']
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