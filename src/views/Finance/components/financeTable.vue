<template>
  <div class="Finance-table">
    <el-table :data="tableData" id="FinaceTable" v-loading="loading">
      <el-table-column
        type="index"
        label="序号"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="100px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="card"
        label="身份证"
        width="180px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="address"
        label="身份证地址"
        width="180px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="car"
        label="车型"
        width="100px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="agent"
        label="分点"
        width="100px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="money"
        label="金额"
        width="100px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="160px"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="付款日期"
        width="160px"
        sortable
        align="center">
      </el-table-column>
      <el-table-column
        prop="ps"
        label="备注"
        width="150px"
        align="center">
      </el-table-column>
      <el-table-column
        width="160px"
        align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="dialogOpen(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-dialog title="信息修改" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
    <el-form 
      :model="dialogFormData" 
      ref="dialogFormData" 
      :rules="rules" 
      status-icon>
      <el-form-item label="姓名" label-width="100px" prop="name">
        <el-input v-model="dialogFormData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证" label-width="100px" prop="card">
        <el-input v-model="dialogFormData.card" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="身份证地址" label-width="100px" prop="address">
        <el-input v-model="dialogFormData.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="车型" label-width="100px" prop="car">
        <el-select v-model="dialogFormData.car" placeholder="请选择车型">
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
      <el-form-item label="分点" label-width="100px" prop="agent">
        <el-input v-model="dialogFormData.agent" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="金额" label-width="100px" prop="money">
        <el-input v-model="dialogFormData.money"  maxlength="9" autocomplete="off" oninput ="value=value.replace(/[^0-9]/g,'')"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="100px" prop="phone"> 
        <el-input v-model="dialogFormData.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="付款日期" label-width="100px">
        <el-input v-model="dialogFormData.date" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注" label-width="100px" prop="ps">
        <el-input v-model="dialogFormData.ps" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="FinancialUpdate('dialogFormData')">提 交</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {isMobileNumber, isCardId} from 'assets/js/regexp'
export default {
  name: '',
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
      dialogFormVisible:false,
      dialogFormData:{},
      rules:{
        name:{required:true,message:'请输入姓名'},
        card: [
          {required:true,message:'请输入身份证'},
          {validator:isCardId,message:'请输入正确的身份证号码'},
        ],
        address:{required:true,message:'请输入身份证地址'},
        car:{required:true,message:'请选择车型'},
        agent: {required:true,message:'请输入加盟商'},
        money:{required:true,message:'请输入金额'},
        phone: [
          {required:true,message:'请输入电话'},
          {validator:isMobileNumber,message:'请输入正确手机号'},
        ]
      }
    }
  },
  methods:{
    dialogOpen(val){
      this.dialogFormVisible = true
      this.dialogFormData = JSON.parse(JSON.stringify(val)) 
    },
    FinancialUpdate(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(`${process.env.VUE_APP_fank}/FinancialUpdate`,this.dialogFormData,{
            timeout:10000
          })
          .then(res => {
            if(res.data.status == 'ok'){
              this.$alert('修改成功','温馨提示',{
              confirmButtonText:'确定',
                callback: action => {
                this.dialogFormVisible = false
              }
              })
              let tableDataLength = this.tableData.length
              for(let i = 0; i < tableDataLength; i++){
                if(this.tableData[i].id == this.dialogFormData.id){
                  this.$set(this.tableData, i, this.dialogFormData)
                  return 
                }
              }
            }else if(res.data.status == 'stu'){
              this.$alert('该身份证的学员已存在','温馨提示',{
                confirmButtonText:'确定',
                callback: action => {
              }
              })
            }else if(res.data.status == 'agent'){
              this.$alert('该分点号不存在','温馨提示',{
                confirmButtonText:'确定',
                callback: action => {
              }
              })
            }else if(res.data.status == 'not'){
              this.$alert('该身份证的学员已存在在待付款学员中','温馨提示',{
                confirmButtonText:'确定',
                callback: action => {
              }
              })
            }else{
              this.$alert('录入失败，未知异常','温馨提示',{
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
          alert('选项不能为空')
          return false;
        }
      })
    }
  }//methods end
}
</script>
<style scoped lang="scss">
.Finance-table{
  ::v-deep .el-dialog{
    width: 600px;
    .el-dialog__body{
      width: 60%;
      min-width: 260px;
      margin: 0 auto;
    }
    .dialog-footer{
      text-align: center;
    }
  }
}
</style>