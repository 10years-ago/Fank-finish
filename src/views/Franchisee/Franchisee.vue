<template>
  <div class="Franchisee">
    <div class="Franchisee-body">
      <el-form 
        :inline="true" 
        :model="selectData" 
        class="select-form" 
        label-position="top"
        >
        <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item>
            <el-input @input="selectPost()" v-model="selectData.name" placeholder="姓名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input @input="selectPost()" v-model="selectData.phone" placeholder="电话" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-input @input="selectPost()" v-model="selectData.number" placeholder="分点" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="tableAdd()">加盟商添加</el-button>
        </el-col>
        </el-row>
      </el-form>
      <franchisee-table :loading="loading" :tableData="tableData" @table-update="tableUpdate" @tableDel="tableDel"/>
    </div>
    <el-dialog title="加盟商添加" :visible.sync="FormVisibleAdd" :close-on-click-modal='false'>
      <el-form :model="formData" :rules="rules" ref="formData" v-if="exgClear">
        <el-form-item label="商家名称" prop="name">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="formData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="场地位置" prop="address">
          <el-input v-model="formData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分点号" prop="number">
          <el-input v-model="formData.number" autocomplete="off"></el-input>
        </el-form-item>
        <div class="footer">
          <el-button @click="FormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="dataPost('formData')">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {isMobileNumber} from 'assets/js/regexp'
import FranchiseeTable from './components/FranchiseeTable';
export default {
  name: '',
  components:{FranchiseeTable},
  data(){
    return {
      FormVisibleAdd:false,//dialog
      selectData:{
        name:'',
        phone:'',
        number:'',
        school:this.$store.state.school
      },
      formData:{
        id:'',
        name:'',
        phone:'',
        address:'',
        number:'',
        school:this.$store.state.school
      },
      rules:{
        name:{required:true,message:'请输入加盟商名'},
        phone:[
          {required:true,message:'请输入电话'},
          {validator:isMobileNumber,message:'请输入正确手机号'}
        ],
        address:{required:true,message:'请输入加盟商地址'},
        number: {required:true,message:'请输入分点号'}
      },
       tableData: [],
       exgClear:true,
       loading:false
    }
  },
  watch:{
    FormVisibleAdd(val){
      if(!val){
        this.exgClear = false
        for(let key in this.formData){
        key !== 'school'? this.formData[key] = '' : ''
        }
        setTimeout(()=>{
          this.exgClear = true
        },500)
      }
    }
  },
  methods:{
    //添加与修改
    dataPost(val){
      this.$refs[val].validate((valid) => {
        if (valid) {
          //添加
          if(this.formData.id == ''){
            this.axios.post(`${process.env.VUE_APP_fank}/agentInser`,this.formData,{timeout:10000})
            .then(res => {
              if(res.data.status == 'ok'){
                this.$alert('录入成功','温馨提示',{
                  confirmButtonText:'确定',
                    callback: action => {
                    this.FormVisibleAdd = false
                  }
                })
                this.tableData.unshift(JSON.parse(JSON.stringify(this.formData)))
              }else if(res.data.status == 'over'){
                this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
                  confirmButtonText:'确定',
                    callback: action => {
                  }
                })
              }else{
                this.$alert('录入失败，分点或场地不可重复','温馨提示',{
                  confirmButtonText:'确定',
                    callback: action => {
                  }
                })
              }
            })
            .catch(err => {
              this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
              confirmButtonText:'确定',
                callback: action => {
              }
              })
            })
          }else{
            //修改
            this.axios.post(`${process.env.VUE_APP_fank}/agentUpdate`,this.formData,{timeout:10000})
            .then(res => {
              if(res.data.status == 'ok'){
                this.$alert('修改成功','温馨提示',{
                  confirmButtonText:'确定',
                    callback: action => {
                      this.FormVisibleAdd = false
                  }
                })
                let tableDataLength = this.tableData.length
                for(let i = 0; i < tableDataLength; i++){
                  if(this.tableData[i].id == this.formData.id){
                    this.$set(this.tableData, i, JSON.parse(JSON.stringify(this.formData)))
                    return 
                  }
                }
              }else if(res.data.status == 'over'){
                this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
                  confirmButtonText:'确定',
                    callback: action => {
                  }
                })
              }else{
                this.$alert('修改失败，分点或场地不可重复','温馨提示',{
                  confirmButtonText:'确定',
                    callback: action => {
                  }
                })
              }
            })
            .catch(err => {
              this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
              confirmButtonText:'确定',
                callback: action => {
              }
              })
            })
          }
          }else{
            this.$alert('重要选项不能为空，且选项的条件要匹配','温馨提示',{
              confirmButtonText:'确定',
                callback: action => {
              }
            })
          }
        })
    },
    //查询
    selectPost(){
      this.loading = true
      this.$debounce(() =>{
      this.axios.post(`${process.env.VUE_APP_fank}/agentSelect`,this.selectData,{timeout:10000})
      .then(res => {
        if(res.data.status == 'over'){
          this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
            confirmButtonText:'确定',
              callback: action => {
            }
          })
        }else{
          this.tableData = res.data.list
          this.loading = false
        }
      })
      .catch(err => {
        this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
            callback: action => {}
          })
        })
      },500)//debounce-end
    },
    tableAdd(){
      this.FormVisibleAdd = true
    },
    tableUpdate(val){
      this.FormVisibleAdd = true
      this.formData = JSON.parse(JSON.stringify(val)) 
    },
    tableDel(val){
      let deleteId = {
        id:val
      }
      this.axios.post(`${process.env.VUE_APP_fank}/agentDelete`,deleteId,{timeout:10000})
      .then(res => {
        if(res.data.status == 'ok'){
          this.$alert('删除成功','温馨提示',{
            confirmButtonText:'确定',
              callback: action => {
                this.FormVisibleAdd = false
            }
          })
          let tableDataLength = this.tableData.length
          for(let i = 0; i < tableDataLength; i++){
            if(this.tableData[i].id == val){
              this.$delete(this.tableData, i)
              return 
            }
          }
        }else if(res.data.status == 'over'){
          this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
            confirmButtonText:'确定',
              callback: action => {
            }
          })
        }else{
          this.$alert('删除失败','温馨提示',{
            confirmButtonText:'确定',
              callback: action => {
            }
          })
        }
      })
      .catch(err => {
        this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
            callback: action => {
          }
        })
      })
    }
  },//methods End
  created(){
    this.selectPost()
  }
}
</script>
<style scoped lang="scss">
.el-popoper{
  .el-popconfirm{
    .el-popconfirm__action{
      margin-top: 16px;
    }
  }
}
.Franchisee{
  ::v-deep .Franchisee-body{
    margin: 0 auto;
    width: 1280px;
    .select-form{
      position: relative;
      margin-top:50px;
      margin-left: calc(50% - 432px);
      .el-form-item{
        text-align: center;
      }
      .el-button{
        position: absolute;
        top: 0;
        right: 27px;
      }
    }
    .el-table{
      max-width: none;
      .el-table__body-wrapper{
        overflow-x: hidden;
      }
    }
  }
  ::v-deep .el-dialog{
    width: 30%;
    min-width: 300px;
    .el-dialog__body{
      width: 50%;
      min-width: 260px;
      margin: 0 auto;
    }
    .footer{
      text-align: center;
    }
  }
}

</style>