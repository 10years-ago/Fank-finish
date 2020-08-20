//import FileSaver from 'file-saver' 要导出excel表的话，首先要导入这两个包
// import XLSX, { utils } from 'xlsx'

export var tableMixin = {
  computed:{
    nowDate(){
      let time = new Date()
      var y = time.getFullYear(); 
      var m = time.getMonth() + 1; 
      m = m < 10 ? '0' + m : m; 
      var d = time.getDate(); 
      d = d < 10 ? ('0' + d) : d; 
      return y + '-' + m + '-' + d
    }
  },
  data(){
    return{
      total:1, //一共多少条
      currentPage:1,//现在多少页
      pageSize:10,  //现在每页多少条
      oldPageSize:10,//旧的每页多少条，用于导出excel之前的记录
      excelExport:false,//是否导出excel表
    }
  },
  methods:{
    //考试日期时间格式转换
      dateChange(){
        //判断这个date里面是装有两个时间还是一个时间
        if(this.formInline.date instanceof Array){
          if(this.formInline.date[0].length < 15 ) return
          for(let i = 0; i < this.formInline.date.length; i++){            
              var y = this.formInline.date[i].getFullYear(); 
              var m = this.formInline.date[i].getMonth() + 1; 
              m = m < 10 ? '0' + m : m; 
              var d = this.formInline.date[i].getDate(); 
              d = d < 10 ? ('0' + d) : d; 
              this.formInline.date[i] = y + '-' + m + '-' + d
          }
        }else{
          if(this.formInline.date !== null){
            var y = this.formInline.date.getFullYear(); 
            var m = this.formInline.date.getMonth() + 1; 
            m = m < 10 ? '0' + m : m; 
            var d = this.formInline.date.getDate(); 
            d = d < 10 ? ('0' + d) : d; 
            this.formInline.date = y + '-' + m + '-' + d
          }else{
            this.formInline.date = ['','']
          }
        }
      },
     // 每页条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.handleCurrentChange(this.currentPage);
    },
    //页码切换
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.dataPost()
    },
    //点击了导出excel表后触发
    handleExport() {
      this.oldPageSize = this.pageSize
      this.pageSize = this.total
      this.currentPage = 1
      this.excelExport = true
      this.dataPost()
    }
  }
}