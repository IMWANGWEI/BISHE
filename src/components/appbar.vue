<template>
    <div>

            <div>
                <!--<mu-raised-button label="undocked drawer" @click="toggle(true)"/>-->
                <mu-drawer right  :open="open" :docked="docked" @close="toggle()">
                <mu-list @itemClick="docked ? '' : toggle()">
                    <!--<mu-list-item title="Menu Item 1"/>-->
                    <mu-menu-item title="设置" leftIcon="settings"/>
                    <mu-menu-item title="帮助" leftIcon="help_outline"/>
                    <mu-menu-item title="退出" leftIcon="power_settings_new" @click="signOut"/>
                </mu-list>
                </mu-drawer>
            </div>


            <mu-appbar title="">
            
            <mu-icon-button icon="menu" slot="right" @click="toggle(true)"/>
            

            <mu-list-item slot="left">
            <div  class="mu-avatar" style="width: 30px; height: 30px;" slot="rightAvatar"><div class="mu-avatar-inner"><i class="mu-icon material-icons">star</i> <!----> </div></div>
            </mu-list-item>
            <mu-flat-button :label="username" slot="left"/>
            <mu-icon-button icon="expand_more" slot="left"/>
            </mu-appbar>
    </div>
</template>

<script>
import io from 'socket.io-client';
export default {
  data () {
    return {
      username:'123123',
      open: false,
      docked: true,
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    signOut(){
      var that = this;
      this.$http.get('/api/signOut').then(function(response){
        console.log(response)
        if(response.data.result == "SUCCESS"){
          that.$router.push('/login')
          // that.$parent.socket.emit('disconnect')
          that.$parent.$socket.emit('disconnect')
        }
      })
    }
  },
  
}
</script>


