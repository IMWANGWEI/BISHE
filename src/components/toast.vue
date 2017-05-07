<template>
<div>
    
    <mu-toast v-if="toast" :message="message"  @close="hideToast"/>
</div>
</template>


<script>
export default {
  data () {
    return {
      toast: false,
      message:'这是一条信息'
    }
  },
  methods: {
    showToast (message) {
      this.toast = true;
      this.message = message;
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    }
  }
}
</script>