<template>
<mu-card>

    <mu-appbar title="Welcome">
    </mu-appbar>

  <mu-card-header title="" subTitle="" :zDepth="1">
   
  </mu-card-header>
    <mu-text-field hintText="用户名"/><br/>
    <mu-text-field label="密码" hintText="请输入密码" type="password" labelFloat/><br/><br/><br/>
    <mu-raised-button label="Sign in" class="demo-raised-button" primary/>
    <mu-raised-button label="Sign up" class="demo-raised-button" secondary @click="open"/>

    <div>
  <mu-dialog  :open="dialog" title="Sign up" @close="close">
    <div style="text-align:center;">
    
    
    <mu-text-field hintText="用户名" v-model="su_username" /><br/>
    <mu-text-field v-model="su_password" label="密码" hintText="请输入密码" type="password" labelFloat/>
    </div>
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="signUp" label="确定"/>
  </mu-dialog>
</div>
  
</mu-card>
</template>

<script>


export default {
  data () {
    return {
      su_username:'',
      su_password:'',
      si_username:'',
      si_password:'',
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    signUp(){
      var that = this;
      this.$http.post('api/signUp',{
        username:this.su_username,
        password:this.su_password
      })
      .then(function (response){
        console.log(response);
        console.log(response.data.result);
        if(response.data.result == "SUCCESS"){
          console.log(123123);
          that.close();
          MessageBox("","Sign up success!","success");
        }
      })
      .catch(function(err){
        console.log(err);
      });
    }
  }
}
</script>