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
      <mu-card id="card" style="height:460px; overflow:auto" >
        <div style=" text-align:left;">
          <mu-list>
            <div id="box" v-for="item in msg">
              <br>
              <mu-list-item v-if="item.i==0" :title="item.msg" disabled style="text-align:right">
                <mu-avatar slot="right" icon="star" />
                <mu-badge v-if="onlineUser[title]==undefined" content="!" circle secondary slot = "left">
                </mu-badge>
              </mu-list-item>
              <mu-list-item v-else :title="item.msg" disabled>
                <mu-avatar slot="left" icon="contacts" />
              </mu-list-item>
            </div>
          </mu-list>
        </div>
      </mu-card>
  
    </div>
  
    <mu-appbar title="" :zDepth="0" style="height:51px; width:80%; float:right;">
      <mu-icon-button  slot="left" >
        <i class="mu-icon material-icons">
          image
          
        </i>
        <!--<input type="file" class="file-button" @change="sendImg"/>-->
        
      </mu-icon-button>
      <mu-icon-button icon="faces" slot="left" @click="showPanel = !showPanel" />
      <!--<mu-raised-button label="发送文件" class="demo-raised-button">
        <input type="file" class="file-button"/>
      </mu-raised-button>-->

     
      <mu-raised-button @click="sendMsg" label="SEND" class="demo-raised-button" slot="right" />
  
    </mu-appbar>
  
    <!--<div @keyup.enter="sendMsg">-->
    <mu-text-field v-model="input" style=" width: 80%; float:right;" hintText="说点什么吧~~~" multiLine :rows="5" :rowsMax="9" fullWidth/>
    <!--</div>-->
  
    <!--<div id="example-1" v-if="showPanel">
        
        </div>-->
    <!--<div id ="emoji-panel-container">
        <button id ="example-3-btn">emoji</button>
        
      </div>-->
  
    <br/>
    <br/>
  
  </div>
</template>

<script>
import contacts from './contacts.vue'
import tabs from './tabs.vue'
import appbar from './appbar.vue'
import io from 'socket.io-client';
// import EmojiPanel from 'emoji-panel';
// import '../../node_modules/emoji-panel/lib/emoji-panel-apple-32.css'

export default {
  data() {
    return {
      showPanel:false,
      unreadMsg: [],
      scrollTop: 99999999999999999,
      msg: [],
      input: '',
      title: '选个朋友开始聊天吧~~',
      unreadUser: [],
      onlineUser: {},
      scrollHeight:'',
    }
  },
  watch:{
    msg(){
      this.$nextTick(() => {
      document.getElementById('card').scrollTop = document.getElementById('card').scrollHeight
      })
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
        from: data.from,
        msg: data.msg
      }
      if (this.title == data.from) {
        this.msg.push(g_msg);
      }
      else {
        var that = this;
        this.unreadMsg.push(g_msg);
        if (this.unreadUser.indexOf(data.from) < 0) {
          this.unreadUser.push(data.from);
        }
        this.$refs.list.$refs.tips.showToast("你有来自" + data.from + "的信息");
      }
    },
    toast: function (data) {
      this.$refs.list.$refs.tips.showToast(data);
    },
    online: function (map) {
      console.log(map);
      this.onlineUser = map
    },
    newFriend:function(data){
      var that = this;
      this.$refs.list.$refs.tips.showToast(data);
      this.$http.post('/api/getUser', {
						uid: that.$refs.list.uid
					}).then(function (response) {
						that.$refs.list.friends = response.data.friends;
						console.log(that.$refs.list.friends)
					});

    }
  },
  components: {
    contacts,
    tabs,
    appbar
  },
  mounted: function () {
    //     new EmojiPanel(
    //   document.getElementById('example-1'), {
    //     onClick: e => {
    //       console.log(e.index,e.unified);
    //     }
    //   }       //emoji
    // );
    
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
        })
      }
    })
  },
  methods: {
    sendMsg() {
      var input = this.input;
      var to = this.title;
      if (input.length == 0) {
        this.$refs.list.$refs.tips.showToast("发送内容不能为空！")
      } else {
        this.$socket.emit('sendmsg', { to: to, msg: input })
        var s_msg = {
          i: 0,
          msg: input
        };
        this.msg.push(s_msg);
        this.input = '';
        
      };
      
    },
    // sendImg(){
      
    // }
  }
}
</script>


<style lang="css">
#example-1 {
  
  left: 300px;
  top:300px;
  bottom:300px;
  height: 300px;
  width: 400px;
}

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