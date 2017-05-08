<template>
    <div>
    <appbar ref="appbar"></appbar>
    <tabs ref="list"></tabs>

  <!--<mu-raised-button class="demo-raised-button" label="选择文件">
    <input type="file" class="file-button">
  </mu-raised-button>-->

<div style="float:right; width:80%; ">
  <mu-appbar :title="title" zDepth=0  style="height:51px;">
    <mu-icon-menu icon="more_vert" style="height:51px;" slot="right">
      <mu-menu-item title="菜单 1"/>
      <mu-menu-item title="菜单 2"/>
      <mu-menu-item title="菜单 3"/>
      <mu-menu-item title="菜单 4"/>
      <mu-menu-item title="菜单 5"/>
    </mu-icon-menu>
  </mu-appbar>


<mu-card style="height:460px; overflow:auto">
    <div style=" text-align:left;">
  <mu-list>
  
  
  <mu-list-item  disabled>
    <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
      <mu-chip class="demo-chip">
          default chip
      </mu-chip>
  </mu-list-item>
  <mu-list-item  disabled>
    <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
    <mu-paper class="demo-paper" :zDepth="1" />
  </mu-list-item>
  <mu-list-item title="文字" disabled>
    <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>


  <mu-list-item title="文字" disabled style="text-align:right">
    <mu-avatar slot="right" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>
  <mu-list-item title="文字" disabled style="text-align:right">
    <mu-avatar slot="right" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>  <mu-list-item title="文字" disabled style="text-align:right">
    <mu-avatar slot="right" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>

  <mu-list-item title="文字" disabled style="text-align:right">
    <mu-avatar slot="right" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>
</mu-list>
    </div>
</mu-card>


</div>

<mu-appbar title="" zDepth=0 style="height:51px; width:80%; float:right;">
    <mu-icon-button icon="image" slot="left"/>
    <mu-icon-button icon="faces" slot="left"/>
         <mu-raised-button label="SEND" class="demo-raised-button" slot="right"/>

  </mu-appbar>


    
    
     <mu-text-field style=" width: 80%; float:right;" hintText="多行文本输入，默认 4行，最大6行" multiLine :rows="5" :rowsMax="9" fullWidth/><br/><br/>

    
    

    </div>
</template>

<script>
import contacts from './contacts.vue'
import tabs from './tabs.vue'
import appbar from './appbar.vue'

export default {
  data(){
    return{
      title:'TITLE',
      username:'',
      friends:[],
      rooms:[]
    }
  },
  components : {
    contacts,
    tabs,
    appbar
  },
  mounted: function(){
    var that = this;
    this.$http.get('/api/session').then(function(response){
      console.log(response)
      var uid = response.data.session.user._id;
      if(response.data.session.user === null){
        that.$router.push('login')
      }else{
        that.$http.post('/api/getUser',{
          uid:uid
        }).then(function(response){
          var user = response.data;
          that.$refs.appbar.username = user.username;
          that.$refs.list.friends=user.friends;
          that.$refs.list.rooms = user.rooms;
          that.$refs.list.uid = user._id;
        })
      // var user = response.data.session.user;
      // that.$refs.appbar.username = user.username;
      // that.$refs.list.friends=user.friends;
      // that.$refs.list.rooms = user.rooms;
      // that.$refs.list.uid = user._id;


      ///////在这里再加个查询user
      }
      // console.log(that.$refs.appbar.username)
    })
  }
}
</script>


<style lang="css">
.file-button{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.demo-paper {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin: 20px;
  text-align: center;
}
</style>