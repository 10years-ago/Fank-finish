<template>
  <div class="select-test">
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item style="width:9%">
      <el-input @input="select()" v-model="formInline.student" placeholder="学员姓名" clearable></el-input>
    </el-form-item>
    <el-form-item style="width:12%">
      <el-input @input="select()" v-model="formInline.bianhao" placeholder="学习驾驶证编号" clearable></el-input>
    </el-form-item>
    <el-form-item style="width:12%">
      <el-input @input="select()" v-model="formInline.cardid" placeholder="身份证" clearable></el-input>
    </el-form-item>
    <el-form-item style="width:8%">
      <el-select @input="select()" v-model="formInline.kskm" placeholder="考试科目" clearable>
        <el-option label="科目一" value="科目一"></el-option>
        <el-option label="科目二" value="科目二"></el-option>
        <el-option label="科目三" value="科目三 道路驾驶技能考试"></el-option>
        <el-option label="科目四" value="科目四"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width:8%">
      <el-select @input="select()" v-model="formInline.kscx" placeholder="" clearable>
        <el-option label="A1" value="A1"></el-option>
        <el-option label="A2" value="A2"></el-option>
        <el-option label="B1" value="B1"></el-option>
        <el-option label="B2" value="B2"></el-option>
        <el-option label="C1" value="C1"></el-option>
        <el-option label="C2" value="C2"></el-option>
        <el-option label="C3" value="C3"></el-option>
        <el-option label="D1" value="D1"></el-option>
        <el-option label="D2" value="D2"></el-option>
        <el-option label="C1E" value="C1E"></el-option>
        <el-option label="C2E" value="C2E"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item style="width:23%"> 
      <el-date-picker
        v-model="formInline.date"
        @input="select()"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item style="width:12%">
      <el-input @input="select()" v-model="formInline.ksdd" placeholder="考试场地" :disabled="true" clearable></el-input>
    </el-form-item>
    <el-form-item style="width:10%">
      <el-input @input="select()" v-model="formInline.agent" placeholder="加盟点" clearable></el-input>
    </el-form-item>
  </el-form>
  <select-table :tableData="tableData" :loading="loading" />
  <el-pagination
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange" :current-page="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <el-button type="primary" @click="AllPageGet()">导入驾校数据</el-button>
  <el-button type="primary" @click="handleExport()">导出Excel表</el-button>
  </div>
</template>

<script>
import selectTable from './components/table'
import FileSaver from 'file-saver'
// import XLSX, { utils } from 'xlsx'
import XLSX from 'xlsx'
import {tableMixin} from 'assets/js/tableMixin.js'
export default {
  name: '',
  components:{selectTable},
  mixins:[tableMixin],
  watch:{
    //监听是否要导出Excel，我也不知道为什么$nextTick在其他地方监听不了，只能在watch内监听
    tableData(){
      var _this = this;
      if(_this.excelExport == true){
        _this.$nextTick(function(){
        var xlsxParam = { raw: true }
        var wb = XLSX.utils.table_to_book(document.querySelector('#selectTable'),xlsxParam)
        console.log(wb);
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'order.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        _this.excelExport = false
        _this.pageSize = _this.oldPageSize
        _this.dataPost()
        return wbout
        })
      }
    }
  },
  data(){
    return {
      formInline: {
          student: '',
          bianhao: '',
          cardid:'',
          kskm:'',
          kscx:'',
          date: ['',''],
          ksdd:'',
          agent:''
      },
      tableData:[],
      loading:false,
      testData:[],
      testDataAllPage:1
    }
  },
  methods:{
    select(){
      this.loading = true
      this.currentPage = 1
      this.dateChange()
      this.dataPost()
    },
    //请求数据
    dataPost(){
      this.loading = true
      this.$debounce(() =>{
      //过滤formInline中的空值,并返回需要提交的数据
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
      postData['school'] = this.$store.state.school
        this.axios.post(`${process.env.VUE_APP_fank}/testStuAll`,postData,{timeout:10000})
      .then(res => {
          this.total = res.data.all
          // this.tableData = res.data.list.filter((item, index) => index < this.pageSize)
          this.tableData = res.data.list
          this.loading = false
      })
      .catch(err => {
        this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
          callback: action => {}
        })
      })
      },500)//debounce-end
    },
    AllPageGet(){
      this.axios.get(`${process.env.VUE_APP_school}`)
      .then(res => {
        this.testDataAllPage = res.data.totalpage
        this.testDataGet()
      })
      .catch(err => {
        this.$alert(`请在打开驾校软件下再点击导入。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
          callback: action => {}
        })
        alert('请在打开驾校软件下再点击导入')
      })
    },
    testDataGet(){
      for(let i = 1; i <= this.testDataAllPage; i++){
        this.axios.get(`${process.env.VUE_APP_school}`,{
          params:{
            page:i
          }
        })
        .then(res => {
          this.testData.push(...res.data.list)
          i == this.testDataAllPage ? this.dataImport() : ''
        })
      }
    },
    dataImport(){
      let data = {
        list:this.testData,
        school:this.$store.state.school
      }
      this.axios.post(`${process.env.VUE_APP_fank}/testStuInsert`,data)
      .then(res => {
        this.select()
      })
      .catch(err => {
        this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
          callback: action => {}
        })
      })
    }
  },
  created(){
    this.formInline.date = ['','']
    this.dataPost()
  }
}
</script>
<style scoped lang="scss">
.select-test{

  .demo-form-inline{
    width: 1560px;
    margin: 50px 0 0 69.5px;
    .el-form-item{
      text-align: center;
    }
  }
  .el-pagination{
    text-align: center;
  }
}
</style>