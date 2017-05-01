<template>
<div style="width:20%; float:left">
  <mu-tabs :value="activeTab" @change="handleTabChange" >
    <mu-tab value="tab1" icon="contacts"/>
    <mu-tab value="tab2" icon="group"/>
    <mu-tab value="tab3" icon="search"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
     <contacts></contacts>
  </div>
  <div v-if="activeTab === 'tab2'">
    <!--<h2>Tab Two</h2>-->
      <contacts></contacts>

  </div>
  <div v-if="activeTab === 'tab3'">
      <mu-text-field icon="search" hintText="搜索联系人或群聊"/><br/>

  </div>


  
</div>
</template>

<script>
import contacts from './contacts.vue'

export default {
    name:'tags',
  data () {
    return {
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    }
  },
  components:{
      contacts
  }
}
</script>