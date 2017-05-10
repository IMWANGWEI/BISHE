<template>
  <div>
    <appbar ref="appbar"></appbar>
    <tabs ref="list"></tabs>
  
    <!--<mu-raised-button class="demo-raised-button" label="选择文件">
      <input type="file" class="file-button">
    </mu-raised-button>-->
  
    <div style="float:right; width:80%; ">
      <mu-appbar :title="title" :zDepth="0" style="height:51px;">
        <mu-icon-menu icon="more_vert" style="height:51px;" slot="right">
          <mu-menu-item title="菜单 1" />
          <mu-menu-item title="菜单 2" />
          <mu-menu-item title="菜单 3" />
          <mu-menu-item title="菜单 4" />
          <mu-menu-item title="菜单 5" />
        </mu-icon-menu>
      </mu-appbar>
  
      <mu-card id="card" style="height:460px; overflow:auto" :scrollTop.prop="aa()">
        <div style=" text-align:left;">
          <mu-list>
            <div id="box" v-for="item in msg">
              <br>
              <mu-list-item v-if="item.i==0" :title="item.msg" disabled style="text-align:right">
                <mu-avatar slot="right" icon="star" />
              </mu-list-item>
              <mu-list-item v-else :title="item.msg" disabled>
                <mu-avatar slot="left" icon="contacts" />
              </mu-list-item>
              
            </div>
            
  
            <!--<mu-badge content="1" class="demo-icon-badge" circle secondary>
              <mu-icon value="notifications" />
            </mu-badge>-->
            <!--气泡-->
          </mu-list>
        </div>
      </mu-card>
  
    </div>
  
    <mu-appbar title="" :zDepth="0" style="height:51px; width:80%; float:right;">
      <mu-icon-button icon="image" slot="left" />
      <mu-icon-button icon="faces" slot="left" />
      <mu-raised-button @click="sendMsg" label="SEND" class="demo-raised-button" slot="right" />
  
    </mu-appbar>
  
    <mu-text-field v-model="input" style=" width: 80%; float:right;" hintText="多行文本输入，默认 4行，最大6行" multiLine :rows="5" :rowsMax="9" fullWidth/>
    <br/>
    <br/>
  
  </div>
</template>

<script>
import contacts from './contacts.vue'
import tabs from './tabs.vue'
import appbar from './appbar.vue'
import io from 'socket.io-client';

export default {
  data() {
    return {
      unreadMsg: [],
      scrollTop: 99999999999999999,
      msg: [],
      input: '',
      title: 'TITLE',
      username: '',
      friends: [],
      rooms: [],
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected');
    },
    news: function (data) {
      console.log(data)
    },
    newmessage: function (data) {
      
      console.log(data);
      var g_msg = {
        i: 1,
        from:data.from,
        msg: data.msg
      }
      if (this.title == data.from) {
        this.msg.push(g_msg);
      }
       else {
         
        this.unreadMsg.push(g_msg);
      }


      
    },
    toast: function (data) {
      this.$refs.list.$refs.tips.showToast(data);
    }
    // newEmit:function(data){
    //   console.log(data)
    // }
  },
  components: {
    contacts,
    tabs,
    appbar
  },
  mounted: function () {

    var that = this;
    this.$http.get('/api/session').then(function (response) {
      // console.log(response)
      // console.log(response.data.session.user)
      if (response.data.session.user == undefined) {
        that.$router.push('login')
      } else {
        var uid = response.data.session.user._id;
        that.$http.post('/api/getUser', {
          uid: uid
        }).then(function (response) {
          var user = response.data;
          that.$refs.appbar.username = user.username;
          that.$refs.list.friends = user.friends;
          that.$refs.list.rooms = user.rooms;
          that.$refs.list.uid = user._id;
          that.$socket.emit('connected', { username: user.username })
          // var socket = io.connect('http://localhost:3000');
          //   socket.on('news', function (data) {
          //     console.log(data);
          //     socket.emit('connected', { username: user.username });

          //   });
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
  },
  methods: {
    aa() {
      return 99999999999999999;
    },
    sendMsg() {
      var input = this.input;
      // var username = this.$refs.appbar.username;
      var to = this.title;
      this.$socket.emit('sendmsg', { to: to, msg: input })
      var s_msg = {
        i: 0,
        msg: input
      };
      this.msg.push(s_msg);
      // console.log(this.msg)
      // document.getElementById('box').scrollTop = 9999;
    }
  }
}
</script>


<style lang="css">
.file-button {
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