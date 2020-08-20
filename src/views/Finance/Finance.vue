<template>
  <div class="Finance">
    <div class="Finance-body">
      <el-row :gutter="10">
        <el-form :inline="true" :model="formInline" style="margin-top:50px;margin-left: calc(50% - 497.5px)" label-position="top">
          <el-col :span="4">
            <el-form-item>
              <el-input @input="select()" v-model="formInline.name" placeholder="姓名" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input @input="select()" v-model="formInline.card" placeholder="身份证" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-input @input="select()" v-model="formInline.agent" placeholder="分点" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-date-picker
                v-model="formInline.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @input="select()">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <finance-table :tableData="tableData" :loading="loading"/>
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
  </div>
</template>

<script>
import financeTable from './components/financeTable.vue'
import FileSaver from 'file-saver'
import XLSX, { utils } from 'xlsx'
import {tableMixin} from 'assets/js/tableMixin.js'
export default {
  name: '',
  components:{financeTable},
  mixins:[tableMixin],
    watch:{
    //监听是否要导出Excel，我也不知道为什么$nextTick在其他地方监听不了，只能在watch内监听
    tableData(){
      var _this = this;
      if(_this.excelExport == true){
        _this.$nextTick(function(){
        var xlsxParam = { raw: true }
        var wb = XLSX.utils.table_to_book(document.querySelector('#FinaceTable'),xlsxParam)
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
        card:'',
        agent:'',
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
      this.axios.post(`${process.env.VUE_APP_fank}/FinancialSelect`,postData,{
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
            callback: action => {
              this.loading = false
            }
          })
        })
      },500)//debounce-end
      }else{
        this.$alert(`此账号没有权限。`,'温馨提示',{
          confirmButtonText:'确定',
          callback: action => {
            this.loading = false
          }
        })
      }
    }
  },
  created(){
    this.formInline.date = null
    this.dataPost()
  }
}
</script>
<style scoped lang="scss">
.Finance-body{
  margin: 0 auto;
  width: 1440px;
}

.el-form-item{
  text-align: center;
}

.el-pagination{
  text-align: center;
}
</style>