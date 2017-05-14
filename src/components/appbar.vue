<template>
  <div>
  
    <div>
      <!--<mu-raised-button label="undocked drawer" @click="toggle(true)"/>-->
      <mu-drawer right :open="open" :docked="docked" @close="toggle()">
        <mu-list>
          <!--<mu-list-item title="Menu Item 1"/>-->
          <mu-list-item title="主题" toggleNested>
            <mu-icon slot="left" value="transform" />
            <mu-list-item slot="nested" title="DEFAULT"  @click="changeTheme('DEFAULT')">
              <mu-badge content="DEFAULT" slot="left" color="#7e57c2" />
            </mu-list-item>
            <mu-list-item slot="nested" title="CARBON"  @click="changeTheme('carbon')">
              <mu-badge content="CARBON" slot="left" color="#474a4f" />
            </mu-list-item>
            <mu-list-item slot="nested" title="LIGHT"  @click="changeTheme('light')">
              <mu-badge content="LIGHT" slot="left" color="#2196f3" />
            </mu-list-item>
            <mu-list-item slot="nested" title="DARK"  @click="changeTheme('dark')">
              <mu-badge content="DARK" slot="left" color="#1976d2" />
            </mu-list-item>
            <mu-list-item slot="nested" title="TEAL"  @click="changeTheme('teal')">
              <mu-badge content="TEAL" slot="left" color="#009688" />
            </mu-list-item>
          </mu-list-item>
          <!--<mu-menu-item title="帮助" leftIcon="help_outline" />
          <mu-menu-item title="退出" leftIcon="power_settings_new" @click="signOut" />-->
          <mu-list-item title="退出" @click="signOut">
            <mu-icon slot="left" value="power_settings_new" />
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </div>
  
    <mu-appbar title="">
  
      <mu-icon-button icon="menu" slot="right" @click="toggle(true)" />
  
      <mu-list-item slot="left">
        <div class="mu-avatar" style="width: 30px; height: 30px;" slot="rightAvatar" color="#009688">
          <div class="mu-avatar-inner">
							<!--<i class="mu-icon material-icons" >contacts</i>-->
							<!---->
							<mu-icon  value="star" color="#1976d2" slot="left" />
							
						</div>
        </div>
      </mu-list-item>
      <mu-flat-button :label="username" slot="left" />
      <!--<mu-icon-button icon="expand_more" slot="left" />-->
    </mu-appbar>
  </div>
</template>

<script>
import DEFAULT from '!raw-loader!muse-ui/dist/theme-default.css'
import light from '!raw-loader!muse-ui/dist/theme-light.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'
import io from 'socket.io-client';
export default {
  data() {
    return {
      username: '这里是用户名~~',
      open: false,
      docked: true,
      theme: '',
      themes: {
        DEFAULT,
        light,
        dark,
        carbon,
        teal
      }
    }
  },
  methods: {
    changeTheme(theme) {
      console.log(theme)
      this.theme = theme
      const styleEl = this.getThemeStyle()
      styleEl.innerHTML = this.themes[theme] || ''
    },
    getThemeStyle() {
      const themeId = 'muse-theme'
      let styleEl = document.getElementById(themeId)
      if (styleEl) return styleEl
      styleEl = document.createElement('style')
      styleEl.id = themeId
      document.head.appendChild(styleEl)
      return styleEl
    },
    toggle(flag) {
      this.open = !this.open
      this.docked = !flag
    },
    signOut() {
      var that = this;
      this.$http.get('/api/signOut').then(function (response) {
        console.log(response)
        if (response.data.result == "SUCCESS") {
          that.$router.push('/login')
          // that.$parent.socket.emit('disconnect')
          var username = that.username;
          that.$parent.$socket.emit('v_disconnect',username);
          console.log("disconnect")
        }
      })
    }
  },

}
</script>


