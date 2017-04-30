<template>
    <div>

            <div>
                <!--<mu-raised-button label="undocked drawer" @click="toggle(true)"/>-->
                <mu-drawer right  :open="open" :docked="docked" @close="toggle()">
                <mu-list @itemClick="docked ? '' : toggle()">
                    <!--<mu-list-item title="Menu Item 1"/>-->
                    <mu-menu-item title="设置" leftIcon="settings"/>
                    <mu-menu-item title="帮助" leftIcon="help_outline"/>
                    <mu-menu-item title="退出" leftIcon="power_settings_new"/>
                </mu-list>
                </mu-drawer>
            </div>


            <mu-appbar title="">
            <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="搜索联系人或群聊"/>
            <mu-icon-button icon="menu" slot="right" @click="toggle(true)"/>
            

            <mu-list-item slot="left">
            <div  class="mu-avatar" style="width: 30px; height: 30px;" slot="rightAvatar"><div class="mu-avatar-inner"><i class="mu-icon material-icons">star</i> <!----> </div></div>
            </mu-list-item>
            <mu-flat-button label="username" slot="left"/>
            <mu-icon-button icon="expand_more" slot="left"/>
            </mu-appbar>
    </div>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      docked: true
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    }
  }
}
</script>


