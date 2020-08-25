<template>
  <div class="newStuTable">
  <el-table
    :data="tableData"
    style="min-width: 1440px;width:1440px"
    v-loading="loading"
    id="newStuTable">
    <el-table-column
      label="姓名"
      width="100px"
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
      width="100px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.car }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分点"
      width="100px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.agent }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="手机号"
      width="160px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      width="160px"
      align="center">
      <template slot-scope="scope">
        <span>{{ scope.row.ps }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="报名日期"
      width="200px"
      align="center">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date}}</span>
      </template>
    </el-table-column>
    <el-table-column 
    label="操作"
    align="center"
    >
      <template slot-scope="scope">
        <div class="price">
          <el-button type="warning" size="mini" @click="updateStu(scope.row)">修改</el-button>
          <el-popconfirm
            confirmButtonText='删除'
            @onConfirm="delStu(scope.row.id)"
            cancelButtonText='取消'
            confirmButtonType="danger"
            icon="el-icon-info"
            iconColor="red"
            title="请再次确认删除的学员">
            <el-button 
            slot="reference" 
            type="danger" 
            size="mini" 
            @click="handleEdit(scope.$index, scope.row)">删除</el-button>
          </el-popconfirm>
          <el-popconfirm
            confirmButtonText='提交'
            @onConfirm="addStu(scope.$index, scope.row)"
            cancelButtonText='取消'
            icon="el-icon-info"
            iconColor="red"
            title="请再次确认金额是否正确">
            <el-button 
            slot="reference" 
            type="primary" 
            size="mini" 
            @click="handleEdit(scope.$index, scope.row)">录入</el-button>
          </el-popconfirm>
          <el-input 
            size="mini" 
            suffix-icon="el-icon-money" 
            v-model="scope.row.money"
            maxlength="9"
            placeholder="请输入金额"
            oninput ="value=value.replace(/[^0-9]/g,'')"
            >
          </el-input>
        </div>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
    <el-form 
      :model="dialogFormData" 
      ref="dialogFormData" 
      :rules="rules" 
      status-icon
      v-loading="loading">
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
        phone: [
          {required:true,message:'请输入电话'},
          {validator:isMobileNumber,message:'请输入正确手机号'},
        ]
      }
    }
  },
  methods:{
    handleEdit(index, row) {
      
    },
    addStu(index, row){
      if(!row.money){
        this.$alert('录入失败，金额不能为空','温馨提示',{
          confirmButtonText:'确定',
            callback: action => {
          }
        })
      }else if(res.data.status == 'over'){
        this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
          confirmButtonText:'确定',
            callback: action => {
          }
        })
      }else{
        this.axios.post(`${process.env.VUE_APP_fank}/FinancialInsert`,row,{timeout:10000})
        .then(res => {
          this.$alert('录入成功','温馨提示',{
          confirmButtonText:'确定',
            callback: action => {
              this.$emit('refresh','')
          }
        })
        })
        .catch(err => {
          this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
            confirmButtonText:'确定',
            callback: action => {
          }
          })
        })
      }
    },
    delStu(val){
      let data = {id:val}
      this.axios.post(`${process.env.VUE_APP_fank}/deleteNotPaying`,data,{timeout:10000})
        .then(res => {
          if(res.data.status == 'over'){
            this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
              confirmButtonText:'确定',
                callback: action => {
              }
            })
          }else{
          this.$alert('删除成功','温馨提示',{
          confirmButtonText:'确定',
            callback: action => {
              this.$emit('refresh','')//再次刷新
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
    },
    updateStu(val){
      this.dialogFormVisible = true
      this.dialogFormData = JSON.parse(JSON.stringify(val)) 
    },
    FinancialUpdate(formName){
       this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(`${process.env.VUE_APP_fank}/updateNotPaying`,this.dialogFormData,{
            timeout:10000
          })
          .then(res => {
            if(res.data.status == 'ok'){
              this.$alert('修改成功','温馨提示',{
              confirmButtonText:'确定',
                callback: action => {
                this.dialogFormVisible = false
                this.$emit('refresh','')
              }
              })
            }else if(res.data.status == 'stu'){
              this.$alert('该身份证的学员已缴费','温馨提示',{
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
            }else if(res.data.status == 'over'){
                this.$alert('账号已到期，如想继续使用，请联系供应商续费。','温馨提示',{
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
</style>