<template>
    <div>
    <appbar></appbar>
    <tabs></tabs>

  <!--<mu-raised-button class="demo-raised-button" label="选择文件">
    <input type="file" class="file-button">
  </mu-raised-button>-->

<div style="float:right; width:80%; ">
  <mu-appbar title="user" zDepth="0"  style="height:51px;">
    <mu-icon-menu icon="more_vert" style="height:51px;" slot="right">
      <mu-menu-item title="菜单 1"/>
      <mu-menu-item title="菜单 2"/>
      <mu-menu-item title="菜单 3"/>
      <mu-menu-item title="菜单 4"/>
      <mu-menu-item title="菜单 5"/>
    </mu-icon-menu>
  </mu-appbar>


<mu-card>
    <div style=" text-align:left;">
  <mu-list>
  <mu-list-item title="文字" disabled>
    <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>
  <mu-list-item title="文字" disabled>
    <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
  </mu-list-item>
  <mu-list-item title="文字" disabled>
    <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">MB</mu-avatar>
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

<mu-appbar title="" zDepth="0" style="height:51px; width:80%; float:right;">
    <mu-icon-button icon="image" slot="left"/>
    <mu-icon-button icon="faces" slot="left"/>
         <mu-raised-button label="SEND" class="demo-raised-button" slot="right"/>

  </mu-appbar>


    
    <div style=" width: 80%; float:right;">
     <mu-text-field hintText="多行文本输入，默认 4行，最大6行" multiLine :rows="4" :rowsMax="9" fullWidth/><br/><br/>

    </div>

    </div>
</template>

<script>
import contacts from './contacts.vue'
import tabs from './tabs.vue'
import appbar from './appbar.vue'

export default {
  components : {
    contacts,
    tabs,
    appbar
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
</style>