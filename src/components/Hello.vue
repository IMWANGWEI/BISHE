<template>
  <div class="hello">
    <mu-tabs :value="theme" @change="changeTheme">
      <mu-tab title="DEFAULT" value="default" />
      <mu-tab title="LIGHT" value="light" />
      <mu-tab title="DARK" value="dark" />
      <mu-tab title="CARBON" value="carbon" />
      <mu-tab title="TEAL" value="teal" />
    </mu-tabs>
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">Forum</a>
      </li>
      <li>
        <a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
      </li>
    </ul>
  
    <mu-raised-button label="Getting Start" class="demo-raised-button" primary @click="homepage" />
    <mu-raised-button label="Login" class="demo-raised-button" primary @click="login" />
  
    
    <br>
  
  </div>
</template>

<script>
import DEFAULT from '!raw-loader!muse-ui/dist/theme-default.css'
import light from '!raw-loader!muse-ui/dist/theme-light.css'
import dark from '!raw-loader!muse-ui/dist/theme-dark.css'
import carbon from '!raw-loader!muse-ui/dist/theme-carbon.css'
import teal from '!raw-loader!muse-ui/dist/theme-teal.css'

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      theme: 'light',
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
    homepage() {
      this.$router.push('/homepage');
    },
    login() {
      this.$router.push('./login')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
