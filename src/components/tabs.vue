<template>
<div style="width:20%; float:left">
  <mu-tabs :value="activeTab" @change="handleTabChange" >
    <mu-tab value="tab1" icon="search"/>
    <mu-tab value="tab2" icon="contacts"/>
    <mu-tab value="tab3" icon="group"/>
  </mu-tabs>
  <div v-if="activeTab === 'tab1'">
     <contacts></contacts>
  </div>
  <div v-if="activeTab === 'tab2'">
    <!--<h2>Tab Two</h2>-->
        <contacts></contacts>

  </div>
  <div v-if="activeTab === 'tab3'">
     <contacts></contacts>
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