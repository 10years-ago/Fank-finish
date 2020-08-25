<template>
  <div class="new-user">
  <el-form ref="ruleForm" 
  :rules="rules" 
  :model="ruleForm" 
  label-width="100px" 
  status-icon
  v-if="expClear"
  >
    <el-form-item label="学员姓名" prop="name">
      <el-col :span="20">
      <el-input v-model="ruleForm.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="身份证" prop="card">
      <el-col :span="20">
      <el-input v-model="ruleForm.card"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="身份证地址" prop="address">
      <el-col :span="22">
      <el-input v-model="ruleForm.address"></el-input>
      </el-col>
    </el-form-item>
    <el-upload
      class="avatar-uploader"
      action="fakeaction"
      ref="upload"
      :show-file-list="false"
      :http-request="picload"
      drag
      multiple
      >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将身份证文件拖到此处，或<em>点击上传</em><p>只能上传jpg/png文件，且不超过4MB</p></div>
    </el-upload>
    <el-form-item label="车型" prop="type">
      <el-select v-model="ruleForm.type" placeholder="请选择车型">
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
    <el-form-item label="加盟商" prop="agent">
    <el-col :span="20">
      <el-input v-model="ruleForm.agent"></el-input>
    </el-col>
    </el-form-item>
      <el-form-item label="金额" prop="tuition">
      <el-col :span="20">
        <el-input v-model.number="ruleForm.tuition" maxlength="9"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="学员电话" prop="tel">
      <el-col :span="20">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="备注">
      <el-col :span="20">
        <el-input v-model="ruleForm.remarks"></el-input>
      </el-col>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit('ruleForm')">立即录入</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {isMobileNumber, isCardId} from 'assets/js/regexp'
export default {
  name: '',
  components:{},
  props:{},
  data(){
    return {
      expClear:true,//重新加载form以免出现正则判断空
        ruleForm: {
        name: '',
        card: '',
        address:'',
        type:'',
        agent: '',
        tuition: '',
        tel: '',
        remarks:''
      },
      rules:{
        name:{required:true,message:'请输入姓名'},
        card: [
          {required:true,message:'请输入身份证'},
          {validator:isCardId,message:'请输入正确的身份证号码'},
        ],
        address:{required:true,message:'请输入身份证地址'},
        type:{required:true,message:'请选择车型'},
        agent: {required:true,message:'请输入加盟商'},
        tuition: [
          {required:true,message:'请输入金额'},
          {type:'number',message:'金额必须为数字'}
        ],
        tel: [
          {required:true,message:'请输入电话'},
          {validator:isMobileNumber,message:'请输入正确手机号'},
        ]
      },
      baiduToken:'',
      imageUrl: ''
    }
  },
  methods: {
    onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(`${process.env.VUE_APP_fank}/FinancialInsert`,{
            name: this.ruleForm.name,
            card: this.ruleForm.card,
            address:this.ruleForm.address,
            car:this.ruleForm.type,
            agent:this.ruleForm.agent,
            money:this.ruleForm.tuition,
            phone:this.ruleForm.tel,
            ps:this.ruleForm.remarks,
            school:this.$store.state.school,
            id:''//是否要删除学员，如果为空就不用删除代付款里面的学员
          },{timeout:10000})
          .then(res => {
            console.log(res);
            if(res.data.status == 'ok'){
              this.$alert('录入成功','温馨提示',{
                confirmButtonText:'确定',
                  callback: action => {
                  this.expClear = false
                  for(let key in this.ruleForm){
                    key !== 'school'? this.ruleForm[key] = '' : ''
                  }
                  setTimeout(()=>{
                    this.expClear = true
                  },100)
                }
              })
            }else if(res.data.status == 'no'){
              this.$alert('录入失败，该学员已存在','温馨提示',{
                confirmButtonText:'确定',
                  callback: action => {
                }
              })
            }else if(res.data.status == 'ohno'){
              this.$alert('录入失败，该加盟商不存在','温馨提示',{
                confirmButtonText:'确定',
                  callback: action => {
                }
              })
            }else if(res.data.status == 'ohgod'){
              this.$alert('录入失败，该学员已在代付款学员中','温馨提示',{
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
            }
          })
          .catch(err =>{
            this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
            confirmButtonText:'确定',
            callback: action => {
          }
        })
          })
        } else {
          this.$alert('重要选项不能为空，且选项的条件要匹配','温馨提示',{
            confirmButtonText:'确定',
            callback: action => {
          }
          })
        }
      })//判断rule-end
    },
    // cardTextGet(base64Str){
    //   let abc = encodeURIComponent(base64Str)
    //   var data = 'image=' + abc + '&' + 'id_card_side=front'
    //   this.axios.post(`${process.env.VUE_APP_baidu}/idcard`,data,
    //   {
    //     headers:{
    //       'Content-Type':'application/x-www-form-urlencoded',
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //     params:{
    //       access_token:this.baiduToken
    //     },
    //     timeout:10000
    //   })
    //   .then(res => {
    //     if(res.data.image_status == 'normal'){
          // let result = res.data.words_result;
          // for (let key in result){
          //   switch(key){
          //     case '姓名':
          //       this.ruleForm.name = result[key].words
          //       break;
          //     case '住址':
          //       this.ruleForm.address = result[key].words
          //       break;
          //     case '公民身份号码':
          //       this.ruleForm.card = result[key].words
          //       break;
          //   }
    //       }
    //     }else if(res.data.image_status == 'blurred'){
    //       this.$alert(`请上传清晰的身份证照片`,'温馨提示',{
    //         confirmButtonText:'确定',
    //         callback: action => {
    //         }
    //       })
    //     }else{
    //       this.$alert(`请放置身份证正面(头像面)`,'温馨提示',{
    //         confirmButtonText:'确定',
    //         callback: action => {
    //         }
    //       })
    //     }
    //   })
    //   .catch(err =>{
    //       this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
    //         confirmButtonText:'确定',
    //         callback: action => {
    //       }
    //     })
    //   })
    // },
    picload(item){
      let file = item.file
      //判断格式
      if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/JPG') {
      var  isJPG =  true
      } else {
        isJPG =  false
        this.$message.error('上传产品图片只能是 JPG/PNG/JPEG 格式!')
        return
      }

      //判断大小
      const isLt2M = file.size / 1024 / 1024 < 4
      if (!isLt2M) {
        this.$message.error('上传产品图片大小不能超过 4MB!')
        return
      }
      let param = new FormData()
      param.append('img',file)
      param.append('school',this.$store.state.school)
      param.append('perm',this.$store.state.perm)
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      }
      this.axios.post(`${process.env.VUE_APP_fank}/cardkow`,param,config)
      .then(res =>{
        this.ruleForm.address = res.data.address
        this.ruleForm.card = res.data.card
        this.ruleForm.name = res.data.name
      })
      .catch(err =>{
        this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
          confirmButtonText:'确定',
          callback: action => {
          }
        })
      })
      // }
    }
    // picload(item){
    //   let file = item.file
    //   //判断格式
    //   if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/JPG') {
    //   var  isJPG =  true
    //   } else {
    //     isJPG =  false
    //     this.$message.error('上传产品图片只能是 JPG/PNG/JPEG 格式!')
    //   }

    //   //判断大小
    //   const isLt2M = file.size / 1024 / 1024 < 4
    //   if (!isLt2M) {
    //     this.$message.error('上传产品图片大小不能超过 4MB!')
    //   }

    //   var reader = new FileReader();
    //   if (file) {
    //     reader.readAsDataURL(file)
    //   }
    //     reader.onload = () =>{
    //     let base64Str = reader.result.replace(/^data:image\/\w+;base64,/, "");
    //     this.axios.get(`${process.env.VUE_APP_baiduToken}`,{
    //     headers:{
    //       'Access-Control-Allow-Origin': '*'
    //     },
    //     params:{
    //       'grant_type': 'client_credentials',
    //       'client_id': localStorage.apiKey,
    //       'client_secret': localStorage.secretKey
    //     }
    //   })
    //   .then(res =>{
    //     this.baiduToken = res.data.access_token;
    //     this.cardTextGet(base64Str)
    //   })
    //   .catch(err =>{
    //     this.$alert(`网络错误，请检查网络或联系供应商。错误代码：${err}`,'温馨提示',{
    //       confirmButtonText:'确定',
    //       callback: action => {
    //       }
    //     })
    //   })
    //   }
    // }
  }
}
</script>
<style scoped lang="scss">
.el-form{
  padding-top: 6%;
  width: 33%;
  margin: 0 auto;
  min-width: 400px;
}
.avatar-uploader{
  text-align: center;
}
</style>