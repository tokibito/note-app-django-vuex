/*
 * クライアントアプリケーションのエントリポイント
 */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './style/font-awesome-config.scss'
import './style/navigation.scss'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import store from './store'
import Index from './components/Index.vue'
import Editor from './components/Editor.vue'
import Note from './components/Note.vue'

Vue.use(BootstrapVue)

Vue.component('index', Index)  // ページ一覧のコンポーネント
Vue.component('editor', Editor)  // エディタ部分のコンポーネント
Vue.component('note', Note)  // IndexとEditor、ボタンを含むコンポーネント(クライアントアプリケーション部分)

new Vue({
  el: '#app',
  store,
  components: {
    Note
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('load')
    })
  }
})
