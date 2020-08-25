<template>
  <div id="login">
    <form id="login_form">
      <h5>FanK驾校管理系统</h5>
      <div class="username">
        <label for="username">用户名</label>
        <input type="text" name="username" id="username" v-model="username" @keydown.enter="submitForm()"> 
      </div>
      <div class="password">
        <label for="password">密码</label>
        <input type="password" name="password" id="password" v-model="password" @keydown.enter="submitForm()">
      </div>
      <div class="rem">
        <input type="checkbox" id="rem" name="rem" v-model="checked">
        <label for="rem">记住密码</label>
      </div>
      <button type="button" id="submit" @click="submitForm()">登陆</button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      username:"",
      password:"",
      checked:true
    }
  },
  mounted() {
    let _this = this
    this.remember();
  },
  methods:{
    //点击登陆
    submitForm(){
      const self = this;
      if(self.username === '' || self.password === ''){
          self.$alert('用户名或密码不能为空', '温馨提示', {
          confirmButtonText: '确定',
        });
      }else{
        let data = {
          user: self.username,
          password:self.password
        }
        self.axios.post(`${process.env.VUE_APP_fank}/loginto`,data,{timeout:10000})
        .then((response) => {
          console.log(response);
          if(response.data.status == 'ok' && response.data.perm != 'c'){
            //判断是否勾选记住密码
            if(self.checked == true){
              localStorage.setItem("password", self.password);
            }else{
              localStorage.setItem("password", '');
            }
            localStorage.setItem("user", self.username);
            //现在的登录时间(按照服务器的时间来计算)
            localStorage.setItem("nowTime", response.data.nowTime)
            //存于本地的驾校名，用于保存登录状态
            localStorage.setItem("school", response.data.school)
            localStorage.setItem("perm", response.data.perm)
            //存于vuex的驾校名，保存访问数据库时发送的驾校名
            //为什么不直接用本地的？以防修改window.localStorage可访问其他驾校的信息
            this.$store.commit('schoolChange',response.data.school)
            this.$store.commit('permChange',response.data.perm)
            self.$alert('登陆成功','温馨提示',{
              confirmButtonText: '确定',
              callback: action => {
                self.$router.push('/HomePage')
              }
            })
          }else if(response.data.status == 'over'){
            self.$alert('该账户已过期', '温馨提示', {
            confirmButtonText: '确定',
            })
          }else{
            self.$alert('用户名或密码错误', '温馨提示', {
            confirmButtonText: '确定',
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
    },
    remember(){
       this.username = localStorage.user
       this.password = localStorage.password
      }
  }
}
</script>
<style scoped lang="scss">
#login{
  width: 100vw;
  height: 100vh;
  background-color: #2D3A4B;
  position: relative
}

#login_form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  padding: 3rem;
  border-radius: 1.5rem;
  text-align: center;
  h5{
    text-align: center;
  }

  label{
    width: 4rem;
    display: inline-block;
    text-align: center;
  }
  
  >div{
    padding: 1rem;
  }

  .username,.password{
    input{
    width: 258px;
    position: relative;
    top: 2px;
    left: 2px;
    height: 18px;
    padding: 10px 0 10px 10px;
    line-height: 18px;
    border: 1px solid #D6D6D6;
    border-radius: 3px;
    background: 0 0;
    color: #333;
    font-family: Verdana,Tahoma,Arial;
    font-size: 16px;
    }
  }
  
  .rem{
    text-align: right;
    input{
       margin-top: -2px;
       margin-bottom: 1px;
       vertical-align: middle;
    }
  }
  
  #submit{
    width: 100%;
    border: none;
    height: 35px;
    color:white;
    outline: none;
    cursor: pointer;
    background-color: #0099CD;
  }
}

</style>