<template>
  <div class="picTable">
  <el-table
    :data="tableData"
    style="min-width: 1280px;width:1280px"
    v-loading="loading"
    id="excelTable">
    <el-table-column
      label="姓名"
      width="200px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="身份证"
      width="200px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.card }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="车型"
      width="200px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.car }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分点"
      width="200px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.agent }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="手机号"
      width="200px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column 
    label="操作"
    align="center"
    >
      <template slot-scope="scope">
        <div class="price">
          <el-popconfirm
            confirmButtonText='导出'
            @onConfirm="download(scope.row.card,scope.row.name)"
            cancelButtonText='取消'
            confirmButtonType="primary"
            icon="el-icon-info"
            iconColor="red"
            title="导出过后图片将会在数据库删除，请保存好导出的图片">
            <el-button 
            slot="reference" 
            type="primary" 
            size="mini" 
            @click="handleEdit(scope.$index, scope.row)">导出图片</el-button>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {isMobileNumber, isCardId} from 'assets/js/regexp'
export default {
  name: 'newStuTable',
  components:{},
  props:{
    tableData:{
      type:Array
    },
    loading:{
      type:Boolean
    }
  },
  data(){
    return {
      src:[]
    }
  },
  methods:{
    handleEdit(index, row) {
      
    },
    download(card,name){
      let data = {
        card,
        school:this.$store.state.school
      }
      this.axios.post(`${process.env.VUE_APP_fank}/photoExport`,data,{timeout:10000})
      .then(res => {
        for(let i = 0,j = res.data.list.length; i < j; i++){
          this.downloadImg(res.data.list[i], name)
        }
      })
      .catch(err => {
        this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
          callback: action => {
        }
        })
      })
    },
    downloadImg(imgsrc, name){
      var canvas = document.createElement('canvas');
      var img = document.createElement('img');
      img.onload = function(e) {
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext('2d');
          context.drawImage(img, 0, 0, img.width, img.height);
          canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
          canvas.toBlob((blob)=>{
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = name; 
              link.click();
          }, "image/jpeg/png");
      }
      img.setAttribute("crossOrigin",'Anonymous');
      img.src = imgsrc;
    }
  }
}
</script>
<style scoped lang="scss">
.el-table{
  margin: 0 auto;
  .price{
    display: flex;
    justify-content: space-around;
    .el-input{
      width: 50%;
    }
  }
}
</style>